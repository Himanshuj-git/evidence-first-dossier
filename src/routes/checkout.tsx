import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { StripeEmbeddedCheckout } from "@/components/qsbs/StripeEmbeddedCheckout";
import { hasPaymentsToken } from "@/lib/stripe";
import { trackEvent } from "@/lib/qsbs/analytics";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — 1202 Request" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    dossier: typeof s.dossier === "string" ? s.dossier : undefined,
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { dossier } = useSearch({ from: "/checkout" });
  const [showCheckout, setShowCheckout] = useState(false);
  const [returnUrl, setReturnUrl] = useState("");

  useEffect(() => {
    trackEvent("checkout_started", { plan: "single", dossier_id: dossier });
    trackEvent("paid_gate_viewed", { plan: "single" });
    const url = new URL("/checkout/success", window.location.origin);
    if (dossier) url.searchParams.set("dossier", dossier);
    url.searchParams.set("session_id", "{CHECKOUT_SESSION_ID}");
    setReturnUrl(url.toString());
  }, [dossier]);


  const canCheckout = hasPaymentsToken();

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-12">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Secure checkout</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">One Holding Packet — $49</h1>
        <p className="mt-3 text-muted-foreground">One-time purchase. 14-day satisfaction policy. Not tax advice.</p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="qsbs-card p-6">
            <div className="text-sm font-medium">What you get</div>
            <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
              <li>• Professional issuer request letter</li>
              <li>• Follow-up template</li>
              <li>• Evidence checklist + tracker</li>
              <li>• CPA-ready review summary</li>
              <li>• Document index & risk flags</li>
              <li>• Print/export-ready dossier</li>
              <li>• Audit trail of request steps</li>
            </ul>
            <div className="mt-6 text-xs text-muted-foreground">
              Questions? <a className="qsbs-link" href="mailto:support@1202request.com">support@1202request.com</a>
            </div>
          </div>

          <div className="qsbs-card p-2 md:p-4 overflow-hidden">
            {!canCheckout ? (
              <div className="p-6 text-sm text-muted-foreground">
                Secure checkout is being connected. Please refresh in a moment, or email
                <a className="qsbs-link ml-1" href="mailto:support@1202request.com">support@1202request.com</a>.
              </div>
            ) : showCheckout && returnUrl ? (
              <StripeEmbeddedCheckout
                priceId="one_holding_packet_49"
                dossierId={dossier}
                returnUrl={returnUrl}
              />
            ) : (
              <div className="p-6 flex flex-col gap-3">
                <div className="text-sm font-medium">Ready to unlock</div>
                <p className="text-sm text-muted-foreground">
                  Click below to load the secure payment form. You'll pay $49 (one-time) and your packet
                  unlocks the moment payment is confirmed.
                </p>
                <button
                  type="button"
                  className="qsbs-btn qsbs-btn-primary w-full"
                  onClick={() => {
                    trackEvent("payment_link_clicked", { plan: "single" });
                    setShowCheckout(true);
                  }}
                  disabled={!returnUrl}
                >
                  Proceed to secure checkout — $49
                </button>
                <div className="text-[11px] text-muted-foreground text-center">
                  Payments are processed securely by Stripe.
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between text-xs">
          <Link to="/pricing" className="qsbs-link">← Back to pricing</Link>
          <Link to="/checkout/cancel" className="qsbs-link" onClick={() => trackEvent("checkout_cancelled")}>Cancel</Link>
        </div>

        <div className="mt-8"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
