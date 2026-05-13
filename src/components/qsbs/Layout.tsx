import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";

const navLinks = [
  { to: "/start", label: "Start" },
  { to: "/dossiers", label: "Holdings" },
  { to: "/company", label: "For companies" },
  { to: "/pricing", label: "Pricing" },
  { to: "/sources", label: "Sources" },
] as const;

export function Header() {
  const loc = useLocation();
  return (
    <header className="no-print sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-medium tracking-tight">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-foreground text-background text-[10px] font-semibold tabular-nums">1202</span>
          <span>1202 Request</span>
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
        <Link to="/start" className="qsbs-btn qsbs-btn-primary text-sm py-2 px-4">Build my request</Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="no-print mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="font-medium">1202 Request</div>
          <p className="mt-2 text-muted-foreground max-w-xs">
            Request the issuer evidence your CPA needs for Section 1202 review. Educational document-organization tooling — not advice.
          </p>
        </div>
        <div>
          <div className="font-medium mb-2">Product</div>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/start" className="hover:text-foreground">Build a request</Link></li>
            <li><Link to="/dossiers" className="hover:text-foreground">Holdings</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/demo" className="hover:text-foreground">Sample request</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">For companies</div>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/company" className="hover:text-foreground">Company portal</Link></li>
            <li><Link to="/company/dashboard" className="hover:text-foreground">Request dashboard</Link></li>
            <li><Link to="/sources" className="hover:text-foreground">Sources & methodology</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">Privacy & security</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-2">Disclosure</div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            1202 Request is an educational document-organization and evidence-request tool. It does not provide tax,
            legal, accounting, investment, or securities advice. Section 1202 treatment depends on facts and law that
            should be reviewed by a qualified professional.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted-foreground flex flex-wrap gap-4 justify-between">
          <span>© {new Date().getFullYear()} 1202 Request — evidence requests, not advice.</span>
          <span>1202Request.com</span>
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
        1202 Request is an educational document-organization and evidence-request tool. It does not provide tax, legal, accounting, investment, or securities advice, and does not determine or certify QSBS eligibility.
      </p>
    );
  }
  if (variant === "report") {
    return (
      <div className="text-xs leading-relaxed text-muted-foreground border border-border rounded-lg p-4 bg-muted">
        <strong className="text-foreground">Disclaimer.</strong> This dossier is generated from user-entered facts and requested issuer evidence. It is not a legal opinion, tax opinion, valuation opinion, investment recommendation, or certification of Section 1202 / QSBS eligibility. Section 1202 treatment depends on facts and law that should be reviewed by a qualified professional. Verify all facts and applicable thresholds with your CPA or tax attorney before relying on this document.
      </div>
    );
  }
  return (
    <div className="qsbs-card p-4 text-xs text-muted-foreground leading-relaxed">
      <strong className="text-foreground">Educational information only.</strong> 1202 Request does not provide tax,
      legal, accounting, investment, or securities advice and does not determine or certify QSBS eligibility. Review
      your facts and any documentation produced here with a qualified tax professional.
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
    sent: "qsbs-chip qsbs-chip-amber",
    blocked: "qsbs-chip qsbs-chip-red",
  };
  const label = status.replace(/_/g, " ");
  return <span className={map[status] || "qsbs-chip qsbs-chip-muted"}>{label}</span>;
}
