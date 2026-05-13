import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { useQsbs } from "@/lib/qsbs/store";
import { summarize } from "@/lib/qsbs/rules";

export const Route = createFileRoute("/admin-demo")({
  head: () => ({ meta: [{ title: "Demo data & QA — 1202 Request" }] }),
  component: AdminDemoPage,
});

function AdminDemoPage() {
  const { dossiers, resetDemo, intents } = useQsbs();
  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-5 py-12 space-y-8">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Internal</div>
          <h1 className="text-3xl font-medium">Demo data & QA</h1>
          <p className="text-muted-foreground">Explore seeded dossiers and reset local state.</p>
        </div>

        <div className="qsbs-card p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Local store</div>
            <button onClick={() => { if (confirm("Reset all local dossiers and unlocks?")) resetDemo(); }} className="qsbs-btn qsbs-btn-ghost text-sm">Reset to demo</button>
          </div>
          <div className="qsbs-divider my-4" />
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <Stat k="Dossiers" v={dossiers.length} />
            <Stat k="Demo dossiers" v={dossiers.filter((d) => d.is_demo).length} />
            <Stat k="Checkout intents" v={intents.length} />
          </div>
        </div>

        <div className="qsbs-card overflow-hidden">
          <div className="p-4 text-sm font-medium border-b border-border">All dossiers</div>
          <table className="w-full text-sm">
            <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
              <tr><th className="text-left p-3">Issuer</th><th className="text-left p-3">Type</th><th className="text-left p-3">Score</th><th className="text-left p-3">Evidence</th><th className="p-3"></th></tr>
            </thead>
            <tbody>
              {dossiers.map((d) => {
                const s = summarize(d);
                return (
                  <tr key={d.id} className="border-t border-border">
                    <td className="p-3">{d.inputs.issuer_name}</td>
                    <td className="p-3 capitalize text-muted-foreground">{d.inputs.security_type.replace(/_/g, " ")}</td>
                    <td className="p-3 tabular-nums">{s.score}</td>
                    <td className="p-3 text-muted-foreground">{d.evidence.length} items · {s.missing} missing · {s.red} red</td>
                    <td className="p-3 text-right">
                      <Link to="/dossiers/$id" params={{ id: d.id }} className="qsbs-link text-xs">Open →</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="qsbs-card p-6 text-sm">
          <div className="font-medium">QA checklist</div>
          <ul className="mt-3 space-y-1 text-muted-foreground">
            <li>✓ Free scan accessible at <Link to="/scan" className="qsbs-link">/scan</Link></li>
            <li>✓ Dossiers list at <Link to="/dossiers" className="qsbs-link">/dossiers</Link></li>
            <li>✓ Pricing and paywall at <Link to="/pricing" className="qsbs-link">/pricing</Link></li>
            <li>✓ Three demo dossiers preloaded</li>
            <li>✓ Compliance disclaimer present on tax/investment pages</li>
          </ul>
        </div>

        <Disclaimer variant="compact" />
      </div>
    </PageShell>
  );
}

function Stat({ k, v }: { k: string; v: number }) {
  return (
    <div className="border border-border rounded-lg p-3">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{k}</div>
      <div className="mt-1 text-2xl font-medium tabular-nums">{v}</div>
    </div>
  );
}
