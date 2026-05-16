import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { trackEvent } from "@/lib/qsbs/analytics";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({ meta: [{ title: "Purchase complete — 1202 Request" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  useEffect(() => { trackEvent("checkout_success"); }, []);
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
          <Link to="/dossiers" className="qsbs-btn qsbs-btn-primary">Go to my holdings</Link>
          <Link to="/start" className="qsbs-btn qsbs-btn-ghost">Start a new request</Link>
        </div>
        <div className="mt-10"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
