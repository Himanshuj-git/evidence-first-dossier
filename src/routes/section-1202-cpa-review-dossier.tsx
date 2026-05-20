import { createFileRoute } from "@tanstack/react-router";
import { SeoArticle } from "@/components/qsbs/SeoArticle";

export const Route = createFileRoute("/section-1202-cpa-review-dossier")({
  head: () => ({
    meta: [
      { title: "CPA-Ready Section 1202 Review Dossier" },
      { name: "description", content: "What a CPA-ready Section 1202 review dossier looks like: cover page, evidence matrix, risk flags, request log, and document index." },
      { property: "og:title", content: "CPA-Ready Section 1202 Review Dossier" },
      { property: "og:description", content: "What a professional review packet should contain." },
      { property: "og:url", content: "https://1202request.com/section-1202-cpa-review-dossier" },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/section-1202-cpa-review-dossier" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoArticle
      eyebrow="Reference"
      title="CPA-Ready Section 1202 Review Dossier"
      intro="A useful Section 1202 review packet is organized for the professional who will actually review it. Here is the structure we use."
      sections={[
        { h: "Cover page and disclaimer", p: "Identifies the shareholder, the issuer, and clearly states that the dossier is not tax, legal, or investment advice." },
        { h: "Shareholder and company facts", p: "Acquisition date, role, security type, state of incorporation, known C-corp status." },
        { h: "Evidence readiness summary", p: "What evidence is received, what is missing, and what is flagged for professional review — without making any eligibility claim." },
        { h: "Issuer request log", p: "Copies of the request letter, follow-up, and CPA handoff email, with status updates and dates." },
        { h: "Risk flags and open questions", p: "Items the CPA should examine before relying on any analysis — phrased as questions, not conclusions." },
        { h: "Document index and audit trail", p: "A clean reference list and a timeline of every request, response, and status change." },
      ]}
      primaryCta={{ to: "/demo", label: "View sample dossier" }}
    />
  );
}
