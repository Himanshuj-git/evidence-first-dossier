import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { useQsbs } from "@/lib/qsbs/store";
import { FAQ, SHARED_FAQ } from "@/components/qsbs/FAQ";
import { AISummary } from "@/components/qsbs/AeoBlocks";
import { trackEvent } from "@/lib/qsbs/analytics";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — 1202 Request" },
      { name: "description", content: "One Holding Packet is $49 one-time. Build an issuer evidence request, tracker, and CPA-ready dossier for Section 1202 review." },
      { property: "og:title", content: "Pricing — 1202 Request" },
      { property: "og:description", content: "One Holding Packet is $49 one-time. Build an issuer evidence request, tracker, and CPA-ready dossier for Section 1202 review." },
      { property: "og:url", content: "https://1202request.com/pricing" },
      { name: "twitter:title", content: "Pricing — 1202 Request" },
      { name: "twitter:description", content: "One Holding Packet is $49 one-time. Build an issuer evidence request, tracker, and CPA-ready dossier for Section 1202 review." },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/pricing" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "One Holding Packet",
          description: "Section 1202 issuer evidence request, tracker, and CPA-ready dossier for a single startup stock holding.",
          brand: { "@type": "Brand", name: "1202 Request" },
          offers: {
            "@type": "Offer",
            url: "https://1202request.com/pricing",
            priceCurrency: "USD",
            price: "49",
            availability: "https://schema.org/InStock",
          },
        }),
      },
    ],
  }),

  component: PricingPage,
});

function PricingPage() {
  const { paidPlans } = useQsbs();
  const nav = useNavigate();

  useEffect(() => { trackEvent("pricing_viewed"); }, []);

  const purchased = paidPlans.includes("single");

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-5 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Pricing</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Free to start an evidence request. Pay once for a single holding, or request the Professional Packet for
            multi-shareholder and company workflows.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {/* Primary — $49 */}
          <div className="qsbs-card p-7 flex flex-col ring-1 ring-foreground">
            <div className="text-sm text-muted-foreground">One Holding Packet</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-5xl font-medium">$49</span>
              <span className="text-muted-foreground">one-time</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground italic leading-relaxed">
              Best for one startup stock holding before a sale, tender offer, acquisition, or CPA review.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                "1 holding dossier",
                "Full report export",
                "All request letter templates",
                "Unlimited evidence items for that holding",
                "CPA-ready review summary",
                "Issuer request tracker",
                "Document index",
                "Missing evidence checklist",
                "Audit trail",
                "Print / save as PDF",
              ].map((f) => (
                <li key={f} className="flex gap-2"><span className="text-foreground">•</span>{f}</li>
              ))}
            </ul>
            <button
              className="mt-6 qsbs-btn qsbs-btn-primary"
              onClick={() => { trackEvent("checkout_started", { plan: "single", from: "pricing" }); nav({ to: "/checkout", search: { dossier: undefined } }); }}
            >
              {purchased ? "Purchased — open my packet" : "Unlock One Holding Packet — $49"}
            </button>
          </div>

          {/* Secondary — $300 Professional */}
          <div className="qsbs-card p-7 flex flex-col">
            <div className="text-sm text-muted-foreground">Professional / Company Packet</div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-5xl font-medium">$300</span>
              <span className="text-muted-foreground">contact for setup</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground italic leading-relaxed">
              Best for founders, CPAs, angels, or companies handling multiple Section 1202 evidence requests.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                "Multiple request workflows",
                "Company-side templates",
                "Professional packet formatting",
                "Bulk shareholder request support",
                "Reusable request templates",
                "Shared review links",
                "Priority setup support",
              ].map((f) => (
                <li key={f} className="flex gap-2"><span className="text-foreground">•</span>{f}</li>
              ))}
            </ul>
            <a
              href="mailto:hello@1202request.com?subject=Professional%20Packet%20request"
              className="mt-6 qsbs-btn qsbs-btn-ghost"
              onClick={() => trackEvent("checkout_started", { plan: "professional", from: "pricing" })}
            >
              Request Professional Packet
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Prefer to see the deliverable first?{" "}
          <Link to="/demo" className="qsbs-link">View the sample dossier</Link>
          {" "}or{" "}
          <Link to="/checklist" className="qsbs-link">grab the free checklist</Link>.
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <div className="qsbs-card p-6">
            <div className="text-sm font-medium">Free tier</div>
            <ul className="mt-2 text-sm text-muted-foreground space-y-1">
              <li>• Start one evidence request</li>
              <li>• Basic missing-evidence checklist</li>
              <li>• Limited request preview</li>
              <li>• View sample dossier</li>
            </ul>
            <div className="mt-3 text-xs text-muted-foreground">
              Free dossiers cannot export the full CPA-ready report.
            </div>
          </div>
          <div className="qsbs-card p-6">
            <div className="text-sm font-medium">Satisfaction policy</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              If the paid dossier does not help you identify missing evidence or produce a usable request packet, you
              can request a refund within 14 days. We do not guarantee any tax outcome, QSBS eligibility, or CPA
              acceptance — only that the product is useful for organizing your evidence request.
            </p>
          </div>
        </div>

        <div className="mt-10 qsbs-card p-6">
          <div className="text-sm font-medium">What you are paying for</div>
          <ul className="mt-2 grid sm:grid-cols-2 gap-x-6 text-sm text-muted-foreground space-y-1">
            <li>• Better organization of your stock facts</li>
            <li>• Faster CPA prep and fewer back-and-forth emails</li>
            <li>• Clearer, more professional issuer requests</li>
            <li>• Fewer missing documents at review time</li>
            <li>• An auditable trail of who asked for what, when</li>
            <li>• A premium, print-ready dossier format</li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            You are not paying for tax advice, legal advice, or any guarantee about Section 1202 treatment.
          </p>
        </div>

        <div className="mt-8 qsbs-card p-5 text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Privacy &amp; security.</strong> Do not upload sensitive documents unless you
          trust the app environment. Private packet data should not be shared through unlisted links unless you
          understand the risk. 1202 Request does not provide tax, legal, accounting, investment, or securities advice.
          Your dossier is a structured summary of user-provided facts and requested issuer evidence for professional
          review.
        </div>

        <div className="mt-12"><FAQ items={SHARED_FAQ} /></div>

        <div className="mt-8"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
