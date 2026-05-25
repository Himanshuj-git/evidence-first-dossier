import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/qsbs/Layout";
import { redeemAccessToken, linkPurchasesToCurrentUser } from "@/lib/payments.functions";
import { useQsbs } from "@/lib/qsbs/store";

export const Route = createFileRoute("/access")({
  head: () => ({
    meta: [
      { title: "Open my packet — 1202 Request" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    token: typeof s.token === "string" ? s.token : undefined,
  }),
  component: AccessPage,
});

function AccessPage() {
  const { token } = useSearch({ from: "/access" });
  const navigate = useNavigate();
  const { recordCheckout, unlockDossier } = useQsbs();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Missing access token.");
      return;
    }
    (async () => {
      try {
        const res = (await redeemAccessToken({ data: { token } })) as any;
        try { recordCheckout("single"); } catch {}
        if (res.dossier_id) {
          try { unlockDossier(res.dossier_id); } catch {}
          navigate({ to: "/dossiers/$id/export", params: { id: res.dossier_id } });
        } else {
          navigate({ to: "/dossiers" });
        }
      } catch (e: any) {
        setError(e?.message || "This access link is invalid or expired.");
      }
    })();
  }, [token, navigate, recordCheckout, unlockDossier]);

  return (
    <PageShell>
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        {error ? (
          <>
            <h1 className="text-3xl font-medium">Access link invalid</h1>
            <p className="mt-3 text-muted-foreground">{error}</p>
            <div className="mt-6 flex gap-2 justify-center">
              <a href="mailto:support@1202request.com" className="qsbs-btn qsbs-btn-primary">Contact support</a>
              <Link to="/pricing" className="qsbs-btn qsbs-btn-ghost">Pricing</Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-medium">Unlocking your packet…</h1>
            <p className="mt-3 text-muted-foreground">One moment.</p>
          </>
        )}
      </div>
    </PageShell>
  );
}
