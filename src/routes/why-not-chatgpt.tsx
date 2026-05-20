import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";

export const Route = createFileRoute("/why-not-chatgpt")({
  head: () => ({
    meta: [
      { title: "Why not just use ChatGPT? — 1202 Request" },
      { name: "description", content: "ChatGPT can draft text. 1202 Request gives you a structured issuer evidence workflow: request letters, tracker, CPA-ready dossier, and audit trail." },
      { property: "og:title", content: "Why not just use ChatGPT?" },
      { property: "og:description", content: "Structured Section 1202 evidence workflow vs. a blank chat box." },
      { property: "og:url", content: "https://1202request.com/why-not-chatgpt" },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/why-not-chatgpt" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Can ChatGPT prepare my QSBS evidence?", acceptedAnswer: { "@type": "Answer", text: "ChatGPT can draft a letter, but it does not give you an evidence checklist tailored to your stock facts, a request tracker, an audit trail, or a CPA-ready dossier export." } },
          { "@type": "Question", name: "Does 1202 Request give tax advice?", acceptedAnswer: { "@type": "Answer", text: "No. It is an educational document-organization tool. All Section 1202 determinations should be reviewed by a qualified tax professional." } },
        ],
      }),
    }],
  }),
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Compare</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">Why not just use ChatGPT?</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          ChatGPT can draft text. 1202 Request gives you a structured evidence workflow built around what your CPA
          actually needs to review.
        </p>

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

        <div className="mt-10 flex gap-2 flex-wrap">
          <Link to="/start" className="qsbs-btn qsbs-btn-primary">Build my evidence request</Link>
          <Link to="/demo" className="qsbs-btn qsbs-btn-ghost">View sample dossier</Link>
          <Link to="/checklist" className="qsbs-btn qsbs-btn-ghost">Free checklist</Link>
        </div>

        <div className="mt-10"><Disclaimer /></div>
      </article>
    </PageShell>
  );
}
