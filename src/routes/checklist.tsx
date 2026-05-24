import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { captureLead, trackEvent } from "@/lib/qsbs/analytics";

export const Route = createFileRoute("/checklist")({
  head: () => ({
    meta: [
      { title: "Free Section 1202 Issuer Evidence Checklist" },
      { name: "description", content: "Download a practical checklist of issuer records, stock facts, and CPA review questions for Section 1202 documentation. No tax advice or eligibility certification." },
      { property: "og:title", content: "Free Section 1202 Issuer Evidence Checklist" },
      { property: "og:description", content: "Issuer records, stock facts, and CPA review questions shareholders may need before a Section 1202 review." },
      { property: "og:url", content: "https://1202request.com/checklist" },
      { name: "twitter:title", content: "Free Section 1202 Issuer Evidence Checklist" },
      { name: "twitter:description", content: "Issuer records, stock facts, and CPA review questions shareholders may need before a Section 1202 review." },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/checklist" }],
  }),

  component: ChecklistPage,
});

const ROLES = ["Founder", "Former employee", "Current employee", "Angel investor", "Advisor", "CPA", "Company / founder ops", "Other"];
const EVENTS = ["Tender offer", "Acquisition", "Secondary sale", "IPO planning", "Tax filing", "Just organizing", "Other"];
const HOLDINGS = ["1", "2–5", "6+"];

const SECTIONS: { title: string; items: string[] }[] = [
  { title: "Shareholder facts", items: ["Legal name and shareholder type (individual, trust, estate, partnership)", "Acquisition date(s) and method (direct issuance, exercise, secondary)", "Number of shares and cost basis", "State of residency at acquisition"] },
  { title: "Company facts", items: ["Legal entity name, state of formation, EIN", "Date of incorporation and any conversions (LLC→C-corp)", "Confirmation of C-corp status throughout the holding period"] },
  { title: "Original issuance evidence", items: ["Stock purchase / restricted stock agreement", "Stock certificate or book-entry confirmation", "Board consent approving issuance"] },
  { title: "Stock acquisition evidence", items: ["Option grant + exercise notice (if applicable)", "83(b) election + certified mail receipt (if applicable)", "Wire / payment confirmation for purchase price"] },
  { title: "Holding period evidence", items: ["Cap-table extract showing original issuance", "Any transfer, gift, or trust documentation in the holding period"] },
  { title: "Gross assets support", items: ["Officer attestation: aggregate gross assets at and immediately after issuance under the applicable threshold", "Balance sheets near issuance date"] },
  { title: "Active business support", items: ["CFO / counsel memo on active business use of assets", "Description of business activities throughout the holding period"] },
  { title: "Redemption / repurchase support", items: ["Issuer confirmation: no significant redemptions in the applicable lookback windows", "List of any repurchase events"] },
  { title: "Cap table or ownership confirmation", items: ["Issuer-signed cap-table letter", "Schedule of all issuances and transfers affecting the holding"] },
  { title: "Company QSBS memo or counsel-reviewed materials", items: ["Any prior counsel opinion or memo addressing Section 1202", "Any prior 1244 or 1202 elections on file"] },
  { title: "CPA questions", items: ["Date acquisition is being treated as for holding period purposes", "Any conversion or recap events to account for", "Open questions for the issuer"] },
  { title: "Issuer questions", items: ["Who at the company is authorized to confirm these facts?", "Is there a standard QSBS response template?", "What is the expected turnaround?"] },
];

function ChecklistPage() {
  const [form, setForm] = useState({ email: "", role: ROLES[0], event_type: EVENTS[0], holdings_count: HOLDINGS[0] });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { trackEvent("checklist_started"); }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = form.email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    try {
      captureLead({ email, role: form.role, event_type: form.event_type, holdings_count: form.holdings_count, source_page: "/checklist" });
    } catch {}
    trackEvent("checklist_submitted", { role: form.role, event_type: form.event_type });
    setSubmitted(true);
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-5 py-16">
        <div className="max-w-2xl">
          <div className="qsbs-chip inline-flex">Free download · No payment</div>
          <h1 className="mt-4 text-4xl md:text-5xl font-medium tracking-tight">Free Section 1202 Issuer Evidence Checklist</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            The documents a CPA typically needs from the company before a Section 1202 review. Use it to scope your
            request, then upgrade to a full issuer request packet when you're ready.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={onSubmit} className="qsbs-card p-6 md:p-8 mt-10 max-w-2xl">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium">Work email</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Your role</span>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {ROLES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium">Upcoming event</span>
                <select value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {EVENTS.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium">Startup holdings</span>
                <select value={form.holdings_count} onChange={(e) => setForm({ ...form, holdings_count: e.target.value })} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  {HOLDINGS.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
            </div>
            <button className="qsbs-btn qsbs-btn-primary mt-5 w-full sm:w-auto" type="submit">Get the checklist</button>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              We'll use your email only to send the checklist and occasional product updates. Do not upload sensitive
              documents unless you trust the app environment. 1202 Request does not provide tax, legal, accounting,
              investment, or securities advice.
            </p>
          </form>
        ) : (
          <div className="qsbs-card p-4 mt-10 max-w-2xl text-sm flex items-center justify-between gap-3">
            <span><strong>Saved.</strong> Your checklist is ready below.</span>
            <Link to="/start" className="qsbs-btn qsbs-btn-primary text-sm py-1.5 px-3">Turn this into a packet →</Link>
          </div>
        )}

        <section className="mt-12 grid md:grid-cols-2 gap-4">
          {SECTIONS.map((s) => (
            <div key={s.title} className="qsbs-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.title}</div>
              <ul className="mt-3 space-y-2 text-sm">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-2"><span className="text-muted-foreground">☐</span>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <div className="mt-10 qsbs-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="font-medium">Ready to turn this into a real issuer request?</div>
            <p className="text-sm text-muted-foreground mt-1">Generate a professional company request letter, track responses, and export a CPA-ready dossier.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link to="/demo" className="qsbs-btn qsbs-btn-ghost">View sample</Link>
            <Link to="/start" className="qsbs-btn qsbs-btn-primary">Build my request</Link>
          </div>
        </div>

        <div className="mt-8"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
