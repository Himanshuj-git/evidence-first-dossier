import type { Dossier } from "./types";

export interface LetterTemplate {
  type: string;
  label: string;
  subject: (d: Dossier) => string;
  body: (d: Dossier) => string;
}

const greet = (d: Dossier) =>
  `Dear ${d.inputs.issuer_name || "[Issuer]"} team,`;

const sign = () =>
  `Thank you for your help.\n\nBest regards,\n[Your name]`;

export const LETTER_TEMPLATES: LetterTemplate[] = [
  {
    type: "issuer_confirmation",
    label: "QSBS issuer confirmation",
    subject: (d) => `QSBS documentation request — ${d.inputs.issuer_name}`,
    body: (d) => `${greet(d)}

I am compiling documentation related to Section 1202 ("QSBS") for shares I acquired on ${d.inputs.acquisition_date || "[date]"}. I am not asking for a tax opinion, only for factual confirmation that may be needed by my tax professional.

Could you confirm or share documentation regarding the following at the time of my issuance:
1. The corporation's status as a domestic U.S. C corporation.
2. Aggregate gross assets at issuance and immediately after issuance.
3. Substantial use of assets in an active trade or business.
4. Whether the company's primary trade or business falls within an excluded category under Section 1202(e)(3).
5. Any redemption activity within the relevant lookback windows.

A signed letter or a brief written confirmation would be sufficient.

${sign()}`,
  },
  {
    type: "gross_assets",
    label: "Gross asset test support",
    subject: (d) => `Gross asset test support — ${d.inputs.issuer_name}`,
    body: (d) => `${greet(d)}

For Section 1202 documentation purposes related to my shares acquired on ${d.inputs.acquisition_date || "[date]"}, could you please confirm aggregate gross assets:
- Immediately before my stock issuance
- Immediately after my stock issuance

A balance-sheet excerpt or a signed officer attestation would be ideal.

${sign()}`,
  },
  {
    type: "redemption",
    label: "Redemption history confirmation",
    subject: (d) => `Redemption history confirmation — ${d.inputs.issuer_name}`,
    body: (d) => `${greet(d)}

For Section 1202 documentation purposes, could you confirm whether the company engaged in any redemptions of stock from me, related parties, or significant shareholders within the lookback windows around my issuance date of ${d.inputs.acquisition_date || "[date]"}?

A short written confirmation is sufficient.

${sign()}`,
  },
  {
    type: "active_business",
    label: "Active business confirmation",
    subject: (d) => `Active business confirmation — ${d.inputs.issuer_name}`,
    body: (d) => `${greet(d)}

For Section 1202 documentation purposes, could you provide a brief written confirmation that at least 80% of the company's assets have been used in the active conduct of a qualified trade or business throughout the relevant period of my holding (since ${d.inputs.acquisition_date || "[date]"})?

${sign()}`,
  },
  {
    type: "original_issuance",
    label: "Original issuance / cap-table proof",
    subject: (d) => `Original issuance proof — ${d.inputs.issuer_name}`,
    body: (d) => `${greet(d)}

For Section 1202 documentation purposes, could you provide:
- Cap-table extract showing my shares as originally issued by the corporation
- A copy of the executed subscription/purchase agreement
- A copy of the stock certificate or ledger record

These are needed to confirm direct, original issuance.

${sign()}`,
  },
];
