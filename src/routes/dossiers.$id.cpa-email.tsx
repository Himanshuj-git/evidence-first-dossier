import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { useDossier } from "@/lib/qsbs/store";
import { buildRules, readinessScore } from "@/lib/qsbs/rules";

export const Route = createFileRoute("/dossiers/$id/cpa-email")({
  head: () => ({ meta: [{ title: "CPA review email — 1202 Request" }] }),
  component: CpaEmailPage,
});

function CpaEmailPage() {
  const { id } = Route.useParams();
  const d = useDossier(id);
  const [copied, setCopied] = useState(false);

  const draft = useMemo(() => {
    if (!d) return { subject: "", body: "" };
    const rules = buildRules(d.inputs, d.evidence);
    const score = readinessScore(rules);
    const missing = rules.filter((r) => r.status === "missing" || r.status === "red_flag");
    const have = d.evidence.filter((e) => e.status === "received" || e.status === "reviewed");

    const subject = `Section 1202 evidence packet for review — ${d.inputs.issuer_name}`;
    const body = `Hello,

I would like to retain you to review a Section 1202 (QSBS) evidence packet I have prepared. I have not made any determination of eligibility — I am asking for your professional review.

Summary of facts (user-provided):
- Issuer: ${d.inputs.issuer_name}
- Security type: ${d.inputs.security_type.replace(/_/g, " ")}
- Acquisition date: ${d.inputs.acquisition_date || "[date]"}
- Acquisition method: ${d.inputs.acquisition_method.replace(/_/g, " ")}
- Shareholder type: ${d.inputs.shareholder_type}
- C-corp status (per user): ${d.inputs.c_corp_status}
- Gross assets at issuance (per user): ${d.inputs.gross_assets}
- Active business (per user): ${d.inputs.active_business}
- Excluded-industry risk (per user): ${d.inputs.excluded_risk}
- Redemption history near issuance: ${d.inputs.redemption_history}
- 83(b) election: ${d.inputs.election_83b}

Documents available:
${have.length ? have.map((e) => `- ${e.title} (${e.source_party})`).join("\n") : "- (none recorded yet)"}

Items I am still trying to confirm or obtain:
${missing.length ? missing.map((r) => `- ${r.title} — ${r.evidence_needed}`).join("\n") : "- None outstanding from the inputs I entered."}

Open questions for your review:
- Whether the facts above support original-issuance treatment.
- Whether the gross-asset and active-business tests appear satisfied at the relevant dates.
- Whether the excluded-business analysis is closed.
- Whether the holding-period evidence is sufficient.
- Any additional documentation you would like me to obtain from the issuer.

The packet I assembled is an organizational tool only and explicitly does not determine or certify QSBS eligibility (Evidence Completeness Score: ${score}/100). I am relying on your professional judgment.

Please let me know your availability and engagement terms.

Thank you,
[Your name]`;
    return { subject, body };
  }, [d]);

  if (!d) return <PageShell><div className="px-5 py-12">Not found</div></PageShell>;

  const copy = async () => {
    await navigator.clipboard.writeText(`Subject: ${draft.subject}\n\n${draft.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-10">
        <div className="text-sm text-muted-foreground">
          <Link to="/dossiers" className="hover:text-foreground">Dossiers</Link>
          <span className="mx-2">/</span>
          <Link to="/dossiers/$id" params={{ id }} className="hover:text-foreground">{d.inputs.issuer_name}</Link>
          <span className="mx-2">/</span><span className="text-foreground">CPA review email</span>
        </div>
        <h1 className="mt-3 text-3xl font-medium">CPA / tax-attorney review email</h1>
        <p className="mt-2 text-muted-foreground">
          A drafted introduction you can send to a qualified tax professional. It states up front that the packet is not a
          determination of QSBS eligibility.
        </p>

        <div className="qsbs-card mt-6 p-6">
          <div className="text-xs uppercase tracking-wide text-muted-foreground">Subject</div>
          <div className="mt-1 font-medium">{draft.subject}</div>
          <div className="qsbs-divider my-4" />
          <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">{draft.body}</pre>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="qsbs-btn qsbs-btn-primary" onClick={copy}>{copied ? "Copied" : "Copy email"}</button>
          <a className="qsbs-btn qsbs-btn-ghost"
             href={`mailto:?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}>
            Open in mail client
          </a>
          <Link to="/dossiers/$id/request-letter" params={{ id }} className="qsbs-btn qsbs-btn-ghost">
            Issuer request letters →
          </Link>
        </div>

        <div className="mt-8">
          <Disclaimer />
        </div>
      </div>
    </PageShell>
  );
}
