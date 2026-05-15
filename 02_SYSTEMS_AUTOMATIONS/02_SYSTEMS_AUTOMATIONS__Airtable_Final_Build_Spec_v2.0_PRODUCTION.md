# 02_SYSTEMS_AUTOMATIONS__Airtable_Final_Build_Spec_v2.0_PRODUCTION

**Status:** PRODUCTION
**Version:** 2.0
**Effective Date:** May 2026
**Owner:** Will (Founder)
**Scope:** She Said Sail + Mare Executive — All Bases, All Tables, All Automations
**Classification:** Confidential — Internal Use Only
**Constitutional Authority:** 00_LOCKED_GOVERNANCE__Founder_Control_and_AI_Authority_Framework_v2.0_LOCKED

---

## SECTION 1 — EXISTING AIRTABLE AUDIT

### 1.1 Live Base Inventory

| Base Name | Base ID | Tables | Status | Verdict |
|-----------|---------|--------|--------|-------|
| She Said Sail | appdZ49WqgjRXxA1R | 28 | Live — primary ops base | KEEP + OPTIMIZE |
| She Said Sail — Financials | apprDKQtV2GInThwE | 4 | Live — financial intelligence | KEEP + UPGRADE |
| She Said Sail — Operations v4 | apppFfA2VZVmamvXe | 9 | Live — richer schema variants | MIGRATE INTO PRIMARY, THEN RETIRE |
| She Said Sail — Operations v4 | app2FbmVD44BXShyx | 4 | Duplicate name, different content | MIGRATE INTO PRIMARY, THEN RETIRE |
| SSS Operations Extension | appOQ0MGpQU1W4hoN | 4 | All 4 tables are duplicates of app2FbmVD44BXShyx | RETIRE IMMEDIATELY |
| Influencer Outreach | appVWYY9Fp6tKu94m | 1 | Isolated — no cross-base links | MERGE INTO PRIMARY, THEN RETIRE |
| She Said Sail copy | appQVZRgKKS0diyVX | UNKNOWN | Rogue copy — uncontrolled | ARCHIVE AND DELETE |
| Operations v4 | app49vaVbRwuobpPv | UNKNOWN | Schema not retrieved (connection issue) | MISSING INFO NEEDED |

**Audit Score — Current State:**

| Dimension | Score | Reason |
|-----------|-------|--------|
| Operational Quality | 4/10 | Core tables exist but fragmented across 8 bases |
| Automation Readiness | 3/10 | No single base contains all Make dependencies |
| Financial Readiness | 4/10 | Financial base unlinked from ops records |
| AI Readiness | 3/10 | AI_Prompt_Versions duplicated with conflicting schemas |
| Scaling Readiness | 2/10 | Architecture cannot survive a third city without rebuild |

---

### 1.2 Critical Audit Findings

**FINDING 1 — SEVERE BASE FRAGMENTATION**
8 bases exist where the governance requires 2 (Production + Financials) plus 1 optional Sandbox.
Tables that must be linked to each other are in different bases. Airtable does not support cross-base linked records. This breaks every rollup, every formula dependency, and every Make scenario that reads related records in a single query.

**FINDING 2 — DUPLICATE TABLES WITH CONFLICTING SCHEMAS**
The following tables exist in 2 or more bases with different field counts and different data:

| Table | Base Instances | Field Counts |
|-------|---------------|-------------|
| Emergency_Protocols | apppFfA2VZVmamvXe, app2FbmVD44BXShyx, appOQ0MGpQU1W4hoN | 10 / 10 / 10 |
| Make_Scenarios | app2FbmVD44BXShyx, appOQ0MGpQU1W4hoN | 12 / 12 |
| ME_Pricing | app2FbmVD44BXShyx, appOQ0MGpQU1W4hoN | 12 / 12 |
| Concierge_Operators | app2FbmVD44BXShyx, appOQ0MGpQU1W4hoN | 12 / 12 |
| AI_Prompt_Versions | appdZ49WqgjRXxA1R (9 fields), apppFfA2VZVmamvXe (26 fields) | 9 / 26 |
| Yacht_Availability | appdZ49WqgjRXxA1R (13 fields), apppFfA2VZVmamvXe (17 fields) | 13 / 17 |

No single source of truth exists for any of these tables. Make scenarios writing to one instance do not update the other. This is a data integrity failure.

**FINDING 3 — BOOKINGS TABLE OVERLOAD**
The Bookings table (tbl72omPibBkn2hZL) contains 129 fields. This is the single most dangerous schema decision in the current system.
Consequences:
- Make modules reading Bookings must handle 129 fields per API call — performance degradation
- AI context injection contains irrelevant fields — hallucination and noise risk
- Field management becomes unworkable at this scale
- Permission scoping is impossible — all-or-nothing field access
- Formula recalculation on every field write slows all automations

Target after optimization: 70 fields maximum. Fields to extract into related tables are identified in Section 3.

**FINDING 4 — FINANCIAL BASE IS UNLINKED**
The She Said Sail — Financials base (apprDKQtV2GInThwE) contains P&L Per Charter with a Booking_ID field typed as singleLineText — not a linked record. This means:
- No rollup from Bookings to P&L is possible without Make writing both records
- No formula in the Financial base can read live Booking data
- Reconciliation between bases requires manual or Make-driven duplication
- Any Booking record change does not propagate to P&L Per Charter automatically

**FINDING 5 — MISSING MANDATORY GOVERNANCE TABLES**
The following tables required by governance documentation do not exist in any base:

| Required Table | Governance Source | Current Status |
|----------------|-----------------|----------------|
| Expenses | Financial_OS_v1.0 | MISSING |
| Contractors | Financial_OS_v1.0 | MISSING |
| Financial_Periods | Systems_Intelligence_Architecture_v2.0 | MISSING |
| Chart_of_Accounts | Financial_OS_v1.0 | MISSING |
| Incapacitation_Actions | Founder_Control_Framework_v2.0 Art. VII | MISSING |
| Cybersecurity_Incidents | Founder_Control_Framework_v2.0 Art. VIII | MISSING |
| Governance_Reviews | Founder_Control_Framework_v2.0 Art. XVIII | MISSING |
| AI_Audit | Systems_Intelligence_Architecture_v2.0 | MISSING |
| Team_Members | Operational_Memory_Layer_v1.0 | MISSING |
| Automation_Health | Systems_Intelligence_Architecture_v2.0 | MISSING |

**FINDING 6 — PARTNER OUTREACH TABLE OVERLOAD**
Partner Outreach (tblnjGWa6JNiogfCo) contains 84 fields. This table conflates the outreach pipeline (lead tracking, outreach stages) with relationship intelligence (partnership ROI, commission history, content tracking). These are two separate operational concerns with different Make triggers, different AI contexts, and different permission requirements.

**FINDING 7 — PACKAGES TABLE SEVERELY UNDERDEVELOPED**
Packages (tblwDw2hkKW5moSr9) has only 8 fields and is the pricing authority source for all booking quotes. It is missing: F&B cost targets, margin floor enforcement, peak multipliers, add-on pricing matrix, city-specific variants, and the AI-readable includes/excludes fields required for context injection. ME_Pricing in app2FbmVD44BXShyx has a more complete schema (12 fields) but only covers Mare Executive.

**FINDING 8 — AI_PROMPT_VERSIONS HAS WRONG SCHEMA IN MAIN BASE**
The AI_Prompt_Versions table in the main base (tbl0FJkA1E6a70cxX) has only 9 fields: Name, Notes, Assignee, Status, Attachments, Attachment Summary, Prompt_Name, Version, Content. It is missing: Deployed_By, Deployed_At, Rollback_To_Version, Brand, Make_Variable_Name, Performance_Notes, Will_Approved, Leads_Processed, Leads_Converted, Conversion_Rate_Pct, Override_Count. The correct schema lives in apppFfA2VZVmamvXe (tbl2NSec9JjqW34Xf, 26 fields). The main base version is not production-ready and cannot support rollback governance.

**FINDING 9 — ROGUE COPY BASE**
She Said Sail copy (appQVZRgKKS0diyVX) exists with unknown contents. This base was created outside the governed amendment process defined in Article II of the Founder Control Framework. It represents either a schema experiment or a migration attempt that was never completed or documented. It must be audited, contents confirmed as duplicate, and deleted.

**FINDING 10 — PLACEHOLDER TABLES CONSUMING SCHEMA SPACE**
Three tables in the main base — Brand (tbllNjlllEhG92Ozo), Services (tblBOgArrdfPkvR8B), and Expansion Pipeline (tbllga7euKfd2ykM5) — each contain only 6 generic fields (Name, Notes, Assignee, Status, Attachments, Attachment Summary). These are Airtable default scaffolding tables that were never built out. They consume schema bandwidth and create confusion about source of truth.

**FINDING 11 — ENVIRONMENT GOVERNANCE NOT IMPLEMENTED**
The governance specification requires an Environment field (Production / Sandbox / Development) on every record in every table. This field is absent from the majority of tables in the main base. Sandbox records cannot be isolated from production data. Make scenario testing in sandbox writes to the same base as production.

**FINDING 12 — UUID GOVERNANCE NOT IMPLEMENTED**
The governance spec requires an immutable UUID on every record. No table in the main base has a dedicated UUID field. Primary fields are human-readable IDs (Booking ID, Request ID) or default text fields. Airtable's native record ID serves this function but is not exposed as an editable field, which means Make scenarios reference it correctly but human-readable audit trails cannot reference it without a formula field extracting RECORD_ID().

---

## SECTION 2 — FINAL TABLE LIST

### 2.1 Final Base Architecture

After migration, the system consolidates to two production bases plus one sandbox.

| Base | Base ID | Role |
|------|---------|------|
| SSS Operations | appdZ49WqgjRXxA1R | All core ops, intelligence, governance tables |
| SSS Financials | apprDKQtV2GInThwE | Financial intelligence, investor reporting, payouts |
| SSS Sandbox | UNKNOWN — create or repurpose | Testing only — never referenced by production Make scenarios |

All other bases retire after migration is confirmed complete.

---

### 2.2 SSS Operations Base — Final Table List

| Table Name | Table ID | Action | Source |
|------------|----------|--------|--------|
| Requests | tblTlSB9CO4dTGodg | OPTIMIZE — reduce to 45 fields, add 5 missing autonomy fields | Main base existing |
| Bookings | tbl72omPibBkn2hZL | OPTIMIZE — reduce from 129 to 70 fields, extract financial fields | Main base existing |
| Clients | tblr84vRIWC5HmKvo | OPTIMIZE — add UUID formula, add Environment field | Main base existing |
| Guests | UNKNOWN | CREATE — migrate from apppFfA2VZVmamvXe tblkEXnrZldbk2JNg | Migration |
| Yachts | tblvyZk1SorIQ6KWF | OPTIMIZE — add charter readiness fields | Main base existing |
| Yacht_Availability | UNKNOWN | REPLACE — retire tblDOoV4CHh8t4qpj, create from apppFfA2VZVmamvXe schema | Migration |
| Vessel_Maintenance | UNKNOWN | CREATE — migrate from apppFfA2VZVmamvXe tbl07thLiuTNymGE0 | Migration |
| Brokers | tblUrAVcx4HMdWVsN | OPTIMIZE — add performance score, city health rollup | Main base existing |
| Vendors | tbl4xD1mKhf0QL9Fe | OPTIMIZE — add insurance alert automation fields | Main base existing |
| Packages | tblwDw2hkKW5moSr9 | REBUILD — expand from 8 to 25 fields, merge SSS + ME pricing | Main base existing |
| Cities | tblzqHlzECDvJ8KRH | OPTIMIZE — add City_Health_Score formula | Main base existing |
| City_Financials | UNKNOWN | CREATE — migrate from apppFfA2VZVmamvXe tblMciqDfXEAyXLuY | Migration |
| Regional_Directors | UNKNOWN | CREATE — migrate from apppFfA2VZVmamvXe tbl2ttsHinOEpNk1j | Migration |
| Concierge_Operators | UNKNOWN | CREATE — migrate from app2FbmVD44BXShyx tblIP5y0ScYyZuElf | Migration |
| Lessons | tblAben0zR8spPPhE | OPTIMIZE — add UUID formula, Environment field | Main base existing |
| Founder Decisions | tblFCE26qDwfp4Jwd | OPTIMIZE — add SLA enforcement fields | Main base existing |
| Audit Log | tblrMpTfMk8q1eNHp | EXPAND — add 8 missing governance fields | Main base existing |
| State Transition Log | tblWCmLmR1x8CaxNH | KEEP — feeds Audit Log, do not merge | Main base existing |
| AI_Prompt_Versions | UNKNOWN | REPLACE — retire tbl0FJkA1E6a70cxX, create from apppFfA2VZVmamvXe tbl2NSec9JjqW34Xf schema | Migration |
| AI_Audit | UNKNOWN | CREATE — new table, no existing equivalent | New build |
| Conversations | tblhMocOusidgd3N0 | OPTIMIZE — add brand router output field, escalation flags | Main base existing |
| Emergency_Escalations | UNKNOWN | CREATE — migrate from apppFfA2VZVmamvXe tbloilr1Cl4HMOlbQ | Migration |
| Emergency_Protocols | UNKNOWN | CREATE — migrate from app2FbmVD44BXShyx tblmV5ZFLhPwmvhYp | Migration |
| Incident_Reports | UNKNOWN | CREATE — migrate from apppFfA2VZVmamvXe tblgiQqr7NkmXOSWy | Migration |
| Cybersecurity_Incidents | UNKNOWN | CREATE — new table | New build |
| Incapacitation_Actions | UNKNOWN | CREATE — new table | New build |
| Governance_Reviews | UNKNOWN | CREATE — new table | New build |
| Make_Scenarios | UNKNOWN | CREATE — migrate from app2FbmVD44BXShyx tblwG90rBtKMENs0U | Migration |
| Automation_Health | UNKNOWN | CREATE — new table | New build |
| Operational_Audits | UNKNOWN | CREATE — migrate from apppFfA2VZVmamvXe tbll6kqF7Q6y12ri3 | Migration |
| Partner Outreach | tblnjGWa6JNiogfCo | SPLIT — reduce to 45 fields (outreach pipeline only), extract partnership data | Main base existing |
| Affiliates | tbltZIenYJsUrUYIP | OPTIMIZE — add linked Partnership records | Main base existing |
| Influencers | UNKNOWN | CREATE — migrate from appVWYY9Fp6tKu94m tblMQ9nv5WGp3RtTP | Migration |
| Organic Content | tbl09BGFacWim5Rk7 | OPTIMIZE — add performance intelligence fields | Main base existing |
| Paid Ads | tblVsxlNdP9xHDipE | OPTIMIZE — confirmed solid schema | Main base existing |
| Copy/Creative Assets | tblutlUhd804erPev | KEEP — confirmed solid | Main base existing |
| Website/Landing Page | tblVq6XV6AyOxfXAU | KEEP — confirmed solid | Main base existing |
| Google Reviews | tblE2tMb5A1IqwOzW | KEEP — confirmed solid | Main base existing |
| Calls Recommended | tbl18uNpNd7HPBCps | KEEP — confirmed solid | Main base existing |
| Dashboard Notes | tblL9xCyFbl0fGkLB | KEEP | Main base existing |
| Expenses | UNKNOWN | CREATE — new table | New build |
| Contractors | UNKNOWN | CREATE — new table | New build |
| Team_Members | UNKNOWN | CREATE — new table | New build |

**Tables to Archive and Remove:**

| Table | Table ID | Base | Reason |
|-------|----------|------|--------|
| Brand | tbllNjlllEhG92Ozo | appdZ49WqgjRXxA1R | Placeholder — 6 fields, no operational use |
| Services | tblBOgArrdfPkvR8B | appdZ49WqgjRXxA1R | Placeholder — 6 fields, no operational use |
| Expansion Pipeline | tbllga7euKfd2ykM5 | appdZ49WqgjRXxA1R | Placeholder — 6 fields, no operational use |
| Yacht_Availability (old) | tblDOoV4CHh8t4qpj | appdZ49WqgjRXxA1R | Incomplete schema — 13 fields vs 17 in migration source |
| AI_Prompt_Versions (old) | tbl0FJkA1E6a70cxX | appdZ49WqgjRXxA1R | 9 fields — missing 17 required governance fields |
| All tables in appOQ0MGpQU1W4hoN | tblZxt3cULUcUyd2A, tblYyxOoLEnNyJnsZ, tblYzAzYQO1TkcQph, tblkliSCA923i5JII | appOQ0MGpQU1W4hoN | All are duplicates — retire entire base |
| All tables in appQVZRgKKS0diyVX | UNKNOWN | appQVZRgKKS0diyVX | Rogue copy — audit contents, then delete |

---

### 2.3 SSS Financials Base — Final Table List

| Table Name | Table ID | Action |
|------------|----------|--------|
| P&L Per Charter | tblFLiODVbQENbL5U | RESTRUCTURE — Booking_ID stays singleLineText (cross-base limitation), add Make sync timestamp and validation fields |
| Financial_Periods | UNKNOWN | CREATE — replace Monthly Revenue (tblpTgps7cRQwDZp2), expand to full period close workflow |
| Payouts | tblaoU1alZ8lPJZKY | OPTIMIZE — add Founder Decision link field, approval gate field |
| Tax Tracker | tbluP7OwTVzPGjyNm | KEEP — schema is correct |
| Chart_of_Accounts | UNKNOWN | CREATE — new table |
| Entity_Registry | UNKNOWN | CREATE — new table |
| Cash_Flow_Forecast | UNKNOWN | CREATE — new table |
| Investor_Reports | UNKNOWN | CREATE — new table |

---

## SECTION 3 — CRITICAL FIELD CHANGES

### 3.1 Universal Fields — Add to Every Table That Is Missing Them

The following fields are required on every production table per the Systems Intelligence Architecture v2.0. Tables missing these fields are not production-ready.

| Field Name | Type | Purpose | Tables Currently Missing It |
|------------|------|---------|-----------------------------|
| UUID | Formula: RECORD_ID() | Permanent immutable identifier | Most tables in main base |
| Environment | Single Select: Production / Sandbox / Development | Sandbox isolation | Most tables in main base |
| Brand | Single Select: SSS / ME | Brand context for AI and Make | Lessons, Audit Log, Conversations, multiple others |
| Source_System | Single Select: Stripe / Airtable / Make / Manual / API | Data origin tracking | Most tables |
| Created_At | DateTime | Immutable creation timestamp | Several tables use Airtable default "Created Time" — standardize field name |

---

### 3.2 Bookings Table — Field Changes (tbl72omPibBkn2hZL)

**Fields to Extract into Separate Tables:**

The following Bookings fields contain data that belongs in related tables. Extracting them reduces the table from 129 to approximately 70 fields and enables proper Make module scoping.

| Current Bookings Field | Extract To | Replacement in Bookings |
|------------------------|-----------|------------------------|
| Net Profit, Margin Pct, City Manager Payout, Referral Commission, Tax Collected, Tax Remitted, Total Cost, Boat Cost, Labor Cost, F&B Cost, Revenue Per Guest, Add_On_Revenue | P&L Per Charter (Financial base) — Make syncs on COMPLETED status | Rollup lookup from P&L Per Charter via Booking ID match |
| D0 Sent, D1 Sent, D3 Sent, D7 Sent, D9 Gift Sent, D14 Sent, D30 Sent, D60 Sent, HV D2 Call Done, HV D5 Sent, HV D21 Sent, HV D23 Sent, D7 Reminder Sent, D10 Reminder Sent, D72hr Reminder Sent, D48hr Reminder Sent, Charter_Brief_Sent, Charter_Brief_All_Vendors_Confirmed, T7_Confirmed, T48_Captain_Confirmed | Automation_Health table (new) — one record per Booking, tracks all send states | Single field: Last_Automation_Timestamp + Automations_Paused checkbox |
| Crew Report, Crew_Report_Submitted, Vendor_Ratings_Entered, Charter_Grade, Charter_NPS, Exceptional Charter | Operational_Audits (linked record per charter) | Keep only: Charter_Grade (single select), Emergency_Flag (checkbox) |

**Fields to Add to Bookings:**

| Field Name | Type | Why |
|------------|------|-----|
| D7_Review_Eligible | Formula | TRUE only when Charter_Grade not D/F, Emergency_Flag false, Chargeback_Risk not HIGH/ACTIVE — required for CHARTER-006 Make scenario |
| HV_Client | Checkbox | Replace HV Booking — standardize field name to match governance spec |
| Automations_Paused | Checkbox | ALREADY EXISTS — confirm Make reads this before any outbound send |
| Agent_Status | Single Select: AI_RESPONDING / HUMAN_REVIEW / ESCALATED / CLOSED | Required for Phase 2 inbound agent |
| AI_Confidence_Score | Number 0-100 | Required for Phase 2 |
| Last_Human_Touch | DateTime | Required for Phase 2 |
| Refund_Issued | Checkbox | Required for City_Financials refund rate calculation |

**Protected Fields — No Manual Edit Permitted:**

The following Bookings fields must be locked to Make-only writes after Status = CONFIRMED. Will approval required for any modification:

- Package Price
- Net Profit (formula — never override)
- Margin Pct (formula — never override)
- Refund_Status
- Refund_Amount (not currently in schema — add)
- Chargeback_Risk (Luciana or Will only)

---

### 3.3 Requests Table — Required Additions (tblTlSB9CO4dTGodg)

Five fields required before Phase 2 (Inbound Response Agent) goes live. These fields already appear as field names in the table (Agent Status visible, Agent Active, Agent Status, Last Agent Message) but the governance-spec names differ. Confirm field IDs and standardize:

| Required Field Name | Governance Spec Name | Current Field Status |
|--------------------|---------------------|---------------------|
| Agent_Status | Agent_Status | EXISTS as "Agent Status" — confirm type is Single Select |
| Last_AI_Action | Last_Agent_Message_Timestamp | EXISTS — rename to match governance spec |
| Escalation_Reason | MISSING | CREATE — Long Text |
| AI_Confidence_Score | MISSING | CREATE — Number 0-100 |
| Last_Human_Touch | MISSING | CREATE — DateTime |

---

### 3.4 AI_Prompt_Versions — Schema to Implement

Retire tbl0FJkA1E6a70cxX. Create new table using the schema from apppFfA2VZVmamvXe (tbl2NSec9JjqW34Xf). Critical fields to carry forward:

| Field | Type | Governance Requirement |
|-------|------|----------------------|
| Prompt_Version_ID | Formula: AIV-NNNN | Immutable human-readable ID |
| Status | Single Select: DRAFT / TESTING / LIVE / DEPRECATED | Required for rollback governance |
| Content | Long Text | Full prompt verbatim — read-only once LIVE |
| Deployed_By | Text | Must be Will for all LIVE deployments |
| Deployed_At | DateTime | Immutable |
| Rollback_To_Version | Text | Prior version ID — required before any LIVE deployment |
| Will_Approved | Checkbox | Gate field — no LIVE without true |
| Make_Variable_Name | Text | Exact Make variable name: SSS_SYSTEM, ME_SYSTEM |
| Conversion_Rate_Pct | Formula | Leads_Converted / Leads_Processed |
| Brand | Single Select: SSS / ME | Required — SSS and ME prompts are separate |

---

### 3.5 Packages Table — Rebuild Required (tblwDw2hkKW5moSr9)

Current: 8 fields. Required: 25+ fields. This table is the pricing authority for all AI quote generation and Make deposit link creation. Its current state means AI has no validated pricing source.

| Field to Add | Type | Purpose |
|--------------|------|--------|
| City | Single Select | City-specific pricing |
| Brand | Single Select: SSS / ME | Separate SSS and ME packages |
| Margin_Floor_Pct | Percent | Min margin — below this requires Will approval |
| Peak_Multiplier | Number | Holiday/peak season rate adjustment |
| F&B_Cost_Target | Currency | Internal cost target for F&B |
| Vessel_Cost_Target | Currency | Internal cost target for vessel |
| Labor_Cost_Target | Currency | Internal cost target for crew |
| Total_Internal_Cost | Formula | F&B + Vessel + Labor cost targets |
| Implied_Margin | Formula | (Package Price - Total_Internal_Cost) / Package Price |
| Includes_Formatted | Long Text | AI-readable bullet list — what is included |
| Add_Ons_Matrix | Long Text | Add-on names, prices, cost targets — one per line |
| Live | Checkbox | AI will not quote a package where Live = false |
| Min_Guests | Number | Minimum group size |
| Max_Guests | Number | Maximum group size |
| Bookings_Count | Count | Total confirmed bookings using this package |
| Avg_Margin_Achieved | Rollup | Average actual margin from linked Bookings |

---

### 3.6 Audit Log — Missing Fields (tblrMpTfMk8q1eNHp)

Current: 17 fields. Governance spec requires these additions:

| Field to Add | Type | Governance Source |
|--------------|------|------------------|
| Prompt_Version | Text | AI_Prompt_Versions record ID — required on every AI action log |
| AI_Confidence_Score | Number | Article IX — required where applicable |
| Approval_State | Single Select: AUTONOMOUS / PENDING_HUMAN / HUMAN_APPROVED / HUMAN_REJECTED | Article IX |
| Reviewed_By | Text | Staff member who approved Tier B output |
| Rollback_Linkage | Text | Record ID and reversal action for undo |
| Environment | Single Select | Required on every record |
| Brand | Single Select: SSS / ME | Required on every record |
| City | Single Select | Required on every record |

---

## SECTION 4 — MAKE-READINESS BLOCKERS

The following issues will cause Make scenarios to fail, loop, duplicate records, or produce silent errors. Each must be resolved before the corresponding Make scenario is built or activated.

### 4.1 Blocker: No Environment Field on Bookings or Requests

**Risk:** Make scenarios in sandbox write to the same Airtable records as production scenarios. A test run triggers all downstream automation chains including real client SMS and email.
**Fix:** Add Environment field (Single Select: Production / Sandbox / Development) to Bookings and Requests. Make scenario must read this field as the first step and exit if Environment = Sandbox when running in production mode.
**Affects:** All Make scenarios.
**Priority:** CRITICAL — fix before any Make scenario is built.

### 4.2 Blocker: Bookings Table Has No Idempotency Key Field

**Risk:** If a Make scenario retries after a network failure, it re-creates the same Airtable record or re-sends the same client message. 129 fields per record makes deduplication checks expensive and error-prone.
**Fix:** Add Idempotency_Key field (Single Line Text) to Bookings. Make writes a hash of Booking_ID + Scenario_ID + Timestamp on first execution. On retry, Make checks this field before acting.
**Affects:** BOOKING-001, BOOKING-002, CHARTER-001 through CHARTER-007, EMERGENCY-001.
**Priority:** CRITICAL.

### 4.3 Blocker: Automations_Paused Field Not Verified as Read-First Step

**Risk:** If Make scenarios do not read Automations_Paused and Emergency_Flag before every client-facing outbound action, clients receive messages during emergencies.
**Fix:** Confirm Automations_Paused checkbox field exists on Bookings (it does — confirmed in schema). Confirm every outbound Make scenario reads this field as step 1 and exits with a logged failure if true.
**Affects:** All client-facing scenarios: CHARTER-001 through CHARTER-007, INBOUND-001, INBOUND-002.
**Priority:** CRITICAL — operational safety requirement.

### 4.4 Blocker: AI_Prompt_Versions Not in Main Base With Correct Schema

**Risk:** Make scenarios that inject prompt versions into Claude API calls cannot reference the correct table. The current 9-field version in the main base (tbl0FJkA1E6a70cxX) lacks Make_Variable_Name, Will_Approved, and Status fields required for production deployment gating.
**Fix:** Complete the AI_Prompt_Versions migration (Section 3.4) before any Claude API Make scenario is built.
**Affects:** INBOUND-002, CHARTER-006, OUTREACH-001, INTELLIGENCE-001.
**Priority:** HIGH.

### 4.5 Blocker: D7_Review_Eligible Field Does Not Exist

**Risk:** CHARTER-006 Make scenario cannot evaluate review eligibility without this formula field. Without it, Make either sends review requests to every completed booking (including emergency, chargeback, and low-grade bookings) or the scenario must replicate the formula logic in Make — creating a governance drift risk.
**Fix:** Add D7_Review_Eligible formula field to Bookings per Section 3.2.
**Affects:** CHARTER-006.
**Priority:** HIGH.

### 4.6 Blocker: Financial Base Cross-Base Linking Not Possible

**Risk:** P&L Per Charter (Financial base) cannot link to Bookings (Operations base) as a linked record. Make must write all financial fields to P&L Per Charter manually when Booking status = COMPLETED. If Make fails mid-write, the P&L record is incomplete with no automatic reconciliation.
**Fix:** Accept the architectural constraint. Add Last_Sync_Timestamp and Sync_Status fields to P&L Per Charter. Make FINANCIAL-001 writes these on every successful sync. HEALTH-001 checks Sync_Status and alerts if any COMPLETED Booking has no corresponding P&L record within 24 hours.
**Affects:** FINANCIAL-001, all investor reporting.
**Priority:** HIGH.

### 4.7 Blocker: Make_Scenarios Table Is in a Non-Production Base

**Risk:** The Make_Scenarios registry (tblwG90rBtKMENs0U in app2FbmVD44BXShyx) is not accessible from the main production base. Make cannot read its own scenario registry for health checks or dependency mapping.
**Fix:** Migrate Make_Scenarios to main base per Section 2.2 migration plan. Complete before any HEALTH-001 implementation.
**Affects:** HEALTH-001, AUDIT-001, deployment governance.
**Priority:** MEDIUM — needed before Phase 2.

### 4.8 Blocker: Circular Trigger Risk on Bookings Status Field

**Risk:** The Bookings table has 129 fields. Airtable automations trigger on "record updated." Make scenarios that write any field to a Booking record will trigger any Airtable native automation watching that table — including any automation that then calls Make back. This creates a circular execution loop.
**Fix:** All Airtable-native automations on Bookings must be inventoried and confirmed before Make integration is built. Any automation watching "record updated" must be scoped to specific field changes only, not the generic record update trigger.
**Affects:** All Make scenarios that write to Bookings.
**Priority:** HIGH — prevents duplicate execution chains.

### 4.9 Blocker: Partner Outreach Table Cannot Support Make Routing at 84 Fields

**Risk:** 84 fields in Partner Outreach means Make modules reading this table return a large payload on every trigger. Webhook payloads from Airtable cap at a size that 84-field records can exceed for records with populated long-text fields. Field routing in Make becomes unmanageable.
**Fix:** Reduce Partner Outreach to 45 fields (outreach pipeline only) per Section 3. Extract partnership relationship data to a linked Partnerships table before OUTREACH-001 is built.
**Affects:** OUTREACH-001.
**Priority:** MEDIUM.

---

## SECTION 5 — MIGRATION ORDER

Migration must protect live operations. No step that modifies an existing table schema executes during active charter hours (defined as 8am to 8pm in any active city's local time).

All schema changes in production require a Founder Decision record of type SYSTEM before execution per Article II of the Founder Control Framework.

### Phase 0 — Pre-Migration (No Schema Changes)

1. Audit appQVZRgKKS0diyVX (She Said Sail copy) — list all tables, confirm contents are duplicates, document audit in Governance_Reviews
2. Audit app49vaVbRwuobpPv (Operations v4) — retrieve full schema, confirm status
3. Confirm all Make scenario IDs in current production — document in Make_Scenarios registry before any migration begins
4. Will creates Founder Decision: SYSTEM for the full migration plan
5. Create SSS Sandbox base — do not repurpose any existing base with live data

### Phase 1 — Add Universal Fields to Existing Tables (Low Risk)

No records deleted. No tables removed. Only adding fields.

Order:
1. Add Environment field to Bookings, Requests, Clients, Lessons, Founder Decisions, Audit Log
2. Add Brand field to all tables missing it
3. Add UUID formula field (RECORD_ID()) to all tables
4. Add Source_System field to all tables
5. Add Idempotency_Key field to Bookings
6. Add D7_Review_Eligible formula to Bookings
7. Add Refund_Issued checkbox to Bookings
8. Add missing Audit Log fields (Section 3.6)
9. Add missing Requests fields: Escalation_Reason, AI_Confidence_Score, Last_Human_Touch

Validate after each table. Confirm Make scenarios reading these tables do not break on new field addition.

### Phase 2 — Create Missing Governance Tables

All new tables. No existing records affected.

Order:
1. Create Automation_Health table — link to Bookings
2. Create AI_Audit table — link to Audit Log
3. Create Cybersecurity_Incidents table
4. Create Incapacitation_Actions table
5. Create Governance_Reviews table
6. Create Expenses table
7. Create Contractors table
8. Create Team_Members table
9. In Financial base: Create Chart_of_Accounts, Entity_Registry, Cash_Flow_Forecast, Investor_Reports, Financial_Periods

### Phase 3 — Migrate Tables from Fragmented Bases into Main Base

Source bases: apppFfA2VZVmamvXe, app2FbmVD44BXShyx, appVWYY9Fp6tKu94m

Migration method per table:
- Export all records from source table as CSV
- Create new table in main base with correct schema
- Import CSV records
- Validate record count and field mapping
- Update any Make scenarios referencing source base table IDs to new table IDs
- Confirm linked records resolve correctly

Migration order:
1. Guests (tblkEXnrZldbk2JNg from apppFfA2VZVmamvXe) — no active Make dependencies in main base
2. Vessel_Maintenance (tbl07thLiuTNymGE0 from apppFfA2VZVmamvXe)
3. Emergency_Escalations (tbloilr1Cl4HMOlbQ from apppFfA2VZVmamvXe)
4. Incident_Reports (tblgiQqr7NkmXOSWy from apppFfA2VZVmamvXe)
5. Regional_Directors (tbl2ttsHinOEpNk1j from apppFfA2VZVmamvXe)
6. Operational_Audits (tbll6kqF7Q6y12ri3 from apppFfA2VZVmamvXe)
7. City_Financials (tblMciqDfXEAyXLuY from apppFfA2VZVmamvXe) — high field count, validate carefully
8. Emergency_Protocols (tblmV5ZFLhPwmvhYp from app2FbmVD44BXShyx)
9. Make_Scenarios (tblwG90rBtKMENs0U from app2FbmVD44BXShyx)
10. Concierge_Operators (tblIP5y0ScYyZuElf from app2FbmVD44BXShyx)
11. ME_Pricing (tblm5p6GQmYEjhZpG from app2FbmVD44BXShyx) — merge into Packages table after field expansion
12. Influencers (tblMQ9nv5WGp3RtTP from appVWYY9Fp6tKu94m)

### Phase 4 — Schema Optimization of Existing High-Risk Tables

These changes carry the highest operational risk because they modify live tables with active Make dependencies.

Execution rules:
- Execute during confirmed low-traffic window (Sunday night preferred)
- Will on standby during execution
- Rollback plan documented before each change: for each field removal, export CSV of that field's data first

Order:
1. Packages table rebuild (tblwDw2hkKW5moSr9) — add 17 new fields, do not remove existing 8
2. AI_Prompt_Versions replacement — create new table with correct schema, migrate records, update Make scenario references, archive old table
3. Yacht_Availability replacement — create new table from apppFfA2VZVmamvXe schema, migrate records, archive old table
4. Partner Outreach reduction — extract 39 fields into linked Partnerships table, confirm Make references updated
5. Bookings field extraction — extract financial fields (routing to P&L Per Charter sync), extract automation tracking fields (routing to Automation_Health), confirm Make writes still resolve

### Phase 5 — Retire Fragmented Bases

Only execute after Phase 3 and Phase 4 are fully validated and Make scenarios are confirmed to reference new table IDs.

Order:
1. Archive all records in appOQ0MGpQU1W4hoN (SSS Operations Extension) — export CSV archive first
2. Delete appOQ0MGpQU1W4hoN
3. Archive apppFfA2VZVmamvXe after confirming all migrated tables are live in main base
4. Archive app2FbmVD44BXShyx after confirming all migrated tables are live in main base
5. Archive appVWYY9Fp6tKu94m after Influencers migration confirmed
6. Archive and delete appQVZRgKKS0diyVX (rogue copy)
7. Resolve app49vaVbRwuobpPv after Phase 0 audit confirms disposition

---

## SECTION 6 — MISSING INFORMATION REPORT

The following information is required before the Make build begins or before the migration plan executes. Each item is a hard blocker for its dependent work.

### 6.1 Unknown Base Contents

| Item | Base | What Is Needed | Blocks |
|------|------|---------------|--------|
| Full schema of app49vaVbRwuobpPv (Operations v4) | app49vaVbRwuobpPv | Run list_tables_for_base — retrieve all table names, IDs, field names | Phase 0 completion, decision on whether this base has unique schema not yet accounted for |
| Full contents of appQVZRgKKS0diyVX (She Said Sail copy) | appQVZRgKKS0diyVX | Run list_tables_for_base — confirm all tables are duplicates before deletion | Phase 5 safe deletion |

### 6.2 Unknown Field IDs

Field IDs for the main production base (appdZ49WqgjRXxA1R) were not retrieved at field-level granularity during this audit. The bash extraction returned field names only. Full field IDs are required for:
- Precise Make webhook field mapping (Make references field IDs, not field names, in API calls)
- Airtable Formula field construction referencing specific fields
- Permissions scoping at the field level

**Resolution:** Run `get_table_schema` for the following tables with the specific field IDs needed for Make build:
- Bookings (tbl72omPibBkn2hZL) — all 129 fields
- Requests (tblTlSB9CO4dTGodg) — all 57 fields
- Clients (tblr84vRIWC5HmKvo) — all 40 fields
- Founder Decisions (tblFCE26qDwfp4Jwd) — all 26 fields

### 6.3 Unknown Make Scenario IDs

The following production Make scenarios are referenced in governance documentation but their live Make scenario IDs are not documented:

| Scenario Name | Referenced In | Make Scenario ID | Status |
|---------------|--------------|-----------------|--------|
| INBOUND-001 | Systems_Intelligence_Architecture_v2.0 | UNKNOWN | MISSING INFO NEEDED |
| INBOUND-002 | Systems_Intelligence_Architecture_v2.0 | UNKNOWN | MISSING INFO NEEDED |
| BOOKING-001 through BOOKING-004 | Systems_Intelligence_Architecture_v2.0 | UNKNOWN | MISSING INFO NEEDED |
| CHARTER-001 through CHARTER-007 | Systems_Intelligence_Architecture_v2.0 | UNKNOWN | MISSING INFO NEEDED |
| EMERGENCY-001 | Systems_Intelligence_Architecture_v2.0 | UNKNOWN | MISSING INFO NEEDED |
| FINANCIAL-001 through FINANCIAL-003 | Systems_Intelligence_Architecture_v2.0 | UNKNOWN | MISSING INFO NEEDED |
| INTELLIGENCE-001 | Systems_Intelligence_Architecture_v2.0 | UNKNOWN | MISSING INFO NEEDED |
| BACKUP-001 | Systems_Intelligence_Architecture_v2.0 | UNKNOWN | MISSING INFO NEEDED |
| HEALTH-001 | Systems_Intelligence_Architecture_v2.0 | UNKNOWN | MISSING INFO NEEDED |
| ROLLBACK-PROMPT-001 | Systems_Intelligence_Architecture_v2.0 | UNKNOWN | MISSING INFO NEEDED |

**Resolution:** Will exports all Make scenarios from the Make dashboard. Scenario names and IDs are entered into the Make_Scenarios registry table (once migrated to main base per Section 5 Phase 3 step 9).

### 6.4 Airtable Native Automations Inventory

The audit retrieved table schemas but did not retrieve any Airtable-native automation configurations. Native automations in Airtable operate independently of Make and can create circular execution chains if not inventoried.

**Resolution required before Phase 1 begins:** Will audits the Automation tab in appdZ49WqgjRXxA1R and documents every native automation: trigger table, trigger field, action type, destination. This inventory becomes the circular-dependency reference before any Make scenario writes to Bookings.

### 6.5 Stripe Webhook Configuration

Stripe webhook endpoint URLs and the fields they write to in Airtable are not documented in any governance file or base. The following Stripe events are expected to trigger Make:
- Payment intent created (deposit)
- Payment intent succeeded (deposit confirmed)
- Payment intent succeeded (balance payment)
- Payout created (Make FINANCIAL-001)

Stripe dashboard must be audited to confirm: current webhook endpoint URL, signing secret rotation date, which Make scenario each event routes to, and what Airtable fields are written on receipt.

**Resolution:** Will audits Stripe Developer → Webhooks and documents in Make_Scenarios registry.

### 6.6 Unresolved Architecture Decisions

The following decisions require Will's explicit choice before the migration executes:

| Decision | Options | Implication |
|----------|---------|-------------|
| SSS and ME packages in same Packages table or separate tables | Single table with Brand field vs. separate SSS_Packages and ME_Packages | Single table is simpler; separate tables allow different permission scoping per brand |
| Financial_Periods table in Ops base or Financials base | Ops base (linked to Bookings) vs. Financials base (near P&L Per Charter) | Ops base enables linked records to Bookings; Financials base keeps all financial objects together |
| Sandbox base — create new or repurpose one of the retired bases | Create fresh vs. repurpose app2FbmVD44BXShyx or appVWYY9Fp6tKu94m after migration | Fresh creation is cleanest; repurposing saves time but risks residual record contamination |
| State Transition Log — merge into Audit Log or maintain as separate table | Merge (simpler) vs. separate (different granularity) | Current separate table has 12 fields and distinct purpose — recommendation is keep separate |
| Google Reviews table — keep standalone or merge into Clients and Bookings | Standalone (current) vs. linked records only | Standalone is correct for operational tracking; confirm it links to Clients and Bookings already |

---

*SHE SAID SAIL + MARE EXECUTIVE*
*CONFIDENTIAL — INTERNAL USE ONLY*
*02_SYSTEMS_AUTOMATIONS__Airtable_Final_Build_Spec_v2.0_PRODUCTION*
*Effective May 2026*
*Owner: Will (Founder)*
*Source Authority: 00_LOCKED_GOVERNANCE__Founder_Control_and_AI_Authority_Framework_v2.0_LOCKED*
*Live Airtable Audit Conducted: May 2026*
