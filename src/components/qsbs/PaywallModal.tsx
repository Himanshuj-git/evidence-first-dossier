import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

export function PaywallModal({
  open,
  onClose,
  onConfirm,
  dossierId,
}: {
  open: boolean;
  /** Kept for backwards-compat with existing callers; only "single" is supported. */
  plan?: "single";
  onClose: () => void;
  onConfirm?: () => void;
  dossierId?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(open), [open]);

  if (!open) return null;

  const checkoutSearch = dossierId ? { dossier: dossierId } : { dossier: undefined };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-foreground/30 transition-opacity ${mounted ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
    >
      <div className="qsbs-card max-w-md w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Secure checkout</div>
        <h3 className="mt-1 text-xl font-medium">One Holding Packet</h3>
        <div className="mt-1 text-muted-foreground">$49 one-time</div>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          You'll be taken to secure checkout. Your packet unlocks only after the payment is confirmed.
        </p>
        <Link
          to="/checkout"
          search={checkoutSearch}
          className="mt-5 qsbs-btn qsbs-btn-primary w-full block text-center"
          onClick={() => onConfirm?.()}
        >
          Unlock One Holding Packet — $49
        </Link>
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
