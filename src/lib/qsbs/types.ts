export type Confidence = "confirmed" | "likely" | "unknown" | "no";
export type YesNoUnknown = "yes" | "no" | "unknown" | "not_applicable";
export type GrossAssetState = "under" | "unknown" | "over";
export type AcquisitionMethod = "direct_issuer" | "secondary" | "unknown";

export type UserRole = "founder" | "employee" | "investor" | "cpa";

export type SecurityType =
  | "founder_stock"
  | "rsa"
  | "iso"
  | "nso"
  | "preferred"
  | "common"
  | "safe_converted"
  | "spv"
  | "unknown";

export type ShareholderType =
  | "individual"
  | "trust"
  | "estate"
  | "partnership"
  | "corporation"
  | "unknown";

export type ExcludedRisk = "none" | "maybe" | "yes" | "unknown";

export interface DossierInputs {
  user_role: UserRole;
  issuer_name: string;
  security_type: SecurityType;
  acquisition_date: string; // ISO
  planned_exit_date?: string;
  acquisition_method: AcquisitionMethod;
  shareholder_type: ShareholderType;
  c_corp_status: Confidence;
  gross_assets: GrossAssetState;
  active_business: Confidence;
  excluded_risk: ExcludedRisk;
  redemption_history: "none" | "unknown" | "yes";
  election_83b: YesNoUnknown;
  state?: string;
  notes?: string;
}

export type EvidenceCategory =
  | "purchase_agreement"
  | "stock_certificate"
  | "election_83b"
  | "board_approval"
  | "charter"
  | "c_corp_confirmation"
  | "gross_assets"
  | "active_business"
  | "excluded_industry"
  | "redemption"
  | "cap_table"
  | "sale_exit"
  | "professional_notes";

export type EvidenceStatus = "missing" | "requested" | "received" | "reviewed" | "not_applicable";
export type SourceParty = "user" | "issuer" | "counsel" | "cpa" | "platform";

export interface EvidenceItem {
  id: string;
  category: EvidenceCategory;
  title: string;
  status: EvidenceStatus;
  source_party: SourceParty;
  note?: string;
  external_link?: string;
  received_at?: string;
  updated_at: string;
}

export type RuleStatus = "consistent" | "missing" | "red_flag" | "not_applicable";

export interface RuleCheck {
  key: string;
  title: string;
  status: RuleStatus;
  explanation: string;
  why_it_matters: string;
  evidence_needed: string;
  facts: string;
  weight: number;
}

export type DossierStatus =
  | "draft"
  | "evidence_incomplete"
  | "ready_for_cpa"
  | "cpa_in_progress"
  | "archived";

export interface RequestLetter {
  id: string;
  letter_type: string;
  subject: string;
  recipient: string;
  body: string;
  created_at: string;
}

export interface Dossier {
  id: string;
  inputs: DossierInputs;
  status: DossierStatus;
  paid_unlocked: boolean;
  evidence: EvidenceItem[];
  letters: RequestLetter[];
  created_at: string;
  updated_at: string;
  is_demo?: boolean;
}

export interface CheckoutIntent {
  id: string;
  plan_key: "single" | "vault" | "portal";
  amount_cents: number;
  status: "created" | "placeholder";
  created_at: string;
}
