import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — 1202 Request" },
      { name: "description", content: "Terms governing use of 1202 Request, an educational document-organization tool for Section 1202 evidence. Not tax, legal, accounting, or investment advice." },
      { property: "og:title", content: "Terms of Use — 1202 Request" },
      { property: "og:description", content: "Educational document-organization tooling. Not professional advice." },
      { property: "og:url", content: "https://1202request.com/terms" },
      { name: "twitter:title", content: "Terms of Use — 1202 Request" },
      { name: "twitter:description", content: "Educational document-organization tooling. Not professional advice." },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/terms" }],
  }),

  component: Terms,
});

function Terms() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 prose-like">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Legal</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">Terms of Use</h1>
        <p className="mt-3 text-muted-foreground">Last updated: {new Date().getFullYear()}.</p>

        <section className="mt-8 space-y-6 text-sm leading-relaxed">
          <div>
            <h2 className="text-lg font-medium">1. What 1202 Request is</h2>
            <p className="text-muted-foreground mt-2">
              1202 Request is an educational document-organization and evidence-request tool. It helps shareholders
              organize stock-holding facts and draft requests for issuer evidence that a qualified professional may
              review when considering Section 1202 / QSBS treatment.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium">2. No professional advice</h2>
            <p className="text-muted-foreground mt-2">
              1202 Request does not provide tax, legal, accounting, investment, or securities advice and does not
              determine or certify QSBS eligibility. Nothing produced by the tool constitutes a legal opinion, tax
              opinion, valuation opinion, or investment recommendation.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium">3. User responsibilities</h2>
            <p className="text-muted-foreground mt-2">
              You are responsible for verifying all facts entered into the tool and for reviewing any output with a
              qualified tax professional before relying on it. Section 1202 treatment depends on facts and law that
              should be reviewed by a CPA or tax attorney.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium">4. Payment and refunds</h2>
            <p className="text-muted-foreground mt-2">
              The One Holding Packet is a one-time $49 purchase. See our{" "}
              <Link to="/refund-policy" className="qsbs-link">refund policy</Link> for satisfaction terms.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium">5. No outcome guarantee</h2>
            <p className="text-muted-foreground mt-2">
              We do not guarantee any tax outcome, eligibility determination, or response from any company or third
              party. Use of the tool does not create a professional relationship.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium">6. Limitation of liability</h2>
            <p className="text-muted-foreground mt-2">
              To the maximum extent permitted by law, 1202 Request and its operators disclaim all warranties and
              shall not be liable for any indirect, incidental, or consequential damages arising from use of the
              tool. Aggregate liability is limited to amounts you have paid in the prior twelve months.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium">7. Contact</h2>
            <p className="text-muted-foreground mt-2">
              Questions about these terms: <a className="qsbs-link" href="mailto:hello@1202request.com">hello@1202request.com</a>.
            </p>
          </div>
        </section>

        <div className="mt-10"><Disclaimer /></div>
      </article>
    </PageShell>
  );
}
