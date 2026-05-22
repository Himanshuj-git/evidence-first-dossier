
## Goal
Close the gap between "Stripe takes money" and "the customer actually owns a packet they can recover anywhere." Today, `/checkout/success` unlocks the dossier from localStorage with no server verification — anyone can bypass payment.

## Changes

### 1. Stripe product + price (real this time)
- Call `batch_create_product`:
  - `product_id: one_holding_packet`, name "One Holding Packet"
  - `tax_code: txcd_10000000` (general digital good — required for managed payments)
  - `price_id: one_holding_packet_49` (matches what `checkout.tsx` already passes), $4900 USD one-time, qty 1/1

### 2. Database (Lovable Cloud)
New `purchases` table — no auth users, identified by email + access token:
- `id uuid pk`
- `email text not null`
- `stripe_session_id text unique not null`
- `stripe_payment_intent_id text`
- `amount_cents int`, `currency text`
- `dossier_id text` (from session metadata)
- `access_token uuid unique default gen_random_uuid()` ← this is the "magic link" secret
- `environment text not null` (`sandbox`/`live`)
- `status text` (`paid` / `refunded`)
- `created_at`
- RLS: deny all from anon (only service role reads/writes via server fns).

### 3. Webhook (`/api/public/payments/webhook`)
- Verify Stripe signature using `verifyWebhook`
- Handle `checkout.session.completed`: upsert purchase row with email (from `session.customer_details.email`), `payment_intent_id`, `dossier_id` from metadata, mark `paid`.
- Handle `charge.refunded` / `payment_intent.payment_failed`: update status.
- Return 200 quickly.

### 4. Server-side checkout improvements (`payments.functions.ts`)
- Add `managed_payments: { enabled: true }` on the session (user picked full handling).
- Already passes `dossier_id` in metadata — keep.
- Stripe collects buyer email automatically (default in embedded checkout), so we don't need to add a custom field.

### 5. Server fn `verifyCheckoutSession(session_id)`
- Looks up the purchase row by `stripe_session_id` in our DB.
- If not found yet (webhook race), call `stripe.checkout.sessions.retrieve` and create the row inline (idempotent upsert).
- Returns `{ email, dossier_id, access_token, amount_cents }`.

### 6. Rewrite `/checkout/success`
- On mount with `?session_id=...`, call `verifyCheckoutSession`.
- Only on success: unlock dossier in localStorage AND show:
  - Confirmation with the email Stripe captured.
  - A **prominent access link** `https://…/access?token=<access_token>` with "Copy link" / "Email this to yourself" (mailto) buttons. This is the cross-device recovery mechanism.
  - "Open my packet" CTA.
- If verification fails → show error + support email; do NOT unlock.

### 7. New route `/access?token=<uuid>`
- Server fn `redeemAccessToken(token)` → returns `{ dossier_id, email }` or 404.
- Client: writes unlock to localStorage for that dossier, then redirects to `/dossiers/$id/export`.
- This lets buyers recover their packet from any browser.

### 8. Cleanup
- Remove the now-stale `recordCheckout` blind unlock on success — replaced by server-verified unlock.
- Leave `checkout.cancel` page (unreachable from Stripe embedded, but the manual link from checkout page still works).

## Out of scope (called out, not built this pass)
- Full Supabase Auth / login. Token link is the "lightweight magic link" you chose.
- Automated email delivery of the access link. Buyer copies/sends it; Stripe's receipt confirms the charge. Adding automated email needs the Lovable email domain setup (DNS verification step) — happy to do that as a follow-up if you want zero-touch delivery.
- Refund automation UI — refunds happen in Stripe dashboard; webhook flips status.

## Testing in preview
1. Hard refresh `/checkout`.
2. Use test card `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP.
3. After payment, you'll land on `/checkout/success?session_id=cs_test_…&dossier=...` — confirm:
   - It shows your email and a long "access link" URL.
   - "Open my packet" navigates to the dossier and the export is unlocked.
4. Copy the access link, open it in an incognito window — packet should unlock there too (proving cross-device recovery).
5. Try visiting `/checkout/success` directly with no `session_id`, or with a fake one — should show an error and NOT unlock (proving the bypass is closed).
6. Try `4000 0000 0000 0002` (decline) — checkout stays on the form, no unlock.

## Limitations remaining after this pass
- Buyer must save the access link themselves (no automated email yet).
- No refund self-service (Stripe dashboard only).
- No admin view of purchases (can query in Lovable Cloud → Database).
