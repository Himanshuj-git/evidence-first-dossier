// Lightweight local analytics + lead capture. Backend-ready shape; localStorage today.

export type EventName =
  | "landing_cta_clicked"
  | "sample_dossier_viewed"
  | "checklist_started"
  | "checklist_submitted"
  | "pricing_viewed"
  | "packet_started"
  | "issuer_request_generated"
  | "export_preview_viewed"
  | "checkout_started"
  | "checkout_success"
  | "checkout_cancelled"
  | "email_captured"
  | "paid_gate_viewed"
  | "payment_link_clicked"
  | "lead_captured"
  | "homepage_viewed"
  | "demo_viewed"
  | "checklist_viewed"
  | "holding_created"
  | "evidence_generated"
  | "request_generated"
  | "request_copied"
  | "request_marked_sent"
  | "evidence_status_updated";

export interface ProductEvent {
  id: string;
  event_name: EventName;
  route: string;
  user_id: string | null;
  anonymous_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Lead {
  id: string;
  email: string;
  role: string;
  event_type: string;
  holdings_count: string;
  created_at: string;
  source_page: string;
  conversion_status: "lead" | "started_packet" | "purchased";
}

const EVENTS_KEY = "qsbs.events.v1";
const LEADS_KEY = "qsbs.leads.v1";
const ANON_KEY = "qsbs.anon.v1";

const isBrowser = () => typeof window !== "undefined";
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export function getAnonId(): string | null {
  if (!isBrowser()) return null;
  try {
    let id = localStorage.getItem(ANON_KEY);
    if (!id) {
      id = uid();
      localStorage.setItem(ANON_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

export function trackEvent(name: EventName, metadata: Record<string, unknown> = {}) {
  if (!isBrowser()) return;
  try {
    const list: ProductEvent[] = JSON.parse(localStorage.getItem(EVENTS_KEY) || "[]");
    const ev: ProductEvent = {
      id: uid(),
      event_name: name,
      route: window.location.pathname,
      user_id: null,
      anonymous_id: getAnonId(),
      metadata,
      created_at: new Date().toISOString(),
    };
    list.unshift(ev);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(list.slice(0, 1000)));
  } catch {}
}

export function getEvents(): ProductEvent[] {
  if (!isBrowser()) return [];
  try { return JSON.parse(localStorage.getItem(EVENTS_KEY) || "[]"); } catch { return []; }
}

export function clearEvents() {
  if (!isBrowser()) return;
  try { localStorage.removeItem(EVENTS_KEY); } catch {}
}

export function captureLead(input: Omit<Lead, "id" | "created_at" | "conversion_status">): Lead {
  const lead: Lead = {
    ...input,
    id: uid(),
    created_at: new Date().toISOString(),
    conversion_status: "lead",
  };
  if (isBrowser()) {
    try {
      const list: Lead[] = JSON.parse(localStorage.getItem(LEADS_KEY) || "[]");
      list.unshift(lead);
      localStorage.setItem(LEADS_KEY, JSON.stringify(list.slice(0, 500)));
    } catch {}
  }
  trackEvent("email_captured", { source: input.source_page, role: input.role });
  return lead;
}

export function getLeads(): Lead[] {
  if (!isBrowser()) return [];
  try { return JSON.parse(localStorage.getItem(LEADS_KEY) || "[]"); } catch { return []; }
}
