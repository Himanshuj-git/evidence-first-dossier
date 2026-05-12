import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";

const navLinks = [
  { to: "/scan", label: "Free scan" },
  { to: "/dossiers", label: "Dossiers" },
  { to: "/compare", label: "Compare" },
  { to: "/pricing", label: "Pricing" },
  { to: "/sources", label: "Sources" },
] as const;

export function Header() {
  const loc = useLocation();
  return (
    <header className="no-print sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-medium tracking-tight">
          <span className="inline-block w-2 h-2 rounded-full bg-foreground" />
          QSBS Packet
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {navLinks.map((l) => {
            const active = loc.pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} className={active ? "text-foreground" : "hover:text-foreground transition-colors"}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <Link to="/scan" className="qsbs-btn qsbs-btn-primary text-sm py-2 px-4">Run scan</Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="no-print mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="font-medium">QSBS Packet</div>
          <p className="mt-2 text-muted-foreground max-w-xs">
            The evidence file for your startup stock. Educational tooling for Section 1202 documentation.
          </p>
        </div>
        <div>
          <div className="font-medium mb-2">Product</div>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/scan" className="hover:text-foreground">Free readiness scan</Link></li>
            <li><Link to="/dossiers" className="hover:text-foreground">Dossiers</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/compare" className="hover:text-foreground">Compare holdings</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Resources</div>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/sources" className="hover:text-foreground">Sources & methodology</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">Privacy & security</Link></li>
            <li><Link to="/settings" className="hover:text-foreground">Settings</Link></li>
            <li><Link to="/demo" className="hover:text-foreground">Sample packet</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Disclosure</div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            QSBS Packet is an educational document-organization tool. It does not provide tax, legal, accounting,
            investment, or securities advice. QSBS treatment depends on facts and law that should be reviewed by a
            qualified tax professional.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted-foreground flex flex-wrap gap-4 justify-between">
          <span>© {new Date().getFullYear()} QSBS Packet — documentation hygiene, not advice.</span>
          <span>v0.1 MVP</span>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function Disclaimer({ variant = "default" }: { variant?: "default" | "compact" | "report" }) {
  if (variant === "compact") {
    return (
      <p className="text-xs text-muted-foreground">
        Educational information only. Not tax, legal, accounting, or investment advice. QSBS Packet does not determine or certify QSBS eligibility.
      </p>
    );
  }
  if (variant === "report") {
    return (
      <div className="text-xs leading-relaxed text-muted-foreground border border-border rounded-lg p-4 bg-muted">
        <strong className="text-foreground">Disclaimer.</strong> This document is generated from user-entered facts and is intended
        as educational organizational scaffolding for review by a qualified tax professional. It is not tax, legal, accounting, or
        investment advice, does not determine or certify Section 1202 QSBS eligibility, and is not a recommendation to buy, sell,
        hold, exercise, transfer, gift, or roll over any security. Verify all facts and applicable thresholds with your CPA or tax
        attorney.
      </div>
    );
  }
  return (
    <div className="qsbs-card p-4 text-xs text-muted-foreground leading-relaxed">
      <strong className="text-foreground">Educational information only.</strong> Not tax, legal, accounting, or investment advice.
      QSBS Packet does not determine or certify QSBS eligibility, and does not recommend buying, selling, holding, exercising,
      transferring, gifting, or rolling over securities. Review your facts with a qualified tax professional.
    </div>
  );
}

export function ScoreRing({ score, size = 64 }: { score: number; size?: number }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (score / 100) * c;
  const color = score >= 70 ? "var(--success)" : score >= 40 ? "var(--warning)" : "var(--danger)";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--border)" strokeWidth="4" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth="4" fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" />
      </svg>
      <span className="absolute text-sm font-medium tabular-nums">{score}</span>
    </div>
  );
}

export function StatusChip({ status }: { status: string }) {
  const map: Record<string, string> = {
    consistent: "qsbs-chip qsbs-chip-green",
    missing: "qsbs-chip qsbs-chip-amber",
    red_flag: "qsbs-chip qsbs-chip-red",
    not_applicable: "qsbs-chip qsbs-chip-muted",
    received: "qsbs-chip qsbs-chip-green",
    reviewed: "qsbs-chip qsbs-chip-green",
    requested: "qsbs-chip qsbs-chip-amber",
    draft: "qsbs-chip qsbs-chip-muted",
    evidence_incomplete: "qsbs-chip qsbs-chip-amber",
    ready_for_cpa: "qsbs-chip qsbs-chip-green",
    cpa_in_progress: "qsbs-chip qsbs-chip-muted",
    archived: "qsbs-chip qsbs-chip-muted",
  };
  const label = status.replace(/_/g, " ");
  return <span className={map[status] || "qsbs-chip qsbs-chip-muted"}>{label}</span>;
}
