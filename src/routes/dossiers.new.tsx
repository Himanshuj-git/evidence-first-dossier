import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Disclaimer } from "@/components/qsbs/Layout";
import { useQsbs } from "@/lib/qsbs/store";
import type { DossierInputs } from "@/lib/qsbs/types";

export const Route = createFileRoute("/dossiers/new")({
  head: () => ({
    meta: [{ title: "New dossier — 1202 Request" }, { name: "description", content: "Create a new Section 1202 evidence dossier." }],
  }),
  component: NewDossier,
});

const initial: DossierInputs = {
  user_role: "founder",
  issuer_name: "",
  security_type: "founder_stock",
  acquisition_date: "",
  acquisition_method: "direct_issuer",
  shareholder_type: "individual",
  c_corp_status: "unknown",
  gross_assets: "unknown",
  active_business: "unknown",
  excluded_risk: "unknown",
  redemption_history: "unknown",
  election_83b: "unknown",
};

function NewDossier() {
  const [d, setD] = useState<DossierInputs>(initial);
  const { createDossier } = useQsbs();
  const nav = useNavigate();

  const set = <K extends keyof DossierInputs>(k: K, v: DossierInputs[K]) => setD((p) => ({ ...p, [k]: v }));

  return (
    <PageShell>
      <div className="mx-auto max-w-2xl px-5 py-12">
        <h1 className="text-3xl font-medium">Create a dossier</h1>
        <p className="mt-1 text-muted-foreground">Start from scratch — you can refine the rule checks and evidence after creation.</p>

        <div className="qsbs-card p-6 mt-8 space-y-5">
          <label className="block">
            <div className="text-sm font-medium">Issuer / company name</div>
            <input className="qsbs-input mt-2" value={d.issuer_name} onChange={(e) => set("issuer_name", e.target.value)} />
          </label>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <div className="text-sm font-medium">Your role</div>
              <select className="qsbs-input mt-2" value={d.user_role} onChange={(e) => set("user_role", e.target.value as DossierInputs["user_role"])}>
                <option value="founder">Founder</option><option value="employee">Employee</option>
                <option value="investor">Investor</option><option value="cpa">CPA</option>
              </select>
            </label>
            <label className="block">
              <div className="text-sm font-medium">Security type</div>
              <select className="qsbs-input mt-2" value={d.security_type} onChange={(e) => set("security_type", e.target.value as DossierInputs["security_type"])}>
                <option value="founder_stock">Founder stock</option>
                <option value="rsa">RSA</option><option value="iso">ISO</option><option value="nso">NSO</option>
                <option value="preferred">Preferred</option><option value="common">Common</option>
                <option value="safe_converted">SAFE converted</option><option value="spv">SPV</option>
                <option value="unknown">Unknown</option>
              </select>
            </label>
            <label className="block">
              <div className="text-sm font-medium">Acquisition date</div>
              <input type="date" className="qsbs-input mt-2" value={d.acquisition_date} onChange={(e) => set("acquisition_date", e.target.value)} />
            </label>
            <label className="block">
              <div className="text-sm font-medium">Planned exit (optional)</div>
              <input type="date" className="qsbs-input mt-2" value={d.planned_exit_date || ""} onChange={(e) => set("planned_exit_date", e.target.value)} />
            </label>
            <label className="block">
              <div className="text-sm font-medium">Acquisition method</div>
              <select className="qsbs-input mt-2" value={d.acquisition_method} onChange={(e) => set("acquisition_method", e.target.value as DossierInputs["acquisition_method"])}>
                <option value="direct_issuer">Direct from issuer</option>
                <option value="secondary">Secondary</option>
                <option value="unknown">Unknown</option>
              </select>
            </label>
            <label className="block">
              <div className="text-sm font-medium">Shareholder type</div>
              <select className="qsbs-input mt-2" value={d.shareholder_type} onChange={(e) => set("shareholder_type", e.target.value as DossierInputs["shareholder_type"])}>
                <option value="individual">Individual</option><option value="trust">Trust</option>
                <option value="estate">Estate</option><option value="partnership">Partnership</option>
                <option value="corporation">Corporation</option><option value="unknown">Unknown</option>
              </select>
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <button className="qsbs-btn qsbs-btn-primary"
              onClick={() => {
                if (!d.issuer_name) return;
                const id = createDossier(d);
                import("@/lib/qsbs/analytics").then(({ trackEvent }) => trackEvent("packet_started", { dossier_id: id }));
                nav({ to: "/dossiers/$id", params: { id } });
              }}>Create dossier</button>
          </div>
        </div>

        <div className="mt-6"><Disclaimer variant="compact" /></div>
      </div>
    </PageShell>
  );
}
