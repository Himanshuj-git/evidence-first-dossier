import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, ScoreRing, StatusChip } from "@/components/qsbs/Layout";
import { useQsbs } from "@/lib/qsbs/store";
import { summarize } from "@/lib/qsbs/rules";

export const Route = createFileRoute("/dossiers")({
  head: () => ({
    meta: [
      { title: "Holdings — 1202 Request" },
      { name: "description", content: "All your Section 1202 evidence dossiers in one place." },
    ],
  }),
  component: DossiersList,
});

type Filter = "all" | "missing" | "ready" | "red";

function DossiersList() {
  const { dossiers } = useQsbs();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = dossiers.filter((d) => {
    const s = summarize(d);
    if (filter === "missing") return s.missing > 0;
    if (filter === "ready") return s.score >= 85 && s.red === 0;
    if (filter === "red") return s.red > 0;
    return d.status !== "archived";
  });

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium">Holdings</h1>
            <p className="mt-1 text-muted-foreground">Each holding is one stock position with its own evidence dossier and issuer requests.</p>
          </div>
          <Link to="/dossiers/new" className="qsbs-btn qsbs-btn-primary">+ New holding</Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          {([
            ["all", "All"],
            ["missing", "Missing evidence"],
            ["ready", "Ready for CPA review"],
            ["red", "Red flags"],
          ] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-3 py-1.5 rounded-full border ${filter === k ? "bg-foreground text-background border-foreground" : "border-border hover:bg-accent"}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {filtered.length === 0 && (
            <div className="qsbs-card p-8 text-center text-muted-foreground col-span-full">
              No dossiers match this filter.
            </div>
          )}
          {filtered.map((d) => {
            const s = summarize(d);
            return (
              <Link key={d.id} to="/dossiers/$id" params={{ id: d.id }} className="qsbs-card p-6 hover:border-foreground transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      {d.is_demo ? <span className="qsbs-chip qsbs-chip-muted">Demo</span> : null}
                      {d.inputs.security_type.replace(/_/g, " ")}
                    </div>
                    <div className="mt-1 text-lg font-medium truncate">{d.inputs.issuer_name || "Untitled dossier"}</div>
                    <div className="text-sm text-muted-foreground">Acquired {d.inputs.acquisition_date || "—"} · {d.inputs.user_role}</div>
                  </div>
                  <ScoreRing score={s.score} />
                </div>
                <div className="qsbs-divider my-4" />
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <StatusChip status={d.status} />
                    {s.missing > 0 ? <span className="qsbs-chip qsbs-chip-amber">{s.missing} missing</span> : null}
                    {s.red > 0 ? <span className="qsbs-chip qsbs-chip-red">{s.red} red flag</span> : null}
                  </div>
                  <span className="text-xs text-muted-foreground">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
