import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, Disclaimer, ScoreRing, StatusChip } from "@/components/qsbs/Layout";
import { useQsbs } from "@/lib/qsbs/store";
import { buildRules, readinessScore, topMissing } from "@/lib/qsbs/rules";
import type { DossierInputs } from "@/lib/qsbs/types";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Build my evidence request — 1202 Request" },
      { name: "description", content: "Free wizard. Identify your holding, then surface the issuer evidence your CPA will need for Section 1202 review." },
      { property: "og:title", content: "Build my Section 1202 evidence request" },
      { property: "og:description", content: "Free wizard. Surface the issuer evidence your CPA will need for Section 1202 review." },
      { property: "og:url", content: "https://1202request.com/scan" },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/scan" }],
  }),
  component: ScanPage,
});

const STEPS = ["Role", "Issuer", "Acquisition", "Issuer status", "Tests", "Result"] as const;

const initial: DossierInputs = {
  user_role: "founder",
  issuer_name: "",
  security_type: "founder_stock",
  acquisition_date: "",
  acquisition_method: "direct_issuer",
  shareholder_type: "individual",
  c_corp_status: "unknown",
  gross_assets: "unknown",
  active_business: "unknown",
  excluded_risk: "unknown",
  redemption_history: "unknown",
  election_83b: "unknown",
};

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <div className="text-sm font-medium">{label}</div>
      {hint ? <div className="text-xs text-muted-foreground mt-0.5">{hint}</div> : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ScanPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<DossierInputs>(initial);
  const { createDossier } = useQsbs();
  const nav = useNavigate();

  const set = <K extends keyof DossierInputs>(k: K, v: DossierInputs[K]) => setData((d) => ({ ...d, [k]: v }));

  const result = useMemo(() => {
    const rules = buildRules(data, []);
    return { rules, score: readinessScore(rules), missing: topMissing(rules) };
  }, [data]);

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl px-5 py-12">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Build my evidence request</div>
        <h1 className="mt-2 text-3xl font-medium">Identify your holding and the issuer evidence you'll need</h1>
        <p className="mt-2 text-muted-foreground">No sign-in required. 1202 Request never decides whether you qualify — we surface what's documented and what's missing so your CPA can review.</p>

        {/* Progress */}
        <div className="mt-8 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${i <= step ? "bg-foreground" : "bg-border"}`} />
          ))}
        </div>
        <div className="mt-2 text-xs text-muted-foreground tabular-nums">Step {step + 1} of {STEPS.length} — {STEPS[step]}</div>

        <div className="qsbs-card p-6 md:p-8 mt-6 space-y-5">
          {step === 0 && (
            <>
              <Field label="What best describes you?">
                <select className="qsbs-input" value={data.user_role} onChange={(e) => set("user_role", e.target.value as DossierInputs["user_role"])}>
                  <option value="founder">Founder</option>
                  <option value="employee">Early employee</option>
                  <option value="investor">Angel / SPV investor</option>
                  <option value="cpa">CPA preparing for a client</option>
                </select>
              </Field>
              <Field label="Shareholder type">
                <select className="qsbs-input" value={data.shareholder_type} onChange={(e) => set("shareholder_type", e.target.value as DossierInputs["shareholder_type"])}>
                  <option value="individual">Individual</option>
                  <option value="trust">Trust</option>
                  <option value="estate">Estate</option>
                  <option value="partnership">Partnership / LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="unknown">Unknown</option>
                </select>
              </Field>
            </>
          )}

          {step === 1 && (
            <>
              <Field label="Issuer / company name">
                <input className="qsbs-input" placeholder="e.g. Northstar Robotics, Inc." value={data.issuer_name} onChange={(e) => set("issuer_name", e.target.value)} />
              </Field>
              <Field label="Security type">
                <select className="qsbs-input" value={data.security_type} onChange={(e) => set("security_type", e.target.value as DossierInputs["security_type"])}>
                  <option value="founder_stock">Founder stock</option>
                  <option value="rsa">Restricted stock award (RSA)</option>
                  <option value="iso">Exercised ISOs</option>
                  <option value="nso">Exercised NSOs</option>
                  <option value="preferred">Preferred stock</option>
                  <option value="common">Common stock</option>
                  <option value="safe_converted">SAFE converted to stock</option>
                  <option value="spv">SPV / partnership interest</option>
                  <option value="unknown">Unknown</option>
                </select>
              </Field>
              <Field label="State of residence (optional)" hint="State conformity to Section 1202 varies.">
                <input className="qsbs-input" placeholder="e.g. CA" value={data.state || ""} onChange={(e) => set("state", e.target.value)} />
              </Field>
            </>
          )}

          {step === 2 && (
            <>
              <Field label="Acquisition / issuance / exercise date">
                <input className="qsbs-input" type="date" value={data.acquisition_date} onChange={(e) => set("acquisition_date", e.target.value)} />
              </Field>
              <Field label="Planned exit / sale date (optional)" hint="For timeline reference only. Not a recommendation.">
                <input className="qsbs-input" type="date" value={data.planned_exit_date || ""} onChange={(e) => set("planned_exit_date", e.target.value)} />
              </Field>
              <Field label="Acquisition method">
                <select className="qsbs-input" value={data.acquisition_method} onChange={(e) => set("acquisition_method", e.target.value as DossierInputs["acquisition_method"])}>
                  <option value="direct_issuer">Direct from issuer (original issuance)</option>
                  <option value="secondary">Secondary purchase</option>
                  <option value="unknown">Unknown</option>
                </select>
              </Field>
              <Field label="83(b) election">
                <select className="qsbs-input" value={data.election_83b} onChange={(e) => set("election_83b", e.target.value as DossierInputs["election_83b"])}>
                  <option value="yes">Yes — filed timely</option>
                  <option value="no">No</option>
                  <option value="not_applicable">Not applicable</option>
                  <option value="unknown">Unknown</option>
                </select>
              </Field>
            </>
          )}

          {step === 3 && (
            <>
              <Field label="U.S. domestic C corporation status">
                <select className="qsbs-input" value={data.c_corp_status} onChange={(e) => set("c_corp_status", e.target.value as DossierInputs["c_corp_status"])}>
                  <option value="confirmed">Confirmed</option>
                  <option value="likely">Likely</option>
                  <option value="unknown">Unknown</option>
                  <option value="no">No (LLC / S-corp / foreign)</option>
                </select>
              </Field>
              <Field label="Gross assets at and immediately after issuance">
                <select className="qsbs-input" value={data.gross_assets} onChange={(e) => set("gross_assets", e.target.value as DossierInputs["gross_assets"])}>
                  <option value="under">Under the applicable threshold</option>
                  <option value="unknown">Unknown</option>
                  <option value="over">Over the applicable threshold</option>
                </select>
              </Field>
            </>
          )}

          {step === 4 && (
            <>
              <Field label="Active business (~80% of assets used in qualified trade/business)">
                <select className="qsbs-input" value={data.active_business} onChange={(e) => set("active_business", e.target.value as DossierInputs["active_business"])}>
                  <option value="confirmed">Confirmed</option>
                  <option value="likely">Likely</option>
                  <option value="unknown">Unknown</option>
                  <option value="no">No</option>
                </select>
              </Field>
              <Field label="Excluded business risk" hint="Health, law, accounting, consulting, finance, hospitality, farming, etc.">
                <select className="qsbs-input" value={data.excluded_risk} onChange={(e) => set("excluded_risk", e.target.value as DossierInputs["excluded_risk"])}>
                  <option value="none">None known</option>
                  <option value="maybe">Possibly</option>
                  <option value="yes">Yes</option>
                  <option value="unknown">Unknown</option>
                </select>
              </Field>
              <Field label="Redemption / buyback history near issuance">
                <select className="qsbs-input" value={data.redemption_history} onChange={(e) => set("redemption_history", e.target.value as DossierInputs["redemption_history"])}>
                  <option value="none">None known</option>
                  <option value="unknown">Unknown</option>
                  <option value="yes">Yes</option>
                </select>
              </Field>
            </>
          )}

          {step === 5 && (
            <div>
              <div className="flex items-center gap-4">
                <ScoreRing score={result.score} size={88} />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Evidence Completeness Score</div>
                  <div className="text-2xl font-medium tabular-nums">{result.score} / 100</div>
                  <p className="text-xs text-muted-foreground mt-1 max-w-md">
                    This score measures documentation completeness only, not QSBS eligibility. Professional review is
                    required.
                  </p>
                  <div className="text-[11px] text-muted-foreground mt-1">
                    {result.score >= 90 ? "Strong documentation package."
                      : result.score >= 70 ? "Mostly complete — professional review recommended."
                      : result.score >= 40 ? "Missing important evidence."
                      : "Early-stage packet — high documentation gaps."}
                  </div>
                </div>
              </div>

              <div className="qsbs-divider my-6" />

              <div className="space-y-3">
                <div className="text-sm font-medium">Top items needing attention</div>
                {result.missing.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No high-weight gaps detected from your inputs.</div>
                ) : (
                  result.missing.map((r) => (
                    <div key={r.key} className="border border-border rounded-lg p-3 flex items-start gap-3">
                      <StatusChip status={r.status} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{r.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{r.evidence_needed}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <button
                  className="qsbs-btn qsbs-btn-primary flex-1"
                  onClick={() => {
                    const id = createDossier(data);
                    import("@/lib/qsbs/analytics").then(({ trackEvent }) => trackEvent("packet_started", { dossier_id: id, role: data.user_role }));
                    nav({ to: "/dossiers/$id", params: { id } });
                  }}
                >
                  Create my 1202 Request dossier
                </button>
                <button className="qsbs-btn qsbs-btn-ghost" onClick={() => { setData(initial); setStep(0); }}>Restart</button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <button className="qsbs-btn qsbs-btn-ghost" onClick={prev} disabled={step === 0}>Back</button>
          {step < STEPS.length - 1 && (
            <button className="qsbs-btn qsbs-btn-primary" onClick={next}>Continue</button>
          )}
        </div>

        <div className="mt-8">
          <Disclaimer variant="compact" />
        </div>
      </div>
    </PageShell>
  );
}
