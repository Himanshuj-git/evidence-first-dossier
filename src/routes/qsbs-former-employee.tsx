import { createFileRoute } from "@tanstack/react-router";
import { SeoArticle } from "@/components/qsbs/SeoArticle";

export const Route = createFileRoute("/qsbs-former-employee")({
  head: () => ({
    meta: [
      { title: "Section 1202 Evidence Checklist for Former Startup Employees" },
      { name: "description", content: "Former employees often lack issuer-side records. Here is how to request the Section 1202 / QSBS evidence your CPA may want to review." },
      { property: "og:title", content: "QSBS Evidence for Former Startup Employees" },
      { property: "og:description", content: "How to request issuer evidence after you have left the company." },
      { property: "og:url", content: "https://1202request.com/qsbs-former-employee" },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/qsbs-former-employee" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoArticle
      eyebrow="For former employees"
      title="Section 1202 Evidence Checklist for Former Startup Employees"
      intro="If you exercised options or bought stock at a startup years ago, you probably do not have the issuer-side records a CPA will want to review. The good news: most companies will respond to a clear factual request."
      sections={[
        { h: "Start with what you actually have", p: "Option exercise notices, 83(b) confirmation, grant agreements, and any cap-table screenshot you saved. These help anchor the timeline." },
        { h: "Then ask the company for the rest", p: "C-corp confirmation at issuance, the stock ledger entry, cap-table confirmation, gross assets support, active business support, and redemption history around your acquisition date." },
        { h: "Identify the right contact", p: "CFO, controller, head of finance, or general counsel. If the company has been acquired, the acquirer's finance team is the usual starting point." },
        { h: "Be specific and non-adversarial", p: "Companies respond best to short, factual requests with a clear list of items and a reason (CPA review). Avoid framing it as a legal demand." },
      ]}
      primaryCta={{ to: "/start", label: "Start one holding packet" }}
    />
  );
}
