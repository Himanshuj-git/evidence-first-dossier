import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";

export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [
      { title: "Sources & methodology — 1202 Request" },
      { name: "description", content: "Public educational sources used by 1202 Request's Section 1202 rule scaffolding and evidence taxonomy." },
      { property: "og:title", content: "Sources & methodology — 1202 Request" },
      { property: "og:description", content: "Public educational sources used by 1202 Request's rule scaffolding." },
      { property: "og:url", content: "https://1202request.com/sources" },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/sources" }],
  }),
  component: SourcesPage,
});

const SOURCES = [
  { title: "26 U.S. Code § 1202 (Legal Information Institute)", url: "https://www.law.cornell.edu/uscode/text/26/1202", note: "Primary statutory text." },
  { title: "Carta — QSBS guide", url: "https://carta.com/sg/en/learn/startups/tax-planning/qsbs/", note: "Industry educational guide." },
  { title: "Carta — QSBS calculator overview", url: "https://carta.com/learn/resources/qsbs-calculator/", note: "Reference tool — different scope from this product." },
  { title: "Plante Moran — Section 1202 documentation challenge", url: "https://www.plantemoran.com/explore-our-thinking/insight/2023/07/section-1202-proactively-protect-your-qsbs-exemption", note: "On the importance of proactive evidence." },
  { title: "SEC Investor.gov — Investment adviser definition", url: "https://www.investor.gov/introduction-investing/investing-basics/glossary/investment-adviser", note: "Why this product is not an investment adviser." },
  { title: "Cake Equity — QSBS feature", url: "https://www.cakeequity.com/features/qsbs", note: "Issuer-side product example." },
];

function SourcesPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-3xl font-medium">Sources & methodology</h1>
        <p className="mt-2 text-muted-foreground">
          1202 Request's rule scaffolding is built from public educational sources and the Internal Revenue Code.
          It is not legal, tax, accounting, or investment advice.
        </p>

        <h2 className="mt-10 text-lg font-medium">Methodology, not advice</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          We translate Section 1202 concepts into a checklist of common evidence requirements. Output statuses
          (consistent / missing / red flag / not applicable) are derived from the user's own answers and entered
          documentation. The product never determines QSBS eligibility, never recommends a transaction, and never
          replaces a CPA or tax attorney. The readiness score reflects evidence completeness only.
        </p>

        <h2 className="mt-10 text-lg font-medium">Reference links</h2>
        <ul className="mt-4 space-y-3">
          {SOURCES.map((s) => (
            <li key={s.url} className="qsbs-card p-4">
              <a href={s.url} target="_blank" rel="noreferrer" className="qsbs-link font-medium">{s.title}</a>
              <p className="text-sm text-muted-foreground mt-1">{s.note}</p>
              <div className="text-xs text-muted-foreground mt-1 break-all">{s.url}</div>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-lg font-medium">2025 boundary note</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The applicable gross-asset threshold and benefit cap differ for stock issued on or before vs. after
          July 4, 2025. The rule engine is date-aware and surfaces this; verify all thresholds with your tax advisor.
        </p>

        <div className="mt-10"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
