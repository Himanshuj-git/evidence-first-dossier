import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { useDossier, useQsbs } from "@/lib/qsbs/store";
import { LETTER_TEMPLATES } from "@/lib/qsbs/letters";

export const Route = createFileRoute("/dossiers/$id/request-letter")({
  head: () => ({ meta: [{ title: "Issuer request letter — QSBS Packet" }] }),
  component: LetterPage,
});

function LetterPage() {
  const { id } = Route.useParams();
  const d = useDossier(id);
  const { addLetter } = useQsbs();
  const [picked, setPicked] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [copied, setCopied] = useState(false);

  const tpl = LETTER_TEMPLATES[picked];
  const subject = useMemo(() => (d ? tpl.subject(d) : ""), [tpl, d]);
  const initial = useMemo(() => (d ? tpl.body(d) : ""), [tpl, d]);
  const [body, setBody] = useState(initial);

  // Reset body when template changes
  useMemo(() => setBody(initial), [initial]);

  if (!d) return <PageShell><div className="px-5 py-12">Not found</div></PageShell>;

  const copy = async () => {
    await navigator.clipboard.writeText(`Subject: ${subject}\nTo: ${recipient}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-5 py-10">
        <div className="text-sm text-muted-foreground">
          <Link to="/dossiers" className="hover:text-foreground">Dossiers</Link>
          <span className="mx-2">/</span>
          <Link to="/dossiers/$id" params={{ id }} className="hover:text-foreground">{d.inputs.issuer_name}</Link>
          <span className="mx-2">/</span><span className="text-foreground">Request letter</span>
        </div>

        <h1 className="mt-4 text-3xl font-medium">Issuer request letter</h1>
        <p className="text-muted-foreground">Professional, concise templates. Edit before sending.</p>

        <div className="mt-6 grid lg:grid-cols-[260px_1fr] gap-6">
          <div className="space-y-2">
            {LETTER_TEMPLATES.map((t, i) => (
              <button key={t.type} onClick={() => setPicked(i)}
                className={`w-full text-left p-3 rounded-lg border ${i === picked ? "border-foreground bg-accent" : "border-border hover:border-foreground"}`}>
                <div className="text-sm font-medium">{t.label}</div>
              </button>
            ))}
          </div>

          <div className="qsbs-card p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="block">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Recipient</div>
                <input className="qsbs-input mt-1" placeholder="cfo@company.com" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
              </label>
              <label className="block">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">Subject</div>
                <input className="qsbs-input mt-1" value={subject} readOnly />
              </label>
            </div>
            <label className="block">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">Body</div>
              <textarea className="qsbs-input mt-1 font-serif leading-relaxed" rows={18} value={body} onChange={(e) => setBody(e.target.value)} />
            </label>
            <div className="flex flex-wrap gap-2 justify-end">
              <button className="qsbs-btn qsbs-btn-ghost" onClick={() => setBody(initial)}>Reset</button>
              <button className="qsbs-btn qsbs-btn-ghost"
                onClick={() => { addLetter(id, { letter_type: tpl.type, subject, recipient, body }); }}>
                Save to dossier
              </button>
              <button className="qsbs-btn qsbs-btn-primary" onClick={copy}>{copied ? "Copied" : "Copy to clipboard"}</button>
            </div>
          </div>
        </div>

        <div className="mt-8"><Disclaimer variant="compact" /></div>
      </div>
    </PageShell>
  );
}
