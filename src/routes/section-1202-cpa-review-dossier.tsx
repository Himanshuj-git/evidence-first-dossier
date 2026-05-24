import { createFileRoute } from "@tanstack/react-router";
import { SeoArticle } from "@/components/qsbs/SeoArticle";

const TITLE = "CPA-Ready Section 1202 Review Dossier";
const DESCRIPTION =
  "Create a structured Section 1202 dossier with shareholder facts, issuer evidence, missing documents, CPA review questions, risk flags, and audit trail.";

export const Route = createFileRoute("/section-1202-cpa-review-dossier")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://1202request.com/section-1202-cpa-review-dossier" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/section-1202-cpa-review-dossier" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://1202request.com/" },
            { "@type": "ListItem", position: 2, name: "CPA review dossier", item: "https://1202request.com/section-1202-cpa-review-dossier" },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoArticle
      eyebrow="Reference"
      title="CPA-Ready Section 1202 Review Dossier"
      pageUrl="https://1202request.com/section-1202-cpa-review-dossier"
      shortAnswer="A CPA-ready Section 1202 dossier contains a cover page and disclaimer, shareholder and company facts, an evidence readiness summary, an evidence matrix, the issuer request log, risk flags and open questions, a document index and audit trail, and the supporting documents themselves — organized for the professional reviewing the file, not the shareholder who built it."
      summary={[
        "This page describes the structure of a CPA-ready Section 1202 review dossier.",
        "It is for shareholders preparing a factual file and for the professionals receiving it.",
        "It covers cover page, evidence matrix, request log, risk flags, document index, and audit trail.",
        "Use it as a reference for what to include and how to organize it for fast professional review.",
        "The dossier is a structured fact pack, not a tax opinion, legal opinion, or QSBS certification.",
      ]}
      faq={[
        { q: "What belongs in a CPA-ready Section 1202 dossier?", a: "A cover page with shareholder and issuer identity, shareholder and company facts, an evidence readiness summary, an evidence matrix by category, the issuer request log, risk flags phrased as open questions, a document index, an audit trail, and the supporting documents themselves." },
        { q: "Can I send the dossier to my CPA?", a: "Yes. The packet is designed to be exported and handed to a CPA or tax attorney through a secure channel they already use for sensitive files. Confirm receipt and keep the source files and audit trail." },
        { q: "Does the dossier determine QSBS eligibility?", a: "No. The dossier is a structured summary of user-provided facts and requested issuer evidence assembled to support professional review. It does not certify or determine Section 1202 / QSBS eligibility." },
        { q: "What if some evidence is still missing when I send it?", a: "Missing items are surfaced in the evidence readiness summary and the matrix, with the request log showing what was asked and when. Your CPA can decide whether to proceed or wait, and what alternative support may be appropriate." },
        { q: "Is this tax or legal advice?", a: "No. 1202 Request is an educational document-organization tool and does not provide tax, legal, accounting, investment, or securities advice." },
      ]}
      intro="A useful Section 1202 review packet is organized for the professional who will actually review it — not for the shareholder who built it. This guide describes the structure that tends to work best in practice. It is educational only and is not tax, legal, or accounting advice."
      sections={[
        { h: "Who this page is for", p: "Shareholders preparing a factual file for their CPA or tax attorney, and the professionals receiving those files. The goal is a packet a reviewing professional can absorb quickly and act on, without having to chase down loose attachments and clarifying questions." },
        { h: "Cover page and disclaimer", p: "Identifies the shareholder, the issuer, the date the packet was assembled, and clearly states that the dossier is not tax, legal, or investment advice and that the shareholder is not asserting Section 1202 eligibility — they are presenting facts for the reviewing professional to evaluate." },
        { h: "Shareholder and company facts", p: "Shareholder legal name and type (individual, trust, estate, partnership, SPV). Acquisition date and method for each tranche, share count, cost basis, and state of residency at acquisition. Company legal name, state of formation, date of incorporation, any LLC-to-C-corp conversion, and known C-corp status during the holding period." },
        { h: "Evidence readiness summary", p: "What evidence is received, what is partial, what is missing, and what is flagged for professional review — without making any eligibility claim. The summary should be a single page or section the reviewer can read in under a minute to understand where the file stands." },
        { h: "Evidence matrix", p: "A row per evidence item with category (C-corp status, original issuance, acquisition method, gross assets, active business, redemption history, cap table, prior counsel memo), description, status (missing, requested, received, reviewed), source (issuer letter, board consent, ledger, etc.), and date." },
        { h: "Issuer request log", p: "Copies of the initial request letter, any follow-up, and the CPA handoff email, with status updates and dates. This is what turns a folder of attachments into a defensible record of who asked for what and when." },
        { h: "Risk flags and open questions", p: "Items the reviewing professional should examine before relying on any analysis — phrased as questions, not conclusions. Examples: 'Company converted from LLC in 2019 — please review effect on issuance date,' or 'Officer attestation on gross assets references aggregate value rather than tax basis — please confirm appropriate measure.'" },
        { h: "Document index and audit trail", p: "A clean reference list of every supporting document with a stable label and a short description, plus a timeline of every request, response, and status change. The reviewing professional should be able to find any referenced document in under ten seconds." },
        { h: "Supporting documents", p: "The actual records — board consents, stock certificates, ledger entries, balance sheets, officer attestations, prior memos. Order them to match the evidence matrix and label each one consistently with the index." },
        { h: "What the reviewing professional needs to decide", p: "A short list of the decisions you are asking the reviewer to make: which acquisition date to use for holding-period purposes, how to treat any conversion or recap events, whether any business activities raise excluded-industry concerns, and whether the gross-assets and active-business evidence is sufficient." },
        { h: "What this packet is not", p: "Not a legal opinion, not a tax opinion, not a valuation, not an investment recommendation, and not a certification of Section 1202 or QSBS eligibility. It is a structured summary of user-provided facts and requested issuer evidence assembled to support professional review." },
        { h: "Hand-off best practices", p: "Deliver the packet through a channel your CPA or tax attorney already uses for sensitive files. Avoid emailing supporting documents as attachments to public addresses. Confirm receipt, and keep the source files and audit trail in case the reviewer asks for clarifications." },
      ]}
      primaryCta={{ to: "/demo", label: "View sample dossier" }}
    />
  );
}
