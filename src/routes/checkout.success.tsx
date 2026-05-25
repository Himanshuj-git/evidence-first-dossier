import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { trackEvent } from "@/lib/qsbs/analytics";
import { useQsbs } from "@/lib/qsbs/store";
import { verifyCheckoutSession, linkPurchasesToCurrentUser } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Purchase complete — 1202 Request" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    dossier: typeof s.dossier === "string" ? s.dossier : undefined,
    session_id: typeof s.session_id === "string" ? s.session_id : undefined,
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { dossier, session_id } = useSearch({ from: "/checkout/success" });
  const { recordCheckout, unlockDossier } = useQsbs();
  const [state, setState] = useState<
    | { status: "verifying" }
    | { status: "ok"; email: string; accessUrl: string; dossierId: string | null }
    | { status: "error"; message: string }
  >({ status: "verifying" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!session_id) {
      setState({ status: "error", message: "Missing checkout session. If you just paid, please use the link in your Stripe receipt or contact support." });
      return;
    }
    (async () => {
      try {
        const res = await verifyCheckoutSession({
          data: { sessionId: session_id, environment: getStripeEnvironment() },
        });
        try { await linkPurchasesToCurrentUser(); } catch {}
        const dossierId = (res as any).dossier_id ?? dossier ?? null;
        const accessUrl = `${window.location.origin}/access?token=${(res as any).access_token}`;
        try { recordCheckout("single"); } catch {}
        if (dossierId) { try { unlockDossier(dossierId); } catch {} }
        trackEvent("checkout_success", { dossier_id: dossierId });
        setState({ status: "ok", email: (res as any).email || "", accessUrl, dossierId });
      } catch (e: any) {
        setState({ status: "error", message: e?.message || "We could not verify your payment. Please contact support@1202request.com with your receipt." });
      }
    })();
  }, [session_id, dossier, recordCheckout, unlockDossier]);

  return (
    <PageShell>
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        {state.status === "verifying" && (
          <>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Confirming</div>
            <h1 className="mt-2 text-3xl font-medium">Verifying your payment…</h1>
            <p className="mt-3 text-muted-foreground">One moment.</p>
          </>
        )}

        {state.status === "error" && (
          <>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Verification failed</div>
            <h1 className="mt-2 text-3xl font-medium">We could not verify this purchase.</h1>
            <p className="mt-3 text-muted-foreground">{state.message}</p>
            <div className="mt-6 flex gap-2 justify-center">
              <a href="mailto:support@1202request.com" className="qsbs-btn qsbs-btn-primary">Contact support</a>
              <Link to="/pricing" className="qsbs-btn qsbs-btn-ghost">Back to pricing</Link>
            </div>
          </>
        )}

        {state.status === "ok" && (
          <>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Confirmation</div>
            <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">Your One Holding Packet is unlocked.</h1>
            {state.email && (
              <p className="mt-3 text-sm text-muted-foreground">
                Receipt sent to <span className="font-medium text-foreground">{state.email}</span>.
              </p>
            )}

            <div className="qsbs-card mt-8 p-5 text-left">
              <div className="text-sm font-medium">Save your access link</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Bookmark this or email it to yourself. Opening it from any browser will unlock your packet on that device.
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  readOnly
                  value={state.accessUrl}
                  onFocus={(e) => e.currentTarget.select()}
                  className="flex-1 rounded-md border bg-muted/40 px-3 py-2 text-xs font-mono"
                />
                <button
                  className="qsbs-btn qsbs-btn-ghost text-xs"
                  onClick={async () => {
                    try { await navigator.clipboard.writeText(state.accessUrl); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {}
                  }}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
                <a
                  className="qsbs-btn qsbs-btn-ghost text-xs"
                  href={`mailto:${state.email}?subject=${encodeURIComponent("Your 1202 Request access link")}&body=${encodeURIComponent("Open this link any time to access your One Holding Packet:\n\n" + state.accessUrl)}`}
                >
                  Email it
                </a>
              </div>
            </div>

            <div className="mt-8 flex gap-2 justify-center flex-wrap">
              {state.dossierId ? (
                <Link to="/dossiers/$id/export" params={{ id: state.dossierId }} className="qsbs-btn qsbs-btn-primary">Open my packet</Link>
              ) : (
                <Link to="/dossiers" className="qsbs-btn qsbs-btn-primary">Go to my holdings</Link>
              )}
              <a href="mailto:support@1202request.com" className="qsbs-btn qsbs-btn-ghost">Contact support</a>
            </div>
          </>
        )}

        <div className="mt-10"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
