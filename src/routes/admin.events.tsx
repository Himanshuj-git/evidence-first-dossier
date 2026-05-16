import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/qsbs/Layout";
import { clearEvents, getEvents, getLeads, type ProductEvent, type Lead, type EventName } from "@/lib/qsbs/analytics";

export const Route = createFileRoute("/admin/events")({
  head: () => ({ meta: [{ title: "Internal demo analytics — 1202 Request" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminEvents,
});

const FUNNEL: EventName[] = ["landing_cta_clicked", "checklist_submitted", "packet_started", "export_preview_viewed", "checkout_started", "checkout_success"];

function AdminEvents() {
  const [events, setEvents] = useState<ProductEvent[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  const refresh = () => { setEvents(getEvents()); setLeads(getLeads()); };
  useEffect(() => { refresh(); }, []);

  const counts: Record<string, number> = {};
  events.forEach((e) => { counts[e.event_name] = (counts[e.event_name] || 0) + 1; });

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="qsbs-chip qsbs-chip-amber inline-flex">Internal demo analytics</div>
        <h1 className="mt-3 text-3xl font-medium tracking-tight">Events & conversion funnel</h1>
        <p className="mt-2 text-sm text-muted-foreground">Local-only event log. In production, these would be persisted to a <code className="text-xs">product_events</code> table.</p>

        <div className="mt-6 flex gap-2">
          <button className="qsbs-btn qsbs-btn-ghost text-sm py-1.5 px-3" onClick={refresh}>Refresh</button>
          <button className="qsbs-btn qsbs-btn-ghost text-sm py-1.5 px-3" onClick={() => { clearEvents(); refresh(); }}>Clear events</button>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-medium">Conversion funnel</h2>
          <div className="mt-3 qsbs-card divide-y divide-border">
            {FUNNEL.map((step) => (
              <div key={step} className="p-3 flex items-center justify-between text-sm">
                <span className="font-medium">{step}</span>
                <span className="tabular-nums">{counts[step] || 0}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-medium">All event counts</h2>
          <div className="mt-3 grid sm:grid-cols-2 gap-2">
            {Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
              <div key={k} className="qsbs-card p-3 flex items-center justify-between text-sm">
                <span>{k}</span><span className="tabular-nums font-medium">{v}</span>
              </div>
            ))}
            {Object.keys(counts).length === 0 && <div className="text-sm text-muted-foreground">No events yet.</div>}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-medium">Recent events</h2>
          <div className="mt-3 qsbs-card divide-y divide-border max-h-96 overflow-auto">
            {events.slice(0, 100).map((e) => (
              <div key={e.id} className="p-3 text-xs flex items-center gap-3">
                <span className="tabular-nums text-muted-foreground w-44 shrink-0">{new Date(e.created_at).toLocaleString()}</span>
                <span className="font-medium w-48 shrink-0">{e.event_name}</span>
                <span className="text-muted-foreground w-32 shrink-0">{e.route}</span>
                <span className="text-muted-foreground truncate">{JSON.stringify(e.metadata)}</span>
              </div>
            ))}
            {events.length === 0 && <div className="p-3 text-sm text-muted-foreground">No events yet.</div>}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-medium">Captured leads ({leads.length})</h2>
          <div className="mt-3 qsbs-card divide-y divide-border">
            {leads.slice(0, 50).map((l) => (
              <div key={l.id} className="p-3 text-sm flex flex-wrap gap-3 items-center">
                <span className="font-medium">{l.email}</span>
                <span className="text-muted-foreground">{l.role}</span>
                <span className="text-muted-foreground">{l.event_type}</span>
                <span className="text-muted-foreground">{l.holdings_count} holding(s)</span>
                <span className="text-muted-foreground text-xs ml-auto">{l.source_page} · {new Date(l.created_at).toLocaleDateString()}</span>
              </div>
            ))}
            {leads.length === 0 && <div className="p-3 text-sm text-muted-foreground">No leads captured yet.</div>}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
