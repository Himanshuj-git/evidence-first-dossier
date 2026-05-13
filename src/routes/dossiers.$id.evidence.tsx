import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, StatusChip, Disclaimer } from "@/components/qsbs/Layout";
import { useDossier, useQsbs } from "@/lib/qsbs/store";
import type { EvidenceCategory, EvidenceItem, EvidenceStatus, SourceParty } from "@/lib/qsbs/types";
import { PaywallModal } from "@/components/qsbs/PaywallModal";

export const Route = createFileRoute("/dossiers/$id/evidence")({
  head: () => ({ meta: [{ title: "Evidence vault — 1202 Request" }] }),
  component: EvidencePage,
});

const CATEGORIES: { k: EvidenceCategory; label: string }[] = [
  { k: "purchase_agreement", label: "Stock purchase / option exercise docs" },
  { k: "stock_certificate", label: "Stock certificate / ledger" },
  { k: "election_83b", label: "83(b) election proof" },
  { k: "board_approval", label: "Board approvals / grant agreement" },
  { k: "charter", label: "Charter / incorporation evidence" },
  { k: "c_corp_confirmation", label: "C-corp confirmation" },
  { k: "gross_assets", label: "Gross asset confirmation" },
  { k: "active_business", label: "Active business confirmation" },
  { k: "excluded_industry", label: "Excluded industry analysis" },
  { k: "redemption", label: "Redemption / buyback confirmation" },
  { k: "cap_table", label: "Cap table / issuer letter" },
  { k: "sale_exit", label: "Sale / exit documents" },
  { k: "professional_notes", label: "Tax professional notes" },
];

function EvidencePage() {
  const { id } = Route.useParams();
  const d = useDossier(id);
  const { addEvidence, updateEvidence, removeEvidence } = useQsbs();
  const [adding, setAdding] = useState(false);
  const [paywall, setPaywall] = useState(false);

  const FREE_LIMIT = 6;

  if (!d) return <PageShell><div className="px-5 py-12">Not found</div></PageShell>;

  const locked = !d.paid_unlocked && d.evidence.length >= FREE_LIMIT;

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="text-sm text-muted-foreground">
          <Link to="/dossiers" className="hover:text-foreground">Dossiers</Link>
          <span className="mx-2">/</span>
          <Link to="/dossiers/$id" params={{ id }} className="hover:text-foreground">{d.inputs.issuer_name}</Link>
          <span className="mx-2">/</span><span className="text-foreground">Evidence vault</span>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-medium">Evidence vault</h1>
            <p className="text-muted-foreground mt-1">Track every document a tax professional may need to review.</p>
          </div>
          <button
            className="qsbs-btn qsbs-btn-primary"
            onClick={() => locked ? setPaywall(true) : setAdding(true)}
          >
            + Add evidence
          </button>
        </div>

        {locked && (
          <div className="qsbs-card p-4 mt-6 bg-muted text-sm">
            Free dossiers are limited to {FREE_LIMIT} evidence items. Unlock unlimited items to continue.{" "}
            <button className="qsbs-link" onClick={() => setPaywall(true)}>Unlock</button>
          </div>
        )}

        {adding && (
          <AddForm
            onCancel={() => setAdding(false)}
            onSave={(item) => { addEvidence(id, item); setAdding(false); }}
          />
        )}

        <div className="mt-6 qsbs-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left p-3">Item</th>
                <th className="text-left p-3 hidden md:table-cell">Category</th>
                <th className="text-left p-3 hidden md:table-cell">Source</th>
                <th className="text-left p-3">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {d.evidence.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No evidence yet. Add the first document above.</td></tr>
              )}
              {d.evidence.map((e) => (
                <tr key={e.id} className="border-t border-border">
                  <td className="p-3 align-top">
                    <div className="font-medium">{e.title}</div>
                    {e.note ? <div className="text-xs text-muted-foreground mt-0.5">{e.note}</div> : null}
                    {e.external_link ? <a href={e.external_link} target="_blank" rel="noreferrer" className="qsbs-link text-xs">link</a> : null}
                  </td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground capitalize">{e.category.replace(/_/g, " ")}</td>
                  <td className="p-3 hidden md:table-cell text-muted-foreground capitalize">{e.source_party}</td>
                  <td className="p-3">
                    <select
                      className="qsbs-input py-1.5 text-xs"
                      value={e.status}
                      onChange={(ev) => updateEvidence(id, e.id, { status: ev.target.value as EvidenceStatus })}
                    >
                      <option value="missing">Missing</option>
                      <option value="requested">Requested</option>
                      <option value="received">Received</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="not_applicable">N/A</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => removeEvidence(id, e.id)} className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 text-xs text-muted-foreground">
          File uploads are demo storage. For production, connect Lovable Cloud storage to attach real files.
        </div>

        <div className="mt-8"><Disclaimer variant="compact" /></div>
      </div>

      <PaywallModal open={paywall} plan="single" onClose={() => setPaywall(false)} onConfirm={() => { setPaywall(false); /* unlock handled in pricing */ }} />
    </PageShell>
  );
}

function AddForm({ onCancel, onSave }: { onCancel: () => void; onSave: (i: Omit<EvidenceItem, "id" | "updated_at">) => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<EvidenceCategory>("purchase_agreement");
  const [source, setSource] = useState<SourceParty>("user");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<EvidenceStatus>("missing");

  return (
    <div className="qsbs-card p-5 mt-6 space-y-4">
      <div className="text-sm font-medium">Add evidence item</div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input className="qsbs-input" placeholder="Title (e.g. Subscription agreement)" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select className="qsbs-input" value={category} onChange={(e) => setCategory(e.target.value as EvidenceCategory)}>
          {CATEGORIES.map((c) => <option key={c.k} value={c.k}>{c.label}</option>)}
        </select>
        <select className="qsbs-input" value={source} onChange={(e) => setSource(e.target.value as SourceParty)}>
          <option value="user">Source: user</option><option value="issuer">Source: issuer</option>
          <option value="counsel">Source: counsel</option><option value="cpa">Source: CPA</option>
          <option value="platform">Source: platform</option>
        </select>
        <select className="qsbs-input" value={status} onChange={(e) => setStatus(e.target.value as EvidenceStatus)}>
          <option value="missing">Missing</option><option value="requested">Requested</option>
          <option value="received">Received</option><option value="reviewed">Reviewed</option>
          <option value="not_applicable">N/A</option>
        </select>
        <input className="qsbs-input sm:col-span-2" placeholder="External link (optional)" value={link} onChange={(e) => setLink(e.target.value)} />
        <textarea className="qsbs-input sm:col-span-2" placeholder="Note (optional)" rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <div className="flex justify-end gap-2">
        <button className="qsbs-btn qsbs-btn-ghost" onClick={onCancel}>Cancel</button>
        <button
          className="qsbs-btn qsbs-btn-primary"
          disabled={!title}
          onClick={() => onSave({ title, category, status, source_party: source, external_link: link || undefined, note: note || undefined })}
        >Save</button>
      </div>
    </div>
  );
}
