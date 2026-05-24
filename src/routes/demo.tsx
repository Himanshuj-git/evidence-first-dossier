import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { PageShell, Disclaimer, ScoreRing, StatusChip } from "@/components/qsbs/Layout";
import { AISummary } from "@/components/qsbs/AeoBlocks";
import { useDossier } from "@/lib/qsbs/store";
import { buildRules, readinessScore } from "@/lib/qsbs/rules";
import { trackEvent } from "@/lib/qsbs/analytics";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Sample Section 1202 Evidence Dossier — 1202 Request" },
      { name: "description", content: "View a fictional sample dossier showing issuer evidence requests, missing documents, CPA review questions, and a Section 1202 review packet." },
      { property: "og:title", content: "Sample Section 1202 Evidence Dossier — 1202 Request" },
      { property: "og:description", content: "Fictional Northstar Robotics example — issuer request, evidence tracker, risk flags, CPA-ready summary." },
      { property: "og:url", content: "https://1202request.com/demo" },
      { name: "twitter:title", content: "Sample Section 1202 Evidence Dossier — 1202 Request" },
      { name: "twitter:description", content: "Fictional Northstar Robotics example — issuer request, evidence tracker, risk flags, CPA-ready summary." },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/demo" }],
  }),

  component: DemoPage,
});

// Render an inline rich sample (we don't depend on store mutation; rely on seed if available).
function DemoPage() {
  useEffect(() => { trackEvent("sample_dossier_viewed", { scenario: "northstar" }); }, []);
  const seeded = useDossier("demo-northstar");

  const facts = {
    holder: "Former employee (illustrative)",
    issuer: "Northstar Robotics, Inc. (fictional Delaware C-corp)",
    security: "ISO exercised in 2020",
    acquisition: "Option exercise — 2020-04-12",
    event: "Possible tender offer — Q4 2026",
    state: "California",
  };

  const evidence = [
    { cat: "Original issuance", title: "Option grant + exercise notice", status: "received" },
    { cat: "Election", title: "83(b) election + certified mail receipt", status: "received" },
    { cat: "Cap table", title: "Cap-table extract showing original issuance", status: "requested" },
    { cat: "C-corp status", title: "Counsel letter confirming C-corp throughout holding period", status: "requested" },
    { cat: "Gross assets", title: "Officer attestation: gross assets at and immediately after issuance", status: "missing" },
    { cat: "Active business", title: "CFO memo: active business use of assets", status: "missing" },
    { cat: "Redemption", title: "Issuer confirmation: no significant redemptions in lookback windows", status: "missing" },
    { cat: "Counsel memo", title: "Issuer QSBS / counsel-reviewed materials", status: "missing" },
  ];

  const received = evidence.filter((e) => e.status === "received").length;
  const requested = evidence.filter((e) => e.status === "requested").length;
  const missing = evidence.filter((e) => e.status === "missing").length;

  const completeness = useMemo(() => {
    if (seeded) {
      const r = buildRules(seeded.inputs, seeded.evidence);
      return readinessScore(r);
    }
    return Math.round((received / evidence.length) * 100);
  }, [seeded]);

  const risks = [
    "Gross-asset support not yet on file — needed before review.",
    "Redemption / repurchase history unconfirmed by issuer.",
    "Active business attestation outstanding for the full holding period.",
  ];

  const cpaQuestions = [
    "Confirm holding-period start date for tax purposes given the 2020 exercise.",
    "Identify the applicable per-issuer exclusion cap that applies to this holding.",
    "Confirm any state-level conformity items (CA partial conformity considerations).",
  ];
  const issuerQuestions = [
    "Was the company a domestic C-corp continuously from incorporation through the present?",
    "Aggregate gross assets at and immediately after the 2020 issuance — under the applicable threshold?",
    "Any redemptions from the holder or related parties in the applicable lookback windows?",
    "Has counsel previously reviewed Section 1202 treatment for these shares?",
  ];

  const auditTrail = [
    { ts: "2026-02-04", actor: "Holder", action: "Created dossier from /scan" },
    { ts: "2026-02-05", actor: "Holder", action: "Generated issuer evidence request letter v1" },
    { ts: "2026-02-08", actor: "Issuer", action: "Acknowledged request; routed to legal" },
    { ts: "2026-02-19", actor: "Issuer", action: "Provided cap-table extract" },
    { ts: "2026-03-02", actor: "Holder", action: "Sent follow-up request for gross-asset and active business support" },
  ];

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-5 py-12 md:py-16">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="qsbs-chip qsbs-chip-amber">Fictional demo. Not tax advice.</span>
          <span className="qsbs-chip qsbs-chip-muted">Sample for illustration only</span>
        </div>

        <div className="mt-5 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight">{facts.issuer}</h1>
            <p className="mt-2 text-muted-foreground">{facts.security} · {facts.holder}</p>
            <div className="mt-3 text-sm text-muted-foreground">
              Acquisition: {facts.acquisition} · State: {facts.state} · Upcoming event: {facts.event}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Evidence completeness</div>
              <div className="text-xs text-muted-foreground italic">Documentation only — not eligibility.</div>
            </div>
            <ScoreRing score={completeness} size={72} />
            <StatusChip status="evidence_incomplete" />
          </div>
        </div>

        {/* Counters */}
        <div className="mt-8 grid sm:grid-cols-4 gap-3">
          {[
            { l: "Evidence items", v: evidence.length },
            { l: "Received", v: received },
            { l: "Requested", v: requested },
            { l: "Missing", v: missing },
          ].map((s) => (
            <div key={s.l} className="qsbs-card p-4">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
              <div className="mt-1 text-2xl font-medium tabular-nums">{s.v}</div>
            </div>
          ))}
        </div>

        {/* Evidence matrix */}
        <section className="mt-10">
          <h2 className="text-xl font-medium">Evidence matrix</h2>
          <div className="mt-3 qsbs-card divide-y divide-border">
            {evidence.map((e) => (
              <div key={e.title} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{e.cat}</div>
                  <div className="text-sm">{e.title}</div>
                </div>
                <StatusChip status={e.status} />
              </div>
            ))}
          </div>
        </section>

        {/* Issuer request letter preview */}
        <section className="mt-10 grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-medium">Generated issuer request letter</h2>
            <div className="mt-3 qsbs-card p-5 text-sm leading-relaxed font-serif whitespace-pre-wrap">
{`Subject: Request for Section 1202 evidence — Northstar Robotics shares

To: Northstar Robotics, Inc. — Stockholder Records

I am a current stockholder of Northstar Robotics, Inc., having acquired
shares via option exercise on April 12, 2020. In connection with an
upcoming review of my tax position, my CPA has asked me to gather the
following factual evidence from the company:

  1. Written confirmation that Northstar Robotics has been a domestic
     C-corporation continuously from incorporation through the present.
  2. Officer attestation of aggregate gross assets at, and immediately
     after, my 2020 issuance, including the relevant balance sheets.
  3. Confirmation that the company has conducted an active trade or
     business throughout the holding period.
  4. Schedule of any stock redemptions or repurchases from me or
     related parties in the applicable lookback windows.
  5. A cap-table extract showing the original issuance to me.

This request is solely for tax-review purposes. We are not asking the
company to opine on Section 1202 treatment. Please respond by
[date] or let me know who I should follow up with.

Thank you,
[Holder name]`}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-medium">Risk flags & open questions</h2>
            <div className="mt-3 qsbs-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Risk flags</div>
              <ul className="mt-2 space-y-1.5 text-sm">{risks.map((r) => <li key={r} className="flex gap-2"><span className="text-warning">!</span>{r}</li>)}</ul>
            </div>
            <div className="mt-4 qsbs-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">CPA questions</div>
              <ul className="mt-2 space-y-1.5 text-sm">{cpaQuestions.map((r) => <li key={r} className="flex gap-2"><span className="text-muted-foreground">·</span>{r}</li>)}</ul>
            </div>
            <div className="mt-4 qsbs-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Issuer questions</div>
              <ul className="mt-2 space-y-1.5 text-sm">{issuerQuestions.map((r) => <li key={r} className="flex gap-2"><span className="text-muted-foreground">·</span>{r}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* Audit trail */}
        <section className="mt-10">
          <h2 className="text-xl font-medium">Audit trail</h2>
          <div className="mt-3 qsbs-card divide-y divide-border">
            {auditTrail.map((a) => (
              <div key={a.ts + a.action} className="p-3 flex items-center gap-4 text-sm">
                <span className="tabular-nums text-muted-foreground w-24">{a.ts}</span>
                <span className="w-20 text-xs uppercase tracking-wider text-muted-foreground">{a.actor}</span>
                <span>{a.action}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Export preview */}
        <section className="mt-10">
          <h2 className="text-xl font-medium">Export preview</h2>
          <div className="mt-3 qsbs-card p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Cover page</div>
            <div className="mt-2 font-medium">Section 1202 Evidence Dossier — Northstar Robotics, Inc.</div>
            <div className="text-sm text-muted-foreground">Prepared by holder · For CPA / tax-attorney review · Fictional sample</div>
            <div className="qsbs-divider my-4" />
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Section</div><div>Factual summary</div></div>
              <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Section</div><div>Evidence matrix</div></div>
              <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Section</div><div>Issuer letter + follow-up</div></div>
              <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Section</div><div>Risk flags & questions</div></div>
              <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Section</div><div>Document index</div></div>
              <div><div className="text-xs uppercase tracking-wider text-muted-foreground">Section</div><div>Audit trail</div></div>
            </div>
          </div>
        </section>

        {/* CTA block */}
        <section className="mt-10 qsbs-card p-6 md:p-8 text-center">
          <div className="text-xl font-medium">Want a real dossier like this for your holding?</div>
          <p className="mt-2 text-sm text-muted-foreground">Start free. Pay $49 only when you're ready to export a CPA-ready packet.</p>
          <div className="mt-5 flex flex-wrap gap-2 justify-center">
            <Link to="/start" className="qsbs-btn qsbs-btn-primary" onClick={() => trackEvent("landing_cta_clicked", { from: "demo", cta: "build" })}>Build my evidence request</Link>
            <Link to="/pricing" className="qsbs-btn qsbs-btn-ghost" onClick={() => trackEvent("landing_cta_clicked", { from: "demo", cta: "unlock" })}>Unlock full packet — $49</Link>
            <Link to="/checklist" className="qsbs-btn qsbs-btn-ghost" onClick={() => trackEvent("landing_cta_clicked", { from: "demo", cta: "checklist" })}>Download free checklist</Link>
          </div>
        </section>

        <div className="mt-8"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
