import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, StatusChip, Disclaimer } from "@/components/qsbs/Layout";
import { useDossier } from "@/lib/qsbs/store";
import { buildRules, readinessScore, deriveStatus } from "@/lib/qsbs/rules";
import { PaywallModal } from "@/components/qsbs/PaywallModal";
import { useQsbs } from "@/lib/qsbs/store";

export const Route = createFileRoute("/dossiers/$id/report")({
  head: () => ({ meta: [{ title: "CPA-ready report — QSBS Packet" }] }),
  component: ReportPage,
});

function ReportPage() {
  const { id } = Route.useParams();
  const d = useDossier(id);
  const { unlockDossier, recordCheckout } = useQsbs();
  const [paywall, setPaywall] = useState(false);

  if (!d) return <PageShell><div className="px-5 py-12">Not found</div></PageShell>;

  const rules = buildRules(d.inputs, d.evidence);
  const score = readinessScore(rules);
  const status = deriveStatus(rules);
  const unlocked = d.paid_unlocked || d.is_demo;

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-5 py-10">
        <div className="no-print text-sm text-muted-foreground">
          <Link to="/dossiers" className="hover:text-foreground">Dossiers</Link>
          <span className="mx-2">/</span>
          <Link to="/dossiers/$id" params={{ id }} className="hover:text-foreground">{d.inputs.issuer_name}</Link>
          <span className="mx-2">/</span><span className="text-foreground">CPA-ready report</span>
        </div>

        <div className="no-print mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-medium">CPA-ready report</h1>
            <p className="text-muted-foreground">Print-friendly preview. Use your browser's print/export to PDF.</p>
          </div>
          <div className="flex gap-2">
            {unlocked ? (
              <button className="qsbs-btn qsbs-btn-primary" onClick={() => window.print()}>Print / Export PDF</button>
            ) : (
              <button className="qsbs-btn qsbs-btn-primary" onClick={() => setPaywall(true)}>Unlock export — $49</button>
            )}
          </div>
        </div>

        {!unlocked && (
          <div className="no-print qsbs-card p-4 mt-6 bg-muted text-sm leading-relaxed">
            <strong>Before you unlock.</strong> This packet is not a legal opinion, tax opinion, valuation opinion,
            investment recommendation, or certification of QSBS eligibility. It is a structured summary of information
            you provided, intended for review by a qualified tax professional. Report export is part of the One Holding
            Packet — preview below is partially redacted until unlocked.
          </div>
        )}

        {/* Report */}
        <article className="qsbs-card p-8 md:p-12 mt-8 space-y-10">
          {/* Cover */}
          <header>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-foreground text-background text-[9px] font-semibold tabular-nums">1202</span>
              1202 Request — Section 1202 evidence dossier
            </div>
            <h2 className="mt-4 text-3xl font-medium">{d.inputs.issuer_name}</h2>
            <div className="mt-1 text-muted-foreground capitalize">
              {d.inputs.security_type.replace(/_/g, " ")} · {d.inputs.user_role} · acquired {d.inputs.acquisition_date || "—"}
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <Stat label="Evidence Completeness" value={`${score}/100`} />
              <Stat label="Dossier status" value={status.replace(/_/g, " ")} />
              <Stat label="Generated" value={new Date().toLocaleDateString("en-US", { dateStyle: "long" })} />
            </div>
          </header>

          <section>
            <SectionTitle n="01">Holding facts</SectionTitle>
            <dl className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {Object.entries(d.inputs).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border py-1.5">
                  <dt className="text-muted-foreground capitalize">{k.replace(/_/g, " ")}</dt>
                  <dd className="text-right capitalize">{String(v || "—")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <SectionTitle n="02">Rule-check table</SectionTitle>
            <table className="w-full mt-4 text-sm">
              <thead><tr className="text-left text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                <th className="py-2">Check</th><th className="py-2">Status</th><th className="py-2 hidden md:table-cell">Evidence needed</th>
              </tr></thead>
              <tbody>
                {rules.map((r) => (
                  <tr key={r.key} className="border-b border-border align-top">
                    <td className="py-3 pr-3">{r.title}</td>
                    <td className="py-3 pr-3"><StatusChip status={r.status} /></td>
                    <td className="py-3 text-muted-foreground hidden md:table-cell">{unlocked ? r.evidence_needed : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <SectionTitle n="03">Evidence matrix</SectionTitle>
            <table className="w-full mt-4 text-sm">
              <thead><tr className="text-left text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                <th className="py-2">Item</th><th className="py-2">Category</th><th className="py-2">Source</th><th className="py-2">Status</th>
              </tr></thead>
              <tbody>
                {d.evidence.map((e) => (
                  <tr key={e.id} className="border-b border-border">
                    <td className="py-2 pr-3">{e.title}</td>
                    <td className="py-2 pr-3 capitalize text-muted-foreground">{e.category.replace(/_/g, " ")}</td>
                    <td className="py-2 pr-3 capitalize text-muted-foreground">{e.source_party}</td>
                    <td className="py-2"><StatusChip status={e.status} /></td>
                  </tr>
                ))}
                {d.evidence.length === 0 && (
                  <tr><td colSpan={4} className="py-4 text-muted-foreground">No evidence items recorded.</td></tr>
                )}
              </tbody>
            </table>
          </section>

          <section>
            <SectionTitle n="04">Missing evidence & risk flags</SectionTitle>
            <ul className="mt-4 space-y-2 text-sm">
              {rules.filter((r) => r.status === "missing" || r.status === "red_flag").map((r) => (
                <li key={r.key} className="flex items-start gap-3">
                  <StatusChip status={r.status} />
                  <div className="flex-1"><div className="font-medium">{r.title}</div><div className="text-muted-foreground">{r.evidence_needed}</div></div>
                </li>
              ))}
              {rules.every((r) => r.status !== "missing" && r.status !== "red_flag") && (
                <li className="text-muted-foreground">No outstanding gaps detected from entered facts.</li>
              )}
            </ul>
          </section>

          <section>
            <SectionTitle n="05">Reviewer notes</SectionTitle>
            <div className="mt-4 border border-border rounded-lg p-4 min-h-[100px] text-muted-foreground">
              For tax professional comments and signature.
            </div>
          </section>

          <section>
            <SectionTitle n="06">Methodology & sources</SectionTitle>
            <p className="mt-3 text-sm text-muted-foreground">
              Rule checks are derived from the user's entered facts and a high-level reading of Section 1202 educational sources.
              See the <Link to="/sources" className="qsbs-link">Sources page</Link> for citations. This document does not certify
              QSBS eligibility.
            </p>
          </section>

          <Disclaimer variant="report" />
          <footer className="text-[11px] text-muted-foreground border-t border-border pt-4">
            Prepared with 1202 Request — evidence-request workflow for Section 1202 review. 1202Request.com
          </footer>
        </article>
      </div>

      <div className="no-print mt-6 mx-auto max-w-4xl px-5 qsbs-card p-4 text-sm text-muted-foreground">
        Know another founder, employee, or angel who needs issuer evidence?{" "}
        <Link to="/" className="qsbs-link">Share 1202 Request →</Link>
      </div>

      <PaywallModal
        open={paywall}
        plan="single"
        onClose={() => setPaywall(false)}
        onConfirm={() => { recordCheckout("single"); unlockDossier(id); setPaywall(false); }}
      />
    </PageShell>
  );
}

function SectionTitle({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-border pb-2">
      <span className="text-xs text-muted-foreground tabular-nums">{n}</span>
      <h3 className="text-lg font-medium">{children}</h3>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-lg p-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-medium capitalize">{value}</div>
    </div>
  );
}
