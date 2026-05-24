import type { ReactNode } from "react";

export function AISummary({ bullets, title = "Summary" }: { bullets: string[]; title?: string }) {
  return (
    <aside
      aria-label={title}
      className="qsbs-card p-5 my-6 bg-muted/30"
      data-ai-summary
    >
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-muted-foreground shrink-0">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function DirectAnswer({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 border-l-2 border-foreground/30 pl-4" data-direct-answer>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">Short answer</div>
      <p className="mt-2 text-base leading-relaxed text-foreground">{children}</p>
    </div>
  );
}

export interface AeoFaqItem { q: string; a: string }

export function FaqBlock({
  items,
  title = "Frequently asked questions",
  pageUrl,
}: {
  items: AeoFaqItem[];
  title?: string;
  pageUrl?: string;
}) {
  return (
    <section className="mt-12" aria-label={title}>
      <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
      <div className="mt-5 qsbs-card divide-y divide-border">
        {items.map((it) => (
          <details key={it.q} className="group p-5">
            <summary className="cursor-pointer font-medium text-foreground list-none flex justify-between items-start gap-4">
              <span>{it.q}</span>
              <span className="text-muted-foreground text-sm shrink-0 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
          </details>
        ))}
      </div>
      {pageUrl ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: items.map((it) => ({
                "@type": "Question",
                name: it.q,
                acceptedAnswer: { "@type": "Answer", text: it.a },
              })),
            }),
          }}
        />
      ) : null}
    </section>
  );
}
