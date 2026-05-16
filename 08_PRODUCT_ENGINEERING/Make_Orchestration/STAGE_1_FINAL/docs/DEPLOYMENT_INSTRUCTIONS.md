# DEPLOYMENT INSTRUCTIONS — STAGE 1 LIVE DEPLOYMENT

**Classification:** Confidential — Internal Use Only
**Owner:** Will (Founder)
**Effective Date:** May 2026

---

## STEP 0 — AIRTABLE PRE-WORK (MANDATORY BEFORE ANY MAKE IMPORT)

### 0.1 Create Missing Fields in Bookings Table

Two fields are missing from the Bookings table (tbl72omPibBkn2hZL) that are required by Stage 1 scenarios. Both must be created before any Make scenario is imported.

---

**FIELD 1: `Confirmation_Sent`**

- **Table:** Bookings (tbl72omPibBkn2hZL) — in base appdZ49WqgjRXxA1R (She Said Sail)
- **Field Type:** Checkbox
- **Exact Field Name:** `Confirmation_Sent`
- **Default:** Unchecked
- **Purpose:** Written by M-BOOKING-CONFIRMATION when confirmation email and SMS have been sent. Acts as idempotency gate — if true, scenario exits without sending again.
- **Protected:** This field may only be written by Make (SSS-BOOKING-CONFIRMATION). Manual checking is a system violation unless done by Will or Luciana to manually mark a booking confirmed outside the automation flow, with a corresponding Audit Log entry.

**Creation Steps:**
1. Open Airtable → She Said Sail base → Bookings table
2. Click the `+` button at the far right of the field headers to add a new field
3. Name it exactly: `Confirmation_Sent` (underscore, not space, capital C and S)
4. Select field type: **Checkbox**
5. Click Save
6. Confirm the field appears in the grid view

---

**FIELD 2: `Concierge_Assigned`**

- **Table:** Bookings (tbl72omPibBkn2hZL) — in base appdZ49WqgjRXxA1R (She Said Sail)
- **Field Type:** Checkbox
- **Exact Field Name:** `Concierge_Assigned`
- **Default:** Unchecked
- **Purpose:** Written by M-CONCIERGE-ASSIGNMENT when a concierge operator has been assigned to the booking. Read by M-BOOKING-CONFIRMATION as a prerequisite gate — confirmation is not sent until concierge is assigned.
- **Protected:** This field may only be written by Make (SSS-CONCIERGE-ASSIGNMENT). Manual override requires Audit Log entry.

**Creation Steps:**
1. Open Airtable → She Said Sail base → Bookings table
2. Click the `+` button to add a new field
3. Name it exactly: `Concierge_Assigned` (underscore, not space, capital C and A)
4. Select field type: **Checkbox**
5. Click Save
6. Confirm the field appears in the grid view

---

### 0.2 Verify Concierge_Operators Table Has Active Records

Before M-CONCIERGE-ASSIGNMENT can run successfully, the Concierge_Operators table (tblX61IB2qjDmac8l) must have at least one active record per city you are operating in.

**Verification Steps:**
1. Open Airtable → She Said Sail base → Concierge_Operators table
2. Confirm at least one record exists for each active city
3. Confirm each record has: Name, City, Status (Active), Contact information
4. If missing: create at minimum one concierge record per city before proceeding

---

### 0.3 Create Founder Decision Record (Governance Requirement)

Per Article II of the Founder Control Framework, a Founder Decision record of type SYSTEM must be created before any production Make scenario is activated.

**Create in Airtable → Founder Decisions table (tblFCE26qDwfp4Jwd):**

| Field | Value |
|-------|-------|
| Request_Title | Stage 1 Make Orchestration — Live Deployment Authorization |
| Request_Type | SYSTEM |
| Urgency | THIS_WEEK |
| Context | Deploying 8 Stage 1 Make scenarios: SSS-AUDIT-LOGGER, SSS-SLACK-ALERTS, SSS-BRAND-ROUTER, SSS-LEAD-INTAKE, SSS-STRIPE-DEPOSIT, SSS-BOOKING-CREATION, SSS-CONCIERGE-ASSIGNMENT, SSS-BOOKING-CONFIRMATION. Airtable pre-work complete. All connections rebound. All scenarios tested in sandbox prior to production activation. |
| Proposed_Action | Activate all 8 Stage 1 scenarios in production in the import order defined in FINAL_STAGE_1_IMPORT_ORDER.md |
| Decision | APPROVED (Will sets this) |
| Decided_At | (Will sets timestamp) |

Record this Founder Decision ID here before proceeding: `FD-_______`

---

## STEP 1 — MAKE ENVIRONMENT SETUP

### 1.1 Confirm Make Workspace

- Log in to Make.com
- Confirm you are in the **SheSaidSail** workspace (not a personal workspace)
- Confirm Stripe is in **TEST MODE** — verify in Stripe dashboard before continuing

### 1.2 Confirm Existing Connections

Verify these connections exist and are active in Make → Connections:

| Connection | Status Required | Action If Missing |
|------------|----------------|-------------------|
| Airtable (PAT) | Active | Create new — use PAT from credential vault |
| Slack (OAuth) | Active | Create new — authorize SheSaidSail workspace |
| Gmail (OAuth) | Active | Create new — authorize hello@shesaidsail.com |

### 1.3 Create a Staging Folder

In Make, create a scenario folder named: `SSS-STAGE-1-LIVE`

Import all 8 scenarios into this folder. This keeps Stage 1 scenarios isolated from any legacy or experimental scenarios.

---

## STEP 2 — IMPORT SEQUENCE

Follow the exact import order defined in `docs/FINAL_STAGE_1_IMPORT_ORDER.md`.

**Key rules:**
- Import ONE scenario at a time
- Complete ALL rebinding steps before saving
- Set each scenario to OFF before saving
- Do not activate any scenario until all 8 are imported and verified
- Record each scenario's webhook URL immediately after import

---

## STEP 3 — CREDENTIAL REBINDING

After each import, rebind all connections per `docs/CREDENTIAL_REBINDING_CHECKLIST.md`.

**Critical:** Placeholder connection slots appear as red/orange warnings in Make after import. Every red connection must be resolved before the scenario is saved. A saved scenario with unbound connections will fail silently on execution.

---

## STEP 4 — INTERNAL WEBHOOK URL INJECTION

Scenarios 4–8 call Scenarios 1 and 2 via internal HTTP webhooks. After importing Scenarios 1 and 2:

1. Open Make → SSS-AUDIT-LOGGER → copy the webhook URL
2. Open Make → SSS-SLACK-ALERTS → copy the webhook URL
3. In each of Scenarios 4–8: find the HTTP module calling AUDIT-LOGGER and replace the placeholder URL with the real URL
4. In each of Scenarios 4–8: find the HTTP module calling SLACK-ALERTS and replace the placeholder URL with the real URL

**These URL fields will contain placeholder text: `PASTE_AUDIT_LOGGER_WEBHOOK_URL_HERE` and `PASTE_SLACK_ALERTS_WEBHOOK_URL_HERE`**

Search each scenario's HTTP modules for this placeholder text before saving.

---

## STEP 5 — WEBHOOK URL REGISTRATION

After importing Scenarios 1–4, register the external-facing webhook URLs:

| Scenario | Webhook URL | Register In |
|----------|-------------|------------|
| SSS-LEAD-INTAKE | [copy from Make] | Webflow → Project Settings → Integrations → Webhooks → Form Submission |
| SSS-STRIPE-DEPOSIT | [copy from Make] | Stripe → Developers → Webhooks → Add endpoint |

See `docs/WEBHOOK_REGISTRATION_INSTRUCTIONS.md` for exact registration steps.

---

## STEP 6 — PRE-ACTIVATION VERIFICATION

Before activating any scenario, verify each scenario passes its import verification checklist from `docs/FINAL_STAGE_1_IMPORT_ORDER.md`.

Confirm:
- [ ] All 8 scenarios imported
- [ ] All connections rebound (no red warnings)
- [ ] All internal webhook URLs injected
- [ ] SSS-LEAD-INTAKE webhook URL registered in Webflow
- [ ] SSS-STRIPE-DEPOSIT webhook URL registered in Stripe (test mode)
- [ ] Both missing Airtable fields confirmed present
- [ ] Concierge_Operators table has active records
- [ ] Founder Decision record created and APPROVED

---

## STEP 7 — ACTIVATION (IN ORDER)

Activate in this exact order. Test each scenario before activating the next. See `docs/TESTING_CHECKLIST.md` for test procedures.

1. Activate SSS-AUDIT-LOGGER → test audit log write
2. Activate SSS-SLACK-ALERTS → test Slack alert routing
3. Activate SSS-BRAND-ROUTER → test SSS and ME routing
4. Activate SSS-LEAD-INTAKE → run fake lead test
5. Activate SSS-STRIPE-DEPOSIT → run fake Stripe payment test
6. Activate SSS-BOOKING-CREATION → run booking creation test
7. Activate SSS-CONCIERGE-ASSIGNMENT → run concierge assignment test
8. Activate SSS-BOOKING-CONFIRMATION → run booking confirmation test

---

## STEP 8 — POST-DEPLOYMENT DOCUMENTATION

After all tests pass:

1. Record all Make scenario IDs in the Make_Scenarios table (tbl08IpivapVQZUto)
2. Record all webhook URLs in Make_Scenarios table
3. Generate `FINAL_DEPLOYMENT_STATUS.md`
4. Generate `LIVE_READINESS_REPORT.md`
5. Generate `OPEN_DEPLOYMENT_ISSUES.md`
6. Commit all files to branch `claude/stage-1-live-deployment-HysW0`
7. Push to remote

---

## OPERATIONAL SAFETY RULES

These rules apply at all times during deployment:

1. **No live charges.** Stripe remains in test mode until all scenarios are validated. Only Will can switch Stripe to live mode, and only after all tests pass.

2. **No uncontrolled outbound messages.** Every outbound scenario (SSS-LEAD-INTAKE, SSS-BOOKING-CREATION, SSS-BOOKING-CONFIRMATION) checks Automations_Paused and Emergency_Flag before sending. Never bypass these checks.

3. **No sandbox records trigger production.** If testing with records in Airtable, set the Environment field on those records to `Sandbox`. All Stage 1 scenarios filter out Sandbox records.

4. **No manual field overwrites during testing.** Use the test procedures exactly as written. Manual Airtable changes to Status fields during testing can trigger unintended automation chains.

5. **Rollback is always documented before activation.** See `docs/ROLLBACK_ORDER.md`.

---

*SHE SAID SAIL + MARE EXECUTIVE — CONFIDENTIAL*
*08_PRODUCT_ENGINEERING/Make_Orchestration/STAGE_1_FINAL/docs/DEPLOYMENT_INSTRUCTIONS.md*
