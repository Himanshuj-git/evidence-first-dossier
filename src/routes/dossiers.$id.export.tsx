import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { useDossier, useQsbs } from "@/lib/qsbs/store";
import { trackEvent } from "@/lib/qsbs/analytics";

export const Route = createFileRoute("/dossiers/$id/export")({
  head: () => ({ meta: [{ title: "Export packet — 1202 Request" }] }),
  component: ExportPaywall,
});

function ExportPaywall() {
  const { id } = Route.useParams();
  const d = useDossier(id);
  const { paidPlans } = useQsbs();
  const nav = useNavigate();

  useEffect(() => { trackEvent("export_preview_viewed", { dossier_id: id }); }, [id]);

  if (!d) {
    return (
      <PageShell>
        <div className="mx-auto max-w-xl px-5 py-24 text-center">
          <h1 className="text-2xl font-medium">Holding not found</h1>
          <Link to="/dossiers" className="qsbs-btn qsbs-btn-primary mt-6">Back to holdings</Link>
        </div>
      </PageShell>
    );
  }

  const unlocked = d.paid_unlocked || paidPlans.includes("single") || paidPlans.includes("vault");
  const received = d.evidence.filter((e) => e.status === "received" || e.status === "reviewed").length;

  const Locked = ({ label }: { label: string }) => (
    <div className="relative qsbs-card p-5 overflow-hidden">
      <div className="select-none blur-sm pointer-events-none text-sm text-muted-foreground space-y-2">
        <div className="h-3 w-3/4 bg-muted rounded" />
        <div className="h-3 w-5/6 bg-muted rounded" />
        <div className="h-3 w-2/3 bg-muted rounded" />
        <div className="h-3 w-4/5 bg-muted rounded" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[1px]">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Locked</div>
        <div className="mt-1 text-sm font-medium">{label}</div>
      </div>
    </div>
  );

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-5 py-12">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Export preview</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">{d.inputs.issuer_name} — CPA-ready dossier</h1>
        <p className="mt-2 text-muted-foreground">Preview your packet before unlocking. The $49 One Holding Packet unlocks the full export.</p>

        {/* Free preview — cover + partial checklist */}
        <section className="mt-8 qsbs-card p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Cover page</div>
          <div className="mt-2 text-lg font-medium">Section 1202 Evidence Dossier — {d.inputs.issuer_name}</div>
          <div className="text-sm text-muted-foreground">Holder role: {d.inputs.user_role} · Security: {d.inputs.security_type.replace(/_/g, " ")} · Acquired: {d.inputs.acquisition_date}</div>
          <div className="qsbs-divider my-4" />
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Partial evidence checklist ({received} of {d.evidence.length} received)</div>
          <ul className="mt-2 text-sm space-y-1">
            {d.evidence.slice(0, 3).map((e) => (
              <li key={e.id} className="flex justify-between gap-3">
                <span>{e.title}</span>
                <span className="text-xs text-muted-foreground uppercase">{e.status.replace(/_/g, " ")}</span>
              </li>
            ))}
            {d.evidence.length > 3 && <li className="text-xs text-muted-foreground italic">+{d.evidence.length - 3} more in full packet</li>}
          </ul>
        </section>

        {/* Locked sections */}
        <section className="mt-8 grid sm:grid-cols-2 gap-3">
          <Locked label="Full issuer request letter" />
          <Locked label="Follow-up request templates" />
          <Locked label="CPA-ready review summary" />
          <Locked label="Document index" />
          <Locked label="Audit trail of request steps" />
          <Locked label="Full print/export packet" />
        </section>

        {/* Unlock CTA */}
        <section className="mt-8 qsbs-card p-6 md:p-8">
          {unlocked ? (
            <div>
              <div className="text-xs uppercase tracking-wider text-success">Unlocked</div>
              <div className="mt-1 text-xl font-medium">Your packet is unlocked.</div>
              <p className="mt-1 text-sm text-muted-foreground">Open the report or letter to view and print.</p>
              <div className="mt-4 flex gap-2 flex-wrap">
                <Link to="/dossiers/$id/report" params={{ id }} className="qsbs-btn qsbs-btn-primary">Open report</Link>
                <Link to="/dossiers/$id/request-letter" params={{ id }} className="qsbs-btn qsbs-btn-ghost">Open request letter</Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-xl font-medium">Unlock One Holding Packet — $49</div>
                <p className="text-sm text-muted-foreground mt-1">One-time. Includes the full export, all letter templates, document index, audit trail, and CPA summary.</p>
                <p className="text-xs text-muted-foreground mt-2 italic">Do not upload sensitive documents unless you trust the app environment.</p>
              </div>
              <div className="shrink-0 flex gap-2">
                <Link to="/checklist" className="qsbs-btn qsbs-btn-ghost">Free checklist</Link>
                <button className="qsbs-btn qsbs-btn-primary"
                  onClick={() => { trackEvent("checkout_started", { dossier_id: id }); nav({ to: "/checkout" }); }}>
                  Unlock — $49
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="mt-8"><Disclaimer /></div>
      </div>
    </PageShell>
  );
}
