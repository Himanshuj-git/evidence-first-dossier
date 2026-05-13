import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, StatusChip, Disclaimer } from "@/components/qsbs/Layout";
import { useDossier } from "@/lib/qsbs/store";
import { buildRules } from "@/lib/qsbs/rules";

export const Route = createFileRoute("/dossiers/$id/issuer")({
  head: () => ({ meta: [{ title: "Issuer view — 1202 Request" }] }),
  component: IssuerView,
});

function IssuerView() {
  const { id } = Route.useParams();
  const d = useDossier(id);
  if (!d) return <PageShell><div className="px-5 py-12">Not found</div></PageShell>;

  const rules = buildRules(d.inputs, d.evidence);
  const requested = rules.filter((r) => r.status === "missing" || r.status === "red_flag");

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-10">
        <div className="text-sm text-muted-foreground">
          <Link to="/dossiers/$id" params={{ id }} className="hover:text-foreground">{d.inputs.issuer_name}</Link>
          <span className="mx-2">/</span><span className="text-foreground">Issuer view</span>
        </div>
        <div className="mt-4">
          <span className="qsbs-chip qsbs-chip-muted">Issuer / company response view</span>
          <h1 className="mt-2 text-3xl font-medium">Shareholder evidence request</h1>
          <p className="text-muted-foreground mt-1">
            A shareholder of <span className="text-foreground">{d.inputs.issuer_name}</span> is preparing factual
            documentation for review by their tax professional. Your team is being asked to confirm or provide the
            following — not to provide tax advice.
          </p>
        </div>

        <div className="qsbs-card p-6 mt-6">
          <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Request context</div>
          <dl className="mt-2 text-sm grid sm:grid-cols-2 gap-x-6 gap-y-1">
            <div className="flex justify-between"><dt className="text-muted-foreground">Issuance date</dt><dd>{d.inputs.acquisition_date || "—"}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Security</dt><dd className="capitalize">{d.inputs.security_type.replace(/_/g, " ")}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Method</dt><dd className="capitalize">{d.inputs.acquisition_method.replace(/_/g, " ")}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shareholder</dt><dd className="capitalize">{d.inputs.user_role} · {d.inputs.shareholder_type}</dd></div>
          </dl>
        </div>

        <div className="qsbs-card p-6 mt-6">
          <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Evidence requested</div>
          {requested.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No outstanding requests on file.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {requested.map((r) => (
                <li key={r.key} className="border-b border-border pb-3 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-sm">{r.title}</div>
                    <StatusChip status={r.status} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{r.evidence_needed}</div>
                  <div className="mt-2 flex gap-2 text-xs">
                    <button className="qsbs-btn qsbs-btn-ghost text-xs py-1.5 px-3">Mark provided</button>
                    <button className="qsbs-btn qsbs-btn-ghost text-xs py-1.5 px-3">Mark needs counsel review</button>
                    <button className="qsbs-btn qsbs-btn-ghost text-xs py-1.5 px-3">Mark unable to provide</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="qsbs-card p-6 mt-6 bg-muted">
          <div className="text-sm font-medium">Note for the company</div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            The shareholder is not asking the company for personal tax advice. They are requesting factual records to
            forward to their qualified tax professional. If your team prefers a single, counsel-reviewed response
            packet that can be reused across multiple shareholders, see the <Link to="/company" className="qsbs-link">Company Portal</Link>.
          </p>
        </div>

        <div className="mt-8"><Disclaimer variant="compact" /></div>
      </div>
    </PageShell>
  );
}
