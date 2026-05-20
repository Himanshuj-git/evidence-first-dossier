import { createFileRoute } from "@tanstack/react-router";
import { SeoArticle } from "@/components/qsbs/SeoArticle";

export const Route = createFileRoute("/qsbs-documentation-checklist")({
  head: () => ({
    meta: [
      { title: "QSBS Documentation Checklist for Section 1202 Review" },
      { name: "description", content: "A practical checklist of issuer-side documentation that may need professional review for a Section 1202 / QSBS analysis." },
      { property: "og:title", content: "QSBS Documentation Checklist for Section 1202 Review" },
      { property: "og:description", content: "Issuer evidence a CPA may want to review for QSBS." },
      { property: "og:url", content: "https://1202request.com/qsbs-documentation-checklist" },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/qsbs-documentation-checklist" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoArticle
      eyebrow="Guide"
      title="QSBS Documentation Checklist for Section 1202 Review"
      intro="Section 1202 analysis turns on facts about the issuer and the stock — not on a yes/no answer. This checklist outlines categories of records a CPA or tax attorney may want to review. It is not tax advice."
      sections={[
        { h: "Why issuer-side evidence matters", p: "Shareholders frequently lack the company-side records needed for professional review. Asking for the right factual documentation up front avoids weeks of back-and-forth." },
        { h: "Categories to gather", p: (
          <ul className="list-disc pl-5 space-y-1">
            <li>C-corporation status confirmation at issuance and during the holding period.</li>
            <li>Original stock issuance records (board consents, stock certificates, ledger entries).</li>
            <li>Acquisition documents (option exercise records, 83(b) elections, restricted stock agreements, secondary purchase records).</li>
            <li>Cap table or ownership confirmation.</li>
            <li>Gross assets support at the time of issuance.</li>
            <li>Active business support during the relevant period.</li>
            <li>Redemption or repurchase history around issuance.</li>
            <li>Any existing QSBS memo or counsel-reviewed materials.</li>
          </ul>
        ) },
        { h: "Use it as a request, not a verdict", p: "Send these requests to the issuer through your existing contact. Then route the responses to your CPA or tax attorney for review." },
      ]}
      primaryCta={{ to: "/start", label: "Build my evidence request" }}
    />
  );
}
