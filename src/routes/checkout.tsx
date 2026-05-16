import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { useQsbs } from "@/lib/qsbs/store";
import { trackEvent, captureLead } from "@/lib/qsbs/analytics";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — 1202 Request" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { settings, recordCheckout } = useQsbs();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { trackEvent("checkout_started", { plan: "single" }); }, []);

  const stripe = settings.stripe_single;

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl px-5 py-16">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Secure checkout</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">One Holding Packet — $49</h1>
        <p className="mt-3 text-muted-foreground">One-time purchase. 14-day satisfaction policy. Not tax advice.</p>

        <div className="mt-8 qsbs-card p-6">
          <div className="text-sm font-medium">What you get</div>
          <ul className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-muted-foreground">
            <li>• Professional issuer request letter</li>
            <li>• Follow-up request template</li>
            <li>• Evidence checklist</li>
            <li>• Missing document tracker</li>
            <li>• CPA-ready review summary</li>
            <li>• Document index</li>
            <li>• Risk flags & open questions</li>
            <li>• Print/export-ready dossier</li>
            <li>• Audit trail of request steps</li>
          </ul>
        </div>

        {stripe ? (
          <a href={stripe} className="mt-6 qsbs-btn qsbs-btn-primary w-full" target="_blank" rel="noreferrer"
             onClick={() => trackEvent("checkout_started", { route: "stripe" })}>
            Continue to Stripe checkout
          </a>
        ) : (
          <div className="mt-6 qsbs-card p-6">
            <div className="text-sm font-medium">Secure checkout coming soon</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Join the early-access list and we'll email you as soon as live payments open. In the meantime, you can
              simulate a successful checkout to preview the unlocked dossier.
            </p>
            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
                  captureLead({ email, role: "Unknown", event_type: "Checkout", holdings_count: "1", source_page: "/checkout" });
                  setSubmitted(true);
                }}
                className="mt-4 flex flex-col sm:flex-row gap-2"
              >
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                <button className="qsbs-btn qsbs-btn-primary">Notify me</button>
              </form>
            ) : (
              <div className="mt-4 text-sm text-foreground">Thanks — you're on the list.</div>
            )}
            <button
              className="mt-4 qsbs-btn qsbs-btn-ghost w-full"
              onClick={() => {
                recordCheckout("single");
                trackEvent("checkout_success", { mode: "simulated" });
                nav({ to: "/checkout/success" });
              }}
            >
              Simulate successful checkout
            </button>
          </div>
        )}

        <div className="mt-4 flex justify-between text-xs">
          <Link to="/pricing" className="qsbs-link">← Back to pricing</Link>
          <Link to="/checkout/cancel" className="qsbs-link" onClick={() => trackEvent("checkout_cancelled")}>Cancel</Link>
        </div>

        <div className="mt-8"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
