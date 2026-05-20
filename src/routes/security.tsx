import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — 1202 Request" },
      { name: "description", content: "How 1202 Request handles sensitive documents and guidance for shareholders preparing Section 1202 evidence." },
      { property: "og:title", content: "Security — 1202 Request" },
      { property: "og:description", content: "Sensitive-document guidance and security roadmap." },
      { property: "og:url", content: "https://1202request.com/security" },
    ],
    links: [{ rel: "canonical", href: "https://1202request.com/security" }],
  }),
  component: Security,
});

function Security() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Trust</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">Security &amp; sensitive documents</h1>
        <p className="mt-3 text-muted-foreground">
          Section 1202 evidence often involves cap tables, financial statements, and counsel-reviewed materials.
          Treat them accordingly.
        </p>

        <section className="mt-8 grid gap-4">
          <div className="qsbs-card p-5">
            <div className="text-sm font-medium">Do not upload sensitive documents unless you trust the app environment</div>
            <p className="mt-2 text-sm text-muted-foreground">
              In V1, your packet data is stored locally in your browser. Avoid pasting confidential issuer documents,
              cap tables, or personal identifiers into free-form notes. Use a secure channel (your firm's portal,
              encrypted email, or a known file-sharing platform) when sending evidence to your CPA or tax attorney.
            </p>
          </div>
          <div className="qsbs-card p-5">
            <div className="text-sm font-medium">Use secure sharing when sending requests to issuers</div>
            <p className="mt-2 text-sm text-muted-foreground">
              When you ask a company for evidence, request that they return documents through a secure channel they
              already use with shareholders.
            </p>
          </div>
          <div className="qsbs-card p-5">
            <div className="text-sm font-medium">Roadmap</div>
            <ul className="mt-2 text-sm text-muted-foreground space-y-1 list-disc pl-5">
              <li>Encrypted server-side storage for packet contents.</li>
              <li>Audit-trail export with cryptographic timestamps.</li>
              <li>Shared review links for CPAs and tax attorneys.</li>
            </ul>
          </div>
          <div className="qsbs-card p-5">
            <div className="text-sm font-medium">Report a vulnerability</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Email <a className="qsbs-link" href="mailto:security@1202request.com">security@1202request.com</a> with reproduction steps.
              For privacy questions, <a className="qsbs-link" href="mailto:privacy@1202request.com">privacy@1202request.com</a>.
            </p>
          </div>
        </section>

        <div className="mt-10"><Disclaimer /></div>
      </article>
    </PageShell>
  );
}
