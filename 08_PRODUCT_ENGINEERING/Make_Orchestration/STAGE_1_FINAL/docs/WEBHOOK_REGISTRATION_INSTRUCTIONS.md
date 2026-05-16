# WEBHOOK REGISTRATION INSTRUCTIONS — STAGE 1

**Classification:** Confidential — Internal Use Only
**Owner:** Will (Founder)
**Effective Date:** May 2026

---

## OVERVIEW

Stage 1 has two externally-registered webhooks and six internal webhooks.

| Webhook | External / Internal | Registered In |
|---------|--------------------|--------------| 
| SSS-LEAD-INTAKE | External | Webflow |
| SSS-STRIPE-DEPOSIT | External | Stripe |
| SSS-AUDIT-LOGGER | Internal | Make HTTP modules |
| SSS-SLACK-ALERTS | Internal | Make HTTP modules |
| SSS-BRAND-ROUTER | Internal | Make HTTP modules |
| SSS-CONCIERGE-ASSIGNMENT | Internal | Airtable trigger (no registration needed) |
| SSS-BOOKING-CREATION | Internal | Airtable trigger (no registration needed) |
| SSS-BOOKING-CONFIRMATION | Internal | Airtable trigger (no registration needed) |

---

## EXTERNAL WEBHOOK 1 — SSS-LEAD-INTAKE

**Register In:** Webflow
**Event:** Form submission
**Trigger Form:** All booking/inquiry forms on shesaidsail.com and mareexecutive.com

### Registration Steps

1. Log in to Webflow → Open the SheSaidSail project
2. Go to Project Settings (gear icon) → Integrations
3. Scroll to "Webhooks" section
4. Click "Add Webhook"
5. Select Trigger Type: **Form Submission**
6. Paste the webhook URL from Make → SSS-LEAD-INTAKE scenario
7. Leave "Filter by Form" blank (applies to all forms) or select specific booking forms
8. Click Save

**For mareexecutive.com (if on separate Webflow project):**
1. Repeat steps 1–8 in the ME Webflow project
2. Use the same SSS-LEAD-INTAKE webhook URL (the scenario handles both brands via the Brand Router)

### Verify Registration

1. Submit a test form on shesaidsail.com
2. In Make → SSS-LEAD-INTAKE → execution history: confirm new execution appeared
3. In Airtable → Requests: confirm new record created
4. Check Webflow → Integrations → Webhooks: confirm webhook shows "Last delivery: SUCCESS"

### Webhook URL Log

After registration, record the URL here:

**SSS-LEAD-INTAKE Webhook URL:** `[PASTE URL FROM MAKE AFTER IMPORT]`

---

## EXTERNAL WEBHOOK 2 — SSS-STRIPE-DEPOSIT

**Register In:** Stripe Dashboard
**Event:** `payment_intent.succeeded`
**Mode:** TEST MODE FIRST. Live mode only after all tests pass and Will authorizes.

### Registration Steps — Test Mode

1. Log in to Stripe Dashboard
2. Confirm you are in **TEST MODE** (toggle in top-left of Stripe dashboard — must show "Test mode")
3. Go to Developers → Webhooks
4. Click "Add endpoint"
5. **Endpoint URL:** paste the webhook URL from Make → SSS-STRIPE-DEPOSIT scenario
6. **Events to listen to:** click "Select events" and check:
   - `payment_intent.succeeded`
7. Click "Add endpoint"
8. On the endpoint detail page: click "Reveal" next to Signing secret
9. Copy the signing secret — you need this for credential rebinding in Make

### Update Make with Signing Secret

1. Open Make → SSS-STRIPE-DEPOSIT
2. Find the HTTP header validation module (first module after webhook trigger)
3. Enter the Stripe signing secret you just copied
4. Save the scenario

### Verify Registration

1. On the Stripe endpoint page: click "Send test event"
2. Select event type: `payment_intent.succeeded`
3. Click "Send test event"
4. In Make → SSS-STRIPE-DEPOSIT → execution history: confirm new execution
5. In Stripe → webhook endpoint → Recent deliveries: confirm status 200

### Going Live (After All Tests Pass — Will Authorization Required)

1. Will authorizes: creates Founder Decision record type SYSTEM
2. In Stripe: toggle to **Live mode**
3. Go to Developers → Webhooks → Add endpoint (live mode requires a new endpoint)
4. Repeat registration steps with the SAME Make webhook URL
5. A new signing secret is generated for the live endpoint — update Make immediately
6. Disable the test mode endpoint (do not delete — keep for reference)

### Webhook URL Log

**SSS-STRIPE-DEPOSIT Webhook URL (test):** `[PASTE URL FROM MAKE AFTER IMPORT]`
**SSS-STRIPE-DEPOSIT Webhook URL (live):** `[FILL IN AFTER LIVE REGISTRATION]`
**Stripe Signing Secret (test):** `[STORED IN CREDENTIAL VAULT ONLY — NOT HERE]`
**Stripe Signing Secret (live):** `[STORED IN CREDENTIAL VAULT ONLY — NOT HERE]`

---

## INTERNAL WEBHOOK 1 — SSS-AUDIT-LOGGER

**Registration:** Not registered in any external system. The webhook URL is pasted directly into HTTP modules within scenarios 4–8.

### Setup Steps

1. After importing SSS-AUDIT-LOGGER (Import #1), copy the webhook URL
2. Open each of Scenarios 4, 5, 6, 7, 8 in Make
3. Find the HTTP module with text `PASTE_AUDIT_LOGGER_WEBHOOK_URL_HERE`
4. Replace with the real URL
5. Save each scenario

**SSS-AUDIT-LOGGER Internal Webhook URL:** `[PASTE URL FROM MAKE AFTER IMPORT #1]`

### Security Note

The internal webhook URL for SSS-AUDIT-LOGGER should be treated as a credential. Do not expose it in client-facing code, public documentation, or Slack. Store it in the credential vault alongside API keys.

---

## INTERNAL WEBHOOK 2 — SSS-SLACK-ALERTS

**Registration:** Not registered externally. Pasted into HTTP modules within scenarios 4–8.

### Setup Steps

1. After importing SSS-SLACK-ALERTS (Import #2), copy the webhook URL
2. Open each of Scenarios 4, 5, 6, 7, 8 in Make
3. Find the HTTP module with text `PASTE_SLACK_ALERTS_WEBHOOK_URL_HERE`
4. Replace with the real URL
5. Save each scenario

**SSS-SLACK-ALERTS Internal Webhook URL:** `[PASTE URL FROM MAKE AFTER IMPORT #2]`

---

## INTERNAL WEBHOOK 3 — SSS-BRAND-ROUTER

**Registration:** Not registered externally. Pasted into HTTP module within SSS-LEAD-INTAKE only.

### Setup Steps

1. After importing SSS-BRAND-ROUTER (Import #3), copy the webhook URL
2. Open SSS-LEAD-INTAKE (Import #4)
3. Find the HTTP module with text `PASTE_BRAND_ROUTER_WEBHOOK_URL_HERE`
4. Replace with the real URL
5. Save the scenario

**SSS-BRAND-ROUTER Internal Webhook URL:** `[PASTE URL FROM MAKE AFTER IMPORT #3]`

---

## WEBHOOK URL REGISTRY (FILL IN DURING DEPLOYMENT)

Complete this registry during deployment. Store a copy in the Make_Scenarios table in Airtable.

| Scenario | Webhook URL | Registered In | Date Registered |
|----------|-------------|--------------|-----------------|
| SSS-AUDIT-LOGGER | | Internal HTTP modules | |
| SSS-SLACK-ALERTS | | Internal HTTP modules | |
| SSS-BRAND-ROUTER | | Internal HTTP modules | |
| SSS-LEAD-INTAKE | | Webflow | |
| SSS-STRIPE-DEPOSIT (test) | | Stripe (test) | |
| SSS-STRIPE-DEPOSIT (live) | | Stripe (live) | |

---

## AIRTABLE-TRIGGERED SCENARIOS (NO WEBHOOK REGISTRATION)

The following scenarios use Airtable's "Watch Records" module. Make polls Airtable on a schedule (default: every 15 minutes on standard plans, instant on Enterprise). No webhook URL registration is needed.

| Scenario | Table Watched | Trigger Condition |
|----------|--------------|------------------|
| SSS-BOOKING-CREATION | Requests (tblTlSB9CO4dTGodg) | Status = AVAILABILITY_CONFIRMED |
| SSS-CONCIERGE-ASSIGNMENT | Bookings (tbl72omPibBkn2hZL) | Status = DEPOSIT_PAID |
| SSS-BOOKING-CONFIRMATION | Bookings (tbl72omPibBkn2hZL) | Status = CONFIRMED |

**Note on polling latency:** Airtable Watch Records on standard Make plans polls every 15 minutes. This means booking confirmation could take up to 15 minutes to trigger after Status = CONFIRMED is set. If instant triggering is required, upgrade to Make's instant triggers via Airtable's native automation → Make webhook integration, or upgrade to a Make plan with higher polling frequency.

---

*SHE SAID SAIL + MARE EXECUTIVE — CONFIDENTIAL*
*08_PRODUCT_ENGINEERING/Make_Orchestration/STAGE_1_FINAL/docs/WEBHOOK_REGISTRATION_INSTRUCTIONS.md*
