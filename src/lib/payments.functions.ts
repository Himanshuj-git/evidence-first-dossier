import { createServerFn } from "@tanstack/react-start";
import { type StripeEnv, createStripeClient } from "@/lib/stripe.server";

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

    const productId = typeof stripePrice.product === "string"
      ? stripePrice.product
      : stripePrice.product.id;
    const product = await stripe.products.retrieve(productId);
    const productDescription = product.name;

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      mode: "payment",
      ui_mode: "embedded_page",
      return_url: data.returnUrl,
      payment_intent_data: { description: productDescription },
      ...(data.customerEmail && { customer_email: data.customerEmail }),
      ...(data.dossierId && { metadata: { dossier_id: data.dossierId } }),
    });

    return session.client_secret;
  });
