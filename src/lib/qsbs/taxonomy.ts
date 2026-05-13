// Structured taxonomy for evidence-request workflows. This is the data moat:
// every shareholder request, status, missing-evidence note, and risk flag falls
// into a known category so dossiers, exports, and (eventually) anonymized
// metadata can be aggregated without exposing private documents.

export const documentTypes = [
  "stock_purchase_or_subscription_agreement",
  "stock_certificate_or_ledger_entry",
  "option_grant_and_exercise_records",
  "election_83b_filing_proof",
  "board_consent_or_minutes",
  "certificate_of_incorporation",
  "officer_attestation_c_corp_status",
  "balance_sheet_or_gross_assets_attestation",
  "active_business_attestation",
  "industry_classification_memo",
  "redemption_history_confirmation",
  "cap_table_extract",
  "transaction_or_tender_documents",
  "professional_review_memo",
] as const;

export const issuerResponseTypes = [
  "confirmed_in_writing",
  "confirmed_with_supporting_document",
  "partial_response",
  "deferred_to_counsel",
  "unable_to_provide",
  "no_response",
] as const;

export const missingEvidenceCategories = [
  "issuer_corporate_status",
  "original_issuance_proof",
  "gross_assets_at_issuance",
  "active_business_support",
  "excluded_industry_analysis",
  "redemption_history",
  "cap_table_or_ownership",
  "holding_period_support",
  "transaction_context",
] as const;

export const riskFlagCategories = [
  "secondary_acquisition",
  "potentially_excluded_industry",
  "redemption_in_lookback_window",
  "gross_assets_uncertain",
  "non_c_corp_period",
  "foreign_or_disregarded_entity",
  "missing_83b_when_required",
  "secondary_to_primary_chain_unclear",
] as const;

export const cpaQuestionCategories = [
  "original_issuance_treatment",
  "gross_asset_test_timing",
  "active_business_test_period",
  "excluded_business_analysis",
  "holding_period_evidence",
  "election_83b_validity",
  "secondary_purchase_treatment",
  "state_conformity",
  "shareholder_entity_type",
] as const;

export const companyQuestionCategories = [
  "c_corp_status_at_issuance",
  "gross_assets_immediately_pre_post_issuance",
  "active_business_use_of_assets",
  "industry_classification",
  "redemption_activity_lookback",
  "original_issuance_records",
  "cap_table_confirmation",
  "existing_qsbs_memo_availability",
] as const;

export const acquisitionMethods = [
  "direct_issuer_at_incorporation",
  "direct_issuer_priced_round",
  "direct_issuer_option_exercise",
  "direct_issuer_safe_or_note_conversion",
  "secondary_from_other_shareholder",
  "secondary_via_tender",
  "received_through_entity_or_trust",
  "unknown",
] as const;

export const shareholderProfileTypes = [
  "founder",
  "early_employee",
  "later_employee",
  "advisor_consultant",
  "angel_investor",
  "spv_investor",
  "trust_or_estate",
  "partnership_or_llc",
  "corporation",
  "other",
] as const;

export const requestStatuses = [
  "not_requested",
  "request_drafted",
  "sent",
  "company_replied",
  "evidence_received",
  "company_unable_to_provide",
  "needs_counsel_review",
  "cpa_review_ready",
] as const;

export type RequestStatus = (typeof requestStatuses)[number];

export const evidenceTaxonomy = {
  documentTypes,
  issuerResponseTypes,
  missingEvidenceCategories,
  riskFlagCategories,
  cpaQuestionCategories,
  companyQuestionCategories,
  acquisitionMethods,
  shareholderProfileTypes,
  requestStatuses,
};
