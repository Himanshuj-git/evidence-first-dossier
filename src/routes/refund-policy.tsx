import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — 1202 Request" },
      { name: "description", content: "14-day satisfaction policy for the One Holding Packet from 1202 Request." },
      { property: "og:title", content: "Refund Policy — 1202 Request" },
      { property: "og:description", content: "14-day satisfaction policy." },
      { property: "og:url", content: "https://1202request.com/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/refund-policy" }],
  }),
  component: Refund,
});

function Refund() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Policy</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">Refund &amp; satisfaction policy</h1>
        <div className="mt-8 qsbs-card p-6 text-sm leading-relaxed">
          <p>
            If the paid dossier does not help you identify missing evidence or produce a usable issuer request packet,
            you can request a refund within <strong>14 days</strong> of purchase.
          </p>
          <p className="mt-3 text-muted-foreground">
            To request a refund, email <a className="qsbs-link" href="mailto:support@1202request.com">support@1202request.com</a> with the email used at checkout and a brief
            note describing what was missing. We aim to process refunds within five business days.
          </p>
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          <p>Refunds are not available for:</p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Requests made more than 14 days after purchase.</li>
            <li>Professional / Company Packet engagements that have already started delivery.</li>
            <li>Disputes about Section 1202 eligibility — that determination is made by your tax professional, not by us.</li>
          </ul>
        </div>
        <div className="mt-8 flex gap-2">
          <Link to="/pricing" className="qsbs-btn qsbs-btn-ghost">Back to pricing</Link>
          <Link to="/contact" className="qsbs-btn qsbs-btn-primary">Contact support</Link>
        </div>
        <div className="mt-10"><Disclaimer /></div>
      </article>
    </PageShell>
  );
}
