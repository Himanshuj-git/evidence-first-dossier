import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { useQsbs } from "@/lib/qsbs/store";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — QSBS Packet" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, saveSettings, paidPlans, intents } = useQsbs();
  const [s, setS] = useState(settings);
  const [saved, setSaved] = useState(false);

  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-12 space-y-10">
        <div>
          <h1 className="text-3xl font-medium">Settings</h1>
          <p className="text-muted-foreground">Account, privacy, and billing placeholders.</p>
        </div>

        <section className="qsbs-card p-6">
          <h2 className="text-lg font-medium">Account</h2>
          <label className="block mt-4">
            <div className="text-sm font-medium">Email</div>
            <input className="qsbs-input mt-2" value={s.email || ""} onChange={(e) => setS({ ...s, email: e.target.value })} placeholder="you@example.com" />
          </label>
          <p className="mt-2 text-xs text-muted-foreground">Authentication is not connected in this MVP. Connect Lovable Cloud to enable user accounts and per-user dossiers.</p>
        </section>

        <section className="qsbs-card p-6">
          <h2 className="text-lg font-medium">Stripe Payment Links</h2>
          <p className="text-sm text-muted-foreground mt-1">Paste Stripe Payment Link URLs to wire up real checkout. Buttons fall back to local simulation when empty.</p>
          <div className="mt-4 space-y-3">
            {[
              { k: "stripe_single", label: "One Holding Packet ($49)" },
              { k: "stripe_vault", label: "Multi-Holding Vault ($149/yr)" },
              { k: "stripe_portal", label: "Founder / Company Portal ($299/yr)" },
            ].map((row) => (
              <label key={row.k} className="block">
                <div className="text-sm font-medium">{row.label}</div>
                <input
                  className="qsbs-input mt-1"
                  placeholder="https://buy.stripe.com/..."
                  value={(s as Record<string, string | undefined>)[row.k] || ""}
                  onChange={(e) => setS({ ...s, [row.k]: e.target.value })}
                />
              </label>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button className="qsbs-btn qsbs-btn-primary" onClick={() => { saveSettings(s); setSaved(true); setTimeout(() => setSaved(false), 1500); }}>
              {saved ? "Saved" : "Save settings"}
            </button>
          </div>
        </section>

        <section className="qsbs-card p-6">
          <h2 className="text-lg font-medium">Billing</h2>
          <div className="mt-3 text-sm">
            <div className="text-muted-foreground">Active plans (simulated):</div>
            <div className="mt-1 flex flex-wrap gap-2">
              {paidPlans.length === 0 ? <span className="text-muted-foreground text-xs">None</span> : paidPlans.map((p) => <span key={p} className="qsbs-chip qsbs-chip-green">{p}</span>)}
            </div>
          </div>
          <div className="mt-4 text-sm">
            <div className="text-muted-foreground">Recent checkout intents:</div>
            <div className="mt-1 space-y-1">
              {intents.slice(0, 5).map((i) => (
                <div key={i.id} className="text-xs flex justify-between border-b border-border py-1">
                  <span>{i.plan_key} · ${(i.amount_cents / 100).toFixed(2)}</span>
                  <span className="text-muted-foreground">{new Date(i.created_at).toLocaleString()}</span>
                </div>
              ))}
              {intents.length === 0 && <div className="text-xs text-muted-foreground">None recorded.</div>}
            </div>
          </div>
        </section>

        <section className="qsbs-card p-6">
          <h2 className="text-lg font-medium">Privacy</h2>
          <p className="text-sm text-muted-foreground mt-1">
            All dossier data is currently stored locally in your browser. To enable secure server-side storage with row-level
            security, connect Lovable Cloud and migrate the local mock store to the documented schema.
          </p>
        </section>

        <Disclaimer />
      </div>
    </PageShell>
  );
}
