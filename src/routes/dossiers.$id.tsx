import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, ScoreRing, StatusChip, Disclaimer } from "@/components/qsbs/Layout";
import { useQsbs, useDossier } from "@/lib/qsbs/store";
import { buildRules, readinessScore, deriveStatus } from "@/lib/qsbs/rules";

export const Route = createFileRoute("/dossiers/$id")({
  head: () => ({ meta: [{ title: "Dossier — 1202 Request" }] }),
  component: DossierLayout,
});

function DossierLayout() {
  const { id } = Route.useParams();
  const loc = useLocation();
  const d = useDossier(id);
  const { archiveDossier, deleteDossier } = useQsbs();
  const [tab, setTab] = useState<"overview" | "rules" | "timeline">("overview");

  const summary = useMemo(() => {
    if (!d) return null;
    const rules = buildRules(d.inputs, d.evidence);
    return { rules, score: readinessScore(rules), derived: deriveStatus(rules) };
  }, [d]);

  // If we're on a sub-route (evidence/report/request-letter), render outlet
  const isSub = loc.pathname.split("/").length > 3;

  if (!d || !summary) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h1 className="text-2xl font-medium">Dossier not found</h1>
          <Link to="/dossiers" className="qsbs-btn qsbs-btn-primary mt-6">Back to dossiers</Link>
        </div>
      </PageShell>
    );
  }

  if (isSub) return <Outlet />;

  const acq = d.inputs.acquisition_date ? new Date(d.inputs.acquisition_date) : null;
  const milestones = acq
    ? [3, 4, 5].map((y) => {
        const m = new Date(acq); m.setFullYear(m.getFullYear() + y);
        return { y, date: m, reached: m.getTime() < Date.now() };
      })
    : [];

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="text-sm text-muted-foreground">
          <Link to="/dossiers" className="hover:text-foreground">Dossiers</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{d.inputs.issuer_name}</span>
        </div>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {d.is_demo ? <span className="qsbs-chip qsbs-chip-muted">Demo</span> : null}
              <StatusChip status={summary.derived} />
            </div>
            <h1 className="mt-2 text-3xl font-medium">{d.inputs.issuer_name}</h1>
            <p className="mt-1 text-muted-foreground capitalize">
              {d.inputs.security_type.replace(/_/g, " ")} · {d.inputs.user_role} · acquired {d.inputs.acquisition_date || "—"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ScoreRing score={summary.score} size={72} />
            <div className="text-sm">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Evidence Completeness Score</div>
              <div className="text-2xl font-medium tabular-nums">{summary.score}/100</div>
              <div className="text-[11px] text-muted-foreground max-w-[220px] leading-snug">
                Documentation completeness only — not QSBS eligibility.
              </div>
            </div>
          </div>
        </div>

        {/* Sub-nav */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-border">
          {[
            { k: "overview", label: "Overview" },
            { k: "rules", label: "Rule checks" },
            { k: "timeline", label: "Timeline" },
          ].map((t) => (
            <button key={t.k} onClick={() => setTab(t.k as "overview" | "rules" | "timeline")}
              className={`px-3 py-2 text-sm border-b-2 -mb-px ${tab === t.k ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {t.label}
            </button>
          ))}
          <div className="ml-auto flex flex-wrap gap-2 pb-2">
            <Link to="/dossiers/$id/evidence" params={{ id }} className="qsbs-chip">Evidence vault →</Link>
            <Link to="/dossiers/$id/tracker" params={{ id }} className="qsbs-chip">Request tracker →</Link>
            <Link to="/dossiers/$id/request-letter" params={{ id }} className="qsbs-chip">Issuer letters →</Link>
            <Link to="/dossiers/$id/cpa" params={{ id }} className="qsbs-chip">CPA view →</Link>
            <Link to="/dossiers/$id/issuer" params={{ id }} className="qsbs-chip">Issuer view →</Link>
            <Link to="/dossiers/$id/cpa-email" params={{ id }} className="qsbs-chip">CPA email →</Link>
            <Link to="/dossiers/$id/report" params={{ id }} className="qsbs-chip">Report →</Link>
            <Link to="/dossiers/$id/export" params={{ id }} className="qsbs-chip">Export packet →</Link>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {tab === "overview" && (
              <>
                <div className="qsbs-card p-6">
                  <div className="text-sm font-medium">Next best documentation action</div>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {summary.rules.find((r) => r.status === "red_flag")?.evidence_needed ||
                      summary.rules.find((r) => r.status === "missing")?.evidence_needed ||
                      "Your evidence file appears complete. Schedule a review with your tax professional."}
                  </p>
                </div>
                <div className="qsbs-card p-6">
                  <div className="text-sm font-medium mb-4">Rule check summary</div>
                  <div className="space-y-2">
                    {summary.rules.map((r) => (
                      <div key={r.key} className="flex items-center justify-between gap-3 py-1.5">
                        <div className="text-sm truncate">{r.title}</div>
                        <StatusChip status={r.status} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {tab === "rules" && (
              <div className="space-y-3">
                {summary.rules.map((r) => (
                  <div key={r.key} className="qsbs-card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-base font-medium">{r.title}</div>
                        <div className="text-xs text-muted-foreground">Weight: {r.weight}</div>
                      </div>
                      <StatusChip status={r.status} />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.explanation}</p>
                    <div className="qsbs-divider my-3" />
                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      <div><div className="text-muted-foreground uppercase tracking-wide">Why it matters</div><div className="mt-1">{r.why_it_matters}</div></div>
                      <div><div className="text-muted-foreground uppercase tracking-wide">Evidence needed</div><div className="mt-1">{r.evidence_needed}</div></div>
                      <div className="sm:col-span-2"><div className="text-muted-foreground uppercase tracking-wide">Your facts</div><div className="mt-1">{r.facts}</div></div>
                    </div>
                    <div className="mt-4">
                      <Link to="/dossiers/$id/request-letter" params={{ id }} className="qsbs-btn qsbs-btn-ghost text-sm">Generate issuer request</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "timeline" && (
              <div className="qsbs-card p-6">
                <div className="text-sm font-medium">Holding period timeline</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Milestones for reference only. Not a recommendation to sell, hold, or transfer.
                </p>
                <div className="mt-6 space-y-4">
                  <TimelineRow label="Acquisition / issuance" date={d.inputs.acquisition_date || "—"} reached />
                  {milestones.map((m) => (
                    <TimelineRow key={m.y} label={`${m.y}-year milestone`}
                      date={m.date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      reached={m.reached} note="Professional review required" />
                  ))}
                  {d.inputs.planned_exit_date && (
                    <TimelineRow label="Planned exit (informational)" date={d.inputs.planned_exit_date} />
                  )}
                </div>
              </div>
            )}
            <Disclaimer />
          </div>

          <div className="space-y-4">
            <div className="qsbs-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Evidence vault</div>
              <div className="mt-2 text-2xl font-medium tabular-nums">
                {d.evidence.filter((e) => e.status === "received" || e.status === "reviewed").length}
                <span className="text-muted-foreground text-base"> / {d.evidence.length}</span>
              </div>
              <div className="text-sm text-muted-foreground">items received</div>
              <Link to="/dossiers/$id/evidence" params={{ id }} className="qsbs-btn qsbs-btn-ghost mt-4 w-full text-sm">Open vault</Link>
            </div>
            <div className="qsbs-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Quick facts</div>
              <dl className="mt-3 space-y-2 text-sm">
                <Row k="Issuer" v={d.inputs.issuer_name} />
                <Row k="Method" v={d.inputs.acquisition_method.replace(/_/g, " ")} />
                <Row k="Holder" v={d.inputs.shareholder_type} />
                <Row k="C-corp" v={d.inputs.c_corp_status} />
                <Row k="Gross assets" v={d.inputs.gross_assets} />
                <Row k="State" v={d.inputs.state || "—"} />
              </dl>
            </div>
            {!d.is_demo && (
              <div className="qsbs-card p-5 space-y-2">
                <button className="qsbs-btn qsbs-btn-ghost w-full text-sm" onClick={() => archiveDossier(id)}>Archive</button>
                <button className="text-xs text-destructive hover:underline" onClick={() => { if (confirm("Delete this dossier?")) deleteDossier(id); }}>Delete dossier</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right capitalize">{v}</dd>
    </div>
  );
}

function TimelineRow({ label, date, reached, note }: { label: string; date: string; reached?: boolean; note?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-2.5 h-2.5 rounded-full ${reached ? "bg-foreground" : "bg-border"}`} />
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        {note ? <div className="text-xs text-muted-foreground">{note}</div> : null}
      </div>
      <div className="text-sm tabular-nums text-muted-foreground">{date}</div>
    </div>
  );
}
