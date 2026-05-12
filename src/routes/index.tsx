import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Disclaimer, ScoreRing, StatusChip } from "@/components/qsbs/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QSBS Packet — Your Section 1202 evidence file" },
      { name: "description", content: "Founders, employees, and investors organize Section 1202 documentation for review by a qualified tax professional." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-20 md:pt-28 pb-16 text-center">
        <div className="inline-flex qsbs-chip">For founders, early employees, angel investors & CPAs</div>
        <h1 className="mt-6 text-4xl md:text-6xl font-medium tracking-tight leading-[1.05]">
          Build a CPA-ready QSBS<br className="hidden md:block" /> evidence packet before the exit.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Organize Section 1202 facts, documents, risk flags, issuer questions, and CPA review notes in one clean
          packet — built for review by a qualified tax professional.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/scan" className="qsbs-btn qsbs-btn-primary">Start readiness scan</Link>
          <Link to="/demo" className="qsbs-btn qsbs-btn-ghost">View sample packet</Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 justify-center text-xs text-muted-foreground">
          <span>No tax advice</span><span>·</span>
          <span>No eligibility certification</span><span>·</span>
          <span>Built for documentation readiness</span><span>·</span>
          <span>Designed for CPA / tax-attorney review</span>
        </div>
      </section>

      {/* Sample dossier card */}
      <section className="mx-auto max-w-3xl px-5">
        <div className="qsbs-card p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Sample dossier</div>
              <div className="mt-1 text-xl font-medium">Northstar Robotics — Founder shares</div>
              <div className="text-sm text-muted-foreground">Issued March 2019 · Direct issuance · Individual holder</div>
            </div>
            <div className="flex items-center gap-3">
              <ScoreRing score={92} size={64} />
              <StatusChip status="ready_for_cpa" />
            </div>
          </div>
          <div className="qsbs-divider my-6" />
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-muted-foreground text-xs uppercase tracking-wide">Evidence complete</div>
              <div className="mt-1 text-2xl font-medium tabular-nums">10 / 10</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs uppercase tracking-wide">Missing items</div>
              <div className="mt-1 text-2xl font-medium tabular-nums">0</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs uppercase tracking-wide">Risk flags</div>
              <div className="mt-1 text-2xl font-medium tabular-nums">0</div>
            </div>
          </div>
          <div className="qsbs-divider my-6" />
          <div className="flex flex-wrap gap-2">
            <span className="qsbs-chip qsbs-chip-green">Original issuance</span>
            <span className="qsbs-chip qsbs-chip-green">C-corp confirmed</span>
            <span className="qsbs-chip qsbs-chip-green">Gross asset attestation</span>
            <span className="qsbs-chip qsbs-chip-green">83(b) on file</span>
            <span className="qsbs-chip qsbs-chip-green">Active business memo</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground text-center">
          Sample only. Generated from synthetic facts. Always confirm with a qualified tax professional.
        </p>
      </section>

      {/* Three steps */}
      <section className="mx-auto max-w-5xl px-5 mt-24 grid md:grid-cols-3 gap-6">
        {[
          { n: "01", t: "Run the scan", b: "Answer focused questions about how the stock was issued, the issuer's status, and what evidence you already have." },
          { n: "02", t: "Identify the gaps", b: "We surface missing issuer confirmations, generate request letters, and track what's been received." },
          { n: "03", t: "Hand off cleanly", b: "Export a CPA-ready packet — facts, evidence matrix, risk flags, and methodology — for professional review." },
        ].map((s) => (
          <div key={s.n} className="qsbs-card p-6">
            <div className="text-xs text-muted-foreground tabular-nums">{s.n}</div>
            <div className="mt-3 text-lg font-medium">{s.t}</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.b}</p>
          </div>
        ))}
      </section>

      {/* Pricing teaser */}
      <section className="mx-auto max-w-5xl px-5 mt-24">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">A single missing confirmation can stall a review.</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Build the file before the exit. Pricing is one-time or annual — never per-document.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { name: "One Holding Packet", price: "$49", per: "one-time", desc: "Single dossier, full export, request letter templates." },
            { name: "Multi-Holding Vault", price: "$149", per: "/ year", desc: "Unlimited dossiers, evidence reminders, share links.", highlight: true },
            { name: "Founder / Company Portal", price: "$299", per: "/ year", desc: "Shareholder-friendly templates for the company team." },
          ].map((p) => (
            <div key={p.name} className={`qsbs-card p-6 ${p.highlight ? "ring-1 ring-foreground" : ""}`}>
              <div className="text-sm text-muted-foreground">{p.name}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-medium">{p.price}</span>
                <span className="text-muted-foreground text-sm">{p.per}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/pricing" className="qsbs-link text-sm">See full pricing →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 mt-24">
        <Disclaimer />
      </section>
    </PageShell>
  );
}
