# ROLLBACK ORDER — STAGE 1

**Classification:** Confidential — Internal Use Only
**Owner:** Will (Founder)
**Effective Date:** May 2026

---

## ROLLBACK PRINCIPLES

1. Rollback executes in REVERSE import order — deactivate dependents before foundations
2. Document the reason for rollback in the Audit Log before deactivating anything
3. Do not delete scenarios — disable only. Deletion removes the rollback option itself.
4. If a rollback is triggered by a live client impact (wrong message sent, wrong status set), Will is notified before any scenario is touched.
5. After any rollback, root cause must be documented before re-deployment.

---

## TRIGGER CONDITIONS FOR ROLLBACK

| Condition | Severity | Rollback Scope |
|-----------|----------|----------------|
| Confirmation email sent to wrong client | SEV-1 | Deactivate SSS-BOOKING-CONFIRMATION immediately |
| Duplicate Booking records created | SEV-1 | Deactivate SSS-BOOKING-CREATION immediately |
| Stripe live charge processed during testing | SEV-1 | Deactivate SSS-STRIPE-DEPOSIT; contact Stripe; notify Will |
| Concierge_Assigned not being set | SEV-2 | Deactivate SSS-CONCIERGE-ASSIGNMENT; investigate |
| Audit Log records not being created | SEV-2 | Deactivate all scenarios; audit what actions lack log records |
| Emergency_Flag not halting sends | SEV-1 | Deactivate all outbound scenarios immediately |
| Automations_Paused not halting sends | SEV-1 | Deactivate all outbound scenarios immediately |
| Slack messages sent to wrong channel | SEV-3 | Deactivate SSS-SLACK-ALERTS; fix router branch |
| Brand misroute (SSS content to ME client) | SEV-1 | Deactivate SSS-BRAND-ROUTER, SSS-LEAD-INTAKE |

---

## ROLLBACK PROCEDURE — FULL STAGE 1

Execute this order if a full Stage 1 rollback is required.

### Step 1 — Log the Rollback (Before Touching Anything)

Create Audit Log record in Airtable → Audit Log (tblrMpTfMk8q1eNHp):
- Triggering_Event: "Stage 1 Rollback Initiated"
- Source_Data: [reason for rollback]
- Output: "All Stage 1 scenarios being deactivated"
- Approval_State: HUMAN_APPROVED
- Reviewed_By: Will

### Step 2 — Deactivate in Reverse Order

| Step | Scenario | Action |
|------|----------|--------|
| 8 | SSS-BOOKING-CONFIRMATION | Toggle OFF in Make |
| 7 | SSS-CONCIERGE-ASSIGNMENT | Toggle OFF in Make |
| 6 | SSS-BOOKING-CREATION | Toggle OFF in Make |
| 5 | SSS-STRIPE-DEPOSIT | Toggle OFF in Make |
| 4 | SSS-LEAD-INTAKE | Toggle OFF in Make |
| 3 | SSS-BRAND-ROUTER | Toggle OFF in Make |
| 2 | SSS-SLACK-ALERTS | Toggle OFF in Make |
| 1 | SSS-AUDIT-LOGGER | Toggle OFF in Make (last) |

### Step 3 — Verify All Off

In Make → SSS-STAGE-1-LIVE folder: confirm all 8 scenarios show status: INACTIVE.

### Step 4 — Unregister Webhooks (If Full Rollback)

If a complete rollback (not a temporary pause):

| Webhook | Location | Action |
|---------|----------|--------|
| SSS-LEAD-INTAKE webhook | Webflow → Project Settings → Webhooks | Delete or disable |
| SSS-STRIPE-DEPOSIT webhook | Stripe → Developers → Webhooks | Disable endpoint |

Do not delete the Stripe webhook endpoint — disable it. You will need the signing secret again if you re-register.

### Step 5 — Document Airtable Data State

Before any manual data correction:
1. Export the Bookings table as CSV (current state)
2. Export the Requests table as CSV (current state)
3. Store exports in a dated folder

### Step 6 — Manual Triage of Affected Records

If any records were incorrectly created or updated during the failed deployment:
1. Identify affected records using Created_At timestamp and Source_System = Make
2. For each incorrectly updated Booking record: revert Status to previous state
3. Create a Founder Decision record documenting each manual correction

---

## ROLLBACK PROCEDURE — INDIVIDUAL SCENARIOS

### Rollback: SSS-BOOKING-CONFIRMATION only

1. Toggle SSS-BOOKING-CONFIRMATION OFF in Make
2. SSS-CONCIERGE-ASSIGNMENT continues to run (still sets Concierge_Assigned)
3. Confirmation emails must be sent manually until scenario is re-deployed
4. Manual confirmation process: Luciana sends from hello@shesaidsail.com using approved template
5. After each manual send: manually check Confirmation_Sent = true on the Booking record

---

### Rollback: SSS-CONCIERGE-ASSIGNMENT only

1. Toggle SSS-CONCIERGE-ASSIGNMENT OFF in Make
2. SSS-BOOKING-CONFIRMATION will not send (it checks Concierge_Assigned = true)
3. Manual concierge assignment: Luciana opens Booking record, manually checks Concierge_Assigned = true after confirming assignment offline
4. This unblocks SSS-BOOKING-CONFIRMATION to send on next watch cycle

---

### Rollback: SSS-BOOKING-CREATION only

1. Toggle SSS-BOOKING-CREATION OFF in Make
2. New Request records set to AVAILABILITY_CONFIRMED will not auto-create Bookings
3. Manual booking creation: Luciana creates Booking record in Airtable manually
4. Manual Stripe link generation: use the Concierge Booking Tool (Netlify)

---

### Rollback: SSS-STRIPE-DEPOSIT only

1. Toggle SSS-STRIPE-DEPOSIT OFF in Make
2. Stripe deposit payments still process (Stripe doesn't know Make is off)
3. Booking Status updates to DEPOSIT_PAID must be done manually: Luciana monitors Stripe and updates Airtable manually
4. Audit Log entries for Stripe events must be created manually during outage

---

### Rollback: SSS-LEAD-INTAKE only

1. Toggle SSS-LEAD-INTAKE OFF in Make
2. Unregister or disable the webhook in Webflow to stop sending submissions
3. Lead intake is manual: Luciana monitors hello@shesaidsail.com for form notification emails, creates Request records manually in Airtable
4. Brand router classification is manual: Luciana sets Brand field on each Request

---

### Rollback: SSS-BRAND-ROUTER only

1. Toggle SSS-BRAND-ROUTER OFF in Make
2. SSS-LEAD-INTAKE will still receive Webflow submissions but Brand will not be set
3. Luciana manually sets Brand on each new Request record until router is re-deployed

---

### Rollback: SSS-SLACK-ALERTS only

1. Toggle SSS-SLACK-ALERTS OFF in Make
2. All scenarios continue to run — Slack notifications are lost
3. Monitor Make execution logs manually for any failures
4. Will and Luciana increase manual Airtable monitoring cadence during outage

---

### Rollback: SSS-AUDIT-LOGGER only

1. Toggle SSS-AUDIT-LOGGER OFF in Make
2. All scenarios continue to run — Audit Log entries are lost
3. This is a governance concern: create a Founder Decision record documenting the audit gap period
4. After re-deployment, manually create Audit Log records for the outage window from Make execution history

---

## RE-DEPLOYMENT REQUIREMENTS AFTER ROLLBACK

Before any rolled-back scenario is re-activated:

1. Root cause documented in writing
2. Fix implemented and tested in Make staging (Run Once mode)
3. Founder Decision record created: type SYSTEM, documenting root cause and fix
4. Scenario re-activated in the original import order (cannot skip foundational scenarios)

---

*SHE SAID SAIL + MARE EXECUTIVE — CONFIDENTIAL*
*08_PRODUCT_ENGINEERING/Make_Orchestration/STAGE_1_FINAL/docs/ROLLBACK_ORDER.md*
