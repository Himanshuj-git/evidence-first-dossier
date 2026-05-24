import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { AISummary, DirectAnswer } from "@/components/qsbs/AeoBlocks";

const TITLE = "Why Not Just Use ChatGPT for Section 1202 Evidence?";
const DESCRIPTION =
  "ChatGPT can draft text. 1202 Request provides a structured issuer evidence workflow, tracker, request letter templates, and a CPA-ready dossier for Section 1202 review.";

export const Route = createFileRoute("/why-not-chatgpt")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://1202request.com/why-not-chatgpt" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/why-not-chatgpt" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Can ChatGPT prepare my QSBS evidence?", acceptedAnswer: { "@type": "Answer", text: "ChatGPT can draft a letter, but it does not give you an evidence checklist tailored to your stock facts, a request tracker, an audit trail, or a CPA-ready dossier export for Section 1202 review." } },
            { "@type": "Question", name: "Does 1202 Request give tax advice?", acceptedAnswer: { "@type": "Answer", text: "No. It is an educational document-organization tool. All Section 1202 determinations should be reviewed by a qualified tax professional." } },
            { "@type": "Question", name: "What does 1202 Request produce that ChatGPT does not?", acceptedAnswer: { "@type": "Answer", text: "A structured issuer evidence request, a tracker for outstanding documents, an audit trail of who asked for what, and a CPA-ready dossier with cover page, evidence matrix, risk flags, and document index." } },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Compare</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">Why not just use ChatGPT?</h1>

        <DirectAnswer>
          ChatGPT can draft text, but 1202 Request provides a structured evidence workflow: issuer request letters,
          missing evidence checklist, tracker, audit trail, and CPA-ready dossier. The product is designed to organize
          facts for professional review, not to provide tax advice or determine QSBS eligibility.
        </DirectAnswer>

        <p className="mt-4 text-lg text-muted-foreground">
          ChatGPT can draft text. 1202 Request gives you a structured evidence workflow built around what a CPA or tax
          attorney actually needs to review for Section 1202.
        </p>

        <AISummary
          bullets={[
            "This page compares using ChatGPT vs. 1202 Request for Section 1202 evidence work.",
            "ChatGPT can help draft text but does not track evidence, log requests, or produce a CPA-ready dossier.",
            "1202 Request adds a stock-fact-aware checklist, issuer request letters, status tracker, audit trail, and dossier export.",
            "ChatGPT may be enough for a one-off letter; a structured packet is better when a CPA will review the file.",
            "Neither product provides tax advice or determines QSBS eligibility — that is your CPA or tax attorney.",
          ]}
        />


        <section className="mt-10 grid gap-4">
          {[
            { t: "Stock-fact-aware checklist", d: "We generate a missing-evidence checklist from your role, acquisition method, stock type, and expected event — not a generic list." },
            { t: "Professional issuer request letters", d: "Initial request, polite follow-up, and CPA handoff templates with the exact factual records to ask for." },
            { t: "Request tracker", d: "Status for each evidence item: missing, requested, received, unavailable, needs review." },
            { t: "Audit trail", d: "Every step is logged so your CPA can see what was asked, sent, and received." },
            { t: "CPA-ready dossier", d: "A print-ready packet with cover page, summary, evidence matrix, risk flags, and document index." },
            { t: "Built for compliance", d: "No eligibility certification. No guaranteed tax outcome. Designed for professional review." },
          ].map((b) => (
            <div key={b.t} className="qsbs-card p-5">
              <div className="text-sm font-medium">{b.t}</div>
              <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 space-y-6 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="text-xl font-medium text-foreground">What a blank chat box cannot do</h2>
            <p className="mt-2">
              A general-purpose chat model does not know what tranches you hold, how you acquired each one, or which
              issuer evidence is already on file. It can produce a generic letter, but it cannot track which items have
              been requested, which are still outstanding, and which were received. It also cannot produce a packet a
              reviewing professional can absorb in one sitting.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-medium text-foreground">What an issuer actually needs to see</h2>
            <p className="mt-2">
              Companies respond best to short, specific, non-adversarial requests with a clear list of items and a reason
              for the request. 1202 Request generates letters that match that shape, with the exact factual records a
              reviewing professional typically wants: C-corp status, original issuance records, gross-assets support at
              issuance, active business statement, and redemption history.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-medium text-foreground">What a CPA actually needs to see</h2>
            <p className="mt-2">
              A reviewing professional needs the factual record and the open questions, not a conclusion. The CPA-ready
              dossier exports a cover page, summary of facts, evidence matrix, risk flags, request log, and document
              index — organized for the person reviewing it, not for the shareholder who built it.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-medium text-foreground">What we will not claim</h2>
            <p className="mt-2">
              1202 Request does not provide tax, legal, accounting, investment, or securities advice and does not
              certify, determine, or opine on Section 1202 / QSBS eligibility. The product organizes facts and issuer
              evidence so a qualified professional can do the actual review.
            </p>
          </div>
        </section>

        <div className="mt-10 flex gap-2 flex-wrap">
          <Link to="/start" className="qsbs-btn qsbs-btn-primary">Build my evidence request</Link>
          <Link to="/demo" className="qsbs-btn qsbs-btn-ghost">View sample dossier</Link>
          <Link to="/checklist" className="qsbs-btn qsbs-btn-ghost">Free checklist</Link>
          <Link to="/pricing" className="qsbs-btn qsbs-btn-ghost">Pricing</Link>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          Related guides:{" "}
          <Link to="/qsbs-documentation-checklist" className="qsbs-link">documentation checklist</Link>{" · "}
          <Link to="/section-1202-issuer-evidence" className="qsbs-link">issuer evidence</Link>{" · "}
          <Link to="/qsbs-former-employee" className="qsbs-link">former employees</Link>{" · "}
          <Link to="/qsbs-tender-offer-checklist" className="qsbs-link">tender offer</Link>{" · "}
          <Link to="/section-1202-cpa-review-dossier" className="qsbs-link">CPA review dossier</Link>
        </div>

        <div className="mt-10"><Disclaimer /></div>
      </article>
    </PageShell>
  );
}
