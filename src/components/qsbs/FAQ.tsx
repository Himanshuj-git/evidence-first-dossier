import { useState } from "react";

export interface FAQItem { q: string; a: string }

export function FAQ({ items, title = "Frequently asked questions" }: { items: FAQItem[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-medium tracking-tight">{title}</h2>
      <div className="mt-6 qsbs-card divide-y divide-border">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <button
              key={it.q}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full text-left p-5 hover:bg-muted/40 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="font-medium text-foreground">{it.q}</div>
                <span className="text-muted-foreground text-sm tabular-nums shrink-0">{isOpen ? "−" : "+"}</span>
              </div>
              {isOpen && <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.a}</p>}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export const SHARED_FAQ: FAQItem[] = [
  {
    q: "Why not just use ChatGPT?",
    a: "ChatGPT can help draft text, but 1202 Request gives you a structured Section 1202 evidence workflow: issuer request letters, missing evidence checklist, document tracker, CPA-ready dossier, audit trail, and role-specific review views. It is designed to organize facts for professional review, not give tax advice.",
  },
  {
    q: "Does this determine whether I qualify for QSBS?",
    a: "No. 1202 Request does not determine or certify Section 1202 / QSBS eligibility. It helps you organize the facts and request the issuer evidence a qualified tax professional will need to make that determination.",
  },
  {
    q: "Is this tax or legal advice?",
    a: "No. 1202 Request is an educational document-organization tool. It does not provide tax, legal, accounting, investment, or securities advice. Always review your facts with a qualified CPA or tax attorney.",
  },
  {
    q: "Who should use this?",
    a: "Startup founders, former and current employees with exercised options, angel investors, advisors paid in equity, and CPAs or tax attorneys preparing client files for Section 1202 review.",
  },
  {
    q: "What documents should I request from the company?",
    a: "Typically: confirmation of C-corp status throughout the holding period, gross-asset attestation at and immediately after issuance, active business support, redemption / repurchase history, cap-table extract showing original issuance, and any issuer or counsel memo addressing Section 1202.",
  },
  {
    q: "Can I send this to my CPA?",
    a: "Yes. The paid packet is designed to be exported and handed to your CPA or tax attorney. It includes a factual summary, evidence matrix, missing items, request log, and audit trail.",
  },
  {
    q: "Can I use this before a tender offer or acquisition?",
    a: "Yes — that is one of the most common use cases. Starting earlier gives the company more time to produce records and gives your CPA more time to review.",
  },
  {
    q: "Is my company required to provide these records?",
    a: "It depends on your stockholder rights, the company's policies, and applicable state law. 1202 Request helps you ask clearly; it does not compel the company to respond.",
  },
  {
    q: "What happens if the company cannot provide evidence?",
    a: "Your dossier will flag those items as missing and log every request you made. Your CPA can then assess what alternative support, if any, may be available.",
  },
  {
    q: "Is the demo real?",
    a: "No. The sample dossier uses fictional facts for a fictional company. It is for illustration only and is not tax advice.",
  },
  {
    q: "What does the $49 packet include?",
    a: "One holding dossier with: professional issuer request letter, follow-up template, evidence checklist, missing-document tracker, CPA-ready review summary, document index, risk flags and open questions, print/export-ready dossier, and an audit trail of request steps.",
  },
];
