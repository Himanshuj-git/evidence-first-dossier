import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CheckoutIntent, Dossier, DossierInputs, EvidenceItem, RequestLetter } from "./types";
import { seedDossiers } from "./seed";

const STORAGE_KEY = "qsbs.packet.v1";
const PAY_KEY = "qsbs.paid.v1";
const SETTINGS_KEY = "qsbs.settings.v1";
const AUDIT_KEY = "qsbs.audit.v1";

export interface AuditEvent {
  id: string;
  ts: string;
  dossier_id?: string;
  actor: "user" | "system";
  action: string;
  detail?: string;
}

interface State {
  dossiers: Dossier[];
  intents: CheckoutIntent[];
  paidPlans: string[];
  audit: AuditEvent[];
  settings: { stripe_single?: string; stripe_vault?: string; stripe_portal?: string; email?: string; share_anonymous_metadata?: boolean };
}

interface StoreCtx extends State {
  createDossier: (inputs: DossierInputs) => string;
  updateInputs: (id: string, inputs: Partial<DossierInputs>) => void;
  deleteDossier: (id: string) => void;
  archiveDossier: (id: string) => void;
  addEvidence: (id: string, item: Omit<EvidenceItem, "id" | "updated_at">) => void;
  updateEvidence: (id: string, evId: string, patch: Partial<EvidenceItem>) => void;
  removeEvidence: (id: string, evId: string) => void;
  addLetter: (id: string, letter: Omit<RequestLetter, "id" | "created_at">) => string;
  removeLetter: (id: string, letterId: string) => void;
  recordCheckout: (plan: CheckoutIntent["plan_key"]) => CheckoutIntent;
  unlockDossier: (id: string) => void;
  resetDemo: () => void;
  saveSettings: (s: Partial<State["settings"]>) => void;
  logAudit: (e: Omit<AuditEvent, "id" | "ts">) => void;
}

const Ctx = createContext<StoreCtx | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10);

function loadInitial(): State {
  if (typeof window === "undefined") {
    return { dossiers: seedDossiers, intents: [], paidPlans: [], audit: [], settings: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const paid = JSON.parse(localStorage.getItem(PAY_KEY) || "[]");
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    const audit = JSON.parse(localStorage.getItem(AUDIT_KEY) || "[]");
    if (raw) {
      const parsed = JSON.parse(raw) as { dossiers: Dossier[]; intents: CheckoutIntent[] };
      const ids = new Set(parsed.dossiers.map((d) => d.id));
      const merged = [...parsed.dossiers, ...seedDossiers.filter((d) => !ids.has(d.id))];
      return { dossiers: merged, intents: parsed.intents || [], paidPlans: paid, audit, settings };
    }
  } catch {}
  return { dossiers: seedDossiers, intents: [], paidPlans: [], audit: [], settings: {} };
}

export function QsbsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(() => loadInitial());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ dossiers: state.dossiers, intents: state.intents }));
      localStorage.setItem(PAY_KEY, JSON.stringify(state.paidPlans));
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
      localStorage.setItem(AUDIT_KEY, JSON.stringify(state.audit.slice(0, 500)));
    } catch {}
  }, [state]);

  const value = useMemo<StoreCtx>(() => {
    const upd = (id: string, fn: (d: Dossier) => Dossier) =>
      setState((s) => ({
        ...s,
        dossiers: s.dossiers.map((d) => (d.id === id ? { ...fn(d), updated_at: new Date().toISOString() } : d)),
      }));

    return {
      ...state,
      createDossier: (inputs) => {
        const id = uid();
        const d: Dossier = {
          id,
          inputs,
          status: "draft",
          paid_unlocked: false,
          evidence: [],
          letters: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setState((s) => ({ ...s, dossiers: [d, ...s.dossiers] }));
        return id;
      },
      updateInputs: (id, patch) => upd(id, (d) => ({ ...d, inputs: { ...d.inputs, ...patch } })),
      deleteDossier: (id) => setState((s) => ({ ...s, dossiers: s.dossiers.filter((d) => d.id !== id) })),
      archiveDossier: (id) => upd(id, (d) => ({ ...d, status: "archived" })),
      addEvidence: (id, item) =>
        upd(id, (d) => ({
          ...d,
          evidence: [...d.evidence, { ...item, id: uid(), updated_at: new Date().toISOString() }],
        })),
      updateEvidence: (id, evId, patch) =>
        upd(id, (d) => ({
          ...d,
          evidence: d.evidence.map((e) =>
            e.id === evId ? { ...e, ...patch, updated_at: new Date().toISOString() } : e,
          ),
        })),
      removeEvidence: (id, evId) =>
        upd(id, (d) => ({ ...d, evidence: d.evidence.filter((e) => e.id !== evId) })),
      addLetter: (id, letter) => {
        const lid = uid();
        upd(id, (d) => ({
          ...d,
          letters: [...d.letters, { ...letter, id: lid, created_at: new Date().toISOString() }],
        }));
        return lid;
      },
      removeLetter: (id, lid) =>
        upd(id, (d) => ({ ...d, letters: d.letters.filter((l) => l.id !== lid) })),
      recordCheckout: (plan) => {
        const amounts = { single: 4900, vault: 14900, portal: 29900 } as const;
        const intent: CheckoutIntent = {
          id: uid(),
          plan_key: plan,
          amount_cents: amounts[plan],
          status: "placeholder",
          created_at: new Date().toISOString(),
        };
        setState((s) => ({ ...s, intents: [intent, ...s.intents], paidPlans: Array.from(new Set([...s.paidPlans, plan])) }));
        return intent;
      },
      unlockDossier: (id) => upd(id, (d) => ({ ...d, paid_unlocked: true })),
      resetDemo: () => {
        try {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(PAY_KEY);
        } catch {}
        setState({ dossiers: seedDossiers, intents: [], paidPlans: [], audit: [], settings: state.settings });
      },
      saveSettings: (s) => setState((prev) => ({ ...prev, settings: { ...prev.settings, ...s } })),
      logAudit: (e) => setState((prev) => ({
        ...prev,
        audit: [{ id: uid(), ts: new Date().toISOString(), ...e }, ...prev.audit].slice(0, 500),
      })),
    };
  }, [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useQsbs() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useQsbs outside provider");
  return ctx;
}

export function useDossier(id: string | undefined) {
  const { dossiers } = useQsbs();
  return dossiers.find((d) => d.id === id);
}
