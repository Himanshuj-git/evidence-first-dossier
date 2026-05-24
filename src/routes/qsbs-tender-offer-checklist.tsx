import { createFileRoute } from "@tanstack/react-router";
import { SeoArticle } from "@/components/qsbs/SeoArticle";

const TITLE = "QSBS Tender Offer Checklist for Startup Shareholders";
const DESCRIPTION =
  "Prepare issuer evidence, stock facts, missing documents, and CPA review questions before a tender offer, secondary sale, or acquisition under Section 1202.";

export const Route = createFileRoute("/qsbs-tender-offer-checklist")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://1202request.com/qsbs-tender-offer-checklist" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/qsbs-tender-offer-checklist" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://1202request.com/" },
            { "@type": "ListItem", position: 2, name: "Tender offer checklist", item: "https://1202request.com/qsbs-tender-offer-checklist" },
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
      eyebrow="For sellers"
      title="QSBS Tender Offer Checklist for Startup Shareholders"
      intro="When a tender offer, secondary sale, or acquisition window opens, you usually have weeks — not months — to assemble the factual records a CPA or tax attorney needs to review for Section 1202. Use this checklist to get ahead. It is educational only and is not tax, legal, or accounting advice."
      sections={[
        { h: "Who this page is for", p: "Current and former employees, founders, angel investors, advisors, and secondary holders of private C-corp stock who expect a liquidity event and want their factual file in order before the close." },
        { h: "Why timing matters", p: "Tender offers and secondary windows typically have hard deadlines for election, response, or settlement. Issuer-side records often take one to three weeks to assemble, and your CPA needs time to review them before you decide whether and how to participate. Starting early is the single biggest predictor of a clean review." },
        { h: "Before the window opens", p: "Confirm your acquisition date and method, locate option exercise records, pull 83(b) confirmations, and gather any cap-table snapshots you saved. These are the items you can recover on your own without waiting for the company. Old email folders are usually the most efficient source." },
        { h: "Map every tranche", p: "If you acquired stock in more than one event — original grant, additional exercises, refresher grants, secondary purchases — list each tranche separately with its date, method, share count, cost basis, and any prior transfers. A reviewing professional will look at each tranche on its own, not in aggregate." },
        { h: "Request from the issuer immediately", p: (
          <ul className="list-disc pl-5 space-y-1">
            <li>Written C-corporation status at issuance and through the holding period.</li>
            <li>Stock ledger entry, board consent, and stock certificate or book-entry confirmation for each tranche.</li>
            <li>Officer attestation on gross assets at and immediately after issuance, plus supporting balance sheets.</li>
            <li>Short statement on active business activity during the relevant period.</li>
            <li>List of any company redemptions in the applicable lookback windows around your acquisition date.</li>
            <li>Any prior counsel memo addressing Section 1202.</li>
          </ul>
        ) },
        { h: "Identify the right contact", p: "CFO, controller, head of finance, head of people operations, or general counsel. In a tender offer, the company often designates a specific contact for shareholder questions — start there. If the company has been acquired, the acquirer's finance or legal team is the usual starting point." },
        { h: "Track responses", p: "Use a structured tracker so you can show your CPA exactly what was asked, what was received, what is partial, and what is still outstanding. A clean audit trail also helps if any single item needs to be revisited later." },
        { h: "Common documentation gaps under deadline pressure", p: "Missing 83(b) proof of filing, no written C-corp confirmation, no signed cap-table extract, no gross-assets support at issuance, and no statement on redemption history. These are the items most likely to delay a review when a window is open." },
        { h: "Excluded-industry questions", p: "Certain industries — some professional services, financial services, hospitality, farming, mineral extraction — raise specific questions under Section 1202. If the company's activities are in or near one of these areas, flag it for the reviewing professional early so it does not surface at the last minute." },
        { h: "Tender-specific facts to capture", p: "The tender offer terms (price per share, election deadline, expected close date), the participation cap if any, the company's representations to participants, and any tax withholding mechanics described in the offer documents. These shape what the reviewing professional needs to see before you decide whether to participate." },
        { h: "Hand a clean packet to your CPA", p: "A CPA-ready dossier — cover page, summary of facts, evidence matrix, risk flags, request log, and the documents themselves — saves billable hours and reduces last-minute surprises. The goal is a packet your CPA can review in one sitting, not a folder of loose attachments." },
        { h: "After the window closes", p: "Keep the dossier and the audit trail. Tax filings related to the transaction will reference the same facts later. A well-organized packet at tender time becomes the foundation for the tax-filing review the following year." },
      ]}
      primaryCta={{ to: "/start", label: "Prepare request packet" }}
    />
  );
}
