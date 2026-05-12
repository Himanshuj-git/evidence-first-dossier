import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & security — QSBS Packet" },
      { name: "description", content: "How QSBS Packet handles your sensitive financial and tax-adjacent information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-16">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Privacy & security</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">Your packet is sensitive. We treat it that way.</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          A QSBS evidence packet contains personal, financial, and tax-adjacent information. Read this before you upload
          anything you would not put in an email to a stranger.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed">
          <Section title="What we store">
            <p>
              QSBS Packet stores the facts and evidence statuses you enter so you can return to them. Unless you have
              connected a backend, your packet is held locally in your browser. Document files themselves are referenced
              by metadata and are not transmitted unless you explicitly upload them to a connected vault.
            </p>
          </Section>
          <Section title="Visibility">
            <ul className="list-disc pl-5 space-y-1.5">
              <li><b>Private</b> — visible only to you.</li>
              <li><b>Unlisted review link</b> — anyone with the link can read; share only with your CPA or attorney.</li>
              <li><b>Archived</b> — hidden from your active list; still recoverable.</li>
            </ul>
            <p className="mt-2 text-muted-foreground">
              Unlisted links are a convenience, not a substitute for secure professional file transfer. Disable a link the
              moment review is finished.
            </p>
          </Section>
          <Section title="What we do not do">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>We do not sell or share your data with advertisers.</li>
              <li>We do not provide tax, legal, accounting, or investment advice.</li>
              <li>We do not certify, determine, or opine on QSBS eligibility.</li>
              <li>We do not contact your issuer, CPA, or counsel on your behalf.</li>
            </ul>
          </Section>
          <Section title="Recommendations before you upload">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Do not upload documents containing information you are not authorized to share.</li>
              <li>Redact or summarize where the underlying document is not strictly required.</li>
              <li>Use professional judgment before forwarding anything to a third party.</li>
              <li>Review your unlisted share links periodically and disable any that are no longer needed.</li>
            </ul>
          </Section>
          <Section title="Contact">
            <p>
              For privacy questions, write to <span className="text-foreground">privacy@qsbspacket.example</span>. For
              questions about how Section 1202 applies to your facts, contact a qualified tax professional —{" "}
              <Link to="/dossiers" className="qsbs-link">your packet</Link> is built for that conversation.
            </p>
          </Section>
        </div>

        <div className="mt-12">
          <Disclaimer />
        </div>
      </div>
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-medium">{title}</h2>
      <div className="mt-2 text-muted-foreground">{children}</div>
    </section>
  );
}
