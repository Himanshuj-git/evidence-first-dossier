import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { trackEvent } from "@/lib/qsbs/analytics";
import { useQsbs } from "@/lib/qsbs/store";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Purchase complete — 1202 Request" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    dossier: typeof s.dossier === "string" ? s.dossier : undefined,
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { dossier } = useSearch({ from: "/checkout/success" });
  const { recordCheckout, unlockDossier } = useQsbs();

  useEffect(() => {
    trackEvent("checkout_success", { dossier_id: dossier });
    // Mark the packet plan as paid so export gates unlock on return from Stripe.
    try { recordCheckout("single"); } catch {}
    if (dossier) {
      try { unlockDossier(dossier); } catch {}
    }
  }, [dossier, recordCheckout, unlockDossier]);

  return (
    <PageShell>
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Confirmation</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">Your One Holding Packet is unlocked.</h1>
        <p className="mt-3 text-muted-foreground">
          You can now export the CPA-ready dossier, generate the full issuer request letter, and access the document
          index, risk flags, and audit trail.
        </p>
        <div className="mt-8 flex gap-2 justify-center flex-wrap">
          {dossier ? (
            <Link to="/dossiers/$id/export" params={{ id: dossier }} className="qsbs-btn qsbs-btn-primary">Open my packet</Link>
          ) : (
            <Link to="/dossiers" className="qsbs-btn qsbs-btn-primary">Go to my holdings</Link>
          )}
          <a href="mailto:support@1202request.com" className="qsbs-btn qsbs-btn-ghost">Contact support</a>
        </div>
        <div className="mt-10"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
