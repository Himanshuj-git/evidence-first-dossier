import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
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
    returnUrl: string;
    environment: StripeEnv;
  }) => {
    if (!/^[a-zA-Z0-9_-]+$/.test(data.priceId)) throw new Error("Invalid priceId");
    if (!data.returnUrl || !/^https?:\/\//.test(data.returnUrl)) throw new Error("Invalid returnUrl");
    if (data.dossierId && !/^[a-zA-Z0-9_-]{1,64}$/.test(data.dossierId)) throw new Error("Invalid dossierId");
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

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: data.returnUrl,
      payment_intent_data: { description: product.name },
      managed_payments: { enabled: true },
      ...(data.customerEmail && { customer_email: data.customerEmail }),
      ...(data.dossierId && { metadata: { dossier_id: data.dossierId } }),
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
    environment: env,
    status: session.payment_status === "paid" ? "paid" : "pending",
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await admin()
    .from("purchases")
    .upsert(row, { onConflict: "stripe_session_id" })
    .select("access_token, email, dossier_id, amount_cents, status")
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
    // Try DB first (webhook may have populated it already).
    const { data: existing } = await admin()
      .from("purchases")
      .select("access_token, email, dossier_id, amount_cents, status")
      .eq("stripe_session_id", data.sessionId)
      .eq("environment", data.environment)
      .maybeSingle();

    if (existing && existing.status === "paid") return existing;

    // Webhook race fallback: query Stripe directly and upsert.
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
      .select("email, dossier_id, status")
      .eq("access_token", data.token)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row || row.status !== "paid") throw new Error("Access link not found");
    return row;
  });

// Exposed for the webhook handler.
export async function _internalUpsertFromSession(session: any, env: StripeEnv) {
  return upsertPurchaseFromSession(session, env);
}
