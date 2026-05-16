# STAGE 1 MASTER INDEX — MAKE ORCHESTRATION LIVE DEPLOYMENT

**Status:** LIVE DEPLOYMENT READY
**Stage:** 1 of 4
**Classification:** Confidential — Internal Use Only
**Owner:** Will (Founder)
**Base:** She Said Sail Operations — appdZ49WqgjRXxA1R
**Branch:** claude/stage-1-live-deployment-HysW0
**Effective Date:** May 2026

---

## AUTHORITATIVE DIRECTORY

All Stage 1 deployment files live exclusively in:
```
08_PRODUCT_ENGINEERING/Make_Orchestration/STAGE_1_FINAL/
```

No other directory, branch, or export folder supersedes this directory.

---

## STAGE 1 SCOPE

Stage 1 deploys the core Make orchestration backbone: audit logging, Slack alerting, brand routing, lead intake, Stripe deposit handling, booking creation, concierge assignment, and booking confirmation.

Stage 1 does NOT include:
- Charter lifecycle sequences (D0–D60) — Stage 2
- Post-charter automation (review, referral) — Stage 2
- Financial reconciliation (FINANCIAL-001 through 003) — Stage 3
- Intelligence and health monitoring (INTELLIGENCE-001, HEALTH-001) — Stage 4

---

## AIRTABLE PRE-DEPLOYMENT STATUS

**Production Base:** appdZ49WqgjRXxA1R (She Said Sail)

### Required Fields — Bookings Table (tbl72omPibBkn2hZL)

| Field | Type | Status |
|-------|------|--------|
| Confirmation_Sent | Checkbox | **MISSING — CREATE BEFORE IMPORT** |
| Concierge_Assigned | Checkbox | **MISSING — CREATE BEFORE IMPORT** |

See `docs/DEPLOYMENT_INSTRUCTIONS.md` Step 0 for exact field creation instructions.

### Confirmed Fields Present in Bookings

| Field | Type | Required By |
|-------|------|-------------|
| Automations_Paused | Checkbox | All outbound scenarios |
| Emergency_Flag | Checkbox | M-AUDIT-LOGGER, M-SLACK-ALERTS |
| Environment | Single Select | All scenarios (Production/Sandbox gate) |
| UUID | Formula | Idempotency keys |
| Idempotency_Key | Single Line Text | M-BOOKING-CREATION |
| Source_System | Single Select | All write scenarios |
| Agent_Status | Single Select | M-LEAD-INTAKE |
| D7_Review_Eligible | Formula | Stage 2 (not Stage 1) |

---

## MAKE SCENARIO IMPORT ORDER

| # | File | Scenario Name | Trigger Type | Depends On |
|---|------|---------------|--------------|------------|
| 1 | M-AUDIT-LOGGER.json | SSS-AUDIT-LOGGER | Webhook (called by others) | None |
| 2 | M-SLACK-ALERTS.json | SSS-SLACK-ALERTS | Webhook (called by others) | None |
| 3 | M-BRAND-ROUTER.json | SSS-BRAND-ROUTER | Webhook | None |
| 4 | M-LEAD-INTAKE.json | SSS-LEAD-INTAKE | Webhook (Webflow) | #1, #2, #3 |
| 5 | M-STRIPE-DEPOSIT.json | SSS-STRIPE-DEPOSIT | Webhook (Stripe) | #1, #2 |
| 6 | M-BOOKING-CREATION.json | SSS-BOOKING-CREATION | Airtable (Requests trigger) | #1, #2 |
| 7 | M-CONCIERGE-ASSIGNMENT.json | SSS-CONCIERGE-ASSIGNMENT | Airtable (Bookings trigger) | #1, #2 |
| 8 | M-BOOKING-CONFIRMATION.json | SSS-BOOKING-CONFIRMATION | Airtable (Bookings trigger) | #1, #2, #7 |

**IMPORT ORDER IS MANDATORY.** Do not import out of order. Scenarios 1 and 2 must be live before any others are activated.

---

## CONNECTIONS REQUIRING REBINDING ON IMPORT

Every scenario requires these connections to be rebound after import:

| Connection | Type | Scenarios Affected |
|------------|------|--------------------|
| Airtable PAT | Airtable | All 8 |
| Slack OAuth | Slack | #1, #2, #4, #5, #6, #7, #8 |
| Gmail OAuth | Gmail | #4, #5, #8 |
| Stripe Webhook Secret | HTTP Header Validation | #5 |
| Quo SMS API Key | HTTP | #8 |

See `docs/CREDENTIAL_REBINDING_CHECKLIST.md` for per-scenario rebinding steps.

---

## DOCUMENTATION INDEX

| File | Purpose |
|------|---------|
| `docs/FINAL_STAGE_1_IMPORT_ORDER.md` | Step-by-step import sequence with verification gates |
| `docs/DEPLOYMENT_INSTRUCTIONS.md` | Complete deployment guide including Airtable pre-work |
| `docs/CREDENTIAL_REBINDING_CHECKLIST.md` | Per-scenario connection rebinding instructions |
| `docs/TESTING_CHECKLIST.md` | Full test suite — all 10 test cases |
| `docs/ROLLBACK_ORDER.md` | Rollback procedures for every scenario |
| `docs/WEBHOOK_REGISTRATION_INSTRUCTIONS.md` | Webhook URL registration for Webflow, Stripe, and internal callers |

---

## POST-DEPLOYMENT DELIVERABLES

After all 8 scenarios are imported, rebound, and tested:

| File | Description |
|------|-------------|
| `FINAL_DEPLOYMENT_STATUS.md` | Generated post-deployment — scenario IDs, webhook URLs, status |
| `LIVE_READINESS_REPORT.md` | Generated post-deployment — readiness verdict |
| `OPEN_DEPLOYMENT_ISSUES.md` | Generated post-deployment — open issues requiring resolution |

---

## GOVERNANCE

This deployment is authorized under:
- `00_LOCKED_GOVERNANCE__Founder_Control_and_AI_Authority_Framework_v2.0_LOCKED`
- `02_SYSTEMS_AUTOMATIONS__Systems_Intelligence_Architecture_v2.0_PRODUCTION`
- `02_SYSTEMS_AUTOMATIONS__Airtable_Final_Build_Spec_v2.0_PRODUCTION`

A Founder Decision record of type SYSTEM must be created before any scenario is activated in Production. All activations are logged in the Audit Log table (tblrMpTfMk8q1eNHp).

---

*SHE SAID SAIL + MARE EXECUTIVE — CONFIDENTIAL*
*08_PRODUCT_ENGINEERING/Make_Orchestration/STAGE_1_FINAL/STAGE_1_MASTER_INDEX.md*
