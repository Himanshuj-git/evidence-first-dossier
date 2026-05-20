import { createFileRoute } from "@tanstack/react-router";
import { SeoArticle } from "@/components/qsbs/SeoArticle";

export const Route = createFileRoute("/section-1202-issuer-evidence")({
  head: () => ({
    meta: [
      { title: "What Issuer Evidence May Be Needed for Section 1202 Review" },
      { name: "description", content: "An overview of the issuer-side records a CPA or tax attorney may want to review when considering Section 1202 / QSBS treatment." },
      { property: "og:title", content: "Section 1202 Issuer Evidence" },
      { property: "og:description", content: "Issuer-side records relevant to a Section 1202 review." },
      { property: "og:url", content: "https://1202request.com/section-1202-issuer-evidence" },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/section-1202-issuer-evidence" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoArticle
      eyebrow="Guide"
      title="What Issuer Evidence May Be Needed for Section 1202 Review"
      intro="Shareholders cannot certify Section 1202 treatment on their own. Most facts that matter live with the company. Here is a structured way to ask for them."
      sections={[
        { h: "Confirm the company's status", p: "Ask for written confirmation that the company was a domestic C-corporation at the time of stock issuance and through the holding period, along with any state-of-incorporation documentation." },
        { h: "Document the issuance", p: "Request board consents, stock certificates, the stock ledger entry, and the original capitalization context for your shares." },
        { h: "Document how you acquired the stock", p: "Whether you exercised options, purchased restricted stock, received an advisor grant, or purchased on a secondary, the acquisition method affects what evidence a professional will want to see." },
        { h: "Support gross assets and active business facts", p: "These are highly fact-specific. Ask the company whether it can share contemporaneous evidence supporting gross asset thresholds at issuance and active business activity during the holding period." },
        { h: "Frame requests neutrally", p: "Make clear you are not asking for tax advice from the company. You are requesting factual records for review by your tax advisor." },
      ]}
      primaryCta={{ to: "/start", label: "Generate issuer request letter" }}
    />
  );
}
