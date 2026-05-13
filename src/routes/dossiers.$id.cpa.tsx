import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, StatusChip, Disclaimer, ScoreRing } from "@/components/qsbs/Layout";
import { useDossier } from "@/lib/qsbs/store";
import { buildRules, readinessScore } from "@/lib/qsbs/rules";

export const Route = createFileRoute("/dossiers/$id/cpa")({
  head: () => ({ meta: [{ title: "CPA reviewer view — 1202 Request" }] }),
  component: CpaView,
});

function CpaView() {
  const { id } = Route.useParams();
  const d = useDossier(id);
  if (!d) return <PageShell><div className="px-5 py-12">Not found</div></PageShell>;

  const rules = buildRules(d.inputs, d.evidence);
  const score = readinessScore(rules);
  const received = d.evidence.filter((e) => e.status === "received" || e.status === "reviewed");
  const missing = rules.filter((r) => r.status === "missing" || r.status === "red_flag");

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-5 py-10">
        <div className="text-sm text-muted-foreground">
          <Link to="/dossiers/$id" params={{ id }} className="hover:text-foreground">{d.inputs.issuer_name}</Link>
          <span className="mx-2">/</span><span className="text-foreground">CPA reviewer view</span>
        </div>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="qsbs-chip qsbs-chip-muted">CPA / tax-attorney role view</span>
            <h1 className="mt-2 text-3xl font-medium">Review packet — {d.inputs.issuer_name}</h1>
            <p className="text-muted-foreground mt-1">Read-only summary of the shareholder's facts, evidence, open questions, and risk flags.</p>
          </div>
          <div className="flex items-center gap-3">
            <ScoreRing score={score} size={64} />
            <div className="text-xs text-muted-foreground max-w-[180px] leading-snug">
              Evidence completeness — not eligibility.
            </div>
          </div>
        </div>

        <section className="qsbs-card p-6 mt-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Facts summary</h2>
          <dl className="mt-3 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
            <Row k="Shareholder role" v={d.inputs.user_role} />
            <Row k="Issuer" v={d.inputs.issuer_name} />
            <Row k="Security type" v={d.inputs.security_type.replace(/_/g, " ")} />
            <Row k="Acquisition date" v={d.inputs.acquisition_date || "—"} />
            <Row k="Acquisition method" v={d.inputs.acquisition_method.replace(/_/g, " ")} />
            <Row k="Shareholder type" v={d.inputs.shareholder_type} />
            <Row k="C-corp (per shareholder)" v={d.inputs.c_corp_status} />
            <Row k="Gross assets (per shareholder)" v={d.inputs.gross_assets} />
            <Row k="Active business" v={d.inputs.active_business} />
            <Row k="Excluded-industry risk" v={d.inputs.excluded_risk} />
            <Row k="Redemption history" v={d.inputs.redemption_history} />
            <Row k="83(b) election" v={d.inputs.election_83b} />
          </dl>
        </section>

        <section className="qsbs-card p-6 mt-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Evidence on file</h2>
          {received.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No documents marked received yet.</p>
          ) : (
            <ul className="mt-3 text-sm divide-y divide-border">
              {received.map((e) => (
                <li key={e.id} className="py-2 flex justify-between gap-3">
                  <span>{e.title} <span className="text-muted-foreground capitalize text-xs">· {e.source_party}</span></span>
                  <StatusChip status={e.status} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="qsbs-card p-6 mt-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Open questions and risk flags for your review</h2>
          {missing.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No outstanding gaps from the shareholder's inputs.</p>
          ) : (
            <ul className="mt-3 text-sm space-y-3">
              {missing.map((r) => (
                <li key={r.key} className="flex items-start gap-3">
                  <StatusChip status={r.status} />
                  <div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-muted-foreground text-xs">{r.evidence_needed}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="qsbs-card p-6 mt-6">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Generated issuer correspondence</h2>
          {d.letters.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No letters saved to this dossier yet.</p>
          ) : (
            <ul className="mt-3 text-sm space-y-2">
              {d.letters.map((l) => <li key={l.id}>· {l.subject}</li>)}
            </ul>
          )}
        </section>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link to="/dossiers/$id/report" params={{ id }} className="qsbs-btn qsbs-btn-primary">Open full dossier export →</Link>
          <Link to="/dossiers/$id/cpa-email" params={{ id }} className="qsbs-btn qsbs-btn-ghost">Drafted intro email</Link>
        </div>

        <div className="mt-8"><Disclaimer variant="report" /></div>
      </div>
    </PageShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border py-1">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right capitalize">{v}</dd>
    </div>
  );
}
