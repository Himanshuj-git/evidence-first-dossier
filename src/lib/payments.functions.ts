import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { type StripeEnv, createStripeClient } from "@/lib/stripe.server";

let _admin: any = null;
function admin(): any {
  if (!_admin) {
    _admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  }
  return _admin;
}

export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: {
    priceId: string;
    customerEmail?: string;
    dossierId?: string;
    userId?: string;
    returnUrl: string;
    environment: StripeEnv;
  }) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(data.priceId)) throw new Error("Invalid priceId");
    if (!data.returnUrl || !/^https?:\/\//.test(data.returnUrl)) throw new Error("Invalid returnUrl");
    if (data.dossierId && !/^[a-zA-Z0-9_-]{1,64}$/.test(data.dossierId)) throw new Error("Invalid dossierId");
    if (data.userId && !/^[a-zA-Z0-9-]{1,64}$/.test(data.userId)) throw new Error("Invalid userId");
    if (data.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerEmail)) throw new Error("Invalid email");
    return data;
  })
  .handler(async ({ data }) => {
    const stripe = createStripeClient(data.environment);

    const prices = await stripe.prices.list({ lookup_keys: [data.priceId] });
    if (!prices.data.length) throw new Error("Price not found");
    const stripePrice = prices.data[0];

    const productId =
      typeof stripePrice.product === "string" ? stripePrice.product : stripePrice.product.id;
    const product = await stripe.products.retrieve(productId);

    const metadata: Record<string, string> = {};
    if (data.dossierId) metadata.dossier_id = data.dossierId;
    if (data.userId) metadata.user_id = data.userId;

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: data.returnUrl,
      payment_intent_data: { description: product.name },
      managed_payments: { enabled: true },
      ...(data.customerEmail && { customer_email: data.customerEmail }),
      ...(Object.keys(metadata).length > 0 && { metadata }),
    } as any);

    return session.client_secret;
  });

async function upsertPurchaseFromSession(session: any, env: StripeEnv) {
  const row = {
    email: session.customer_details?.email || session.customer_email || "",
    stripe_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id ?? null,
    amount_cents: session.amount_total ?? null,
    currency: session.currency ?? null,
    dossier_id: session.metadata?.dossier_id ?? null,
    user_id: session.metadata?.user_id ?? null,
    environment: env,
    status: session.payment_status === "paid" ? "paid" : "pending",
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await admin()
    .from("purchases")
    .upsert(row, { onConflict: "stripe_session_id" })
    .select("access_token, email, dossier_id, amount_cents, status, user_id")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export const verifyCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: { sessionId: string; environment: StripeEnv }) => {
    if (!/^cs_(test|live)_[a-zA-Z0-9]+$/.test(data.sessionId)) throw new Error("Invalid sessionId");
    return data;
  })
  .handler(async ({ data }) => {
    const { data: existing } = await admin()
      .from("purchases")
      .select("access_token, email, dossier_id, amount_cents, status, user_id")
      .eq("stripe_session_id", data.sessionId)
      .eq("environment", data.environment)
      .maybeSingle();

    if (existing && existing.status === "paid") return existing;

    const stripe = createStripeClient(data.environment);
    const session = await stripe.checkout.sessions.retrieve(data.sessionId);
    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }
    return await upsertPurchaseFromSession(session, data.environment);
  });

export const redeemAccessToken = createServerFn({ method: "POST" })
  .inputValidator((data: { token: string }) => {
    if (!/^[0-9a-f-]{36}$/i.test(data.token)) throw new Error("Invalid token");
    return data;
  })
  .handler(async ({ data }) => {
    const { data: row, error } = await admin()
      .from("purchases")
      .select("id, email, dossier_id, status, user_id")
      .eq("access_token", data.token)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row || row.status !== "paid") throw new Error("Access link not found");
    return row;
  });

/** Called after sign-in: link any purchases made with this email (anonymously) to the user_id. */
export const linkPurchasesToCurrentUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId, claims } = context as any;
    const email: string | undefined = claims?.email;
    if (!email) return { linked: 0 };
    const { data, error } = await admin()
      .from("purchases")
      .update({ user_id: userId, updated_at: new Date().toISOString() })
      .is("user_id", null)
      .ilike("email", email)
      .select("id");
    if (error) throw new Error(error.message);
    return { linked: data?.length ?? 0 };
  });

/** Server entitlement: does the signed-in user have at least one paid (non-refunded) packet,
 *  optionally scoped to a specific dossier_id? */
export const getMyEntitlements = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { dossierId?: string } | undefined) => data ?? {})
  .handler(async ({ data, context }) => {
    const { userId, claims } = context as any;
    const email: string | undefined = claims?.email;
    let q = admin()
      .from("purchases")
      .select("id, dossier_id, status, created_at, amount_cents, currency")
      .eq("status", "paid")
      .order("created_at", { ascending: false });
    if (email) {
      q = q.or(`user_id.eq.${userId},email.ilike.${email}`);
    } else {
      q = q.eq("user_id", userId);
    }
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    const purchases = rows ?? [];
    const hasAny = purchases.length > 0;
    const dossierPaid =
      data.dossierId
        ? purchases.some((r: any) => !r.dossier_id || r.dossier_id === data.dossierId)
        : hasAny;
    return { hasAny, dossierPaid, purchases };
  });

export async function _internalUpsertFromSession(session: any, env: StripeEnv) {
  return upsertPurchaseFromSession(session, env);
}
