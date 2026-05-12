import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, ScoreRing, StatusChip, Disclaimer } from "@/components/qsbs/Layout";
import { useQsbs } from "@/lib/qsbs/store";
import { summarize } from "@/lib/qsbs/rules";

export const Route = createFileRoute("/compare")({
  head: () => ({ meta: [{ title: "Compare holdings — QSBS Packet" }] }),
  component: ComparePage,
});

function ComparePage() {
  const { dossiers } = useQsbs();
  const [a, setA] = useState(dossiers[0]?.id || "");
  const [b, setB] = useState(dossiers[1]?.id || "");

  const da = dossiers.find((d) => d.id === a);
  const db = dossiers.find((d) => d.id === b);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="text-3xl font-medium">Compare holdings</h1>
        <p className="text-muted-foreground">Side-by-side view of two dossiers — facts, evidence readiness, and rule status.</p>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <select className="qsbs-input" value={a} onChange={(e) => setA(e.target.value)}>
            <option value="">Select holding A</option>
            {dossiers.map((d) => <option key={d.id} value={d.id}>{d.inputs.issuer_name}</option>)}
          </select>
          <select className="qsbs-input" value={b} onChange={(e) => setB(e.target.value)}>
            <option value="">Select holding B</option>
            {dossiers.map((d) => <option key={d.id} value={d.id}>{d.inputs.issuer_name}</option>)}
          </select>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {[da, db].map((d, idx) => {
            if (!d) return <div key={idx} className="qsbs-card p-6 text-muted-foreground text-sm">Pick a holding</div>;
            const s = summarize(d);
            return (
              <div key={d.id} className="qsbs-card p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{d.inputs.security_type.replace(/_/g, " ")}</div>
                    <div className="text-xl font-medium truncate">{d.inputs.issuer_name}</div>
                    <div className="text-sm text-muted-foreground">Acquired {d.inputs.acquisition_date || "—"}</div>
                  </div>
                  <ScoreRing score={s.score} />
                </div>
                <div className="qsbs-divider my-4" />
                <dl className="text-sm space-y-1.5">
                  {[
                    ["Method", d.inputs.acquisition_method.replace(/_/g, " ")],
                    ["Holder", d.inputs.shareholder_type],
                    ["C-corp", d.inputs.c_corp_status],
                    ["Gross assets", d.inputs.gross_assets],
                    ["Active business", d.inputs.active_business],
                    ["Excluded risk", d.inputs.excluded_risk],
                    ["Redemption", d.inputs.redemption_history],
                    ["Missing items", String(s.missing)],
                    ["Red flags", String(s.red)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-border py-1">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="capitalize">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 space-y-1.5">
                  {s.rules.slice(0, 6).map((r) => (
                    <div key={r.key} className="flex items-center justify-between gap-2 text-sm">
                      <div className="truncate">{r.title}</div>
                      <StatusChip status={r.status} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
