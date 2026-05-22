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
    portal: { name: "Founder / Company Portal", price: "$299 / team / year", href: settings.stripe_portal },
  };
  const p = labels[plan];

  return (
    <div className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-foreground/30 transition-opacity ${mounted ? "opacity-100" : "opacity-0"}`} onClick={onClose}>
      <div className="qsbs-card max-w-md w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Secure checkout</div>
        <h3 className="mt-1 text-xl font-medium">{p.name}</h3>
        <div className="mt-1 text-muted-foreground">{p.price}</div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {p.href
            ? "You'll be redirected to a secure Stripe checkout."
            : "Secure checkout is being connected. Go to the checkout page to join the early-access list — we'll email you when live payments open."}
        </p>
        {p.href ? (
          <a className="mt-5 qsbs-btn qsbs-btn-primary w-full" href={p.href} target="_blank" rel="noreferrer" onClick={onConfirm}>
            Continue to Stripe
          </a>
        ) : (
          <Link to="/checkout" className="mt-5 qsbs-btn qsbs-btn-primary w-full block text-center" onClick={onConfirm}>
            Go to checkout
          </Link>
        )}
        <button className="mt-2 qsbs-btn qsbs-btn-ghost w-full" onClick={onClose}>Cancel</button>
        <div className="mt-4 border-t border-border pt-3 text-[11px] text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Before you unlock.</strong> This dossier is not a legal opinion, tax
          opinion, valuation opinion, investment recommendation, or certification of QSBS eligibility. It is a
          structured summary of user-provided information and requested issuer evidence for review by a qualified tax
          professional. 14-day satisfaction refund if the paid dossier does not help you identify missing evidence or
          produce a usable request packet.
        </div>
      </div>
    </div>
  );
}
