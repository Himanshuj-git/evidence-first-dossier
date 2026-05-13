import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Company portal — 1202 Request" },
      { name: "description", content: "Respond to shareholder Section 1202 documentation requests consistently and quickly." },
    ],
  }),
  component: CompanyLanding,
});

function CompanyLanding() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-5 pt-20 pb-12 text-center">
        <div className="inline-flex qsbs-chip">For founders, finance, and legal teams</div>
        <h1 className="mt-6 text-4xl md:text-5xl font-medium tracking-tight leading-[1.1]">
          Respond to shareholder Section 1202 requests consistently.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
          The Company Portal gives your finance and legal team a reusable response library, a request intake queue, and
          a single dashboard for tracking shareholder evidence requests.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/company/dashboard" className="qsbs-btn qsbs-btn-primary">View company dashboard</Link>
          <Link to="/pricing" className="qsbs-btn qsbs-btn-ghost">See pricing — $299 / team / year</Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 grid md:grid-cols-2 gap-4 mt-8">
        {[
          { t: "Reusable response library", b: "C-corp confirmation, gross-asset attestation, active-business memo, redemption history, cap-table extract — pre-templated for your counsel to review once and reuse." },
          { t: "Shareholder intake queue", b: "Every shareholder request lands in one place with status, requested categories, and contact." },
          { t: "Bulk evidence packets", b: "Generate a packet that can be reused across multiple shareholders requesting the same factual confirmations." },
          { t: "Team access", b: "Invite finance, legal, and counsel. Track who responded, when, and to whom." },
          { t: "Request status dashboard", b: "Open / answered / blocked / escalated. Audit trail per request." },
          { t: "Network signal", b: "When multiple shareholders request the same issuer, your team sees that aggregated demand and can publish one definitive response." },
        ].map((f) => (
          <div key={f.t} className="qsbs-card p-5">
            <div className="text-base font-medium">{f.t}</div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.b}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-5 mt-16">
        <div className="qsbs-card p-8">
          <div className="text-sm font-medium">What the Company Portal is not</div>
          <ul className="mt-3 text-sm text-muted-foreground space-y-1.5">
            <li>· Not a tax-opinion service. The portal does not certify QSBS eligibility.</li>
            <li>· Not legal advice. Counsel review is still required for substantive responses.</li>
            <li>· Not a cap-table system. We organize the response, not the underlying records.</li>
          </ul>
        </div>
        <div className="mt-8"><Disclaimer /></div>
      </section>
    </PageShell>
  );
}
