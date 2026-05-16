# FINAL STAGE 1 IMPORT ORDER

**Classification:** Confidential — Internal Use Only
**Owner:** Will (Founder)
**Effective Date:** May 2026

---

## PRE-IMPORT GATE

Before importing any scenario, confirm ALL of the following:

- [ ] Airtable field `Confirmation_Sent` (Checkbox) created in Bookings (tbl72omPibBkn2hZL)
- [ ] Airtable field `Concierge_Assigned` (Checkbox) created in Bookings (tbl72omPibBkn2hZL)
- [ ] Airtable PAT (Personal Access Token) available for rebinding
- [ ] Slack OAuth connection available in Make workspace
- [ ] Gmail OAuth connection available in Make workspace (hello@shesaidsail.com)
- [ ] Stripe webhook signing secret on hand
- [ ] Quo SMS API key on hand
- [ ] Make.com workspace open and logged in
- [ ] Stripe is in **TEST MODE** — confirmed before any import begins
- [ ] Founder Decision record of type SYSTEM created in Airtable before first activation

**DO NOT PROCEED if any gate item is unchecked.**

---

## IMPORT 1 — M-AUDIT-LOGGER.json

**Scenario Name:** SSS-AUDIT-LOGGER
**Function:** Receives audit data from all other scenarios via internal webhook and writes immutable records to the Audit Log table (tblrMpTfMk8q1eNHp).
**Trigger:** Custom Webhook (internal — called by all other scenarios)
**Autonomy Tier:** A

### Import Steps

1. Go to Make.com → Create new scenario
2. Click three-dot menu → Import Blueprint
3. Upload `M-AUDIT-LOGGER.json`
4. Confirm scenario name shows: **SSS-AUDIT-LOGGER**
5. **Rebind:** Airtable connection → select your PAT connection
6. Set scenario to **OFF** (do not activate yet)
7. Save the scenario
8. **Copy the webhook URL** generated for this scenario — you will need it for all subsequent scenarios

### Verification

- Scenario imports without error
- Airtable module shows base: `appdZ49WqgjRXxA1R`, table: `tblrMpTfMk8q1eNHp`
- Webhook URL copied and saved

### Expected Output (when live)

Creates one Audit Log record per call with: Log_ID, Timestamp, Triggering_Event, Source_Data, Output, Approval_State, Brand, Environment.

---

## IMPORT 2 — M-SLACK-ALERTS.json

**Scenario Name:** SSS-SLACK-ALERTS
**Function:** Receives alert payloads from all other scenarios and routes to the correct Slack channel based on severity and type.
**Trigger:** Custom Webhook (internal — called by all other scenarios)
**Autonomy Tier:** A

### Import Steps

1. Go to Make.com → Create new scenario
2. Click three-dot menu → Import Blueprint
3. Upload `M-SLACK-ALERTS.json`
4. Confirm scenario name shows: **SSS-SLACK-ALERTS**
5. **Rebind:** Slack connection → select your OAuth connection
6. Verify channel mappings:
   - `#sss-ops-alerts` — operational alerts
   - `#sss-emergency-ops` — emergency alerts
   - `#sss-lead-intake` — new lead notifications
7. Set scenario to **OFF** (do not activate yet)
8. Save the scenario
9. **Copy the webhook URL** for this scenario

### Verification

- Scenario imports without error
- Slack module shows correct workspace and channels
- Webhook URL copied and saved

### Expected Output (when live)

Posts formatted Slack messages to the appropriate channel based on `alert_type` in the payload.

---

## IMPORT 3 — M-BRAND-ROUTER.json

**Scenario Name:** SSS-BRAND-ROUTER
**Function:** Classifies every inbound lead as SSS or ME based on source URL, package selection, and keywords. Routes to SSS or ME sub-flow. Returns brand classification for consumption by M-LEAD-INTAKE.
**Trigger:** Custom Webhook (called by M-LEAD-INTAKE)
**Autonomy Tier:** A

### Import Steps

1. Go to Make.com → Create new scenario
2. Click three-dot menu → Import Blueprint
3. Upload `M-BRAND-ROUTER.json`
4. Confirm scenario name shows: **SSS-BRAND-ROUTER**
5. **Rebind:** Airtable connection → select your PAT connection
6. Verify router branches:
   - Branch 1: `source_url` contains `shesaidsail.com` → Brand = SSS
   - Branch 2: `source_url` contains `mareexecutive.com` → Brand = ME
   - Branch 3: Ambiguous → Brand = UNKNOWN, routes to Luciana alert
7. Set scenario to **OFF** (do not activate yet)
8. Save the scenario
9. **Copy the webhook URL** for this scenario — required by M-LEAD-INTAKE

### Verification

- Scenario imports without error
- Router shows 3 branches
- Webhook URL copied and saved

### Expected Output (when live)

Returns JSON: `{"brand": "SSS"|"ME"|"UNKNOWN", "routing_confidence": "HIGH"|"MEDIUM"|"LOW"}`

---

## IMPORT 4 — M-LEAD-INTAKE.json

**Scenario Name:** SSS-LEAD-INTAKE
**Function:** Receives Webflow form submissions, calls M-BRAND-ROUTER, creates Airtable Request record, sends auto-reply via Gmail, fires Slack notification to #sss-lead-intake, calls M-AUDIT-LOGGER.
**Trigger:** Custom Webhook (Webflow form submission)
**Autonomy Tier:** A
**Depends on:** #1 SSS-AUDIT-LOGGER, #2 SSS-SLACK-ALERTS, #3 SSS-BRAND-ROUTER

### Pre-Import Check

- [ ] Webhook URLs for SSS-AUDIT-LOGGER (#1) and SSS-SLACK-ALERTS (#2) and SSS-BRAND-ROUTER (#3) are saved

### Import Steps

1. Go to Make.com → Create new scenario
2. Click three-dot menu → Import Blueprint
3. Upload `M-LEAD-INTAKE.json`
4. Confirm scenario name shows: **SSS-LEAD-INTAKE**
5. **Rebind — ALL of the following:**
   - Airtable connection → select your PAT connection
   - Gmail connection → select hello@shesaidsail.com OAuth
   - Slack connection → select your OAuth connection
6. **Update internal webhook URLs:**
   - AUDIT-LOGGER webhook URL → paste URL from Import #1
   - SLACK-ALERTS webhook URL → paste URL from Import #2
   - BRAND-ROUTER webhook URL → paste URL from Import #3
7. Set scenario to **OFF** (do not activate yet)
8. Save the scenario
9. **Copy the webhook URL** — this is the URL you register in Webflow

### Post-Import Verification

- Scenario imports without error
- Airtable module: base `appdZ49WqgjRXxA1R`, table `tblTlSB9CO4dTGodg` (Requests)
- Gmail module: sender = hello@shesaidsail.com
- All 3 internal webhook URLs populated (not placeholder text)
- Webflow webhook URL recorded in `docs/WEBHOOK_REGISTRATION_INSTRUCTIONS.md`

### Expected Output (when live)

1. Creates Request record in Airtable with all form fields
2. Sends auto-reply email to client
3. Posts #sss-lead-intake Slack alert with client name, brand, occasion, date, group size
4. Writes Audit Log record via SSS-AUDIT-LOGGER

---

## IMPORT 5 — M-STRIPE-DEPOSIT.json

**Scenario Name:** SSS-STRIPE-DEPOSIT
**Function:** Receives Stripe `payment_intent.succeeded` webhook for deposit payments. Validates Stripe signature. Updates Booking Status to DEPOSIT_PAID. Sends Slack notification. Calls M-AUDIT-LOGGER. DOES NOT send client-facing messages (that is M-BOOKING-CONFIRMATION's job).
**Trigger:** Custom Webhook (Stripe)
**Autonomy Tier:** A
**Depends on:** #1 SSS-AUDIT-LOGGER, #2 SSS-SLACK-ALERTS

### Pre-Import Check

- [ ] Stripe is confirmed in **TEST MODE**
- [ ] Stripe webhook signing secret is on hand

### Import Steps

1. Go to Make.com → Create new scenario
2. Click three-dot menu → Import Blueprint
3. Upload `M-STRIPE-DEPOSIT.json`
4. Confirm scenario name shows: **SSS-STRIPE-DEPOSIT**
5. **Rebind — ALL of the following:**
   - Airtable connection → select your PAT connection
   - HTTP module (Stripe signature validation) → enter your Stripe webhook signing secret
6. **Update internal webhook URLs:**
   - AUDIT-LOGGER webhook URL → paste URL from Import #1
   - SLACK-ALERTS webhook URL → paste URL from Import #2
7. Set scenario to **OFF** (do not activate yet)
8. Save the scenario
9. **Copy the webhook URL** — this is registered in Stripe dashboard

### Post-Import Verification

- Scenario imports without error
- First module: HTTP header validation for `Stripe-Signature`
- Airtable module: base `appdZ49WqgjRXxA1R`, table `tbl72omPibBkn2hZL` (Bookings), Status field update = DEPOSIT_PAID
- Environment filter: exits if Environment ≠ Production (when running in production)
- Both internal webhook URLs populated

### Expected Output (when live)

1. Validates Stripe signature (rejects invalid/replayed webhooks)
2. Finds matching Booking by Stripe Payment Intent ID
3. Updates Booking Status → DEPOSIT_PAID
4. Posts Slack alert to #sss-ops-alerts
5. Writes Audit Log record

---

## IMPORT 6 — M-BOOKING-CREATION.json

**Scenario Name:** SSS-BOOKING-CREATION
**Function:** Triggered when a Request record Status changes to AVAILABILITY_CONFIRMED. Creates Booking record, generates Stripe payment link for deposit, sends deposit request via Gmail and Quo SMS, calls M-AUDIT-LOGGER.
**Trigger:** Airtable Watch Records (Requests table, Status = AVAILABILITY_CONFIRMED)
**Autonomy Tier:** A
**Depends on:** #1 SSS-AUDIT-LOGGER, #2 SSS-SLACK-ALERTS

### Pre-Import Check

- [ ] Idempotency_Key field confirmed present in Bookings
- [ ] Stripe API key (test mode) available

### Import Steps

1. Go to Make.com → Create new scenario
2. Click three-dot menu → Import Blueprint
3. Upload `M-BOOKING-CREATION.json`
4. Confirm scenario name shows: **SSS-BOOKING-CREATION**
5. **Rebind — ALL of the following:**
   - Airtable connection → select your PAT connection
   - Stripe connection → select test mode connection
   - Gmail connection → select hello@shesaidsail.com OAuth
   - HTTP module (Quo SMS) → enter Quo API key in Authorization header
6. **Update internal webhook URLs:**
   - AUDIT-LOGGER webhook URL → paste URL from Import #1
   - SLACK-ALERTS webhook URL → paste URL from Import #2
7. Set scenario to **OFF** (do not activate yet)
8. Save the scenario

### Post-Import Verification

- Scenario imports without error
- Airtable trigger: table `tblTlSB9CO4dTGodg`, filter: Status = AVAILABILITY_CONFIRMED
- Idempotency check module present (prevents duplicate booking creation)
- Stripe module: creates Payment Link in test mode
- Booking record creation: table `tbl72omPibBkn2hZL`
- Environment filter: Automations_Paused and Emergency_Flag both checked before any outbound send

### Expected Output (when live)

1. Checks idempotency key — exits if booking already created for this Request
2. Creates Booking record in Airtable
3. Creates Stripe deposit payment link (50% of package price)
4. Sends deposit request email via Gmail
5. Sends deposit request SMS via Quo
6. Writes Audit Log record

---

## IMPORT 7 — M-CONCIERGE-ASSIGNMENT.json

**Scenario Name:** SSS-CONCIERGE-ASSIGNMENT
**Function:** Triggered when a Booking record Status changes to DEPOSIT_PAID. Reads Concierge_Operators table (tblX61IB2qjDmac8l) to find the available concierge for the booking city. Updates Concierge_Assigned = true on the Booking. Calls M-SLACK-ALERTS and M-AUDIT-LOGGER.
**Trigger:** Airtable Watch Records (Bookings table, Status = DEPOSIT_PAID)
**Autonomy Tier:** A
**Depends on:** #1 SSS-AUDIT-LOGGER, #2 SSS-SLACK-ALERTS
**Writes:** Concierge_Assigned (Checkbox) on Bookings — **must be created before import**

### Pre-Import Check

- [ ] `Concierge_Assigned` checkbox field confirmed created in Bookings
- [ ] Concierge_Operators table (tblX61IB2qjDmac8l) has at least one active record

### Import Steps

1. Go to Make.com → Create new scenario
2. Click three-dot menu → Import Blueprint
3. Upload `M-CONCIERGE-ASSIGNMENT.json`
4. Confirm scenario name shows: **SSS-CONCIERGE-ASSIGNMENT**
5. **Rebind:**
   - Airtable connection → select your PAT connection
   - Slack connection → select your OAuth connection
6. **Update internal webhook URLs:**
   - AUDIT-LOGGER webhook URL → paste URL from Import #1
   - SLACK-ALERTS webhook URL → paste URL from Import #2
7. Set scenario to **OFF** (do not activate yet)
8. Save the scenario

### Post-Import Verification

- Airtable trigger: table `tbl72omPibBkn2hZL`, filter: Status = DEPOSIT_PAID
- Concierge_Operators lookup: table `tblX61IB2qjDmac8l`, filters by City
- Booking update: `Concierge_Assigned` = true
- Slack notification: concierge name, booking ID, charter date

### Expected Output (when live)

1. Looks up available Concierge Operator by city
2. Updates Booking: Concierge_Assigned = true
3. Sends Slack alert to #sss-ops-alerts with concierge assignment details
4. Writes Audit Log record

---

## IMPORT 8 — M-BOOKING-CONFIRMATION.json

**Scenario Name:** SSS-BOOKING-CONFIRMATION
**Function:** Triggered when Booking Status changes to CONFIRMED AND Concierge_Assigned = true. Reads Automations_Paused and Emergency_Flag before any send. Sends booking confirmation email via Gmail and SMS via Quo. Updates Confirmation_Sent = true. Calls M-AUDIT-LOGGER.
**Trigger:** Airtable Watch Records (Bookings table, Status = CONFIRMED)
**Autonomy Tier:** A
**Depends on:** #1 SSS-AUDIT-LOGGER, #2 SSS-SLACK-ALERTS, #7 SSS-CONCIERGE-ASSIGNMENT
**Writes:** Confirmation_Sent (Checkbox) on Bookings — **must be created before import**

### Pre-Import Check

- [ ] `Confirmation_Sent` checkbox field confirmed created in Bookings
- [ ] Concierge_Assigned field confirmed present
- [ ] Quo SMS API key available

### Import Steps

1. Go to Make.com → Create new scenario
2. Click three-dot menu → Import Blueprint
3. Upload `M-BOOKING-CONFIRMATION.json`
4. Confirm scenario name shows: **SSS-BOOKING-CONFIRMATION**
5. **Rebind — ALL of the following:**
   - Airtable connection → select your PAT connection
   - Gmail connection → select hello@shesaidsail.com OAuth
   - HTTP module (Quo SMS) → enter Quo API key
   - Slack connection → select your OAuth connection
6. **Update internal webhook URLs:**
   - AUDIT-LOGGER webhook URL → paste URL from Import #1
   - SLACK-ALERTS webhook URL → paste URL from Import #2
7. Set scenario to **OFF** (do not activate yet)
8. Save the scenario

### Post-Import Verification

- Airtable trigger: table `tbl72omPibBkn2hZL`, filter: Status = CONFIRMED
- First module after trigger: reads Automations_Paused and Emergency_Flag
- Filter: exits immediately if Automations_Paused = true OR Emergency_Flag = true
- Filter: exits if Confirmation_Sent = true (idempotency — prevents duplicate sends)
- Filter: exits if Concierge_Assigned = false (waits for #7 to complete)
- Gmail module: sends from hello@shesaidsail.com
- Quo SMS module: sends to Clients.Phone
- Airtable update: Confirmation_Sent = true

### Expected Output (when live)

1. Checks Automations_Paused and Emergency_Flag — exits if either is true
2. Checks Confirmation_Sent — exits if already true (idempotency)
3. Checks Concierge_Assigned — exits if false
4. Sends booking confirmation email with charter details
5. Sends booking confirmation SMS via Quo
6. Updates Confirmation_Sent = true
7. Writes Audit Log record

---

## ACTIVATION ORDER

Only activate scenarios after ALL 8 have been imported, rebound, and tested.

Activation order:
1. SSS-AUDIT-LOGGER — activate first
2. SSS-SLACK-ALERTS — activate second
3. SSS-BRAND-ROUTER — activate third
4. SSS-LEAD-INTAKE — activate fourth
5. SSS-STRIPE-DEPOSIT — activate fifth (Stripe test mode only)
6. SSS-BOOKING-CREATION — activate sixth
7. SSS-CONCIERGE-ASSIGNMENT — activate seventh
8. SSS-BOOKING-CONFIRMATION — activate eighth

Test each scenario after activation using the test procedures in `docs/TESTING_CHECKLIST.md`.

---

*SHE SAID SAIL + MARE EXECUTIVE — CONFIDENTIAL*
*08_PRODUCT_ENGINEERING/Make_Orchestration/STAGE_1_FINAL/docs/FINAL_STAGE_1_IMPORT_ORDER.md*
