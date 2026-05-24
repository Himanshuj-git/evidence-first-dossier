import { createFileRoute } from "@tanstack/react-router";
import { SeoArticle } from "@/components/qsbs/SeoArticle";

const TITLE = "QSBS Documentation Checklist for Section 1202 Review";
const DESCRIPTION =
  "A practical checklist of stock records, issuer documents, gross asset support, redemption history, and CPA review questions for Section 1202 / QSBS documentation.";

export const Route = createFileRoute("/qsbs-documentation-checklist")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://1202request.com/qsbs-documentation-checklist" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/qsbs-documentation-checklist" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://1202request.com/" },
            { "@type": "ListItem", position: 2, name: "QSBS documentation checklist", item: "https://1202request.com/qsbs-documentation-checklist" },
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
      eyebrow="Guide"
      title="QSBS Documentation Checklist for Section 1202 Review"
      pageUrl="https://1202request.com/qsbs-documentation-checklist"
      shortAnswer="A QSBS documentation checklist helps startup shareholders organize the issuer records, stock acquisition documents, and open CPA questions that may be relevant to Section 1202 review. The checklist should not say whether the shareholder qualifies. It should identify what evidence is available, what is missing, and what should be reviewed by a qualified tax professional."
      summary={[
        "This page is a practical checklist of documentation that may be relevant to Section 1202 / QSBS review.",
        "It is for startup shareholders and the CPAs who support them, not a tax advice or eligibility tool.",
        "It covers shareholder facts, issuer records, gross asset support, active business support, and redemption history.",
        "Use it to identify what you have, what is missing, and what to request from the company.",
        "1202 Request does not determine QSBS eligibility — always confirm with a qualified tax professional.",
      ]}
      faq={[
        { q: "What documents may be needed for QSBS review?", a: "Typically: shareholder identity and acquisition records, the company's C-corp status confirmation, original stock issuance evidence, gross asset support at and immediately after issuance, active business support during the holding period, redemption history, and a cap-table extract. The exact list depends on the holding and is determined by your CPA or tax attorney." },
        { q: "Does 1202 Request determine whether I qualify for QSBS?", a: "No. 1202 Request does not determine or certify Section 1202 / QSBS eligibility. It organizes facts and requested issuer evidence so a qualified tax professional can perform the review." },
        { q: "What if my company cannot provide some of the evidence?", a: "Items the company cannot provide are flagged as missing in your dossier, with a full audit trail of what was requested and when. Your CPA can then decide what alternative support, if any, may be available." },
        { q: "Can I send the dossier to my CPA?", a: "Yes. The paid packet is designed to be exported and handed to a CPA or tax attorney, with a cover page, factual summary, evidence matrix, missing items, document index, and audit trail." },
        { q: "Is this tax or legal advice?", a: "No. 1202 Request is an educational document-organization tool. It does not provide tax, legal, accounting, investment, or securities advice." },
      ]}
      intro="Section 1202 analysis turns on factual records about the issuer and the stock — not on a yes/no answer a shareholder can give themselves. This guide walks through the categories of documentation a CPA or tax attorney may want to review. It is educational only and is not tax, legal, or accounting advice."
      sections={[
        { h: "Who this checklist is for", p: "Founders, early employees, former employees, advisors, angel investors, family-office staff, fund operators, and the CPAs supporting them. If you hold or once held private C-corp stock and a sale, tender offer, secondary, acquisition, IPO, or tax filing is on the horizon, this is the kind of paperwork a professional will typically ask to see before any Section 1202 analysis." },
        { h: "Why issuer-side evidence matters", p: "Most facts that drive a Section 1202 review live on the company side — entity status at issuance, the stock ledger, gross assets at the time of issuance, active business activity, redemption history. Shareholders almost never have all of this. Asking for the right factual records up front, in writing, saves weeks of back-and-forth and gives the reviewing professional a clean record to work from." },
        { h: "Shareholder facts to gather first", p: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Legal name and shareholder type (individual, trust, estate, partnership, SPV).</li>
            <li>Acquisition date(s) and method (direct issuance, option exercise, restricted stock grant, secondary purchase, gift, inheritance).</li>
            <li>Number of shares and your cost basis for each tranche.</li>
            <li>State of residency at the time of acquisition.</li>
            <li>Any prior transfers, gifts to trusts, or movement between entities you control.</li>
          </ul>
        ) },
        { h: "C-corporation status evidence", p: "Ask the issuer for written confirmation that the company was a domestic C-corporation at the time of stock issuance and through the holding period, plus state-of-incorporation documentation and any LLC-to-C-corp conversion records. This is one of the most common gaps for stock acquired during or shortly after a conversion." },
        { h: "Original issuance records", p: "Board consents approving issuance, the original stock certificate or book-entry confirmation, the entry in the stock ledger, and the contemporaneous capitalization context. For option exercises, ask for the option grant agreement, the exercise notice, and any 83(b) election with proof of timely filing." },
        { h: "Acquisition-method evidence", p: "How you acquired the stock changes what evidence a reviewer typically wants. Exercises require the grant and exercise records. Restricted stock requires the purchase agreement and 83(b). Secondary purchases require the transfer documents and any issuer consent. Advisor or service grants require the grant agreement and any related board action." },
        { h: "Gross assets support at issuance", p: "Section 1202 has a gross-assets threshold tested at and immediately after issuance. Ask the issuer for an officer attestation that aggregate gross assets were below the applicable threshold and for the balance sheets near the issuance date that support it. Companies that grew quickly around your issuance date often need extra time to pull this." },
        { h: "Active business support", p: "Ask for a CFO, controller, or counsel memo describing how company assets were used in the active conduct of a qualified business during the relevant period, plus a short description of business activities. Excluded industries — certain professional services, financial services, hospitality, farming, mineral extraction — should be flagged for the reviewing professional to evaluate." },
        { h: "Redemption and repurchase history", p: "Significant company redemptions in defined lookback windows around your issuance can affect a Section 1202 review. Ask for a list of any repurchase events near your acquisition date and, if none occurred, a short written confirmation to that effect." },
        { h: "Cap-table or ownership confirmation", p: "Request an issuer-signed cap-table letter or extract showing your original issuance and any subsequent issuances or transfers affecting your holding. A screenshot from a cap-table tool is fine as a starting point; a signed extract is what most professionals will want to see." },
        { h: "Existing QSBS memo or counsel-reviewed materials", p: "If the company has previously had counsel address Section 1202 — for example for another shareholder, for a fund investor, or in connection with a financing — ask for any prior memo, opinion, or representation that addresses Section 1202 status. This often shortcuts the review significantly." },
        { h: "Common documentation gaps", p: "Most stalled reviews come from a small set of recurring gaps: no written C-corp confirmation, missing 83(b) proof of filing, no gross-assets support at issuance, no signed cap-table extract, and no statement on redemption history. Identifying these up front lets you ask the issuer one clean, consolidated time instead of three or four times." },
        { h: "What to discuss with your CPA or tax attorney", p: "Bring the factual record and the open questions, not conclusions. Useful prompts include: which acquisition date should be used for holding-period purposes, how any conversion or recap events should be treated, whether any of the company's activities raise excluded-business concerns, and what additional contemporaneous evidence would strengthen the file." },
        { h: "Use this as a request, not a verdict", p: "Send these requests to the issuer through your existing contact, route the responses to your CPA or tax attorney for review, and keep an audit trail of who asked for what and when. 1202 Request does not determine or certify Section 1202 eligibility — it organizes the factual record a qualified professional needs to do that work." },
      ]}
      primaryCta={{ to: "/start", label: "Build my evidence request" }}
    />
  );
}
