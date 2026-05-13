import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, StatusChip, Disclaimer } from "@/components/qsbs/Layout";
import { useQsbs } from "@/lib/qsbs/store";
import { useMemo } from "react";

export const Route = createFileRoute("/company/dashboard")({
  head: () => ({ meta: [{ title: "Company request dashboard — 1202 Request" }] }),
  component: CompanyDashboard,
});

// Reusable issuer response templates — the company side of the workflow.
const RESPONSE_TEMPLATES = [
  { k: "c_corp", title: "C-corp status confirmation", body: "[Company] is and has been a domestic U.S. C corporation since [date]. No election to be taxed otherwise has been made during the relevant period." },
  { k: "gross_assets", title: "Gross asset evidence checklist", body: "Attached: balance-sheet excerpts immediately before and after the issuance dated [date]; aggregate gross assets reported below the applicable Section 1202 threshold." },
  { k: "active_business", title: "Active business support", body: "[Company]'s assets have been used in the active conduct of [trade/business]. At least 80% of assets by value have been used in the qualified trade or business throughout the relevant period." },
  { k: "redemption", title: "Redemption history response", body: "Within the lookback windows around the issuance date of [date], [Company] [did / did not] engage in redemptions from the shareholder, related parties, or significant shareholders. [Details if applicable]." },
  { k: "cap_table", title: "Cap-table / issuance record", body: "Attached: cap-table extract reflecting the original issuance to [shareholder] of [shares] on [date]. Subscription / purchase agreement and certificate copies enclosed." },
  { k: "industry", title: "Industry classification confirmation", body: "[Company]'s primary trade or business is [description]. To the company's knowledge it is not within an excluded category under Section 1202(e)(3). Counsel review available on request." },
];

function CompanyDashboard() {
  const { dossiers } = useQsbs();

  // Aggregate by issuer name (anonymized counts only — never expose other shareholders).
  const byIssuer = useMemo(() => {
    const m = new Map<string, { count: number; received: number; missing: number }>();
    for (const d of dossiers) {
      const k = d.inputs.issuer_name || "Unnamed";
      const cur = m.get(k) || { count: 0, received: 0, missing: 0 };
      cur.count += 1;
      cur.received += d.evidence.filter((e) => e.status === "received" || e.status === "reviewed").length;
      cur.missing += d.evidence.filter((e) => e.status === "missing" || e.status === "requested").length;
      m.set(k, cur);
    }
    return Array.from(m.entries());
  }, [dossiers]);

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="text-sm text-muted-foreground">
          <Link to="/company" className="hover:text-foreground">Company portal</Link>
          <span className="mx-2">/</span><span className="text-foreground">Dashboard</span>
        </div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-medium">Shareholder request dashboard</h1>
            <p className="text-muted-foreground mt-1">Reusable response templates and aggregated request demand by issuer.</p>
          </div>
          <span className="qsbs-chip qsbs-chip-muted">Demo data — for company-side preview</span>
        </div>

        {/* Network signal */}
        <div className="qsbs-card p-6 mt-8">
          <div className="text-sm font-medium">Aggregated request demand</div>
          <p className="text-xs text-muted-foreground mt-1">
            Counts of distinct holdings prepared in 1202 Request that name each issuer. Shareholder identities are
            never exposed. When demand is high, a single, counsel-reviewed response packet can serve many requests.
          </p>
          <table className="w-full mt-4 text-sm">
            <thead><tr className="text-left text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
              <th className="py-2">Issuer</th><th className="py-2">Requests</th><th className="py-2">Evidence received</th><th className="py-2">Outstanding</th>
            </tr></thead>
            <tbody>
              {byIssuer.map(([name, s]) => (
                <tr key={name} className="border-b border-border">
                  <td className="py-2">{name}</td>
                  <td className="py-2 tabular-nums">{s.count}</td>
                  <td className="py-2 tabular-nums">{s.received}</td>
                  <td className="py-2 tabular-nums">{s.missing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Reusable response library */}
        <div className="mt-8">
          <h2 className="text-xl font-medium">Reusable response library</h2>
          <p className="text-sm text-muted-foreground mt-1">Templated responses your counsel reviews once and your team reuses across shareholder requests.</p>
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {RESPONSE_TEMPLATES.map((t) => (
              <div key={t.k} className="qsbs-card p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium">{t.title}</div>
                  <StatusChip status="reviewed" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{t.body}</p>
                <div className="mt-3 flex gap-2">
                  <button className="qsbs-btn qsbs-btn-ghost text-xs"
                    onClick={() => navigator.clipboard.writeText(t.body)}>Copy</button>
                  <button className="qsbs-btn qsbs-btn-ghost text-xs">Mark needs counsel review</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
