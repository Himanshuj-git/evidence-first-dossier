import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/qsbs/Layout";
import { useAuth } from "@/hooks/use-auth";
import { getMyEntitlements } from "@/lib/payments.functions";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My account — 1202 Request" }, { name: "robots", content: "noindex" }] }),
  component: AccountPage,
});

function AccountPage() {
  const { user, isAuthenticated, loading, signOut } = useAuth();
  const nav = useNavigate();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) nav({ to: "/login", search: { redirect: "/account" } });
  }, [loading, isAuthenticated, nav]);

  useEffect(() => {
    if (!isAuthenticated) return;
    getMyEntitlements({ data: {} })
      .then((r: any) => setPurchases(r.purchases || []))
      .catch((e) => setErr(e?.message || "Could not load purchases"));
  }, [isAuthenticated]);

  if (loading || !isAuthenticated) return <PageShell><div className="p-12 text-center text-muted-foreground">Loading…</div></PageShell>;

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl px-5 py-12">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Account</div>
        <h1 className="mt-2 text-3xl font-medium tracking-tight">My account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Signed in as <span className="font-medium text-foreground">{user?.email}</span></p>

        <div className="qsbs-card mt-8 p-6">
          <div className="text-sm font-medium">Purchases</div>
          {err && <div className="mt-2 text-xs text-destructive">{err}</div>}
          {purchases.length === 0 ? (
            <div className="mt-3 text-sm text-muted-foreground">
              No purchases yet. <Link to="/pricing" className="qsbs-link">See pricing</Link>.
            </div>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {purchases.map((p) => (
                <li key={p.id} className="py-3 text-sm flex justify-between">
                  <div>
                    <div className="font-medium">One Holding Packet</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(p.created_at).toLocaleDateString()}
                      {p.dossier_id ? ` • dossier ${p.dossier_id}` : ""}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${((p.amount_cents ?? 4900) / 100).toFixed(2)} {p.currency?.toUpperCase() || "USD"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 flex gap-2">
          <Link to="/dossiers" className="qsbs-btn qsbs-btn-primary">My holdings</Link>
          <button onClick={() => signOut()} className="qsbs-btn qsbs-btn-ghost">Sign out</button>
        </div>
      </div>
    </PageShell>
  );
}
