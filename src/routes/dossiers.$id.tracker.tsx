import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, StatusChip, Disclaimer } from "@/components/qsbs/Layout";
import { useDossier, useQsbs } from "@/lib/qsbs/store";
import { requestStatuses, type RequestStatus } from "@/lib/qsbs/taxonomy";
import { useState } from "react";

export const Route = createFileRoute("/dossiers/$id/tracker")({
  head: () => ({ meta: [{ title: "Request tracker — 1202 Request" }] }),
  component: TrackerPage,
});

const STATUS_LABEL: Record<RequestStatus, string> = {
  not_requested: "Not requested",
  request_drafted: "Request drafted",
  sent: "Sent",
  company_replied: "Company replied",
  evidence_received: "Evidence received",
  company_unable_to_provide: "Company unable to provide",
  needs_counsel_review: "Needs counsel review",
  cpa_review_ready: "CPA review ready",
};

interface TrackedRequest {
  id: string;
  category: string;
  recipient: string;
  status: RequestStatus;
  sent_at?: string;
  follow_up_at?: string;
  note?: string;
}

const STORAGE_PREFIX = "qsbs.tracker.v1.";

function loadTracker(id: string): TrackedRequest[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(STORAGE_PREFIX + id) || "[]"); } catch { return []; }
}
function saveTracker(id: string, items: TrackedRequest[]) {
  try { localStorage.setItem(STORAGE_PREFIX + id, JSON.stringify(items)); } catch {}
}

const DEFAULTS = (issuer: string): TrackedRequest[] => [
  { id: "r1", category: "C-corp status confirmation", recipient: `cfo@${issuer.toLowerCase().replace(/[^a-z0-9]/g, "") || "company"}.com`, status: "request_drafted" },
  { id: "r2", category: "Gross asset evidence", recipient: "", status: "not_requested" },
  { id: "r3", category: "Active business support", recipient: "", status: "not_requested" },
  { id: "r4", category: "Redemption history", recipient: "", status: "not_requested" },
  { id: "r5", category: "Cap table / issuance record", recipient: "", status: "not_requested" },
];

function TrackerPage() {
  const { id } = Route.useParams();
  const d = useDossier(id);
  const { logAudit } = useQsbs();
  const [items, setItems] = useState<TrackedRequest[]>(() => {
    const stored = loadTracker(id);
    return stored.length ? stored : (d ? DEFAULTS(d.inputs.issuer_name) : []);
  });

  if (!d) return <PageShell><div className="px-5 py-12">Not found</div></PageShell>;

  const update = (rid: string, patch: Partial<TrackedRequest>) => {
    setItems((prev) => {
      const next = prev.map((i) => i.id === rid ? { ...i, ...patch } : i);
      saveTracker(id, next);
      const item = next.find((i) => i.id === rid);
      if (patch.status && item) {
        logAudit({ dossier_id: id, actor: "user", action: "request_status_changed", detail: `${item.category}: ${patch.status}` });
      }
      return next;
    });
  };

  const addRow = () => {
    setItems((prev) => {
      const next = [...prev, { id: Math.random().toString(36).slice(2, 8), category: "Custom request", recipient: "", status: "not_requested" as RequestStatus }];
      saveTracker(id, next);
      return next;
    });
  };

  const total = items.length;
  const closed = items.filter((i) => i.status === "evidence_received" || i.status === "cpa_review_ready").length;
  const blocked = items.filter((i) => i.status === "company_unable_to_provide" || i.status === "needs_counsel_review").length;

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="text-sm text-muted-foreground">
          <Link to="/dossiers" className="hover:text-foreground">Holdings</Link>
          <span className="mx-2">/</span>
          <Link to="/dossiers/$id" params={{ id }} className="hover:text-foreground">{d.inputs.issuer_name}</Link>
          <span className="mx-2">/</span><span className="text-foreground">Request tracker</span>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-medium">Issuer request tracker</h1>
            <p className="text-muted-foreground mt-1">Track every issuer request — from drafted, to sent, to received or blocked.</p>
          </div>
          <div className="text-sm text-right text-muted-foreground">
            <div><span className="text-foreground tabular-nums">{closed}</span> / {total} closed</div>
            {blocked > 0 ? <div className="text-destructive">{blocked} blocked or escalated</div> : null}
          </div>
        </div>

        <div className="qsbs-card mt-6 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left p-3">Request</th>
                <th className="text-left p-3 hidden md:table-cell">Recipient</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3 hidden md:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-t border-border align-top">
                  <td className="p-3">
                    <input className="qsbs-input text-sm" value={r.category}
                      onChange={(e) => update(r.id, { category: e.target.value })} />
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <input className="qsbs-input text-sm" placeholder="cfo@company.com" value={r.recipient}
                      onChange={(e) => update(r.id, { recipient: e.target.value })} />
                  </td>
                  <td className="p-3">
                    <select className="qsbs-input text-sm" value={r.status}
                      onChange={(e) => update(r.id, { status: e.target.value as RequestStatus })}>
                      {requestStatuses.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                    </select>
                    <div className="mt-2"><StatusChip status={
                      r.status === "evidence_received" || r.status === "cpa_review_ready" ? "received"
                      : r.status === "company_unable_to_provide" ? "blocked"
                      : r.status === "needs_counsel_review" ? "red_flag"
                      : r.status === "sent" || r.status === "company_replied" ? "sent"
                      : r.status === "request_drafted" ? "requested"
                      : "missing"
                    } /></div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <input className="qsbs-input text-sm" placeholder="Follow-up note" value={r.note || ""}
                      onChange={(e) => update(r.id, { note: e.target.value })} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <button className="qsbs-btn qsbs-btn-ghost" onClick={addRow}>+ Add request row</button>
          <Link to="/dossiers/$id/request-letter" params={{ id }} className="qsbs-btn qsbs-btn-ghost">Generate issuer letter →</Link>
          <Link to="/dossiers/$id/cpa" params={{ id }} className="qsbs-btn qsbs-btn-ghost">CPA reviewer view →</Link>
        </div>

        <div className="mt-8"><Disclaimer variant="compact" /></div>
      </div>
    </PageShell>
  );
}
