import { createFileRoute } from "@tanstack/react-router";
import { SeoArticle } from "@/components/qsbs/SeoArticle";

const TITLE = "Section 1202 Issuer Evidence: What to Request From the Company";
const DESCRIPTION =
  "Learn what issuer-side evidence shareholders may need before CPA review for Section 1202, including C-corp status, stock issuance records, gross asset support, and redemption history.";

export const Route = createFileRoute("/section-1202-issuer-evidence")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://1202request.com/section-1202-issuer-evidence" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/section-1202-issuer-evidence" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://1202request.com/" },
            { "@type": "ListItem", position: 2, name: "Section 1202 issuer evidence", item: "https://1202request.com/section-1202-issuer-evidence" },
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
      title="Section 1202 Issuer Evidence: What to Request From the Company"
      intro="Shareholders cannot certify Section 1202 treatment on their own. The facts that matter — entity status, stock issuance, gross assets at issuance, active business use, redemption history — live on the company side. This guide outlines a structured way to ask for those records before a CPA or tax-attorney review. It is educational only and is not tax, legal, or accounting advice."
      sections={[
        { h: "Who this page is for", p: "Founders, current and former employees, advisors, angel investors, secondary buyers, family-office staff, and the CPAs supporting them. If you hold private C-corp stock and a sale, tender offer, secondary, acquisition, or tax filing is on the horizon, this is the kind of factual record a professional will typically want to review." },
        { h: "Why shareholders cannot answer this themselves", p: "Section 1202 analysis depends on factual records about the company at specific points in time. Shareholders rarely have access to board consents, balance sheets at issuance, or a complete redemption history. Asking the company directly — politely and in writing — is the only reliable way to assemble these facts." },
        { h: "Confirm the company's status", p: "Ask for written confirmation that the company was a domestic C-corporation at the time of stock issuance and through the holding period, along with state-of-incorporation documentation. If the company converted from an LLC or partnership, request the conversion documents and the effective date." },
        { h: "Document the issuance", p: "Request board consents approving the issuance, the original stock certificate or book-entry confirmation, the entry in the stock ledger, and any contemporaneous capitalization context. For option exercises, request the option grant agreement, the exercise notice, and the 83(b) election with proof of timely filing." },
        { h: "Document how you acquired the stock", p: "Acquisition method matters. Direct issuances, option exercises, restricted stock grants, advisor or service grants, secondary purchases, gifts, and inheritances each have different documentation expectations. A professional will want to see records appropriate to the method used." },
        { h: "Gross assets support at and immediately after issuance", p: "Section 1202 has a gross-assets threshold tested at and immediately after issuance. Ask for an officer attestation that aggregate gross assets were below the applicable threshold, along with the balance sheets near the issuance date that support the attestation. Companies that grew quickly around your issuance date may need extra time to assemble this." },
        { h: "Active business support during the holding period", p: "Ask for a CFO, controller, or counsel memo describing how company assets were used in the active conduct of a qualified business during the relevant period, plus a description of business activities. Excluded industries — certain professional services, financial services, hospitality, farming, mineral extraction — should be flagged for the reviewing professional." },
        { h: "Redemption and repurchase history", p: "Significant redemptions in defined lookback windows around your issuance can affect a Section 1202 review. Ask for a list of any repurchase events near your acquisition date and, if none occurred, a short written confirmation to that effect." },
        { h: "Existing company QSBS memo", p: "If counsel has previously addressed Section 1202 for the company — for another shareholder, a fund investor, or in connection with a financing — ask for any prior memo or representation that addresses Section 1202 status. This often shortcuts the review significantly." },
        { h: "Sample issuer request wording", p: (
          <div className="space-y-3">
            <p>Subject: Request for factual records — CPA review of stock issuance.</p>
            <p>
              "I am preparing a factual file for my CPA's review of stock I hold in [Company]. Could you confirm a few items in writing and share the supporting records you already have on file? I am not asking the company for tax advice — only the factual records my advisor needs to review."
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Written confirmation of domestic C-corporation status at issuance and through the holding period.</li>
              <li>Board consent, stock certificate or book-entry confirmation, and stock ledger entry for my issuance.</li>
              <li>Officer attestation that aggregate gross assets at and immediately after issuance were below the applicable threshold, plus supporting balance sheets.</li>
              <li>Short statement on active business activity during the holding period.</li>
              <li>List of any company redemptions in the applicable lookback windows around my acquisition date.</li>
              <li>Any prior counsel memo addressing Section 1202.</li>
            </ul>
          </div>
        ) },
        { h: "What to send your CPA", p: "Hand the reviewing professional the factual record and the open questions, not a conclusion. A clean packet — cover page, summary of facts, evidence matrix, missing items, request log, and the documents themselves — saves billable hours and reduces last-minute surprises." },
        { h: "Frame requests neutrally", p: "Make clear you are not asking the company for tax advice. You are requesting factual records for review by your own tax advisor. Companies respond best to short, specific, non-adversarial requests with a clear list of items and a reason for the request." },
      ]}
      primaryCta={{ to: "/start", label: "Generate issuer request letter" }}
    />
  );
}
