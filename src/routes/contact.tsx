import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — 1202 Request" },
      { name: "description", content: "Get in touch with the 1202 Request team about Section 1202 evidence packets, support, privacy, or security." },
      { property: "og:title", content: "Contact — 1202 Request" },
      { property: "og:description", content: "Reach our team about packets, support, privacy, or security." },
      { property: "og:url", content: "https://1202request.com/contact" },
      { name: "twitter:title", content: "Contact — 1202 Request" },
      { name: "twitter:description", content: "Reach our team about packets, support, privacy, or security." },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/contact" }],
  }),

  component: Contact,
});

const channels = [
  { label: "General", email: "hello@1202request.com", note: "Product questions, partnerships, press." },
  { label: "Support", email: "support@1202request.com", note: "Help with packets, exports, or refunds." },
  { label: "Privacy", email: "privacy@1202request.com", note: "Data and privacy questions." },
  { label: "Security", email: "security@1202request.com", note: "Responsible disclosure of vulnerabilities." },
];

function Contact() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Contact</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">How to reach us</h1>
        <p className="mt-3 text-muted-foreground">
          We read every email. We do not provide tax, legal, accounting, or investment advice — please direct
          eligibility questions to your CPA or tax attorney.
        </p>

        <section className="mt-8 grid sm:grid-cols-2 gap-4">
          {channels.map((c) => (
            <div key={c.email} className="qsbs-card p-5">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
              <a className="mt-1 block text-base font-medium qsbs-link" href={`mailto:${c.email}`}>{c.email}</a>
              <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </section>

        <div className="mt-10"><Disclaimer /></div>
      </article>
    </PageShell>
  );
}
