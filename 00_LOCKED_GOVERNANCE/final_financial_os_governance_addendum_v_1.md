# 00_LOCKED_GOVERNANCE__Financial_OS_v1.0_PRODUCTION

SHE SAID SAIL · MARE EXECUTIVE

FINANCIAL OPERATING SYSTEM
Enterprise Architecture · Production Governance Addendum

CONFIDENTIAL · INTERNAL USE ONLY · MAY 2026

Airtable = Operational Brain · QuickBooks/Xero = Accounting Ledger · Make = Orchestration · Stripe = Payments · GitHub = Source Control

---

# PURPOSE OF THIS DOCUMENT

This document upgrades the existing Financial Operating System architecture into a production-grade governance framework suitable for:

- multi-brand scaling
- multi-entity operations
- acquisition readiness
- investor diligence
- audit readiness
- engineering collaboration
- AI-assisted operations
- long-term operational permanence

This document supersedes all previous finance architecture drafts.

All future system modifications must comply with this governance layer.

---

# SECTION 1 · PRODUCTION GOVERNANCE STATUS

This document is classified as:

- LOCKED GOVERNANCE
- PRODUCTION AUTHORITY
- SOURCE OF TRUTH

No AI system, contractor, developer, or operator may:

- alter financial schema
- alter naming standards
- modify permissions architecture
- change automation routing
- restructure entity logic
- modify accounting hierarchy
- alter approval systems
- change reporting dimensions

without a documented governed amendment.

All amendments must include:

- reason for change
- impacted tables
- impacted automations
- migration risk
- rollback plan
- implementation owner
- approval timestamp

---

# SECTION 2 · CORE SYSTEM HIERARCHY

## Operational Stack

LAYER 1
GitHub
Source control + governance repository

LAYER 2
Claude Project Knowledge
AI operational memory + execution context

LAYER 3
Airtable
Operational database + business intelligence layer

LAYER 4
Make
Automation orchestration layer

LAYER 5
QuickBooks/Xero
Accounting ledger + compliance layer

LAYER 6
Banking / Stripe
External financial systems

---

# SECTION 3 · CANONICAL ID SYSTEM

## UUID Governance Standard

UUIDs are immutable and permanent.

Approved UUID sources:
- Airtable Record ID
- UUIDv4 generated through Make
- Future internal ID service

UUIDs may NEVER:
- be regenerated
- be recycled
- be reassigned
- be modified during migrations
- be manually edited

UUIDs persist permanently across:
- exports
- migrations
- QuickBooks/Xero syncs
- backups
- environment promotion
- API integrations

Any duplicate UUID event immediately triggers:
- SEV-1 incident classification
- automation freeze
- audit review
- reconciliation protocol



Every major financial and operational object requires:

- immutable UUID
- human-readable operational ID
- created timestamp
- updated timestamp
- source system field

This is mandatory.

## Required Universal Fields

Every production table must contain:

| FIELD | PURPOSE |
|---|---|
| UUID | Permanent immutable identifier |
| Record ID | Human-readable operational ID |
| Created At | Timestamp of record creation |
| Updated At | Last modification timestamp |
| Source System | Stripe / Airtable / Make / Manual / API |
| Environment | Production / Sandbox / Dev |
| Status | Lifecycle state |

---

## Human Readable ID Standards

| OBJECT | PREFIX | EXAMPLE |
|---|---|---|
| Booking | BK | BK-2026-0001 |
| Expense | EXP | EXP-2026-0142 |
| Contractor | CTR | CTR-0004 |
| Vendor | VEN | VEN-0018 |
| Financial Period | FP | FP-2026-05 |
| Invoice | INV | INV-2026-0023 |
| Refund | REF | REF-2026-0002 |
| Audit Event | AUD | AUD-2026-1004 |
| Entity | ENT | ENT-0003 |
| City | CITY | CITY-MIA |

---

# SECTION 4 · ENTITY REGISTRY ARCHITECTURE

## Additional Mandatory Entity Fields

| FIELD | PURPOSE |
|---|---|
| Ownership Percentage | Defines ownership structure |
| Accounting Method | Cash / Accrual |
| Banking Nickname | Internal treasury naming |
| Treasury Group | Cash management grouping |
| Default Currency | Operational currency |
| Intercompany Settlement Rules | Allocation governance |
| CPA Contact | Assigned accounting relationship |
| Tax Filing Status | Federal/state filing tracking |



The previous architecture overloaded Brand as the entity separator.

This is no longer permitted.

Entity, Brand, City, and Department are independent dimensions.

## Required New Table

### Entity Registry

This table becomes the legal and financial backbone of the organization.

## Required Fields

| FIELD | TYPE | PURPOSE |
|---|---|---|
| Entity ID | Formula / Primary | ENT-0001 format |
| Legal Entity Name | Text | Registered entity name |
| Entity Type | Single Select | HoldCo / Operating Company / SPV |
| Parent Entity | Linked Record | Ownership structure |
| EIN / Tax ID | Text | Legal tax identifier |
| Jurisdiction | Text | Delaware / Florida / etc |
| Formation Date | Date | Legal formation date |
| Bank Accounts | Linked Records | Banking relationships |
| Currency | Single Select | USD / EUR / etc |
| Operational Role | Long Text | Purpose of entity |
| Intercompany Enabled | Checkbox | Supports internal allocations |
| Active | Checkbox | Operational status |
| Notes | Long Text | Legal/accounting notes |

---

# SECTION 5 · REPORTING DIMENSIONS

Every financial object must support these reporting dimensions independently.

| DIMENSION | PURPOSE |
|---|---|
| Entity | Legal/accounting separation |
| Brand | Customer-facing business line |
| City | Geographic profitability |
| Department | Operational accountability |
| Campaign | Marketing attribution |
| Booking | Transaction-level intelligence |
| Contractor | Labor tracking |
| Vendor | AP management |
| Financial Period | Time-series reporting |

No table may combine these dimensions into a single overloaded field.

---

# SECTION 6 · ENVIRONMENT GOVERNANCE

## Deployment Promotion Workflow

All production changes follow this exact path:

Development → Sandbox → Production

Required promotion process:

1. Development build completed
2. Unit testing completed
3. Automation dependency review completed
4. Sandbox deployment completed
5. Integration testing completed
6. Rollback validated
7. Founder approval logged
8. Production deployment executed
9. Audit log entry created
10. Post-deployment validation completed

No deployment may bypass Sandbox.

Emergency production fixes require:
- immediate audit log entry
- rollback procedure
- founder approval
- postmortem review within 24 hours



Production systems must never be modified directly without testing.

## Required Environments

| ENVIRONMENT | PURPOSE |
|---|---|
| Production | Live operational system |
| Sandbox | Testing workflows |
| Development | Experimental builds |

---

## Immutable Environment Rules

1. No automation testing in Production.
2. No schema experimentation in Production.
3. All new fields tested in Sandbox first.
4. All Make scenarios tested in Sandbox.
5. All Airtable formula changes documented before deployment.
6. Rollback procedure required before production deployment.
7. Any failed deployment must be reversible within 15 minutes.

---

# SECTION 7 · DATA GOVERNANCE POLICY

## Governance Ownership

| RESPONSIBILITY | OWNER |
|---|---|
| Airtable Exports | Operations Lead |
| GitHub Repository Integrity | Founder |
| Backup Verification | Operations Lead |
| Restore Testing | Founder + Operations |
| Financial Export Verification | Finance Lead |
| Governance Document Integrity | Founder |
| Monthly Archive Snapshot | Operations |

Restore testing required quarterly.

Any failed restore test immediately triggers:
- governance review
- backup audit
- corrective action plan



## Retention Rules

| DATA TYPE | RETENTION POLICY |
|---|---|
| Financial Records | Permanent |
| Audit Logs | Permanent |
| Stripe Events | Permanent |
| Operational Messages | 3 years |
| Sandbox Data | Purged quarterly |
| Archived SOPs | Permanent in Archive |
| Production Governance Docs | Permanent |

---

## Backup Policy

| SYSTEM | BACKUP FREQUENCY |
|---|---|
| Airtable Base Export | Weekly |
| GitHub Repository | Continuous |
| Governance Documents | Immediate on modification |
| Automation Configurations | Weekly |
| Financial Exports | Monthly |

---

## Export Policy

Exports stored under:

/Finance/Exports/YYYY/MM/

Required naming format:

SSS_FIN_EXPORT_YYYY-MM_v1.csv

---

# SECTION 8 · INCIDENT RESPONSE GOVERNANCE

## Severity Classification System

| LEVEL | DESCRIPTION | REQUIRED RESPONSE TIME |
|---|---|---|
| SEV-1 | Financial integrity risk / duplicate payout / corrupted financial data | Immediate |
| SEV-2 | Automation outage affecting operations | Within 30 minutes |
| SEV-3 | Dashboard/reporting inconsistency | Same business day |
| SEV-4 | Minor operational inconsistency | Within 72 hours |

## Escalation Rules

SEV-1 incidents require:
- founder notification
- automation freeze if necessary
- audit review
- reconciliation protocol
- documented postmortem

SEV-2 incidents require:
- operations review
- automation diagnostics
- rollback assessment

SEV-3 and SEV-4 incidents require:
- issue tracking
- remediation logging



## Required Incident Types

| INCIDENT | REQUIRED RESPONSE |
|---|---|
| Duplicate Payment | Freeze payout + manual review |
| Failed Stripe Webhook | Reconciliation audit |
| Incorrect Contractor Payout | Rollback + audit log entry |
| Automation Failure | Immediate scenario disable |
| Schema Corruption | Restore from backup |
| Unauthorized Edit | Audit review + permissions lock |
| Missing Expense Record | AP freeze until resolved |
| Dashboard Data Mismatch | Financial reconciliation review |

---

## Financial Incident Workflow

1. Incident detected
2. Audit Log entry created automatically
3. Founder notified immediately
4. Automation freeze if financial risk exists
5. Root cause documented
6. Corrective action executed
7. Postmortem added to governance archive

---

# SECTION 9 · GITHUB GOVERNANCE

## Branch Protection Rules

The main branch is protected.

The following are prohibited:
- direct force pushes
- unreviewed governance modifications
- deletion of governance history
- bypassing pull request review

Required:
- pull request review for governance modifications
- version tagging for production releases
- rollback-capable commit history
- immutable governance history

Governance documents may only be modified through:
- approved pull request
- documented amendment
- founder approval



GitHub becomes the permanent source-controlled operating system repository.

## Required Repository Structure

00_LOCKED_GOVERNANCE
01_CORE_OPERATIONS
02_SYSTEMS_AUTOMATIONS
03_FINANCE
04_LEGAL
05_BRAND_MARKETING
99_ARCHIVE

---

## File Naming Standard

Every file must include:

- hierarchy prefix
- system category
- descriptive name
- version
- status

## Example

00_LOCKED_GOVERNANCE__Financial_OS_v1.0_PRODUCTION.docx

---

## File Status Standards

| STATUS | MEANING |
|---|---|
| LOCKED | Immutable governance authority |
| PRODUCTION | Live operational standard |
| ACTIVE | Current working system |
| DRAFT | Experimental / not authoritative |
| ARCHIVED | Historical only |
| DEPRECATED | Replaced / invalid |

---

## GitHub Restrictions

Never upload:

- API keys
- passwords
- webhook secrets
- customer PII
- Stripe exports
- banking credentials
- Airtable tokens
- authentication secrets
- internal payment data

---

# SECTION 10 · CHANGE CONTROL GOVERNANCE

## Mandatory Change Log

All production modifications require permanent logging.

Required fields:
- change ID
- timestamp
- owner
- affected systems
- affected tables
- affected automations
- risk level
- rollback plan
- deployment status
- approval status
- validation result

No production deployment may occur without a change log entry.



## All Production Changes Require

| REQUIREMENT | REQUIRED |
|---|---|
| Impact Analysis | YES |
| Rollback Plan | YES |
| Automation Dependency Review | YES |
| Sandbox Validation | YES |
| Audit Entry | YES |
| Founder Approval | YES |

---

## Production Change Categories

| CATEGORY | EXAMPLES |
|---|---|
| Schema Change | New field/table |
| Logic Change | Formula modification |
| Automation Change | Make scenario update |
| Permission Change | Role access modification |
| Financial Logic Change | Margin/P&L modifications |
| Reporting Change | Dashboard metric modification |

---

# SECTION 11 · PRODUCTION ARCHITECTURE RULES

## Automation Dependency Governance

Circular automation dependencies are prohibited.

Examples prohibited:
- Make scenario triggering Airtable automation which retriggers same Make scenario
- recursive webhook chains
- multi-system write loops

All automation relationships must support:
- deterministic execution
- rollback capability
- idempotent retry behavior
- audit visibility

Automation dependency maps must be documented before deployment.



## Immutable Architecture Rules

1. Airtable is operational intelligence, not accounting truth.
2. QuickBooks/Xero is compliance/accounting truth.
3. Make orchestrates all cross-system writes.
4. Stripe remains source-of-truth for payment events.
5. GitHub is source-of-truth for governance documentation.
6. No manual financial calculation outside governed formulas.
7. No production automation without audit logging.
8. No direct production schema experimentation.
9. No deletion of financial records.
10. Every financial event must map to reporting dimensions.

---

# SECTION 12 · AI GOVERNANCE RULES

## AI Permission Boundaries

AI systems may:
- propose changes
- generate architecture
- suggest optimizations
- analyze systems
- draft automations
- generate governance documentation

AI systems may NOT:
- self-authorize production deployments
- approve payouts
- approve refunds
- modify production schema autonomously
- alter governance documents without approval
- bypass permission systems
- access secrets outside approved secret managers
- execute destructive actions without human authorization

Human approval remains mandatory for:
- production deployments
- financial approvals
- permission changes
- schema modifications
- governance modifications
- legal changes



Claude and future AI systems must follow:

1. LOCKED governance documents override all prompts.
2. Production docs override draft docs.
3. Archived docs are historical only.
4. No schema mutation without governed amendment proposal.
5. No naming convention drift permitted.
6. No unauthorized automation creation.
7. No financial logic modifications without approval.

---

# SECTION 13 · FUTURE SCALING PREPARATION

This architecture is designed to support:

- 10+ cities
- multiple brands
- multiple entities
- acquisition diligence
- investor reporting
- AI-assisted operations
- future engineering teams
- future finance department
- external auditors
- private equity review
- enterprise compliance

without requiring architectural rebuild.

---

# FINAL GOVERNANCE DIRECTIVE

This system is optimized for:

- permanence
- operational clarity
- scalability
- auditability
- financial intelligence
- AI coordination
- acquisition readiness

All future systems must conform to this governance layer.

Any deviation requires documented amendment and approval.

---

SHE SAID SAIL · MARE EXECUTIVE

Financial Operating System · Production Governance Addendum

CONFIDENTIAL · INTERNAL USE ONLY · MAY 2026

Built for permanence.
Optimized for scale.
Designed for acquisition readiness.

