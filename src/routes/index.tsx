import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageShell, Disclaimer, ScoreRing, StatusChip } from "@/components/qsbs/Layout";
import { FAQ, SHARED_FAQ } from "@/components/qsbs/FAQ";
import { AISummary } from "@/components/qsbs/AeoBlocks";
import { trackEvent } from "@/lib/qsbs/analytics";

const HOMEPAGE_OG_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/ire59F4wn0ee7GMDws9rL9LsjxP2/social-images/social-1778649867252-1202_Request_social_preview_showing_a_minimal_CPA-ready_evidence_dossier_for_Section_1202_review..webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "1202 Request — Section 1202 Evidence Requests" },
      {
        name: "description",
        content:
          "Organize startup stock facts, request issuer evidence, and export a CPA-ready dossier for Section 1202 review. No tax advice or eligibility certification.",
      },
      { property: "og:title", content: "1202 Request — Section 1202 Evidence Requests" },
      {
        property: "og:description",
        content:
          "Organize startup stock facts, request issuer evidence, and export a CPA-ready dossier for Section 1202 review.",
      },
      { property: "og:url", content: "https://1202request.com/" },
      { property: "og:image", content: HOMEPAGE_OG_IMAGE },
      { name: "twitter:title", content: "1202 Request — Section 1202 Evidence Requests" },
      {
        name: "twitter:description",
        content:
          "Organize startup stock facts, request issuer evidence, and export a CPA-ready dossier for Section 1202 review.",
      },
      { name: "twitter:image", content: HOMEPAGE_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/" }],
  }),
  component: Landing,
});


function Landing() {
  useEffect(() => {
    trackEvent("landing_cta_clicked", { stage: "page_view" });
  }, []);
  const click = (cta: string) => () => trackEvent("landing_cta_clicked", { cta });

  return (
    <PageShell>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-5 pt-20 md:pt-28 pb-16 text-center">
        <div className="inline-flex qsbs-chip">For shareholders, founders, employees, angels &amp; their CPAs</div>
        <h1 className="mt-6 text-4xl md:text-6xl font-medium tracking-tight leading-[1.05]">
          Ask your company for the right Section 1202 evidence
          <br className="hidden md:block" /> before your CPA review.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          1202 Request helps startup shareholders organize stock facts, generate issuer evidence requests, track missing
          documents, and export a CPA-ready review dossier.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/start" onClick={click("hero_build")} className="qsbs-btn qsbs-btn-primary">
            Build my evidence request
          </Link>
          <Link to="/demo" onClick={click("hero_demo")} className="qsbs-btn qsbs-btn-ghost">
            View sample dossier
          </Link>
        </div>
        <div className="mt-4">
          <Link to="/checklist" onClick={click("hero_checklist")} className="qsbs-link text-sm">
            Download free evidence checklist →
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1 justify-center text-xs text-muted-foreground">
          <span>No tax advice</span>
          <span>·</span>
          <span>No eligibility certification</span>
          <span>·</span>
          <span>Built for CPA / tax-attorney review</span>
          <span>·</span>
          <span>Designed for shareholders without issuer-side access</span>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5">
        <div className="qsbs-card p-6 md:p-8 text-center">
          <div className="text-xs uppercase tracking-widest text-muted-foreground"></div>
          <p className="mt-3 text-xl md:text-2xl font-medium leading-snug">
            Stop asking your company vague QSBS questions. Send a precise evidence request your CPA can actually use.
          </p>
        </div>

        <AISummary
          bullets={[
            "1202 Request is a shareholder-side Section 1202 / QSBS evidence-request workflow.",
            "It is for startup shareholders, founders, employees, angels, advisors, and the CPAs supporting them.",
            "It generates an issuer request letter, tracks missing documents, and exports a CPA-ready dossier.",
            "One Holding Packet is $49 one-time.",
            "1202 Request does not provide tax or legal advice and does not determine QSBS eligibility.",
          ]}
        />
      </section>


      {/* Sample dossier card */}
      <section className="mx-auto max-w-3xl px-5 mt-16">
        <div className="qsbs-card p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Sample request</div>
              <div className="mt-1 text-xl font-medium">Northstar Robotics — Founder shares</div>
              <div className="text-sm text-muted-foreground">
                Issued March 2019 · Direct issuance · Individual holder
              </div>
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
          <div className="mt-5 text-right">
            <Link to="/demo" onClick={click("sample_card")} className="qsbs-link text-sm">
              Open full sample →
            </Link>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground text-center">
          Sample only. Generated from synthetic facts. Always confirm with a qualified tax professional.
        </p>
      </section>

      {/* Why shareholders get stuck */}
      <section className="mx-auto max-w-4xl px-5 mt-24">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Why shareholders get stuck</h2>
        <div className="mt-6 qsbs-card divide-y divide-border">
          {[
            "You may not have access to company-side cap table or legal records.",
            "Your CPA needs facts, not vague QSBS claims.",
            "The company may not know what evidence to send.",
            "Missing issuer evidence can slow down review before a sale, tender offer, acquisition, or tax filing.",
            "A clean, structured request saves rounds of back-and-forth.",
          ].map((t) => (
            <div key={t} className="p-5 text-sm md:text-base">
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="mx-auto max-w-5xl px-5 mt-24">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">What you get in a paid packet</h2>
          <p className="mt-3 text-muted-foreground">A finished deliverable, not just AI text. Built for your CPA.</p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              t: "Professional issuer request letter",
              b: "A precise, polite letter naming the exact records your CPA needs.",
            },
            { t: "Follow-up request template", b: "For when the company is slow or only sends partial evidence." },
            { t: "Evidence checklist", b: "Structured by Section 1202 category — never miss a document type." },
            { t: "Missing document tracker", b: "Status per item: missing, requested, received, reviewed." },
            { t: "CPA-ready review summary", b: "Factual summary + open questions, written for professional review." },
            { t: "Document index", b: "Every supporting file labeled and ordered for hand-off." },
            { t: "Risk flags & open questions", b: "Surfaces issues like secondary purchases or excluded industries." },
            { t: "Print/export-ready dossier", b: "A clean, branded PDF you'd be comfortable sending to your CPA." },
            { t: "Audit trail of request steps", b: "Who asked for what, and when — a defensible record." },
          ].map((c) => (
            <div key={c.t} className="qsbs-card p-5">
              <div className="font-medium">{c.t}</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/pricing" onClick={click("what_you_get_pricing")} className="qsbs-btn qsbs-btn-primary">
            See $49 packet
          </Link>
        </div>
      </section>

      {/* Built for shareholders */}
      <section className="mx-auto max-w-5xl px-5 mt-24">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-center">
          Built for shareholders who need documents from the company
        </h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              t: "Former employees preparing for an exit",
              b: "Exercised options years ago. Tender offer or acquisition is on the table. The company has the records — you don't.",
            },
            {
              t: "Angels organizing startup investments",
              b: "Multiple positions across multiple C-corps. Each holding needs its own factual support before a sale.",
            },
            {
              t: "Founders documenting early common stock",
              b: "Issued shares at incorporation. Time to pull together the issuance records, charter, and gross-asset support.",
            },
            {
              t: "Advisors and consultants paid in equity",
              b: "Received stock for services. Want a clean factual file before any liquidity event.",
            },
            {
              t: "CPAs collecting client facts before review",
              b: "Skip the back-and-forth. Send the client a structured evidence request and receive a review-ready dossier.",
            },
            {
              t: "Trusts, estates, and SPVs",
              b: "Holdings inherited or held through entities. Document the chain before the next transaction.",
            },
          ].map((c) => (
            <div key={c.t} className="qsbs-card p-5">
              <div className="text-base font-medium">{c.t}</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Three steps */}
      <section className="mx-auto max-w-5xl px-5 mt-24 grid md:grid-cols-3 gap-6">
        {[
          {
            n: "01",
            t: "Identify the holding",
            b: "Enter your stock facts: issuer, security type, acquisition date and method, expected exit.",
          },
          {
            n: "02",
            t: "Request issuer evidence",
            b: "Generate a professional letter to the company requesting the specific records your CPA will need.",
          },
          {
            n: "03",
            t: "Export a CPA dossier",
            b: "Hand off a structured packet — facts, evidence matrix, missing items, request log, audit trail.",
          },
        ].map((s) => (
          <div key={s.n} className="qsbs-card p-6">
            <div className="text-xs text-muted-foreground tabular-nums">{s.n}</div>
            <div className="mt-3 text-lg font-medium">{s.t}</div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.b}</p>
          </div>
        ))}
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-5xl px-5 mt-24">
        <div className="qsbs-card p-6 md:p-8">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Trust &amp; scope</div>
          <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {[
              "Built for professional review",
              "No eligibility certification",
              "No tax advice",
              "No investment advice",
              "User-controlled packet exports",
              "Educational document-organization tool",
            ].map((t) => (
              <div key={t} className="flex gap-2">
                <span className="text-muted-foreground">•</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="mx-auto max-w-5xl px-5 mt-24">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
            A single missing confirmation can stall a review.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Pay once for a single holding, or request the Professional Packet for multi-shareholder workflows.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {[
            {
              name: "One Holding Packet",
              price: "$49",
              per: "one-time",
              desc: "One holding, full export, all request letter templates, tracker, CPA-ready dossier.",
              highlight: true,
            },
            {
              name: "Professional / Company Packet",
              price: "$300",
              per: "contact for setup",
              desc: "Multi-shareholder workflows, company-side templates, reusable request library.",
            },
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
          <Link to="/pricing" onClick={click("pricing_teaser")} className="qsbs-link text-sm">
            See full pricing →
          </Link>
        </div>
      </section>

      {/* Popular resources */}
      <section className="mx-auto max-w-5xl px-5 mt-24">
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-center">
          Popular Section 1202 resources
        </h2>
        <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
          Free guides on what issuer evidence shareholders may need before a CPA or tax-attorney review.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: "/qsbs-documentation-checklist", t: "QSBS documentation checklist", b: "Stock records, issuer documents, gross asset support, and CPA review questions." },
            { to: "/section-1202-issuer-evidence", t: "Section 1202 issuer evidence", b: "What only the company can confirm and how to ask for it." },
            { to: "/qsbs-former-employee", t: "Former employee evidence checklist", b: "Option exercise, 83(b), and cap-table requests years after leaving." },
            { to: "/qsbs-tender-offer-checklist", t: "Tender offer checklist", b: "Organize issuer evidence before a tender, secondary, or acquisition." },
            { to: "/section-1202-cpa-review-dossier", t: "CPA-ready review dossier", b: "What a structured Section 1202 review packet should contain." },
            { to: "/why-not-chatgpt", t: "Why not just use ChatGPT?", b: "Structured workflow vs. a blank chat box for Section 1202 evidence." },
          ].map((c) => (
            <Link key={c.to} to={c.to} className="qsbs-card p-5 hover:bg-muted/40 transition-colors">
              <div className="font-medium">{c.t}</div>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.b}</p>
              <div className="mt-3 text-xs qsbs-link">Read guide →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 mt-24">
        <FAQ items={SHARED_FAQ} />
      </section>


      <section className="mx-auto max-w-3xl px-5 mt-16">
        <Disclaimer />
      </section>
    </PageShell>
  );
}
