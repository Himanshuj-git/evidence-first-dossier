import { createFileRoute } from "@tanstack/react-router";
import { SeoArticle } from "@/components/qsbs/SeoArticle";

export const Route = createFileRoute("/qsbs-tender-offer-checklist")({
  head: () => ({
    meta: [
      { title: "QSBS Evidence Checklist Before a Tender Offer or Secondary Sale" },
      { name: "description", content: "Tender offers move fast. Get your Section 1202 / QSBS issuer evidence organized before the close so your CPA can review on time." },
      { property: "og:title", content: "QSBS Evidence Before a Tender or Secondary" },
      { property: "og:description", content: "Organize Section 1202 evidence before the close." },
      { property: "og:url", content: "https://1202request.com/qsbs-tender-offer-checklist" },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/qsbs-tender-offer-checklist" }],
  }),
  component: Page,
});

function Page() {
  return (
    <SeoArticle
      eyebrow="For sellers"
      title="QSBS Evidence Checklist Before a Tender Offer or Secondary Sale"
      intro="When a tender offer or secondary sale window opens, you usually have weeks — not months — to assemble evidence for your CPA. Use this checklist to get ahead."
      sections={[
        { h: "Before the window opens", p: "Confirm your acquisition date and method, locate exercise records, and gather any prior cap-table snapshots. These are the easiest items to recover under time pressure." },
        { h: "Request from the issuer immediately", p: "C-corp status confirmation, stock ledger entry, gross assets support at issuance, active business support, and redemption history around your acquisition date." },
        { h: "Track responses", p: "Use a status tracker so you can show your CPA exactly what was asked, what was received, and what is still outstanding." },
        { h: "Hand a clean packet to your CPA", p: "A CPA-ready dossier — cover page, evidence matrix, risk flags, request log — saves billable hours and reduces last-minute surprises." },
      ]}
      primaryCta={{ to: "/start", label: "Prepare request packet" }}
    />
  );
}
