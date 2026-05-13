import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Disclaimer, ScoreRing, StatusChip } from "@/components/qsbs/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "1202 Request — Issuer evidence requests for Section 1202 review" },
      { name: "description", content: "Request the issuer evidence your CPA needs for Section 1202 review. Built for shareholders without issuer-side access." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-20 md:pt-28 pb-16 text-center">
        <div className="inline-flex qsbs-chip">For shareholders, founders, employees, angels & their CPAs</div>
        <h1 className="mt-6 text-4xl md:text-6xl font-medium tracking-tight leading-[1.05]">
          Request the issuer evidence<br className="hidden md:block" /> your CPA needs for Section 1202 review.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          1202 Request helps startup shareholders organize their stock facts, identify missing issuer records, generate
          professional company request letters, and export a CPA-ready review dossier.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/start" className="qsbs-btn qsbs-btn-primary">Build my evidence request</Link>
          <Link to="/demo" className="qsbs-btn qsbs-btn-ghost">View sample request</Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 justify-center text-xs text-muted-foreground">
          <span>No tax advice</span><span>·</span>
          <span>No eligibility certification</span><span>·</span>
          <span>Built for CPA / tax-attorney review</span><span>·</span>
          <span>Designed for shareholders without issuer-side access</span>
        </div>
      </section>

      {/* Core message */}
      <section className="mx-auto max-w-3xl px-5">
        <div className="qsbs-card p-6 md:p-8 text-center">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Core message</div>
          <p className="mt-3 text-xl md:text-2xl font-medium leading-snug">
            Stop asking your company vague QSBS questions. Send a precise evidence request your CPA can actually use.
          </p>
        </div>
      </section>

      {/* Sample dossier card */}
      <section className="mx-auto max-w-3xl px-5 mt-16">
        <div className="qsbs-card p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Sample request</div>
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
              <div className="text-muted-foreground text-xs uppercase tracking-wide">Evidence received</div>
              <div className="mt-1 text-2xl font-medium tabular-nums">10 / 10</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs uppercase tracking-wide">Outstanding requests</div>
              <div className="mt-1 text-2xl font-medium tabular-nums">0</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs uppercase tracking-wide">Risk flags</div>
              <div className="mt-1 text-2xl font-medium tabular-nums">0</div>
            </div>
          </div>
          <div className="qsbs-divider my-6" />
          <div className="flex flex-wrap gap-2">
            <span className="qsbs-chip qsbs-chip-green">Issuer C-corp confirmation</span>
            <span className="qsbs-chip qsbs-chip-green">Original issuance proof</span>
            <span className="qsbs-chip qsbs-chip-green">Gross asset attestation</span>
            <span className="qsbs-chip qsbs-chip-green">83(b) on file</span>
            <span className="qsbs-chip qsbs-chip-green">Active business memo</span>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground text-center">
          Sample only. Generated from synthetic facts. Always confirm with a qualified tax professional.
        </p>
      </section>

      {/* Built for shareholders */}
      <section className="mx-auto max-w-5xl px-5 mt-24">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-center">
          Built for shareholders who need documents from the company
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t: "Former employees preparing for an exit", b: "Exercised options years ago. Tender offer or acquisition is on the table. The company has the records — you don't." },
            { t: "Angels organizing startup investments", b: "Multiple positions across multiple C-corps. Each holding needs its own factual support before a sale." },
            { t: "Founders documenting early common stock", b: "Issued shares at incorporation. Time to pull together the issuance records, charter, and gross-asset support." },
            { t: "Advisors and consultants paid in equity", b: "Received stock for services. Want a clean factual file before any liquidity event." },
            { t: "CPAs collecting client facts before review", b: "Skip the back-and-forth. Send the client a structured evidence request and receive a review-ready dossier." },
            { t: "Trusts, estates, and SPVs", b: "Holdings inherited or held through entities. Document the chain before the next transaction." },
          ].map((c) => (
            <div key={c.t} className="qsbs-card p-5">
              <div className="text-base font-medium">{c.t}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pain section */}
      <section className="mx-auto max-w-4xl px-5 mt-24">
        <div className="qsbs-card p-8 md:p-10">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            Most QSBS problems are evidence problems.
          </h2>
          <ul className="mt-6 space-y-3 text-base text-muted-foreground leading-relaxed">
            <li>· Shareholders rarely control issuer records — cap tables, balance sheets, board minutes.</li>
            <li>· Old stock records are hard to reconstruct years after issuance.</li>
            <li>· Companies often don't know what factual confirmations a tax advisor needs.</li>
            <li>· CPAs need factual support, not vague claims that "we think it qualifies."</li>
            <li>· A one-line "we think it qualifies" email from the company is not enough.</li>
          </ul>
          <p className="mt-6 text-foreground">
            1202 Request gives you a structured way to ask for what's missing — and a clean place to put it when it
            arrives.
          </p>
        </div>
      </section>

      {/* Three steps */}
      <section className="mx-auto max-w-5xl px-5 mt-24 grid md:grid-cols-3 gap-6">
        {[
          { n: "01", t: "Identify the holding", b: "Enter your stock facts: issuer, security type, acquisition date and method, expected exit." },
          { n: "02", t: "Request issuer evidence", b: "Generate a professional letter to the company requesting the specific records your CPA will need." },
          { n: "03", t: "Export a CPA dossier", b: "Hand off a structured packet — facts, evidence matrix, missing items, request log, audit trail." },
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
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Pay once for a single holding or annually for ongoing vault access. No per-document fees.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { name: "One Holding Packet", price: "$49", per: "one-time", desc: "Single holding, full export, all request letter templates." },
            { name: "Multi-Holding Vault", price: "$149", per: "/ year", desc: "Unlimited holdings, reminders, share links, regenerate reports.", highlight: true },
            { name: "Founder / Company Portal", price: "$299", per: "/ team / year", desc: "Company-side templates and shareholder request workflows." },
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
