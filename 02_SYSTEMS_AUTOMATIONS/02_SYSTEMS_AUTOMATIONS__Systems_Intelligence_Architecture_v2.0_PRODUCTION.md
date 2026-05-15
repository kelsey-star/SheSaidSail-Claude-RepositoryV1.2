# 02_SYSTEMS_AUTOMATIONS__Systems_Intelligence_Architecture_v2.0_PRODUCTION

**Status:** PRODUCTION
**Version:** 2.0
**Effective Date:** May 2026
**Owner:** Will (Founder)
**Scope:** She Said Sail · Mare Executive · All Current and Future Cities · All Systems · All Automations · All AI Deployments
**Classification:** Confidential — Internal Use Only
**Constitutional Authority:** Governed by 00_LOCKED_GOVERNANCE__Founder_Control_and_AI_Authority_Framework_v2.0_LOCKED

---

> **Systems Authority Statement**
>
> This document is the definitive systems and automation architecture for She Said Sail and Mare Executive. It consolidates Airtable architecture, Make orchestration, Claude orchestration, dashboard design, operational intelligence, financial intelligence, creative intelligence, AI containment, escalation systems, rollback systems, automation governance, audit logging, system health, multi-city scaling, and infrastructure scaling into one institutional-grade master framework. When any conflict exists between this document and any lower-tier SOP, automation specification, or implementation note, this document governs. When any conflict exists between this document and any LOCKED governance file, the LOCKED governance file governs without exception.

---

## TABLE OF CONTENTS

| Section | Title |
|---------|-------|
| I | Infrastructure Stack and System Hierarchy |
| II | Airtable Architecture |
| III | Make Orchestration |
| IV | Claude Orchestration |
| V | Charter Brief Automation |
| VI | Operations Portal Architecture |
| VII | Operational Intelligence |
| VIII | Financial Intelligence |
| IX | Creative Intelligence |
| X | Emergency Operations Protocol |
| XI | AI Containment Framework |
| XII | Escalation Systems |
| XIII | Rollback Systems |
| XIV | Automation Governance |
| XV | Audit Logging |
| XVI | System Health and Monitoring |
| XVII | Multi-City Scaling |
| XVIII | Operational Redundancy and Backup |
| XIX | Infrastructure Scaling and Acquisition Readiness |
| XX | Governance Review Cadence |

---

## SECTION I — INFRASTRUCTURE STACK AND SYSTEM HIERARCHY

### 1.1 The Seven-Layer Operating Stack

Every system, automation, and AI deployment at She Said Sail and Mare Executive operates within a fixed seven-layer architecture. These layers are not interchangeable. Each has one governing role. Cross-layer authority violations are system failures.

| Layer | System | Role | Authority |
|-------|--------|------|-----------|
| **L1 — Governance** | GitHub | Permanent source control for all governance documents, SOPs, prompt libraries, and system specifications. Immutable version history. | Highest. Supersedes all other layers. |
| **L2 — Intelligence** | Claude (Anthropic API) | Reasoning, generation, classification, pattern recognition, recommendations, and governed autonomous execution. | Operates within AI Authority Boundaries (Section XI). |
| **L3 — Operational Brain** | Airtable | Single source of operational truth. All booking records, client data, financial records, lessons, and institutional intelligence reside here. | Source of truth for operational state. |
| **L4 — Orchestration** | Make (formerly Integromat) | Automation execution layer. All cross-system writes, webhook handling, scheduled triggers, and multi-step workflows execute here. | Executes within defined scenario governance. |
| **L5 — Communication** | Quo SMS · Gmail · Slack | External and internal communication channels. Outbound messages flow only from Make-triggered scenarios or human-initiated sends. | No autonomous send authority beyond Tier A scope. |
| **L6 — Payment** | Stripe | Financial event source of truth. Payment links, deposit processing, balance collection, and webhook-triggered booking state changes. | Financial events are immutable once processed. |
| **L7 — Command** | Airtable Interfaces · Ops Portal | Founder and operations command surface. Approval queue, escalation visibility, task routing, and mobile governance. | Human oversight layer. Not autonomous. |

### 1.2 System of Record Rules

- **Airtable** is the operational system of record for bookings, clients, requests, vendors, and intelligence.
- **QuickBooks / Xero** is the accounting system of record for compliance, tax, and financial reporting.
- **Stripe** is the payment system of record for all client charges, deposits, and refunds.
- **GitHub** is the governance system of record for all documents, prompts, and specifications.
- **No system overrides another system's record authority.** Airtable does not replace accounting. Stripe events do not override Airtable booking status without a Make webhook handler. GitHub governance supersedes Airtable records when conflicts arise.

### 1.3 Live System Connections

| System | Connection | Status | Authentication |
|--------|-----------|--------|----------------|
| Anthropic API (Claude) | Make HTTP module | LIVE | Bearer token — rotated per security baseline |
| Airtable | Make Airtable module + MCP | LIVE | Personal Access Token — stored in credential vault |
| Stripe | Webhooks → Make | LIVE | Webhook signing secret — validated on receipt |
| Slack | Make Slack module + MCP | LIVE | OAuth — workspace app |
| Gmail | Make Gmail module + MCP | LIVE | OAuth — hello@shesaidsail.com |
| Quo SMS | Make HTTP module | LIVE | API key — stored in credential vault |
| GitHub | Direct governance writes | LIVE | PAT — Will-only access |

### 1.4 Pending System Activations

| System | Purpose | Governance Requirement Before Activation |
|--------|---------|------------------------------------------|
| Meta API | Ad intelligence and performance data ingestion | Founder approval + sandbox validation + audit logging spec |
| TikTok API | Content performance intelligence | Founder approval + sandbox validation |
| Instagram DM API | Autonomous outreach capability | Phase 4 governance approval required |
| Vapi / Bland AI | Voice operations | Phase 6 governance approval + transcript logging mandatory |
| ElevenLabs | Voice cloning for AI phone agent | Phase 6 — requires full voice governance spec |
| Google Drive / S3 | Content ingestion and asset management | Storage governance spec required before activation |

No pending system may connect to production data without Founder approval, sandbox validation, and documented rollback capability.

---

## SECTION II — AIRTABLE ARCHITECTURE

### 2.1 Production Base Status

**Base Classification:** PRODUCTION — LIVE
**Environment:** Production
**Dependency Level:** Critical — all Make automations, Claude context injection, and dashboard interfaces depend on this base.
**Schema Change Authority:** Will only. No field, table, or view modification in production without Founder approval and documented amendment.

### 2.2 Production Table Catalog

| Table | ID Prefix | Status | System Role | Primary Dependencies |
|-------|-----------|--------|-------------|---------------------|
| **Clients** | CLT | LIVE | Client intelligence and PII | Bookings (linked) |
| **Bookings** | BK | LIVE | Master booking lifecycle record | Clients, Requests, Yachts, Packages, Cities |
| **Requests** | REQ | LIVE | Inbound lead routing and qualification | Bookings (promoted) |
| **Brokers** | BRK | LIVE | Charter coordination and availability | Bookings (linked) |
| **Cities** | CITY | LIVE | Geographic operations and city health | Bookings, City Managers |
| **Yachts** | YCH | LIVE | Vessel inventory and availability | Bookings (linked) |
| **Packages** | PKG | LIVE | Pricing architecture and package logic | Bookings (linked) |
| **Partner Outreach** | PO | LIVE | Planner pipeline and relationship tracking | Affiliates |
| **Affiliates** | AFF | LIVE | Referral tracking and commission management | Bookings (linked) |
| **Organic Content** | OC | LIVE | Creative intelligence and content performance | — |
| **Paid Ads** | AD | LIVE | Ad intelligence and spend performance | — |
| **Lessons** | LES | LIVE | Institutional intelligence database | Approval Queue |
| **Approval Queue** | APQ | LIVE | Founder decision centralization | All tables (linked by event) |
| **Founder Decisions** | FD | LIVE | Formal founder decision record | Approval Queue |
| **Emergency Escalations** | EMG | LIVE | Emergency event log | Bookings (linked) |
| **Audit Log** | AUD | LIVE | Immutable action record | All tables |
| **AI Prompt Versions** | AIV | LIVE | Prompt version control | Audit Log |
| **Deployment Log** | DEP | LIVE | Production deployment record | Audit Log |
| **Automation Failures** | AF | LIVE | Failure detection and retry log | Audit Log |
| **Cybersecurity Incidents** | CSI | LIVE | Security incident record | — |
| **Governance Reviews** | GRV | LIVE | Governance review history | — |
| **Entity Registry** | ENT | LIVE | Legal entity and financial backbone | Financial Periods |
| **Financial Periods** | FP | LIVE | Monthly financial close and P&L | Bookings, Expenses |
| **Expenses** | EXP | LIVE | Expense tracking and AP | Bookings, Contractors |
| **Contractors** | CTR | LIVE | Contractor records and payout tracking | Expenses |
| **Incapacitation Actions** | INC | LIVE | Luciana interim authority log | — |

### 2.3 Universal Required Fields

Every production table carries these mandatory fields. No table is production-ready without them.

| Field | Type | Purpose |
|-------|------|---------|
| UUID | System-generated | Permanent immutable identifier — never regenerated, reassigned, or edited |
| Record ID | Formula | Human-readable operational ID per naming standard |
| Created At | DateTime | Immutable timestamp of record creation |
| Updated At | DateTime | Last modification timestamp |
| Source System | Single Select | Stripe / Airtable / Make / Manual / API — documents data origin |
| Environment | Single Select | Production / Sandbox / Development — mandatory field |
| Status | Single Select | Lifecycle state — approved values only per table spec |
| Brand | Single Select | SSS / ME — logged on every record |
| City | Single Select | Market context — logged on every record |

### 2.4 Human-Readable ID Naming Standard

| Object | Prefix | Format | Example |
|--------|--------|--------|---------|
| Booking | BK | BK-YYYY-NNNN | BK-2026-0001 |
| Request | REQ | REQ-YYYY-NNNN | REQ-2026-0047 |
| Client | CLT | CLT-NNNN | CLT-0023 |
| Expense | EXP | EXP-YYYY-NNNN | EXP-2026-0142 |
| Contractor | CTR | CTR-NNNN | CTR-0004 |
| Vendor | VEN | VEN-NNNN | VEN-0018 |
| Financial Period | FP | FP-YYYY-MM | FP-2026-05 |
| Invoice | INV | INV-YYYY-NNNN | INV-2026-0023 |
| Refund | REF | REF-YYYY-NNNN | REF-2026-0002 |
| Audit Event | AUD | AUD-YYYY-NNNN | AUD-2026-1004 |
| Entity | ENT | ENT-NNNN | ENT-0003 |
| City | CITY | CITY-XXX | CITY-MIA |
| Founder Decision | FD | FD-YYYY-NNNN | FD-2026-0089 |
| Emergency Escalation | EMG | EMG-YYYY-NNNN | EMG-2026-0003 |
| Lesson | LES | LES-YYYY-NNNN | LES-2026-0041 |
| AI Prompt Version | AIV | AIV-NNNN | AIV-0007 |

### 2.5 Bookings Table — Core Field Specification

The Bookings table is the master operational record for every charter.

| Field | Type | Source | Rules |
|-------|------|--------|-------|
| Status | Single Select | System | NEW → AVAILABILITY_PENDING → AVAILABILITY_CONFIRMED → DEPOSIT_SENT → DEPOSIT_PAID → AGREEMENT_PENDING → CONFIRMED → BALANCE_DUE → PAID → COMPLETED → CANCELLED / VOID |
| Charter_Grade | Single Select | Will / Luciana | A / B / C / D / F — set post-charter |
| Emergency_Flag | Checkbox | Make / Will | True = all automations paused — Will-only clearance |
| Automations_Paused | Checkbox | Make | True = no outbound messages permitted |
| HV_Client | Checkbox | System | High-value client — AI escalates all outbound to human review |
| Agreement_Signed | Checkbox | Stripe / Manual | Must be true before Status = CONFIRMED on bookings above $5,000 |
| Chargeback_Risk | Single Select | Will / Luciana | LOW / MEDIUM / HIGH / ACTIVE |
| Net_Margin_Pct | Formula | System | Auto-calculated — protected from manual override |
| D7_Review_Eligible | Formula | System | TRUE only when: Charter_Grade ≠ D or F, Emergency_Flag = false, Chargeback_Risk ≠ HIGH or ACTIVE, no incident keywords in Crew Report |
| Charter_Notes | Long Text | Any | Append-only convention — never overwrite existing content |

### 2.6 Requests Table — Required Additions for Full Autonomy

The following fields must be present before Phase 2 (Inbound Response Agent) reaches full production:

| Field | Type | Purpose |
|-------|------|---------|
| Agent_Status | Single Select | AI_RESPONDING / HUMAN_REVIEW / ESCALATED / CLOSED |
| Last_AI_Action | DateTime | Timestamp of most recent autonomous AI action |
| Escalation_Reason | Long Text | Why this request was escalated to human review |
| AI_Confidence_Score | Number (0–100) | Model self-assessed confidence in the response |
| Last_Human_Touch | DateTime | Timestamp of most recent human interaction |

### 2.7 Organic Content Table — Required Additions for Creative Intelligence

| Field | Type | Purpose |
|-------|------|---------|
| Content_Asset_URL | URL | Link to final video or image asset |
| Platform_Priority | Single Select | TikTok / Instagram / Both |
| Hook_Classification | Single Select | Curiosity / Social Proof / Transformation / Emotion / Authority |
| Emotional_Classification | Single Select | Joy / Desire / FOMO / Aspiration / Comfort / Belonging |
| Performance_Score | Number | Composite score derived from reach, engagement, and save rate |
| Hook_Strength | Single Select | A / B / C / D — for AI pattern weighting |

### 2.8 Protected Financial Field Rules

The following fields are immutable once set and require a Founder Decision record for any modification:

- `Package_Price` on any Booking record after Status = CONFIRMED
- `Net_Profit` on any Booking or Financial Period record
- `Refund_Status` and `Refund_Amount` on any Booking record
- `Expense_Status` when transitioning to Paid or Void
- `Commission` and payout fields on any Contractor record
- All formula fields — manual override is prohibited under any circumstances

### 2.9 Airtable Permission Architecture

| Role | Access Level | Restrictions |
|------|-------------|--------------|
| Will (Founder) | Full access — all tables, all fields | None |
| Luciana (Ops Lead) | Editor — Requests, Bookings, Lessons, Approval Queue | No financial field edit; no schema modification |
| City Manager | View only — own city charters | No client PII; no financial field access |
| Regional Director | View only — own cluster | No financial field edit; no personnel action |
| Future CFO | Full financial tables | No client PII tables |
| Future Investor | Read-only dashboard interface | Financial Periods summary only |
| External CPA | QuickBooks / Xero only | No direct Airtable access |
| AI Systems | Read access for context injection | No write access to financial fields; no schema access |
| Make Automations | Scoped write via API token | Defined field writes only — no schema access |

---

## SECTION III — MAKE ORCHESTRATION

### 3.1 Make Governance Principles

Make is the exclusive orchestration layer. All cross-system writes, webhook handling, scheduled triggers, and multi-step workflows execute through Make scenarios. No direct API calls from external systems to Airtable, Stripe, or communication channels bypass Make unless explicitly documented as an exception.

**Core Make Rules:**
- Every scenario must include error handling with retry logic and failure notification
- Circular dependencies are prohibited (Make → Airtable trigger → Make re-trigger same scenario)
- All scenarios operate in the tagged environment (Production / Sandbox)
- Sandbox scenarios never write to production Airtable bases
- Every scenario is documented with its scenario ID, trigger type, and dependency map

### 3.2 Automation Deployment Path

All Make scenario changes follow this mandatory promotion path with no exceptions:

```
Development → Sandbox → Production
```

| Stage | Requirements |
|-------|-------------|
| Development | Scenario built and unit-tested in isolation |
| Sandbox | Integration tested against sandbox Airtable base; Stripe test mode; no real client data |
| Production | Founder approval logged; audit log entry created; rollback procedure validated; scenario ID documented |

Emergency production fixes require:
1. Immediate audit log entry
2. Rollback procedure documented before deployment
3. Founder approval (async acceptable for true emergencies — notified via Slack DM)
4. Postmortem review within 24 hours

### 3.3 Production Scenario Catalog

| Scenario | Trigger | Action | Autonomy Tier |
|----------|---------|--------|---------------|
| **INBOUND-001** | Webflow form submission | Create Airtable Request record; send auto-reply; Slack notification to Luciana | A |
| **INBOUND-002** | Request record: Agent_Status = AI_RESPONDING | Inject client context into Claude prompt; generate first-response draft | A (draft only) |
| **BOOKING-001** | Availability confirmed by Luciana | Generate Stripe payment link; send deposit request via Gmail + Quo SMS | A |
| **BOOKING-002** | Stripe deposit webhook received | Update Booking status = DEPOSIT_PAID; send confirmation email; Slack notification | A |
| **BOOKING-003** | Booking status = DEPOSIT_PAID; Agreement_Signed = false; total > $5,000 | Alert Luciana: agreement required before confirmation | B |
| **BOOKING-004** | Booking status = CONFIRMED | Send confirmation email with charter details; generate Charter Brief | A |
| **CHARTER-001** | Charter date − 72 hours | Send balance due reminder; generate Stripe balance link | A |
| **CHARTER-002** | Stripe balance webhook received | Update Booking status = PAID; send pre-charter logistics message | A |
| **CHARTER-003** | Charter date − 24 hours | Send 24-hour reminder with boarding details | A |
| **CHARTER-004** | Charter date − 12 hours | Send 12-hour reminder (weather, parking, logistics) | A |
| **CHARTER-005** | Charter date + 1 day (D1) | Send D1 post-charter warmth message | A |
| **CHARTER-006** | Charter date + 7 days (D7) | Evaluate D7_Review_Eligible; if true, send review request; if false, route to Luciana | A (conditional) |
| **CHARTER-007** | Charter date + 30 days (D30) | Send referral activation message | A |
| **EMERGENCY-001** | Emergency_Flag = true on any Booking | Pause all booking automations; Slack DM to Will; alert #sss-emergency-ops; create Emergency Escalation record; create Founder Decision: EMERGENCY | A |
| **FINANCIAL-001** | Stripe payout received | Create Expense record; reconcile against Booking; update Financial Period | A |
| **FINANCIAL-002** | Expense Status → Paid without approved Founder Decision | Create Founder Decision alert: FRAUD_INDICATOR; notify Will immediately | A |
| **FINANCIAL-003** | Weekly — Sunday 9pm | Generate weekly P&L summary; send to Will and Luciana | A |
| **INTELLIGENCE-001** | Thursday 5pm | Generate Thursday digest: lessons summary, pending approvals, operational patterns, anomalies | A |
| **OUTREACH-001** | Partner Outreach record: Stage = READY_TO_CONTACT | Generate outreach draft; route to Luciana for send | B |
| **BACKUP-001** | Daily 2am | Export all Airtable tables to CSV; store to designated secure location | A |
| **HEALTH-001** | Every 15 minutes | Check automation failure count; if anomaly detected, alert Luciana and Will | A |
| **AUDIT-001** | Any Tier A autonomous action | Write immutable Audit Log record before action is considered complete | A |

### 3.4 Make Error Handling Standards

Every production scenario implements this error handling structure:

1. **First failure:** Log to Automation Failures table; retry after 2 minutes
2. **Second failure:** Retry after 5 minutes; increment failure count
3. **Third failure:** Slack alert to Luciana (#sss-ops-alerts)
4. **Fourth failure:** Slack DM to Will; scenario pauses; creates Founder Decision: SEV-2
5. **Persistent failure (30+ minutes):** SEV-1 escalation; Will initiates manual recovery

**Idempotency Requirement:** All scenarios that create records or send messages must include idempotency checks to prevent duplicate records and duplicate client messages. Idempotency keys are stored in the Audit Log.

### 3.5 Webhook Security

All Make webhook endpoints implement:
- Authorization Bearer header validation as the first step
- 401 rejection on invalid tokens before any processing
- Webhook signing secret validation for Stripe events
- Timestamp validation to reject replayed requests older than 5 minutes
- IP allowlist where provider-enforced IP ranges are available

---

## SECTION IV — CLAUDE ORCHESTRATION

### 4.1 Claude's Role in the Stack

Claude operates as the intelligence layer. It reasons, generates, classifies, and recommends. It does not decide, execute financial transactions, or contact clients outside defined autonomous scope. Claude's outputs enter the world through two paths only:

1. **Tier A — Autonomous Execution:** Claude's output is directly executed by a Make scenario without human review, within defined scope.
2. **Tier B — Human-Reviewed:** Claude generates a draft that a human reads, approves, and sends.

Any Claude output that would require Tier C authority (human-only) is prohibited. The Claude system never generates draft content for cancellations, refunds, disputes, or safety incidents.

### 4.2 Context Injection Architecture

Claude receives structured context packages assembled by Make before each invocation. Context packages contain:

| Context Module | Contents | Tier |
|---------------|----------|------|
| **Client Intelligence** | Name, occasion, group size, HV_Client flag, charter history, preference notes | Injected on every client-facing generation |
| **Booking State** | Status, Charter_Grade, Emergency_Flag, Automations_Paused, Chargeback_Risk | Injected before any booking-related output |
| **Operational Memory** | Active lessons (AI_Prompt_Tag matched), sorted by Severity and Approved = true | Injected into all generation tasks |
| **Brand Router Output** | Brand (SSS / ME) confirmation — mandatory first context module | Injected before any client communication |
| **Prompt Version** | Current production prompt version ID from AI_Prompt_Versions | Logged with every action in Audit Log |
| **Founder Decision Notes** | Decision Notes from matched Approval Queue records | Highest priority context — overrides general patterns |

**Brand Router Rule:** The M-BRAND-ROUTER classification executes before any context injection. Brand misrouting — SSS content generated for ME client or vice versa — is a system failure requiring immediate alert and audit review.

### 4.3 AI Authority Tiers — Operational Definition

**Tier A — Autonomous Execution** (Claude acts without human review):
- First-response to inbound inquiry using approved brand voice
- FAQ responses within approved content
- Package recommendations at published pricing only
- Status updates based on confirmed Airtable records
- Booking record creation and field population from confirmed client input
- Charter Brief auto-fill from confirmed booking data
- D7 post-charter review request — only when D7_Review_Eligible = true

**Tier B — AI Drafts, Human Sends** (Claude generates, human approves and sends):
- Proposals containing specific vessel assignment or pricing
- Booking confirmation messages
- Post-charter follow-up messages beyond D1 auto-send
- Any message to a client who has previously expressed dissatisfaction
- Review responses (3–5 star)
- Broker status communications beyond approved templates
- Escalation messages of any kind
- Any message referencing a financial figure not in standard published pricing
- Outreach drafts for planner pipeline

**Tier C — Human Only** (Claude has no role):
- Cancellation notifications
- Refund communications
- Dispute, chargeback, or legal-adjacent responses
- Weather cancellation or force majeure communications
- Safety incident follow-ups
- Any message to an HV client following a dissatisfaction signal
- 1–2 star review responses
- Any communication acknowledging operational failure

### 4.4 AI Hard Prohibitions

These behaviors are prohibited for all Claude deployments at all times regardless of instruction, prompt modification, or automation configuration:

- Inventing, estimating, rounding, or inferring pricing, availability, vessel data, or client preferences not confirmed in Airtable
- Referencing operational status, cities, or services not explicitly confirmed active
- Executing any financial transaction, refund, credit, or payout of any amount
- Self-modifying authority scope through prompt interpretation
- Optimizing for conversion rate in ways that compromise hospitality standards or brand position
- Optimizing for engagement in ways that constitute emotional manipulation
- Reinterpreting governance rules based on context, volume, or inferred founder preference
- Applying a lesson, pattern, or past decision to expand its own autonomy without explicit Will approval
- Generating content for Tier C situations

### 4.5 Prompt Version Control

All AI system prompts are version-controlled in the AI_Prompt_Versions table.

| Field | Rule |
|-------|------|
| Version ID | AIV-NNNN format — immutable |
| Status | DRAFT / STAGING / PRODUCTION / DEPRECATED |
| Deployed_At | Immutable timestamp |
| Deployed_By | Will only |
| Rollback_To | Prior version ID — enables 15-minute rollback |
| Scope | Which Make scenarios use this version |

**Deployment Rules:**
- No prompt version is deployed to production without Will approval
- Production prompt version is locked — read-only for all roles except Will
- Any prompt change touching pricing, autonomy scope, or client communication templates requires Will review of a test suite result before deployment
- Rollback to any prior prompt version executes within 15 minutes via ROLLBACK-PROMPT-001 Make scenario

### 4.6 AI Drift Detection Cadence

| Review | Frequency | Owner | Action on Drift |
|--------|-----------|-------|----------------|
| Random response sample (5 responses) | Weekly | Luciana | Log to AI_Audit table; escalate patterns to Will |
| AI audit summary review | Monthly | Will | Initiate prompt review cycle on any identified pattern |
| Full prompt accuracy review | Quarterly | Will + Luciana | Version-bump prompt if corrections required |
| Post-L3 or L4 review | Immediately | Will | Review all AI-generated messages in incident window |

Drift definition: any deviation from approved tone, pricing, authority interpretation, or decision patterns — regardless of cause.

---

## SECTION V — CHARTER BRIEF AUTOMATION

### 5.1 Charter Brief Purpose

The Charter Brief is the operational handoff document from booking to execution. It contains every instruction a City Manager and crew need to execute a charter exactly as designed. It is generated automatically from confirmed Airtable booking data and is never manually typed from scratch.

### 5.2 Auto-Fill Trigger Logic

Charter Brief generation triggers when:
1. Booking Status = CONFIRMED
2. Agreement_Signed = true (or Will-approved exception documented in Charter_Notes)
3. Emergency_Flag = false
4. Charter date is T-14 days or closer

The CHARTER-004 Make scenario assembles the Charter Brief by reading the following Airtable fields and injecting them into the approved template:

| Charter Brief Field | Source Airtable Field | Fallback |
|--------------------|----------------------|---------|
| Client Name | Clients.Name | Alert Luciana: missing |
| Charter Date | Bookings.Charter_Date | Alert Luciana: missing |
| Vessel Name | Yachts.Vessel_Name | Alert Luciana: missing |
| Boarding Location | Yachts.Marina + Yachts.Slip_Number | Alert Luciana: missing |
| Group Size | Bookings.Group_Size | Alert Luciana: missing |
| Package Name | Packages.Package_Name | Alert Luciana: missing |
| Duration | Bookings.Duration | Alert Luciana: missing |
| Add-Ons | Bookings.Add_Ons_Selected | None if empty |
| F&B Instructions | Packages.F&B_Standard + Bookings.F&B_Notes | Package standard if no custom notes |
| Crew Instructions | Yachts.Standard_Crew_Notes + Bookings.Crew_Notes | Vessel standard if no custom notes |
| Emergency Contact | Clients.Emergency_Contact | Alert Luciana: missing |
| Special Occasion | Bookings.Occasion | None if empty |
| City Manager | Cities.City_Manager_Name | Alert: city manager not assigned |
| Broker | Brokers.Broker_Name | N/A if direct booking |
| Balance Confirmed | Bookings.Balance_Paid = true | Alert Luciana if false |

### 5.3 Charter Brief Version Control

Every Charter Brief is saved as a versioned record in Airtable linked to the Booking record. If the Charter Brief is modified after initial generation, the new version is logged with:
- Modified_At timestamp
- Modified_By (Luciana or Will)
- Change_Reason
- Prior version preserved in Version_History field

City Manager receives the current version 48 hours before charter via Slack DM and email. Resend of updated version is automatic on any modification.

### 5.4 Charter Brief Delivery Sequence

| T-Minus | Action | Channel | Automation |
|---------|--------|---------|-----------|
| T-14 | Initial Brief generated and sent to Luciana for review | Internal | CHARTER-004 |
| T-48 | Final Brief sent to City Manager | Slack DM + Email | CHARTER-005 |
| T-24 | Reminder sent to City Manager confirming Brief receipt | Slack | CHARTER-006 |
| T-0 | Brief accessible in City Manager's Airtable view | Airtable | Always-on |

### 5.5 Charter Brief Deviation Protocol

Any deviation from the approved Charter Brief on the day of charter requires Will approval. No City Manager may substitute vessels, modify the route, change F&B, or alter logistics without a documented Founder Decision. Emergency vendor substitutions from the approved backup list are permitted with immediate logging.

---

## SECTION VI — OPERATIONS PORTAL ARCHITECTURE

### 6.1 Portal Purpose and Governance

The Operations Portal is the command center for daily operational execution. It is not experimental UI. It is operational infrastructure. The portal consolidates task routing, escalation visibility, outreach tracking, charter operations, and EOD reporting into one mobile-accessible interface.

The portal is an Airtable Interface supplemented by a hosted web application (SheSaidSail_OpsPortal). Access is governed by role. The portal never surfaces client PII to City Managers or unauthorized parties.

### 6.2 Portal Sections and Function

| Section | Purpose | Primary User | Data Source |
|---------|---------|-------------|-------------|
| **Do This Now** | Prioritized task queue — AI-surfaced, human-executed | Luciana | Airtable: Requests, Bookings, Approval Queue |
| **Active Bookings** | Charter lifecycle dashboard — current status of all confirmed bookings | Luciana | Airtable: Bookings (Status = CONFIRMED through COMPLETED) |
| **Escalations** | Open escalations requiring Will or Luciana action | Will, Luciana | Airtable: Approval Queue (Decision = PENDING) |
| **Outreach Tracker** | Planner and partner outreach calendar | Luciana | Airtable: Partner Outreach |
| **Charter Operations** | Day-of charter view — active charters, crew status | Luciana, City Managers | Airtable: Bookings (Charter_Date = today) |
| **Financial Pulse** | MTD revenue, margin, outstanding balances | Will | Airtable: Bookings, Financial Periods |
| **HV Alerts** | High-value client flags requiring personal attention | Will, Luciana | Airtable: Bookings (HV_Client = true) |
| **EOD Report** | Daily operational summary | Will | Generated by INTELLIGENCE-001 Make scenario |
| **System Health** | Automation status, failure alerts, last backup | Will | Airtable: Automation Failures, Deployment Log |

### 6.3 Booking Tool — Concierge Interface

The concierge booking tool (hosted at Netlify) is the payment generation surface for Luciana. It reads pending Requests from Airtable, surfaces client data automatically, allows add-on selection, generates Stripe payment links, and pre-fills client SMS and email messages.

**Booking Tool Workflow:**
1. Luciana opens tool — pending Requests from Airtable displayed automatically
2. Tap client → all form data pre-populated (name, phone, email, vessel, package, date, guests)
3. Verify package selection — update from dropdown if client requested a change
4. Select add-ons — deposit amount updates in real time
5. Generate Payment Link → Stripe checkout link for 50% deposit created
6. Send Text → pre-written SMS opened in Messages with all booking details
7. Send Email → pre-written confirmation email opened in mail client
8. Total workflow: under 60 seconds from lead to payment link

**For clients who texted or DM'd directly (no form submission):** Tap New Booking → manual entry → same workflow.

### 6.4 Mobile Governance Requirement

The portal must support founder governance from mobile in under 5 minutes daily and under 30 minutes weekly. This is mandatory design architecture. Any portal update that breaks mobile accessibility is a deployment failure.

---

## SECTION VII — OPERATIONAL INTELLIGENCE

### 7.1 Operational Intelligence Stack

Operational intelligence is the AI-generated situational awareness layer that enables proactive decision-making rather than reactive management. It surfaces patterns, anomalies, and recommended actions from Airtable data.

**Intelligence is not reporting.** Reporting shows what happened. Operational intelligence surfaces what requires attention now and what patterns should inform future decisions.

### 7.2 Data Reliability Tiers

All intelligence output is classified by reliability tier. Tier mixing is a governance violation.

| Tier | Type | Source | Rules |
|------|------|--------|-------|
| **Tier 1 — Exact** | Founder decisions, balances, revenue, charges, executed payouts | Airtable (confirmed) or Stripe | AI reads and summarizes. Never invents, estimates, rounds, or overwrites. If source unavailable, shows fallback indicator — never cached or estimated value. |
| **Tier 2 — Operational Intelligence** | Recommended calls, relationship alerts, stalled leads, ad performance, city health signals | AI-generated from Airtable reads | Refreshed minimum every 24 hours. Staleness indicator required if older than 24 hours. Based on real records only — not inference. |
| **Tier 3 — AI Guidance** | Proposals, morning briefs, campaign recommendations, conversation suggestions, pattern-based forecasts | AI synthesis | Guidance only. May be wrong. Will exercises judgment on every item. Labeled "AI suggests" or "based on recent patterns." Never displayed in the same visual space as Tier 1 without clear separation. |

### 7.3 Institutional Memory — Lessons Architecture

The Lessons table is the compounding institutional intelligence database. Every operational insight, founder approval, and resolved incident becomes a structured, searchable, AI-readable lesson.

**Lesson Lifecycle:**
1. Lesson created (by Claude, Luciana, or Will) → Status = PENDING_REVIEW
2. Will reviews → Approved / Denied / Modified
3. If Approved: Status = ACTIVE → enters AI Active Context
4. AI queries active lessons on every generation task by matching AI_Prompt_Tags
5. Quarterly review: stale lessons archived, contradictory lessons resolved

**AI Weighting Rules:**

| Signal | AI Response |
|--------|-------------|
| Approved + Repeatable + Improved Outcome | Prioritize in context |
| Worsened Outcome | Avoid pattern |
| Founder Decision Note | Highest priority — treat as direct instruction |
| Modified Approval | Adopt Will's modification as the standard |
| Denied Approval | Treat as hard boundary |
| Critical Severity | Triple weighting in context injection |

### 7.4 Thursday Digest

Every Thursday at 5:00 PM, INTELLIGENCE-001 generates and sends:

- Weekly lessons summary (new lessons created, approved, applied)
- Pending Approval Queue items
- Operational patterns from the week
- High-severity lessons requiring Will attention
- Autonomy threshold candidates (categories approved 5 consecutive times)
- AI-generated observations on anomalies or emerging patterns

Delivered to: Will (Slack DM) and Luciana (Slack DM).

### 7.5 Anomaly Detection Rules

Make monitors for these conditions and creates Founder Decision alerts automatically:

| Anomaly | Trigger | Response |
|---------|---------|---------|
| Booking Package_Price modified after Status = CONFIRMED | Any field edit | Founder Decision: FINANCIAL_INTEGRITY |
| Refund marked Processed without approved Founder Decision | Status change | Founder Decision: FRAUD_INDICATOR + Will DM |
| Expense created and marked Paid in same session without prior approval | Sequence detection | Founder Decision: FRAUD_INDICATOR + Will DM |
| Multiple financial field modifications on same record within 10 minutes | Time-window monitoring | Founder Decision: FRAUD_INDICATOR |
| Any Airtable record in a financial table deleted | Deletion event | SEV-1 + Will DM + audit review |
| Automation failure count exceeds 3 in 60 minutes | HEALTH-001 | SEV-2 alert to Will and Luciana |
| AI Audit Log gap detected (autonomous action without log record) | Log reconciliation | System failure flag — Will review |

---

## SECTION VIII — FINANCIAL INTELLIGENCE

### 8.1 Financial System Architecture

The financial system operates across three distinct layers that must never be conflated:

| Layer | System | Role | Authority |
|-------|--------|------|-----------|
| **Operational Intelligence** | Airtable | Booking revenue, P&L by charter, expense tracking, pipeline value | AI reads and summarizes — never writes financial formulas |
| **Accounting Ledger** | QuickBooks / Xero | Compliance, tax, payroll, formal P&L | External CPA access only |
| **Payment Source of Truth** | Stripe | Client charges, deposits, balances, refunds, payouts | Immutable — Stripe events are never overridden |

### 8.2 Entity Registry

The Entity Registry table is the legal and financial backbone of the organization. Every financial object links to an entity.

| Field | Purpose |
|-------|---------|
| Legal_Entity_Name | Registered entity name |
| Entity_Type | HoldCo / Operating Company / SPV |
| Parent_Entity | Ownership structure (linked record) |
| EIN / Tax_ID | Legal tax identifier |
| Jurisdiction | Delaware / Florida / international |
| Bank_Accounts | Linked banking relationships |
| Intercompany_Enabled | Supports internal allocations |
| Accounting_Method | Cash / Accrual |

### 8.3 Reporting Dimensions

Every financial object supports these independent reporting dimensions. No table combines them into an overloaded field.

| Dimension | Purpose |
|-----------|---------|
| Entity | Legal and accounting separation |
| Brand | SSS vs. ME business line |
| City | Geographic profitability |
| Department | Operational accountability |
| Campaign | Marketing attribution |
| Booking | Transaction-level intelligence |
| Contractor | Labor cost tracking |
| Vendor | AP management |
| Financial Period | Time-series reporting |

### 8.4 Financial Period Close Workflow

| Step | Action | Owner | Timing |
|------|--------|-------|--------|
| 1 | All charter bookings for the month marked COMPLETED or CANCELLED | Luciana | By end of last business day |
| 2 | All expenses for the period logged and status set | Luciana | By end of last business day |
| 3 | Financial Period P&L auto-calculated by Airtable formulas | System | Automatic |
| 4 | Will reviews Financial Period summary | Will | First business day of following month |
| 5 | Will approves close: Period_Status = CLOSED | Will | After review |
| 6 | QuickBooks / Xero export generated for closed period | Operations | After close approval |
| 7 | Export stored under /Finance/Exports/YYYY/MM/ | Operations | After export |

### 8.5 Booking-Level P&L Architecture

Each Booking record carries a complete P&L calculation:

| Field | Calculation |
|-------|------------|
| Gross_Revenue | Package_Price + Add_Ons_Total |
| Vessel_Cost | Broker rate × 90% (Gale discount) |
| Labor_Cost | City Manager payout (10% of net profit) + crew labor |
| FB_Cost | Package-specific F&B cost from Packages table |
| Tax_Collected | Revenue × City tax rate |
| Net_Revenue | Gross_Revenue − Tax_Collected |
| Total_Cost | Vessel_Cost + Labor_Cost + FB_Cost |
| Net_Profit | Net_Revenue − Total_Cost |
| Net_Margin_Pct | Net_Profit / Net_Revenue |
| CM_Payout | Net_Profit × 10% |
| Referral_Commission | Revenue × 5% (if affiliate linked) |

All calculated by Airtable formulas. No manual calculation permitted. No formula field may be overridden manually.

### 8.6 Margin Protection Rules

- Any booking priced such that net margin falls below 20% after all costs requires Will approval before confirmation
- Luciana does not hold authority to confirm a booking that erodes this threshold under any circumstances, including client pressure or time constraints
- Protected inventory (Monaco Social, flagship vessels, peak weekends, holidays) may not be discounted autonomously

### 8.7 Payout Architecture

| Payout Type | Rate | Trigger | Approval |
|-------------|------|---------|---------|
| City Manager | 10% of Net Profit | Booking Status = COMPLETED | Will reviews monthly payout summary |
| Referral Commission | 5% of Revenue | Booking Status = COMPLETED + Affiliate linked | Will reviews monthly |
| Contractor | Per contract | Services rendered and logged | Luciana initiates; Will approves above threshold |

Contractor payouts above $500 require a corresponding Founder Decision record and pre-approval before payment initiation.

---

## SECTION IX — CREATIVE INTELLIGENCE

### 9.1 Creative System Purpose

The creative intelligence system exists to identify winning content patterns, preserve brand standards, optimize content quality, and maintain emotional consistency across She Said Sail and Mare Executive. It is not a content factory. It is a pattern recognition and curation engine.

### 9.2 Creative Authority Boundaries

**AI may:**
- Recommend hook frameworks based on performance patterns
- Classify content by emotional category and hook type
- Analyze performance trends from the Organic Content table
- Generate caption drafts and caption variations for human review
- Identify high-performing content patterns for replication

**AI may not:**
- Publish content to any social feed
- Autonomously modify brand voice
- Optimize purely for vanity metrics (reach, follower count)
- Introduce trend-chasing language that conflicts with brand governance
- Create artificial urgency or emotional manipulation in content

### 9.3 Content Intelligence Architecture

The Organic Content table tracks every piece of content produced for SSS and ME with the following intelligence fields:

| Field | Purpose |
|-------|---------|
| Platform | TikTok / Instagram / Both |
| Content_Type | Hook Video / Testimonial / BTS / Event / Educational |
| Hook_Classification | Curiosity / Social Proof / Transformation / Emotion / Authority |
| Emotional_Classification | Joy / Desire / FOMO / Aspiration / Comfort / Belonging |
| Hook_Text | First 3 seconds of script — AI-classified |
| Performance_Score | Composite: reach + engagement + save rate |
| Hook_Strength | A / B / C / D — for AI pattern weighting |
| Brand_Compliance | Will review flag |
| Published_Date | Actual publish date |
| Creator | Linked Affiliate / Crew / Internal |

### 9.4 Content Hierarchy

Content prioritizes emotional atmosphere over product details:

1. **Emotion** — how the group feels
2. **Atmosphere** — what the environment communicates
3. **Group Dynamic** — social energy and cohesion
4. **Hospitality Detail** — the care moments
5. **Vessel** — background context
6. **Product Details** — package and logistics (last)

The vessel is background. The emotional atmosphere is foreground.

### 9.5 Brand Voice Compliance in Creative

All AI-generated creative content is evaluated against Master Brand Governance before human review. AI flags any output that contains:
- Prohibited words (amazing, awesome, unforgettable, luxury lifestyle, elite, baller, epic)
- Hard-close sales patterns
- Fake scarcity language
- Corporate jargon
- Nightlife or spring break energy

Flagged content routes to Will for review before Luciana sees it. Brand compliance is non-negotiable.

### 9.6 Ads Intelligence Architecture

The Paid Ads table tracks all paid media with these performance fields:

| Field | Purpose |
|-------|---------|
| Platform | Meta / TikTok / Google |
| Ad_Name | Campaign and creative identifier |
| Budget | Approved monthly spend cap |
| Spent | Actual spend to date |
| CPL | Cost per qualified lead |
| ROAS | Return on ad spend |
| Bookings_Attributed | Confirmed bookings traced to ad |
| Status | ACTIVE / PAUSED / COMPLETED |

**Ad Spend Governance:** No paid ad spend above the pre-approved monthly budget executes without Will approval. All budget changes are Founder Decisions. Autonomous fatigue detection (HEALTH-001 variant) alerts when CPL exceeds threshold or ROAS falls below floor.

---

## SECTION X — EMERGENCY OPERATIONS PROTOCOL

### 10.1 Emergency Classification Matrix

Every situation has exactly one escalation level. No situation is unclassified. If a situation does not fit L1–L3, it is L4 by default.

| Level | Definition | Default Owner | Response | Automation State |
|-------|-----------|---------------|----------|-----------------|
| **L1** | Operational variance — vendor delay, minor charter timing shift, logistics adjustment | City Manager | Resolve per Charter Brief — log immediately | Normal |
| **L2** | Client dissatisfaction, early return, complaint unresolved in 30 minutes, vendor performance issue | Luciana + Will informed | Luciana leads with Will guidance | Normal |
| **L3** | HV client dissatisfaction, double booking, day-of vessel issue, crew incident, financial dispute | Will | All client communications hold until Will reviews | Outbound paused for affected booking |
| **L4** | Safety incident, injury, media inquiry, legal exposure, Emergency_Flag triggered | Will — IMMEDIATE | All automations paused — zero client messages — Will directs all actions | Full pause on affected booking |

### 10.2 Emergency_Flag Protocol

When Emergency_Flag = true on any Booking record, the following occurs automatically and simultaneously:

1. All Make automations for that booking pause immediately — Automations_Paused = true
2. Slack DM sent directly to Will (not channel-only)
3. Alert posted to #sss-emergency-ops channel
4. Founder Decision created: Type = EMERGENCY, Urgency = IMMEDIATE
5. Emergency_Escalations record created: Booking_ID, City, Initiated_At, Type, Description
6. Zero client-facing communications until Will manually sets Emergency_Flag = false and Automations_Paused = false
7. Emergency_Escalations record requires Will's Resolution entry before flag clearance is valid

**Flag Clearance Authority:** Will only. No automation, no staff member, and no AI system clears Emergency_Flag.

### 10.3 Emergency Operations Channel — #sss-emergency-ops

The #sss-emergency-ops Slack channel is the dedicated emergency coordination surface.

**Channel Rules:**
- No operational chatter — emergency and L3/L4 situations only
- All L4 alerts post here automatically via EMERGENCY-001
- Will is the only person who closes an emergency thread
- Channel is monitored by Will and Luciana at all times
- City Managers do not have channel access — they escalate to Luciana via direct message

**L4 Emergency Thread Format (auto-posted by EMERGENCY-001):**
```
🚨 EMERGENCY ALERT — [BOOKING ID] — [CITY] — [TIMESTAMP]
Type: [EMERGENCY TYPE]
Booking: [CLIENT NAME] — [CHARTER DATE]
Description: [Auto-populated from Emergency_Escalations record]
Status: AWAITING WILL CLEARANCE
Automations: PAUSED
```

### 10.4 HQ Unavailability Default Protocol

When both Will and Luciana are simultaneously unreachable:

| Situation | City Manager Action |
|-----------|-------------------|
| Charter in progress | Continue to completion per Charter Brief — captain holds safety authority |
| Charter not yet started (departure > 2 hours away, HQ unreachable > 4 hours) | Hold — do not start |
| Vendor emergency | Approved backup list only — up to $300 — log immediately — notify HQ on restoration |
| Client complaint | Zero resolution commitments — log full details — escalate when HQ reachable |
| Financial decision of any amount | No action — hold until Will reachable |
| Media contact at any location | Zero statements — log outlet, journalist, location, time — escalate immediately |

### 10.5 Cybersecurity Incident Response

On confirmed or suspected system compromise:

1. **Contain:** Affected system treated as hostile until cleared. No operational data entered, no automations trusted, no client communications through affected channel.
2. **Suspend:** All Make automations touching the compromised system paused immediately via Make dashboard.
3. **Alert:** Will notified via phone call — not Slack, not SMS — as primary channel.
4. **Log:** Cybersecurity_Incidents record created: timestamp, incident type, affected system, discovery method, initial scope, actions taken.
5. **Rotate:** All credentials for affected system and any system sharing credentials rotated before return to operation.
6. **Verify:** No system returns to production until Will explicitly authorizes after reviewing incident log and rotation confirmation.

**Platform-Specific Response:**

| Platform | Immediate Action |
|----------|-----------------|
| Stripe | Freeze payouts via Stripe dashboard → contact Stripe fraud team → Will authorizes resumption |
| Airtable | Revoke all API tokens → audit access log → regenerate → Will approves re-integration |
| Anthropic API | Rotate key → audit recent call logs → update all Make scenarios |
| Make | Disable all scenarios touching compromised system → audit webhook delivery logs |
| Meta / TikTok | Remove unauthorized access → audit post and ad activity → report to platform |
| GitHub | Revoke compromised PATs → audit commit history → notify affected parties |

---

## SECTION XI — AI CONTAINMENT FRAMEWORK

### 11.1 Containment Architecture Overview

AI containment is not a feature. It is a structural property of the system. Containment is achieved through:

1. **Authority Tiers** — hard-coded scope boundaries that cannot expand through inference
2. **Prompt Version Control** — immutable production versions with rollback capability
3. **Audit Logging** — every autonomous action generates an immutable record
4. **Human Checkpoints** — Tier B and Tier C actions require human review before transmission
5. **Emergency Override** — Emergency_Flag stops all autonomous execution
6. **Drift Detection** — weekly human review of AI outputs against governance standards

### 11.2 Anti-Drift Rules

These rules are permanent and non-negotiable. They apply regardless of performance history, conversion data, or operational volume.

- AI systems do not autonomously reinterpret governance rules based on context or prior decision patterns
- AI systems do not self-expand authority by inferring approval from the absence of objection
- AI systems do not evolve pricing recommendations based on conversion data
- AI systems do not optimize for conversion rate in ways that compromise service standards or brand integrity
- AI systems do not optimize for engagement through emotional pressure, false urgency, or manipulative framing
- AI systems do not develop brand positioning language that has not been approved through Will's review
- AI systems do not apply operational lessons to categories outside the category in which the lesson was logged
- AI systems do not treat Tier 3 guidance outputs as Tier 1 fact under any condition

### 11.3 Autonomy Threshold Governance

Autonomy is earned, not assumed. A Founder Decision category becomes eligible for conditional autonomous execution only when:

1. Will has approved the same Request Type five consecutive times with no modifications and no denials
2. Will has manually enabled the Auto-Apply flag for that category in the Approval Queue
3. No contradictory founder guidance exists in the Lessons table for that category

No category activates automatically. Will may revoke autonomous status for any category at any time without a governance amendment. AI may recommend autonomy eligibility. Only Will may approve it.

### 11.4 Brand Router Containment

M-BRAND-ROUTER is a non-negotiable first step in every inbound lead flow and AI generation task. The brand router:

- Classifies every request as SSS or ME before any context injection
- Routes SSS leads to SSS voice, SSS pricing, SSS packages only
- Routes ME leads to ME voice, ME pricing, ME packages only
- Flags ambiguous requests for Luciana classification before AI proceeds
- Logs brand classification on every Audit Log entry

Cross-brand contamination is a system failure that generates an immediate alert.

---

## SECTION XII — ESCALATION SYSTEMS

### 12.1 Escalation Path Architecture

Every escalation path is deterministic. No situation exists where the escalation path is undefined.

```
L1 → City Manager resolves
L2 → City Manager escalates to Luciana → Luciana resolves with Will guidance
L3 → Luciana escalates to Will → Will resolves → Luciana communicates
L4 → Emergency_Flag → All automations pause → Will directs all actions
```

### 12.2 Founder Decision System

The Approval Queue table is the centralized founder decision architecture. No approvals occur through Slack, SMS, text, or email. All decisions are documented here.

| Field | Required |
|-------|---------|
| Request_Title | YES |
| Submitted_By | YES |
| Request_Type | YES |
| Urgency | YES (IMMEDIATE / SAME_DAY / THIS_WEEK / WHEN_AVAILABLE) |
| Context | YES |
| Proposed_Action | YES |
| Financial_Impact | If applicable |
| Decision | YES (APPROVED / DENIED / APPROVED_WITH_MODIFICATION / DEFERRED) |
| Decision_Note | Will's instruction — highest-priority AI context |
| Decided_At | Immutable timestamp |
| Auto-Apply | Will-only flag for autonomy threshold activation |

**Request Type Categories:**
- EMERGENCY — L4 incidents, active crises
- FINANCIAL — expenses, refunds, pricing exceptions, payouts
- PERSONNEL — strikes, PIPs, terminations, role changes
- BRAND — content approval, partnerships, public representation
- SYSTEM — prompt deployments, schema changes, automation modifications
- VENDOR — new vendor approvals, vendor removals
- BOOKING — charter deviations, vessel substitutions, client exceptions

### 12.3 SLA Standards by Urgency

| Urgency | Will Response SLA | Luciana Action |
|---------|-------------------|---------------|
| IMMEDIATE | As fast as reachable — phone first | Pause all related actions until Will responds |
| SAME_DAY | Within business hours same day | Hold action — send follow-up if not received by EOD |
| THIS_WEEK | Within 5 business days | Queue for Thursday digest review |
| WHEN_AVAILABLE | No hard deadline | Standard queue |

---

## SECTION XIII — ROLLBACK SYSTEMS

### 13.1 Rollback Capability Requirements

Every production system must support rollback within defined time limits. No production deployment proceeds without a validated rollback procedure.

| System | Rollback Capability | Target Time | Mechanism |
|--------|-------------------|-------------|-----------|
| AI Prompt Version | Full rollback to prior version | 15 minutes | ROLLBACK-PROMPT-001 Make scenario |
| Make Scenario | Revert to prior scenario version | 30 minutes | Make version history + scenario ID documented |
| Airtable Schema | Revert field additions; restore from backup for deletions | 60 minutes | Airtable history + CSV backup restore |
| Financial Records | Restore from daily backup | 4 hours | CSV restore to staging → manual reconciliation |
| Full Airtable Base | Restore from daily backup | 4 hours | CSV import to sandbox → validate → promote |

### 13.2 Prompt Rollback Protocol

When a prompt drift event or L3+ incident is identified:

1. Will identifies the affected AI_Prompt_Versions record
2. Will sets current production version Status = DEPRECATED
3. Will sets prior version Status = PRODUCTION
4. ROLLBACK-PROMPT-001 Make scenario re-deploys the prior version to all affected scenarios
5. Audit Log entry created: rollback type, from version, to version, reason, timestamp
6. Drift incident logged in AI_Audit table with root cause and corrective action
7. Will reviews all AI-generated messages sent since the drifted version was deployed

### 13.3 Automation Rollback Protocol

When a Make scenario failure is detected:

1. Failing scenario disabled via Make dashboard immediately
2. Prior scenario version restored from Make version history
3. Audit Log entry: scenario ID, failure reason, rollback action, timestamp
4. Deployment Log updated with rollback event
5. SEV-2 or SEV-1 determination made based on business impact
6. Postmortem created if SEV-1

### 13.4 Financial Rollback Protocol

When a financial record integrity issue is detected:

1. Automation freeze immediately — no further financial writes
2. Will notified directly
3. Affected records identified and flagged in Audit Log
4. Corrective action documented as Founder Decision
5. If data corruption: restore from most recent daily backup to sandbox → validate → Will approves reconciliation → apply corrections manually
6. Postmortem created and added to governance archive

---

## SECTION XIV — AUTOMATION GOVERNANCE

### 14.1 Change Control Requirements

All production automation changes require:

| Requirement | Mandatory |
|-------------|-----------|
| Impact Analysis | YES — which scenarios, which Airtable tables, which clients affected |
| Rollback Plan | YES — documented before deployment |
| Automation Dependency Review | YES — no circular dependencies |
| Sandbox Validation | YES — no production experimentation |
| Audit Log Entry | YES — before and after deployment |
| Founder Approval | YES — logged as Founder Decision: SYSTEM |

### 14.2 Automation Dependency Map Requirements

Before any new scenario is deployed to production, a dependency map is documented:

- Input: what triggers this scenario (webhook, Airtable trigger, schedule, HTTP call)
- Read operations: which Airtable tables and fields are read
- Write operations: which Airtable tables and fields are written
- External calls: which external services are called (Claude API, Stripe, Quo, Gmail, Slack)
- Output: what is produced (Airtable record, email, SMS, Slack message, Stripe object)
- Downstream dependencies: which Airtable automations or Make scenarios depend on this output
- Failure behavior: what happens if this scenario fails — manual fallback documented

### 14.3 Prohibited Automation Patterns

- Circular dependency chains (Make → Airtable → Make re-trigger)
- Recursive webhook chains
- Multi-system write loops that cannot be interrupted
- Scenarios without error handling or failure notification
- Scenarios without idempotency protection (risk of duplicate records or messages)
- Scenarios that write to financial fields without a corresponding Audit Log entry
- Scenarios that call the Claude API without logging the prompt version and output to Audit Log
- Scenarios that send client-facing messages without checking Emergency_Flag and Automations_Paused

### 14.4 Environment Tagging

Every scenario is tagged with its environment. Sandbox scenarios never write to production Airtable bases. Production scenarios never run in test mode against real client data with destructive actions.

```
Environment field mandatory on all records written by Make automations.
```

---

## SECTION XV — AUDIT LOGGING

### 15.1 Audit Log Requirement

Every autonomous AI action — any Tier A execution or any Tier B draft that is subsequently sent — must generate an immutable audit log record before the action is considered complete. If the audit log write fails, the action is surfaced for manual logging. An unlogged action is an incomplete action.

### 15.2 Audit Log Field Specification

| Field | Type | Description |
|-------|------|-------------|
| Log_ID | Formula | AUD-YYYY-NNNN — immutable |
| Timestamp | DateTime | ISO 8601 UTC — immutable once written |
| Triggering_Event | Long Text | Airtable record change, webhook receipt, or scheduled trigger |
| Source_Data | Long Text | Specific Airtable fields and values read by AI to generate output |
| Model_Version | Text | AI model identifier active at time of execution |
| Prompt_Version | Linked Record | AI_Prompt_Versions record ID |
| AI_Confidence_Score | Number | Model self-assessed confidence (0–100) where applicable |
| Output | Long Text | Exact text or data generated by AI system |
| Destination | Text | Where output was sent (channel, Airtable field, Make webhook) |
| Approval_State | Single Select | AUTONOMOUS / PENDING_HUMAN / HUMAN_APPROVED / HUMAN_REJECTED |
| Reviewed_By | Collaborator | Staff member who approved Tier B output — null for Tier A |
| Rollback_Linkage | Text | Record ID and reversal action required to undo this output |
| Brand | Single Select | SSS / ME — logged on every record |
| City | Single Select | Market context — logged on every record |
| Environment | Single Select | Production / Sandbox / Development |

### 15.3 Audit Log Immutability Rules

- Audit log records are never deleted
- Audit log records are never edited after creation
- Only Will may mark a log record as Resolved or Archived — original record preserved
- Audit logs are exported as part of the monthly governance archive
- Any audit log gap — autonomous actions without corresponding log records — is treated as a system failure requiring Will review

### 15.4 Required Audit Events

Every one of these events generates an Audit Log record before the event is considered complete:

- All Tier A autonomous AI actions
- All Tier B drafts when subsequently sent
- All Make scenario production deployments and rollbacks
- All Airtable schema changes in production
- All financial field modifications
- All Founder Decision approvals and denials
- All Emergency_Flag activations and clearances
- All prompt version deployments and rollbacks
- All cybersecurity incident responses
- All backup and restore events

### 15.5 Weekly AI Audit Review

Luciana reviews a random sample of five AI-generated responses each week. She documents in the AI_Audit table:
- Tone accuracy (brand compliance)
- Factual accuracy (no hallucinated pricing, availability, or vessel data)
- Hallucination instances
- Autonomy boundary compliance
- Escalation appropriateness

Will reviews the AI audit summary monthly. Any pattern triggers a prompt review cycle.

---

## SECTION XVI — SYSTEM HEALTH AND MONITORING

### 16.1 Health Monitoring Architecture

System health monitoring runs continuously via HEALTH-001 Make scenario (every 15 minutes) and the System Health section of the Operations Portal.

| Metric | Normal State | Alert Threshold | Response |
|--------|-------------|----------------|---------|
| Automation failure count | 0 per hour | >3 per 60 minutes | SEV-2 — Luciana alert |
| Audit Log gap | 0 gaps | Any gap | System failure — Will review |
| Stripe webhook latency | <30 seconds | >5 minutes | SEV-2 — manual reconciliation |
| Airtable API error rate | <1% | >5% | SEV-2 — Make retry + Luciana alert |
| Claude API error rate | <1% | >10% | SEV-2 — fallback to human drafting |
| Last backup age | <24 hours | >48 hours | SEV-3 — Will notification |
| Emergency_Flag count | 0 | Any | Immediate — Will DM + ops channel |

### 16.2 Severity Classification and Response

| Level | Description | Response Time | Required Response |
|-------|-------------|--------------|-------------------|
| SEV-1 | Financial or operational integrity threat | Immediate | Automation freeze + Will notification + audit review + rollback evaluation + postmortem |
| SEV-2 | Automation failure or system outage | Within 30 minutes | Operations review + diagnostics + rollback assessment |
| SEV-3 | Reporting or dashboard inconsistency | Same business day | Issue tracking + remediation logging |
| SEV-4 | Minor operational inconsistency | Within 72 hours | Logging + scheduled resolution |

**SEV-1 Examples:** duplicate payout, failed emergency escalation, AI loop, unauthorized pricing, protected inventory violation, deployment corruption, financial record deletion.

### 16.3 Restore Testing Protocol

Once per quarter, Will or a designated technical operator performs a full restore test of the most recent Airtable backup to a staging environment confirming:
- All tables and records restored accurately
- All formula fields recalculate correctly
- All linked records resolve correctly
- All Make automations function against restored data in staging

Restore test results logged in Governance_Reviews table. A failed restore test is a SEV-1 operational incident.

---

## SECTION XVII — MULTI-CITY SCALING

### 17.1 Universal Operating Standards

Every city operates under identical brand, service, and operational standards regardless of size, market, or launch date. There is no "good enough for now" exception for newer markets.

City-specific supplements address local logistics only. They may not deviate from universal standards on:
- Brand voice and communication style
- Emergency escalation paths
- Financial governance and margin floors
- AI authority boundaries
- Client privacy standards
- Charter Brief format and delivery protocol

### 17.2 New City Launch Requirements

Before any new city launch is authorized, the following must exist and be current:

| Requirement | Status |
|-------------|--------|
| City Supplement document for target market | Required before launch authorization |
| Minimum two approved vendors per service category | Required — vendor insurance verified |
| Named and contracted City Manager with completed onboarding | Required |
| Named and briefed backup operator | Required |
| Airtable City record with Active = false (Will sets to true at launch) | Required |
| Charter Brief templates tested in staging | Required |
| Airtable city views and filters configured | Required |
| Emergency contact and escalation path documented | Required |
| Local tax rate and compliance requirements documented | Required |

### 17.3 City Manager Operational Scope

| City Manager May Do | City Manager May Not Do |
|--------------------|------------------------|
| Execute charter per approved Charter Brief — zero deviation | Deviate from Charter Brief without Will approval |
| Emergency vendor replacement from approved backup list — log immediately | Use unapproved vendors on any charter |
| Pre-departure client timing contact using approved template language | Initiate any client communication outside approved templates |
| Log operational notes in Airtable | Modify any Airtable record other than operational notes in own city records |
| Notify HQ of any incident within 30 minutes | Make any financial decision of any amount |
| Escalate any client complaint immediately | Offer any resolution, credit, or commitment to clients |

### 17.4 Regional Director Governance

When Regional Directors are activated (multi-city clusters):

| Regional Director May Do | Regional Director May Not Do |
|--------------------------|------------------------------|
| City Manager daily check-ins during probation | Make any financial decision |
| Vendor bench audit — observation and written recommendation only | Approve any vendor for first charter use |
| Cluster city scorecard review for Will reporting | Initiate any personnel action |
| Recommend city probation to Will | Deliver city probation notification (Will delivers — RD copied) |

### 17.5 Airtable Multi-City Architecture

Cities table supports geographic operations across all markets:

| Field | Purpose |
|-------|---------|
| City_ID | CITY-XXX format |
| City_Name | Market name |
| City_Manager | Linked Contractor record |
| Active | Checkbox — Will-only modification |
| Tax_Rate | Local tax rate for P&L formula |
| Marina_List | Approved boarding locations |
| Vendor_List | Linked vendor records for this city |
| Charter_Brief_Template | City-specific template version |
| City_Status | NORMAL / PROBATION / SUSPENDED |
| Health_Score | System-calculated from recent charter grades |

City probation and suspension are Will-only decisions. No automation, no staff member, and no AI system changes City_Status without Will approval.

---

## SECTION XVIII — OPERATIONAL REDUNDANCY AND BACKUP

### 18.1 Backup Schedule

| Asset | Frequency | Method | Owner |
|-------|-----------|--------|-------|
| Airtable bases (all) | Daily | Automated CSV export via Make (BACKUP-001) to designated secure storage | Make automation |
| Make scenarios | Weekly | Full scenario export — tagged with ISO date | Will or designated operator |
| GitHub repositories | Continuous | Git version control with protected main branch | GitHub |
| Governance documents | Immediate on modification + monthly archive | GitHub commits + offline archive | Will |
| AI Prompt library | Monthly | Versioned export of all AI_Prompt_Versions records | Will |
| Audit logs | Monthly | Immutable export appended to governance archive | Make automation |
| Credential vault | On every credential rotation | Versioned vault export | Will |

### 18.2 Credential Vault Governance

- Credential Vault location documented in writing — accessible to Will and Luciana only
- All API keys, webhook secrets, OAuth tokens, and database credentials stored in vault only
- No API key or credential stored in frontend code at any time
- No credential shared externally or included in client-facing systems
- Dashboard access code rotated on any team member departure and at minimum every 90 days
- All rotations logged in vault with rotation timestamp and rotating party

### 18.3 Redundancy Requirements

- All Airtable bases have at minimum Will and Luciana with Editor access — no single-person dependency on any production system
- All Make scenarios have documented scenario IDs and are exported monthly
- No operational system exists without a documented human fallback procedure if automation fails
- Emergency vendor list maintained per city with at minimum two approved alternatives per service category

### 18.4 Backup Validation

Quarterly restore testing is mandatory. A failed restore test is a SEV-1 incident requiring immediate remediation before the next scheduled backup cycle.

---

## SECTION XIX — INFRASTRUCTURE SCALING AND ACQUISITION READINESS

### 19.1 Scaling Architecture

The current infrastructure is designed to support the following scale without architectural rebuild:

| Dimension | Current | Design Ceiling |
|-----------|---------|---------------|
| Cities | 2 | 10+ |
| Brands | 2 | Multiple |
| Legal Entities | 2 | Multi-entity HoldCo structure |
| Daily Bookings | <10 | 100+ |
| City Managers | 2 | 20+ |
| Concurrent Charters | <5 | 50+ |
| AI Agent Phases | Phase 1–2 active | Phase 6 full deployment |

### 19.2 Acquisition Readiness Requirements

The company maintains acquisition and investment readiness at all times through:

- **Financial Records:** Complete, accurate, and current in Airtable and QuickBooks / Xero. Financial Period records closed and exported monthly.
- **Audit Trails:** Immutable audit logs for all significant operational and financial actions. Exportable on demand.
- **Governance Documentation:** All governance documents version-controlled in GitHub with complete amendment history.
- **Vendor and Contract Archive:** All vendor agreements, broker agreements, and client agreements executed and archived.
- **No Side Agreements:** No undocumented side agreements, informal promises, or verbal commitments with financial or operational implications.
- **Privacy Compliance:** Client data handling compliant with applicable privacy law.
- **System Documentation:** This document and all governance files provide complete operational documentation for due diligence.
- **Reporting Dimensions:** Financial data supports slicing by entity, brand, city, department, campaign, booking, and time period — suitable for investor reporting.

### 19.3 Executive Team Scaling Governance

As the company hires executive roles (CFO, COO, VP Operations, Head of Marketing):

- All executives operate within authority limits defined in their role documentation
- No executive role holds authority that supersedes Will without Will's explicit governance amendment
- All executive authority grants are documented and version-controlled
- This governance document and the LOCKED framework supersede any executive's individual authority interpretation
- Future CFO receives full financial table access — no client PII tables
- Future COO operates within operational authority defined by Will — no system architecture authority without amendment

### 19.4 Multi-Entity Financial Architecture

As subsidiary entities are added:

- Entity Registry table is the legal backbone — every new entity is registered here before any financial activity
- Intercompany allocations are governed by the Intercompany_Settlement_Rules field per entity
- Consolidated reporting is available across all active entities via Financial Periods table
- No subsidiary or international entity may operate outside this governance framework
- Jurisdiction-specific compliance (labor, privacy, maritime law) is documented in the City Supplement before launch

### 19.5 Agent Deployment Roadmap

The AI agent build follows a governed phase structure. Each phase requires completion of prior phase governance before production activation.

| Phase | Capability | Target Outcome | Governance Gate |
|-------|-----------|---------------|-----------------|
| **Phase 1** | Stripe Webhook + Auto Upsell | Instant revenue expansion — add-on offers on booking confirmation | Audit logging mandatory; rollback capability validated; Will visibility on all offers |
| **Phase 2** | Inbound Response Agent | Sub-2-minute first response to all inbound inquiries | No pricing improvisation; escalation triggers required; confidence scoring mandatory |
| **Phase 3** | Post-Charter Lifecycle | D1–D60 automated follow-up, review requests, referral activation | Emotional mirroring controlled; HV clients escalated to human; rate limiting enforced |
| **Phase 4** | Outreach Agent | Daily planner outreach — autonomous first contact | Rate limiting required; spam prevention mandatory; warm leads escalated to human |
| **Phase 5** | Content + Ad Intelligence | Self-improving content engine with performance pattern recognition | Approval-before-posting mandatory; budget caps enforced; brand voice protection mandatory |
| **Phase 6** | Voice Operations | AI phone operations — inbound and outbound | Human escalation required; transcription logging mandatory; large deals auto-escalated |

No phase advances to production without Will's explicit approval and a documented governance amendment for the phase's specific autonomy grant.

---

## SECTION XX — GOVERNANCE REVIEW CADENCE

### 20.1 Scheduled Reviews

| Review | Frequency | Owner | Scope |
|--------|-----------|-------|-------|
| Random AI response sample | Weekly | Luciana | 5 responses — tone, accuracy, hallucination, autonomy boundaries |
| System health audit | Weekly | Luciana | Automation failures, backup status, pending escalations |
| Thursday digest review | Weekly | Will | Lessons, approvals, patterns, anomalies |
| AI audit summary | Monthly | Will | Full AI performance review |
| Financial period close | Monthly | Will + Luciana | Revenue, margin, payouts, expenses |
| Governance accuracy review | Quarterly | Will + Luciana | This document + all LOCKED governance files |
| Full prompt accuracy review | Quarterly | Will + Luciana | All AI_Prompt_Versions — accuracy, drift, relevance |
| Restore testing | Quarterly | Will + designated operator | Airtable backup + Make scenario validation |
| Operational decay prevention | Quarterly | Will | Stale lesson archival, contradiction cleanup, autonomy recalibration |
| Full constitutional review | Annually | Will | All governance documents |
| Expansion-triggered review | Before each new city launch | Will | City Supplement + operational readiness |
| Post-L4 incident review | Following any L4 event | Will | Full incident postmortem + governance implications |
| Acquisition-triggered review | Before any investment or acquisition process | Will + counsel | Full governance + financial + operational documentation |

### 20.2 Amendment Requirements for This Document

This document is classified PRODUCTION. Any material change requires:

1. Will identifies the specific provision requiring change
2. New versioned file created: `02_SYSTEMS_AUTOMATIONS__Systems_Intelligence_Architecture_v[X.X]_PRODUCTION.md`
3. New version supersedes prior version from effective date
4. Prior version archived with supersession note
5. All Make scenarios, AI prompts, and SOPs referencing changed provisions updated within 7 days
6. Amendment logged in Governance_Reviews table

### 20.3 Governance Hierarchy Reminder

When any conflict arises between this document and another document:

```
LOCKED governance files  >  This document (PRODUCTION)  >  ACTIVE SOPs  >  DRAFT specifications
```

No system, automation, or staff member may interpret their way around this hierarchy.

---

*SHE SAID SAIL + MARE EXECUTIVE*
*CONFIDENTIAL — INTERNAL USE ONLY*
*02_SYSTEMS_AUTOMATIONS__Systems_Intelligence_Architecture_v2.0_PRODUCTION*
*Effective May 2026*
*Owner: Will (Founder)*
*Constitutional Authority: 00_LOCKED_GOVERNANCE__Founder_Control_and_AI_Authority_Framework_v2.0_LOCKED*

*Built for permanence. Optimized for scale. Designed for acquisition readiness.*
