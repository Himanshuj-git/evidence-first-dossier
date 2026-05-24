import { Link } from "@tanstack/react-router";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import type { ReactNode } from "react";

export function SeoArticle({
  eyebrow,
  title,
  intro,
  sections,
  primaryCta,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  sections: { h: string; p: ReactNode }[];
  primaryCta: { to: "/start" | "/pricing" | "/demo" | "/checklist"; label: string };
}) {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{eyebrow}</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{intro}</p>

        <section className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-xl font-medium">{s.h}</h2>
              <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.p}</div>
            </div>
          ))}
        </section>

        <div className="mt-12 qsbs-card p-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-medium">Ready to organize your evidence?</div>
            <p className="text-sm text-muted-foreground mt-1">Start a free draft. Unlock the full CPA-ready packet for $49.</p>
          </div>
          <div className="flex gap-2 shrink-0 flex-wrap">
            <Link to="/checklist" className="qsbs-btn qsbs-btn-ghost">Free checklist</Link>
            <Link to="/demo" className="qsbs-btn qsbs-btn-ghost">Sample dossier</Link>
            <Link to="/pricing" className="qsbs-btn qsbs-btn-ghost">Pricing</Link>
            <Link to={primaryCta.to} className="qsbs-btn qsbs-btn-primary">{primaryCta.label}</Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-muted-foreground">
          Related guides:{" "}
          <Link to="/qsbs-documentation-checklist" className="qsbs-link">documentation checklist</Link>{" · "}
          <Link to="/section-1202-issuer-evidence" className="qsbs-link">issuer evidence</Link>{" · "}
          <Link to="/qsbs-former-employee" className="qsbs-link">former employees</Link>{" · "}
          <Link to="/qsbs-tender-offer-checklist" className="qsbs-link">tender offer</Link>{" · "}
          <Link to="/section-1202-cpa-review-dossier" className="qsbs-link">CPA review dossier</Link>{" · "}
          <Link to="/why-not-chatgpt" className="qsbs-link">why not ChatGPT?</Link>
        </div>


        <div className="mt-10"><Disclaimer /></div>
      </article>
    </PageShell>
  );
}
