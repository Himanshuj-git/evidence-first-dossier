import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { PaywallModal } from "@/components/qsbs/PaywallModal";
import { useQsbs } from "@/lib/qsbs/store";
import { FAQ, SHARED_FAQ } from "@/components/qsbs/FAQ";
import { trackEvent } from "@/lib/qsbs/analytics";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — 1202 Request" },
      { name: "description", content: "Per-holding or annual plans for shareholder-side Section 1202 evidence requests. One Holding Packet $49, Vault $149/yr, Company Portal $299/yr." },
      { property: "og:title", content: "Pricing — 1202 Request" },
      { property: "og:description", content: "One Holding Packet $49, Vault $149/yr, Company Portal $299/yr." },
      { property: "og:url", content: "https://1202request.com/pricing" },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/pricing" }],
  }),
  component: PricingPage,
});

type Plan = {
  key: "single" | "vault" | "portal";
  name: string;
  price: string;
  per: string;
  features: string[];
  cta: string;
  best: string;
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    key: "single",
    name: "One Holding Packet",
    price: "$49",
    per: "one-time",
    features: [
      "1 dossier",
      "Full report export",
      "All request letter templates",
      "Unlimited evidence items",
      "CPA-ready review summary",
      "Issuer request tracker",
      "Document index",
      "Missing evidence checklist",
    ],
    cta: "Buy packet",
    best: "Best for one startup stock holding before a sale, tender offer, acquisition, or CPA review.",
  },
  {
    key: "vault",
    name: "Multi-Holding Vault",
    price: "$149",
    per: "/ year",
    features: [
      "Unlimited dossiers",
      "Evidence reminders",
      "Share links",
      "Re-generate reports anytime",
      "Multi-company evidence vault",
      "Annual review reminders",
      "Reusable CPA profile",
      "Export history",
    ],
    cta: "Start vault",
    best: "Best for founders, angels, and early employees with multiple startup equity positions.",
    highlight: true,
  },
  {
    key: "portal",
    name: "Founder / Company Portal",
    price: "$299",
    per: "/ team / year",
    features: [
      "Company-side document templates",
      "Shareholder request workflows",
      "Bulk evidence packets",
      "Reusable issuer response library",
      "Shareholder intake queue",
      "Company evidence checklist",
      "Team access",
      "Request status dashboard",
    ],
    cta: "Start company portal",
    best: "Best for startups that want to respond consistently to shareholder Section 1202 documentation requests.",
  },
];

function PricingPage() {
  const { recordCheckout, paidPlans } = useQsbs();
  const [open, setOpen] = useState<"single" | "vault" | "portal" | null>(null);

  useEffect(() => { trackEvent("pricing_viewed"); }, []);

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-5 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Pricing</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Free to start a request. Pay once for a single holding, annually for ongoing vault access, or by team
            for the company-side portal.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {PLANS.map((p) => (
            <div key={p.key} className={`qsbs-card p-6 flex flex-col ${p.highlight ? "ring-1 ring-foreground" : ""}`}>
              <div className="text-sm text-muted-foreground">{p.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-medium">{p.price}</span>
                <span className="text-muted-foreground">{p.per}</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground italic leading-relaxed">{p.best}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2"><span className="text-foreground">•</span>{f}</li>
                ))}
              </ul>
              <button
                className={`mt-6 qsbs-btn ${p.highlight ? "qsbs-btn-primary" : "qsbs-btn-ghost"}`}
                onClick={() => { trackEvent("checkout_started", { plan: p.key }); setOpen(p.key); }}
              >
                {paidPlans.includes(p.key) ? "Purchased" : p.cta}
              </button>
            </div>
          ))}
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
              <li>• Up to 6 evidence items per draft</li>
            </ul>
            <div className="mt-3 text-xs text-muted-foreground">
              Free dossiers cannot export the full CPA-ready report or generate share links.
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

        {/* Trust microcopy */}
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

      <PaywallModal
        open={!!open}
        plan={open || "single"}
        onClose={() => setOpen(null)}
        onConfirm={() => { if (open) { recordCheckout(open); trackEvent("checkout_success", { plan: open, mode: "simulated" }); } setOpen(null); }}
      />
    </PageShell>
  );
}
