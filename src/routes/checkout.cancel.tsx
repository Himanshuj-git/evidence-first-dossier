import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageShell } from "@/components/qsbs/Layout";
import { trackEvent } from "@/lib/qsbs/analytics";

export const Route = createFileRoute("/checkout/cancel")({
  head: () => ({ meta: [{ title: "Checkout cancelled — 1202 Request" }, { name: "robots", content: "noindex" }] }),
  component: CancelPage,
});

function CancelPage() {
  useEffect(() => { trackEvent("checkout_cancelled"); }, []);
  return (
    <PageShell>
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-3xl font-medium">Checkout cancelled</h1>
        <p className="mt-3 text-muted-foreground">No charge was made. You can keep building your free draft or come back when you're ready to export.</p>
        <div className="mt-6 flex gap-2 justify-center">
          <Link to="/pricing" className="qsbs-btn qsbs-btn-primary">Back to pricing</Link>
          <Link to="/dossiers" className="qsbs-btn qsbs-btn-ghost">My holdings</Link>
        </div>
      </div>
    </PageShell>
  );
}
