# TESTING CHECKLIST — STAGE 1

**Classification:** Confidential — Internal Use Only
**Owner:** Will (Founder)
**Effective Date:** May 2026
**Mode:** Stripe TEST MODE only. No live charges. No live client messages.

---

## TESTING RULES

1. All testing uses Stripe test mode — confirm before running any payment test
2. Test Airtable records must have Environment = Sandbox — prevents live automation chains from triggering
3. No real client phone numbers or email addresses in test records
4. Use the test client record: `TEST-CLIENT` (create one if needed)
5. After each test, mark the test record Environment = Sandbox to prevent it from triggering production scenarios again
6. Stop immediately if any unexpected outbound message is sent to a real client

---

## TEST 1 — AUDIT LOG WRITE TEST

**Tests:** SSS-AUDIT-LOGGER
**Prerequisite:** Scenario 1 activated

### Steps

1. Open Make → SSS-AUDIT-LOGGER scenario
2. Click "Run once" button
3. In the webhook URL test panel, send this payload:
```json
{
  "log_id": "AUD-TEST-001",
  "timestamp": "2026-05-16T12:00:00Z",
  "triggering_event": "MANUAL TEST — SSS-AUDIT-LOGGER validation",
  "source_data": "Test payload from TESTING_CHECKLIST",
  "output": "Test audit log record creation",
  "approval_state": "AUTONOMOUS",
  "brand": "SSS",
  "city": "Miami",
  "environment": "Sandbox",
  "model_version": "claude-sonnet-4-6"
}
```

### Expected Output

- Make execution shows green (no error)
- New record created in Airtable → Audit Log table (tblrMpTfMk8q1eNHp)
- Record contains all fields from the payload
- Environment field = Sandbox on the record

### Pass Criteria
- [ ] Make execution status: SUCCESS
- [ ] Audit Log record created in Airtable
- [ ] All payload fields mapped correctly
- [ ] No errors in Make execution log

### Fail Action
Stop. Do not activate Scenario 2. Diagnose: check Airtable connection, check field names in mapper match exactly, check Audit Log table field schema.

---

## TEST 2 — SLACK ALERT ROUTING TEST

**Tests:** SSS-SLACK-ALERTS
**Prerequisite:** Scenario 2 activated

### Steps

1. Open Make → SSS-SLACK-ALERTS scenario
2. Click "Run once"
3. Send test payload for ops alert:
```json
{
  "alert_type": "OPS",
  "severity": "INFO",
  "title": "TEST ALERT — Slack routing validation",
  "body": "This is a test message from TESTING_CHECKLIST. Disregard.",
  "booking_id": "BK-TEST-001",
  "city": "Miami",
  "brand": "SSS"
}
```

### Expected Output

- Make execution: green
- Message appears in Slack #sss-ops-alerts
- Message format: includes title, body, booking ID, city
- No message posted to #sss-emergency-ops (wrong channel for this test)

### Pass Criteria
- [ ] Make execution status: SUCCESS
- [ ] Message posted in #sss-ops-alerts
- [ ] Message NOT posted in #sss-emergency-ops
- [ ] Message format readable and contains all fields

### Then Test Emergency Route (separately)

Send:
```json
{
  "alert_type": "EMERGENCY",
  "severity": "CRITICAL",
  "title": "TEST EMERGENCY ALERT — validation only",
  "body": "This is a test. Disregard.",
  "booking_id": "BK-TEST-001",
  "city": "Miami",
  "brand": "SSS"
}
```

Expected: message appears in #sss-emergency-ops.

### Fail Action
Stop. Diagnose: check Slack connection, check channel names match exactly (case-sensitive), check router branch conditions.

---

## TEST 3 — SSS ROUTE TEST

**Tests:** SSS-BRAND-ROUTER
**Prerequisite:** Scenario 3 activated

### Steps

1. Create a test Request record in Airtable (Requests table) with:
   - Status: NEW
   - Environment: Sandbox
   - Notes: TEST-BRAND-ROUTER-SSS
   - Source URL (if field exists): shesaidsail.com/book

2. Open Make → SSS-BRAND-ROUTER → "Run once"
3. Send payload:
```json
{
  "request_id": "[Airtable record ID of test record]",
  "source_url": "shesaidsail.com/book",
  "package": "Sunset Sail 3-Hour",
  "form_name": "SSS Booking Form"
}
```

### Expected Output

- Brand classified as: SSS
- Airtable test Request record updated with Brand = SSS
- Response returned: `{"brand": "SSS", "routing_confidence": "HIGH"}`

### Pass Criteria
- [ ] Make execution: SUCCESS
- [ ] Brand = SSS returned
- [ ] Airtable record updated correctly
- [ ] No routing to ME branch

---

## TEST 4 — ME ROUTE TEST

**Tests:** SSS-BRAND-ROUTER ME branch
**Prerequisite:** Scenario 3 activated

### Steps

Send payload:
```json
{
  "request_id": "[new test record ID]",
  "source_url": "mareexecutive.com/inquire",
  "package": "Executive Charter",
  "form_name": "ME Inquiry Form"
}
```

### Expected Output

- Brand classified as: ME
- Response: `{"brand": "ME", "routing_confidence": "HIGH"}`

### Pass Criteria
- [ ] ME branch triggered (not SSS branch)
- [ ] Brand = ME returned

---

## TEST 5 — FAKE LEAD TEST (END-TO-END)

**Tests:** SSS-LEAD-INTAKE (full flow)
**Prerequisite:** Scenarios 1, 2, 3, 4 all activated

### Setup

Use a test email address you control (not a client address). Use a test phone number.

### Steps

1. Submit a test Webflow form using the SSS-LEAD-INTAKE webhook URL directly:
```json
{
  "first_name": "Test",
  "last_name": "Lead",
  "email": "your-test-email@yourdomain.com",
  "phone": "+15550000001",
  "yacht": "Any",
  "experience": "Sunset Sail",
  "duration": "3 Hours",
  "preferred_date": "2026-06-15",
  "guest_count": 8,
  "occasion": "Birthday",
  "add_ons": "None",
  "special_requests": "TEST RECORD - DO NOT PROCESS",
  "source_url": "shesaidsail.com/book"
}
```

### Expected Output

1. New Request record created in Airtable → Requests table
   - Environment = Sandbox (scenario sets this based on payload)
   - Brand = SSS (set by Brand Router)
   - Status = NEW
2. Auto-reply email sent to test email address
3. Slack message posted to #sss-lead-intake with lead details
4. Audit Log record created

### Pass Criteria
- [ ] Request record created in Airtable with correct fields
- [ ] Brand = SSS confirmed on record
- [ ] Auto-reply received at test email
- [ ] Slack message in #sss-lead-intake
- [ ] Audit Log record created
- [ ] No error in Make execution log

### Fail Action
Stop. Diagnose module by module in Make execution log. Check which module first shows an error.

---

## TEST 6 — DUPLICATE LEAD TEST

**Tests:** Idempotency in SSS-LEAD-INTAKE
**Prerequisite:** Test 5 passed

### Steps

1. Submit the EXACT same payload from Test 5 a second time

### Expected Output

- Make execution: SUCCESS (no error)
- NO new Request record created in Airtable
- Log entry shows: "Duplicate request detected — skipped"

### Pass Criteria
- [ ] No duplicate Request record in Airtable
- [ ] Make execution: no error (graceful skip)
- [ ] Idempotency key matched

---

## TEST 7 — FAKE STRIPE DEPOSIT TEST

**Tests:** SSS-STRIPE-DEPOSIT
**Prerequisite:** Scenarios 1, 2, 5 activated. Stripe TEST MODE confirmed.

### Setup

You need a Booking record in Airtable (Bookings table) with:
- Status: DEPOSIT_SENT
- Environment: Sandbox
- A Stripe Payment Intent ID stored in the booking (or you will use Stripe test events)

### Steps

1. Go to Stripe Dashboard → Developers → Webhooks → your SSS-STRIPE-DEPOSIT endpoint
2. Click "Send test event"
3. Select event type: `payment_intent.succeeded`
4. Stripe sends a test event to your Make webhook

### Expected Output

1. Make scenario executes
2. Booking Status updated to DEPOSIT_PAID
3. Slack alert posted to #sss-ops-alerts: "Deposit received — [Booking ID]"
4. Audit Log record created

### Pass Criteria
- [ ] Stripe test event received by Make
- [ ] Booking Status = DEPOSIT_PAID in Airtable
- [ ] Slack alert in #sss-ops-alerts
- [ ] Audit Log record created
- [ ] No live charge processed (Stripe test event only)

---

## TEST 8 — BOOKING CREATION TEST

**Tests:** SSS-BOOKING-CREATION
**Prerequisite:** Scenarios 1, 2, 6 activated

### Steps

1. In Airtable → Requests table, find your Test 5 record
2. Manually update Status to: `AVAILABILITY_CONFIRMED`
3. Wait 30 seconds for Make trigger to fire

### Expected Output

1. SSS-BOOKING-CREATION triggers
2. New Booking record created in Bookings table:
   - Status: AVAILABILITY_PENDING → DEPOSIT_SENT
   - Idempotency_Key: populated
   - Source_System: Make
   - Environment: Sandbox (inherits from Request)
3. Stripe Payment Link created (test mode link)
4. Deposit request email sent to test email
5. Deposit SMS sent to test phone (Quo test mode)
6. Audit Log record created

### Pass Criteria
- [ ] Booking record created
- [ ] Stripe Payment Link in test format (starts with `https://buy.stripe.com/test_`)
- [ ] Email received at test address
- [ ] Audit Log record created
- [ ] No duplicate booking on re-trigger (idempotency)

---

## TEST 9 — CONCIERGE ASSIGNMENT TEST

**Tests:** SSS-CONCIERGE-ASSIGNMENT
**Prerequisite:** Scenarios 1, 2, 7 activated. Concierge_Operators table has active record.

### Steps

1. In Airtable → Bookings table, find the test Booking from Test 8
2. Manually update Status to: `DEPOSIT_PAID`
3. Wait 30 seconds for Make trigger to fire

### Expected Output

1. SSS-CONCIERGE-ASSIGNMENT triggers
2. Concierge Operator found for the booking city
3. Booking updated: Concierge_Assigned = true (checked)
4. Slack alert: "Concierge assigned — [Concierge Name] → [Booking ID]"
5. Audit Log record created

### Pass Criteria
- [ ] Concierge_Assigned = true on Booking record
- [ ] Slack alert in #sss-ops-alerts with concierge name
- [ ] Audit Log record created
- [ ] No error if Concierge_Operators table has matching city record

### Fail Action (no concierge found)
If no Concierge_Operators record matches the city, Make should: alert Luciana via Slack and write an Audit Log record with status: NEEDS_MANUAL_ASSIGNMENT. If Make errors instead of gracefully handling: diagnose the error handler in SSS-CONCIERGE-ASSIGNMENT.

---

## TEST 10 — BOOKING CONFIRMATION TEST

**Tests:** SSS-BOOKING-CONFIRMATION
**Prerequisite:** Scenarios 1, 2, 7, 8 activated. Test Booking has Concierge_Assigned = true.

### Steps

1. In Airtable → Bookings table, find the test Booking
2. Confirm Concierge_Assigned = true
3. Confirm Automations_Paused = false
4. Confirm Emergency_Flag = false
5. Manually update Status to: `CONFIRMED`
6. Wait 30 seconds for Make trigger to fire

### Expected Output

1. SSS-BOOKING-CONFIRMATION triggers
2. Automations_Paused check: PASS (false)
3. Emergency_Flag check: PASS (false)
4. Confirmation_Sent check: PASS (false — not yet sent)
5. Concierge_Assigned check: PASS (true)
6. Confirmation email sent to test email
7. Confirmation SMS sent to test phone (Quo)
8. Booking updated: Confirmation_Sent = true
9. Audit Log record created

### Pass Criteria
- [ ] Confirmation email received at test address
- [ ] Confirmation_Sent = true on Booking record
- [ ] Audit Log record created
- [ ] No second confirmation sent on re-trigger (idempotency via Confirmation_Sent = true gate)

### Idempotency Verification

After confirmation sends, manually trigger the scenario again (or wait for re-watch). Confirm:
- Confirmation_Sent is already true
- Scenario exits at the Confirmation_Sent filter
- No second email or SMS sent

### Pass Criteria for Idempotency
- [ ] Second trigger: no email sent
- [ ] Second trigger: no SMS sent
- [ ] Second trigger: no error — graceful exit

---

## FULL TEST SUITE SUMMARY

| Test | Scenario | Pass | Notes |
|------|----------|------|-------|
| 1 — Audit log write | SSS-AUDIT-LOGGER | ☐ | |
| 2 — Slack alert routing | SSS-SLACK-ALERTS | ☐ | |
| 3 — SSS route | SSS-BRAND-ROUTER | ☐ | |
| 4 — ME route | SSS-BRAND-ROUTER | ☐ | |
| 5 — Fake lead (end-to-end) | SSS-LEAD-INTAKE | ☐ | |
| 6 — Duplicate lead | SSS-LEAD-INTAKE | ☐ | |
| 7 — Fake Stripe deposit | SSS-STRIPE-DEPOSIT | ☐ | |
| 8 — Booking creation | SSS-BOOKING-CREATION | ☐ | |
| 9 — Concierge assignment | SSS-CONCIERGE-ASSIGNMENT | ☐ | |
| 10 — Booking confirmation | SSS-BOOKING-CONFIRMATION | ☐ | |

**All 10 must pass before the system is declared READY FOR LIVE LEADS.**

---

*SHE SAID SAIL + MARE EXECUTIVE — CONFIDENTIAL*
*08_PRODUCT_ENGINEERING/Make_Orchestration/STAGE_1_FINAL/docs/TESTING_CHECKLIST.md*
