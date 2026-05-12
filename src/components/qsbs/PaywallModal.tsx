import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQsbs } from "@/lib/qsbs/store";

export function PaywallModal({
  open,
  plan,
  onClose,
  onConfirm,
}: {
  open: boolean;
  plan: "single" | "vault" | "portal";
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { settings } = useQsbs();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(open), [open]);

  if (!open) return null;

  const labels: Record<string, { name: string; price: string; href?: string }> = {
    single: { name: "One Holding Packet", price: "$49 one-time", href: settings.stripe_single },
    vault: { name: "Multi-Holding Vault", price: "$149 / year", href: settings.stripe_vault },
    portal: { name: "Founder / Company Portal", price: "$299 / year", href: settings.stripe_portal },
  };
  const p = labels[plan];

  return (
    <div className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-foreground/30 transition-opacity ${mounted ? "opacity-100" : "opacity-0"}`} onClick={onClose}>
      <div className="qsbs-card max-w-md w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Payment integration placeholder</div>
        <h3 className="mt-1 text-xl font-medium">{p.name}</h3>
        <div className="mt-1 text-muted-foreground">{p.price}</div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          Stripe Payment Links are not yet connected. To go live, paste your Payment Link URLs in
          {" "}<Link to="/settings" className="qsbs-link">Settings</Link>. For now we can simulate a successful checkout and unlock features locally.
        </p>
        {p.href ? (
          <a className="mt-5 qsbs-btn qsbs-btn-primary w-full" href={p.href} target="_blank" rel="noreferrer">
            Open Stripe checkout
          </a>
        ) : null}
        <button className="mt-3 qsbs-btn qsbs-btn-primary w-full" onClick={onConfirm}>
          Simulate successful checkout
        </button>
        <button className="mt-2 qsbs-btn qsbs-btn-ghost w-full" onClick={onClose}>Cancel</button>
        <div className="mt-4 border-t border-border pt-3 text-[11px] text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Before you unlock.</strong> This packet is not a legal opinion, tax opinion,
          valuation opinion, investment recommendation, or certification of QSBS eligibility. It is a structured summary of
          information you provided, intended for review by a qualified tax professional. No real charge is made in this
          simulation.
        </div>
      </div>
    </div>
  );
}
