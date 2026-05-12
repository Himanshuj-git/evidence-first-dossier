import type {
  Dossier,
  DossierInputs,
  EvidenceItem,
  RuleCheck,
  RuleStatus,
  EvidenceCategory,
} from "./types";

const has = (ev: EvidenceItem[], cat: EvidenceCategory) =>
  ev.some((e) => e.category === cat && (e.status === "received" || e.status === "reviewed"));

const requested = (ev: EvidenceItem[], cat: EvidenceCategory) =>
  ev.some((e) => e.category === cat && e.status === "requested");

function fmtDate(d?: string) {
  if (!d) return "—";
  try { return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }); }
  catch { return d; }
}

export function buildRules(inputs: DossierInputs, evidence: EvidenceItem[]): RuleCheck[] {
  const rules: RuleCheck[] = [];

  // 1. Original issuance
  rules.push({
    key: "original_issuance",
    title: "Original issuance evidence",
    weight: 15,
    status: inputs.acquisition_method === "direct_issuer" && has(evidence, "purchase_agreement")
      ? "consistent"
      : inputs.acquisition_method === "secondary"
      ? "red_flag"
      : "missing",
    explanation:
      "Section 1202 generally requires stock acquired at original issuance directly from the corporation. Secondary purchases typically do not qualify.",
    why_it_matters: "Acquisition method is a threshold question for Section 1202 review.",
    evidence_needed: "Subscription/purchase agreement, stock certificate, or issuer cap-table letter confirming direct issuance.",
    facts: `Acquisition method: ${inputs.acquisition_method.replace("_", " ")}. Acquired ${fmtDate(inputs.acquisition_date)}.`,
  });

  // 2. Eligible shareholder
  const eligibleHolder = inputs.shareholder_type !== "corporation" && inputs.shareholder_type !== "unknown";
  rules.push({
    key: "eligible_shareholder",
    title: "Eligible shareholder / acquisition method",
    weight: 10,
    status: inputs.shareholder_type === "corporation"
      ? "red_flag"
      : eligibleHolder
      ? "consistent"
      : "missing",
    explanation: "Eligible holders are generally non-corporate taxpayers (individuals, certain trusts, estates, and pass-throughs).",
    why_it_matters: "C-corporation shareholders generally cannot claim the Section 1202 exclusion.",
    evidence_needed: "Holder type confirmation; trust/partnership documentation if applicable.",
    facts: `Shareholder type: ${inputs.shareholder_type}.`,
  });

  // 3. Domestic C corp
  rules.push({
    key: "c_corp",
    title: "Domestic C corporation evidence",
    weight: 10,
    status: inputs.c_corp_status === "no"
      ? "red_flag"
      : inputs.c_corp_status === "confirmed" && has(evidence, "c_corp_confirmation")
      ? "consistent"
      : "missing",
    explanation: "The issuer must be a domestic U.S. C corporation throughout substantially all of the holding period.",
    why_it_matters: "LLCs/S-corps/foreign entities at the relevant dates typically do not qualify.",
    evidence_needed: "Charter, IRS Form 1120 confirmation, or counsel letter confirming C-corp status throughout the period.",
    facts: `User reports C-corp status: ${inputs.c_corp_status}.`,
  });

  // 4. Gross assets
  rules.push({
    key: "gross_assets",
    title: "Gross asset threshold evidence",
    weight: 15,
    status: inputs.gross_assets === "over"
      ? "red_flag"
      : inputs.gross_assets === "under" && has(evidence, "gross_assets")
      ? "consistent"
      : "missing",
    explanation:
      "Aggregate gross assets must be at or under the applicable cap at and immediately after issuance. The threshold differs for stock issued on/before vs. after July 4, 2025 — verify with a tax advisor.",
    why_it_matters: "A single test failure at issuance can disqualify the position.",
    evidence_needed: "Issuer attestation or financials showing gross assets at issuance and immediately after.",
    facts: `User reports: ${inputs.gross_assets}. Issued ${fmtDate(inputs.acquisition_date)}.`,
  });

  // 5. Active business
  rules.push({
    key: "active_business",
    title: "Active business evidence (80%)",
    weight: 10,
    status: inputs.active_business === "no"
      ? "red_flag"
      : inputs.active_business === "confirmed" && has(evidence, "active_business")
      ? "consistent"
      : "missing",
    explanation: "At least 80% of the issuer's assets must generally be used in a qualified active trade or business throughout the holding period.",
    why_it_matters: "Holding-company or investment-heavy balance sheets often fail this test.",
    evidence_needed: "Issuer attestation, financial statements, or counsel memo on active-business use of assets.",
    facts: `User reports active-business confidence: ${inputs.active_business}.`,
  });

  // 6. Excluded business risk
  rules.push({
    key: "excluded_business",
    title: "Excluded business risk",
    weight: 10,
    status: inputs.excluded_risk === "yes"
      ? "red_flag"
      : inputs.excluded_risk === "none" && has(evidence, "excluded_industry")
      ? "consistent"
      : "missing",
    explanation:
      "Section 1202 excludes certain businesses, including many professional services, financial services, hospitality, farming, and natural-resource extraction.",
    why_it_matters: "Excluded-industry classification is a common disqualifier and frequently disputed.",
    evidence_needed: "Counsel memo or written analysis classifying the issuer's primary trade or business.",
    facts: `User reports excluded-industry risk: ${inputs.excluded_risk}.`,
  });

  // 7. Redemption
  rules.push({
    key: "redemption",
    title: "Redemption / buyback evidence",
    weight: 10,
    status: inputs.redemption_history === "yes"
      ? "red_flag"
      : inputs.redemption_history === "none" && has(evidence, "redemption")
      ? "consistent"
      : "missing",
    explanation: "Significant redemptions from the shareholder or related parties around issuance can disqualify the stock.",
    why_it_matters: "Redemption rules are technical and frequently overlooked.",
    evidence_needed: "Issuer confirmation of redemption history within the relevant lookback windows.",
    facts: `User reports redemption history: ${inputs.redemption_history}.`,
  });

  // 8. Holding period
  const acq = inputs.acquisition_date ? new Date(inputs.acquisition_date) : null;
  const now = new Date();
  const years = acq ? (now.getTime() - acq.getTime()) / (365.25 * 24 * 3600 * 1000) : 0;
  rules.push({
    key: "holding_period",
    title: "Holding period timeline",
    weight: 10,
    status: acq ? "consistent" : "missing",
    explanation:
      "Holding-period milestones (e.g., 3, 4, and 5 years for stock issued after July 4, 2025; 5 years generally) determine the level of potential exclusion. Professional review required.",
    why_it_matters: "Timeline drives review of partial vs. full milestones — never use this app to time a sale.",
    evidence_needed: "Documented acquisition/issuance date.",
    facts: acq ? `Acquired ${fmtDate(inputs.acquisition_date)} (~${years.toFixed(1)} years held).` : "No acquisition date entered.",
  });

  // 9. 83(b)
  const needs83b = inputs.security_type === "rsa" || inputs.security_type === "iso" || inputs.security_type === "nso" || inputs.security_type === "founder_stock";
  rules.push({
    key: "election_83b",
    title: "83(b) / exercise documentation",
    weight: 5,
    status: !needs83b
      ? "not_applicable"
      : inputs.election_83b === "yes" && has(evidence, "election_83b")
      ? "consistent"
      : inputs.election_83b === "no"
      ? "red_flag"
      : "missing",
    explanation: "For restricted shares and certain exercises, an 83(b) election may affect the start of the holding period and basis.",
    why_it_matters: "Election timing and documentation are frequently scrutinized.",
    evidence_needed: "Filed 83(b) election form with proof of timely mailing/receipt.",
    facts: `Security type: ${inputs.security_type}. 83(b): ${inputs.election_83b}.`,
  });

  // 10. State tax caution
  rules.push({
    key: "state_tax",
    title: "State tax caution",
    weight: 0,
    status: inputs.state ? "consistent" : "missing",
    explanation: "Some states do not conform to federal Section 1202 treatment. Conformity must be reviewed in the holder's state of residence.",
    why_it_matters: "Federal exclusion does not necessarily flow through to state taxable income.",
    evidence_needed: "State of residence at relevant dates; CPA review of state conformity.",
    facts: `State of residence: ${inputs.state || "not provided"}.`,
  });

  // 11. SPV
  rules.push({
    key: "spv",
    title: "Pass-through / SPV complexity",
    weight: 0,
    status: inputs.security_type === "spv" ? "missing" : "not_applicable",
    explanation: "Stock held through partnerships or SPVs has additional rules around proportional ownership and look-through eligibility.",
    why_it_matters: "Common in syndicate / angel investing — requires partnership-level documentation.",
    evidence_needed: "K-1, partnership agreement, and underlying issuer evidence.",
    facts: `Security type: ${inputs.security_type}.`,
  });

  return rules;
}

export function readinessScore(rules: RuleCheck[]): number {
  const totalW = rules.reduce((s, r) => s + (r.status === "not_applicable" ? 0 : r.weight), 0);
  const earned = rules.reduce((s, r) => {
    if (r.status === "not_applicable") return s;
    if (r.status === "consistent") return s + r.weight;
    if (r.status === "missing") return s + r.weight * 0.2;
    return s; // red_flag = 0
  }, 0);
  if (!totalW) return 0;
  return Math.round((earned / totalW) * 100);
}

export function deriveStatus(rules: RuleCheck[]): "draft" | "evidence_incomplete" | "ready_for_cpa" {
  const score = readinessScore(rules);
  const hasRed = rules.some((r) => r.status === "red_flag");
  if (hasRed) return "evidence_incomplete";
  if (score >= 85) return "ready_for_cpa";
  if (score >= 30) return "evidence_incomplete";
  return "draft";
}

export function topMissing(rules: RuleCheck[], n = 5): RuleCheck[] {
  return rules
    .filter((r) => r.status === "missing" || r.status === "red_flag")
    .sort((a, b) => (b.weight - a.weight) || (a.status === "red_flag" ? -1 : 1))
    .slice(0, n);
}

export function summarize(d: Dossier) {
  const rules = buildRules(d.inputs, d.evidence);
  return {
    rules,
    score: readinessScore(rules),
    missing: rules.filter((r) => r.status === "missing").length,
    red: rules.filter((r) => r.status === "red_flag").length,
  };
}
