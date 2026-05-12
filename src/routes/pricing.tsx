import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { PaywallModal } from "@/components/qsbs/PaywallModal";
import { useQsbs } from "@/lib/qsbs/store";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — QSBS Packet" },
      { name: "description", content: "Simple pricing for the QSBS evidence packet builder." },
    ],
  }),
  component: PricingPage,
});

type Plan = { key: "single" | "vault" | "portal"; name: string; price: string; per: string; features: string[]; cta: string; highlight?: boolean };
const PLANS: Plan[] = [
  { key: "single", name: "One Holding Packet", price: "$49", per: "one-time", features: ["1 dossier", "Full report export", "All request letter templates", "Unlimited evidence items"], cta: "Buy packet" },
  { key: "vault", name: "Multi-Holding Vault", price: "$149", per: "/ year", features: ["Unlimited dossiers", "Evidence reminders", "Share links", "Re-generate reports anytime"], cta: "Start vault", highlight: true },
  { key: "portal", name: "Founder / Company Portal", price: "$299", per: "/ team / year", features: ["Company-side document templates", "Shareholder request workflows", "Bulk evidence packets"], cta: "Get portal" },
];

function PricingPage() {
  const { recordCheckout, paidPlans } = useQsbs();
  const [open, setOpen] = useState<"single" | "vault" | "portal" | null>(null);

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-5 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">Pricing</h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Free to scan. Pay once for a single holding or annually for ongoing vault access.
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
              <ul className="mt-5 space-y-2 text-sm">
                {p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-foreground">•</span>{f}</li>)}
              </ul>
              <button
                className={`mt-6 qsbs-btn ${p.highlight ? "qsbs-btn-primary" : "qsbs-btn-ghost"}`}
                onClick={() => setOpen(p.key as "single" | "vault" | "portal")}
              >
                {paidPlans.includes(p.key) ? "Purchased" : p.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 qsbs-card p-6">
          <div className="text-sm font-medium">Free tier</div>
          <ul className="mt-2 text-sm text-muted-foreground space-y-1">
            <li>• Free readiness scan</li>
            <li>• One draft dossier</li>
            <li>• Missing evidence checklist</li>
            <li>• Up to 6 evidence items per draft</li>
          </ul>
        </div>

        <div className="mt-8"><Disclaimer /></div>
      </div>

      <PaywallModal
        open={!!open}
        plan={open || "single"}
        onClose={() => setOpen(null)}
        onConfirm={() => { if (open) recordCheckout(open); setOpen(null); }}
      />
    </PageShell>
  );
}
