import { createFileRoute } from "@tanstack/react-router";
import { SeoArticle } from "@/components/qsbs/SeoArticle";

const TITLE = "QSBS Evidence Checklist for Former Startup Employees";
const DESCRIPTION =
  "Former startup employee? Organize option exercise records, 83(b) evidence, cap-table confirmation, and issuer requests for Section 1202 review before a tender offer or sale.";

export const Route = createFileRoute("/qsbs-former-employee")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://1202request.com/qsbs-former-employee" },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/qsbs-former-employee" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://1202request.com/" },
            { "@type": "ListItem", position: 2, name: "Former employee checklist", item: "https://1202request.com/qsbs-former-employee" },
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
      eyebrow="For former employees"
      title="Section 1202 Evidence Checklist for Former Startup Employees"
      intro="If you exercised options or bought stock at a startup years ago, you probably do not have the issuer-side records a CPA will want to review. The good news: most companies will respond to a clear, factual, non-adversarial request. This guide walks through what to gather yourself and what to ask the company for. It is educational only and is not tax, legal, or accounting advice."
      sections={[
        { h: "Who this page is for", p: "Former engineers, designers, operators, advisors, and executives who hold private C-corp stock from a previous employer and now face a tender offer, secondary sale, acquisition, IPO, or tax filing. It is also useful for CPAs supporting those clients." },
        { h: "Why former employees get stuck", p: "After you leave a company, your access to cap-table tools, internal documents, and finance staff usually disappears. The records most relevant to a Section 1202 review — board consents, the stock ledger, balance sheets at issuance, redemption history — sit with the company. You have to ask for them." },
        { h: "Start with what you actually have", p: "Pull together what you saved at the time: option grant agreements, exercise notices, 83(b) confirmations, restricted stock agreements, cap-table screenshots, and any wire or payment confirmations for the exercise price. Old email folders are usually the best source — search for the company name, your stock plan administrator, and 'option' or '83(b)'." },
        { h: "Reconstruct the timeline", p: "Write down, as precisely as you can: your grant date, vesting start date, exercise date, the share count, the exercise price, your cost basis, and the company's entity status at the time. Note any conversions you remember (LLC to C-corp) and any moves between entities you control (transfers into a trust, for example)." },
        { h: "What only the company can confirm", p: "Written C-corporation status at issuance and through the holding period, the entry in the stock ledger, an officer attestation on gross assets at issuance, a short statement on active business use, and a list of any redemptions in the applicable lookback windows. These are the items a reviewing CPA or tax attorney typically wants to see." },
        { h: "Identify the right contact", p: "The most reliable contact is usually the CFO, controller, head of finance, head of people operations, or general counsel. If the company has been acquired, the acquirer's finance or legal team is the usual starting point. For very early-stage companies, the founder or chief of staff often handles these requests." },
        { h: "Be specific and non-adversarial", p: "Companies respond best to short, factual requests with a clear list of items, a reason (CPA review), and a polite tone. Avoid framing it as a legal demand. Make clear you are not asking the company for tax advice — only the factual records your advisor needs to review." },
        { h: "Handle a slow or partial response", p: "Many companies respond in parts, not all at once. Track what was asked, what was received, and what is still outstanding. After a couple of weeks, a polite follow-up referencing the original request usually moves things along. Keep an audit trail you can hand to your CPA later." },
        { h: "Common documentation gaps for former employees", p: "Missing 83(b) proof of filing, no written C-corp confirmation, no signed cap-table extract, no gross-assets support at issuance, and no statement on redemption history. Identify these gaps before you send the request so you can ask the company once, cleanly, instead of three or four times." },
        { h: "Special situations", p: "If you have moved shares into a trust or family entity, hand your CPA the transfer documents and dates. If your stock plan was administered by a third party (Carta, Shareworks, Pulley), grab any exports you still have access to. If the company was acquired, ask for the merger consideration breakdown for your shares." },
        { h: "What to discuss with your CPA or tax attorney", p: "Bring the factual record and the open questions, not conclusions. Useful prompts include: which acquisition date should be used for holding-period purposes, how any company conversion or recap events should be treated, whether any of the company's activities raise excluded-business concerns, and what additional contemporaneous evidence would strengthen the file." },
        { h: "Move quickly when a window opens", p: "Tender offers and secondary windows often close in weeks, not months. If a window is on the horizon, send the issuer request now — even before you decide whether to sell — so your CPA has time to review the file before any decision deadline." },
      ]}
      primaryCta={{ to: "/start", label: "Start one holding packet" }}
    />
  );
}
