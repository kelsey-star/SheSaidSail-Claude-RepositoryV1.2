# CREDENTIAL REBINDING CHECKLIST — STAGE 1

**Classification:** Confidential — Internal Use Only
**Owner:** Will (Founder)
**Effective Date:** May 2026

---

## OVERVIEW

Every Make blueprint imports with connection slots that reference the original builder's account. These connection slots appear as red or orange warnings in the Make scenario editor. Every connection must be rebound to your account's connections before the scenario is saved.

**A scenario with unbound connections will fail silently or throw authentication errors on execution.**

---

## CONNECTION INVENTORY

| Connection Name | Type | Used In | Credential Location |
|----------------|------|---------|---------------------|
| Airtable — SSS PAT | Airtable API | Scenarios 1–8 | Credential vault → Airtable PAT |
| Slack — SheSaidSail Workspace | Slack OAuth | Scenarios 1, 2, 4, 5, 6, 7, 8 | Make Connections → Slack → SheSaidSail |
| Gmail — hello@shesaidsail.com | Gmail OAuth | Scenarios 4, 6, 8 | Make Connections → Gmail → hello@shesaidsail.com |
| Stripe — Test Mode | Stripe API | Scenario 6 | Credential vault → Stripe test API key |
| Quo SMS — API Key | HTTP Header | Scenarios 6, 8 | Credential vault → Quo API key |

---

## SCENARIO-BY-SCENARIO REBINDING

---

### SCENARIO 1 — SSS-AUDIT-LOGGER

| Module | Connection Type | Action |
|--------|----------------|--------|
| Create Record (Audit Log) | Airtable | Select your Airtable PAT connection |

**Verify after rebinding:**
- Base shows: She Said Sail (appdZ49WqgjRXxA1R)
- Table shows: Audit Log (tblrMpTfMk8q1eNHp)
- No red connection warnings

---

### SCENARIO 2 — SSS-SLACK-ALERTS

| Module | Connection Type | Action |
|--------|----------------|--------|
| Post Message — #sss-ops-alerts | Slack OAuth | Select SheSaidSail workspace connection |
| Post Message — #sss-emergency-ops | Slack OAuth | Select SheSaidSail workspace connection |
| Post Message — #sss-lead-intake | Slack OAuth | Select SheSaidSail workspace connection |

**Verify after rebinding:**
- Workspace shows: SheSaidSail
- All 3 channel names resolve without error
- No red connection warnings

---

### SCENARIO 3 — SSS-BRAND-ROUTER

| Module | Connection Type | Action |
|--------|----------------|--------|
| Get Record (Requests) | Airtable | Select your Airtable PAT connection |
| Update Record (Requests — Brand field) | Airtable | Select your Airtable PAT connection |

**Verify after rebinding:**
- Both Airtable modules: base appdZ49WqgjRXxA1R confirmed
- No red connection warnings

---

### SCENARIO 4 — SSS-LEAD-INTAKE

| Module | Connection Type | Action |
|--------|----------------|--------|
| Create Record (Requests) | Airtable | Select your Airtable PAT connection |
| Send Email (auto-reply) | Gmail OAuth | Select hello@shesaidsail.com |
| Post Message (#sss-lead-intake) | Slack OAuth | Select SheSaidSail workspace |
| HTTP — Call SSS-BRAND-ROUTER | HTTP | Replace placeholder URL with SSS-BRAND-ROUTER webhook URL |
| HTTP — Call SSS-AUDIT-LOGGER | HTTP | Replace placeholder URL with SSS-AUDIT-LOGGER webhook URL |
| HTTP — Call SSS-SLACK-ALERTS | HTTP | Replace placeholder URL with SSS-SLACK-ALERTS webhook URL |

**Verify after rebinding:**
- Airtable module: base appdZ49WqgjRXxA1R, table tblTlSB9CO4dTGodg (Requests)
- Gmail sender: hello@shesaidsail.com
- All 3 internal HTTP webhook URLs populated with real URLs (no placeholder text)
- No red connection warnings

**Placeholder text to search for and replace:**
- `PASTE_BRAND_ROUTER_WEBHOOK_URL_HERE`
- `PASTE_AUDIT_LOGGER_WEBHOOK_URL_HERE`
- `PASTE_SLACK_ALERTS_WEBHOOK_URL_HERE`

---

### SCENARIO 5 — SSS-STRIPE-DEPOSIT

| Module | Connection Type | Action |
|--------|----------------|--------|
| HTTP — Stripe Signature Validation | HTTP Header | Enter Stripe webhook signing secret |
| Update Record (Bookings) | Airtable | Select your Airtable PAT connection |
| HTTP — Call SSS-AUDIT-LOGGER | HTTP | Replace placeholder URL |
| HTTP — Call SSS-SLACK-ALERTS | HTTP | Replace placeholder URL |

**Stripe Webhook Signing Secret setup:**
1. Go to Make → SSS-STRIPE-DEPOSIT → first HTTP module
2. Find the header validation module for `Stripe-Signature`
3. Enter your Stripe webhook signing secret (found in Stripe → Developers → Webhooks → your endpoint → Signing secret)
4. This secret is unique per endpoint — copy it AFTER registering the webhook URL in Stripe

**Verify after rebinding:**
- Airtable module: base appdZ49WqgjRXxA1R, table tbl72omPibBkn2hZL (Bookings)
- Status update field: `Status` → value: `DEPOSIT_PAID`
- Stripe-Signature header validation populated
- Both internal HTTP webhook URLs populated
- No red connection warnings

---

### SCENARIO 6 — SSS-BOOKING-CREATION

| Module | Connection Type | Action |
|--------|----------------|--------|
| Watch Records (Requests) | Airtable | Select your Airtable PAT connection |
| Get Record (Requests — full data) | Airtable | Select your Airtable PAT connection |
| Create Record (Bookings) | Airtable | Select your Airtable PAT connection |
| Create Payment Link | Stripe | Select your Stripe TEST connection |
| Update Record (Requests — Stripe link) | Airtable | Select your Airtable PAT connection |
| Send Email (deposit request) | Gmail OAuth | Select hello@shesaidsail.com |
| HTTP — Quo SMS | HTTP | Add Authorization header: `Bearer YOUR_QUO_API_KEY` |
| HTTP — Call SSS-AUDIT-LOGGER | HTTP | Replace placeholder URL |
| HTTP — Call SSS-SLACK-ALERTS | HTTP | Replace placeholder URL |

**Quo SMS setup:**
1. In the HTTP module sending to Quo API
2. Add header: `Authorization: Bearer [Quo API key from credential vault]`
3. Confirm endpoint URL matches Quo's SMS send endpoint

**Verify after rebinding:**
- Watch trigger: table tblTlSB9CO4dTGodg, filter Status = AVAILABILITY_CONFIRMED
- Booking creation: table tbl72omPibBkn2hZL
- Stripe: Payment Link in test mode
- Gmail sender: hello@shesaidsail.com
- Quo: Authorization header populated
- Idempotency check module present before record creation
- Automations_Paused and Emergency_Flag filter present before any send
- No red connection warnings

---

### SCENARIO 7 — SSS-CONCIERGE-ASSIGNMENT

| Module | Connection Type | Action |
|--------|----------------|--------|
| Watch Records (Bookings) | Airtable | Select your Airtable PAT connection |
| Search Records (Concierge_Operators) | Airtable | Select your Airtable PAT connection |
| Update Record (Bookings — Concierge_Assigned) | Airtable | Select your Airtable PAT connection |
| HTTP — Call SSS-AUDIT-LOGGER | HTTP | Replace placeholder URL |
| HTTP — Call SSS-SLACK-ALERTS | HTTP | Replace placeholder URL |

**Verify after rebinding:**
- Watch trigger: table tbl72omPibBkn2hZL, filter Status = DEPOSIT_PAID
- Concierge_Operators search: table tblX61IB2qjDmac8l
- Booking update: field `Concierge_Assigned` = true (checked)
- No red connection warnings

---

### SCENARIO 8 — SSS-BOOKING-CONFIRMATION

| Module | Connection Type | Action |
|--------|----------------|--------|
| Watch Records (Bookings) | Airtable | Select your Airtable PAT connection |
| Get Record (Bookings — full data) | Airtable | Select your Airtable PAT connection |
| Get Record (Clients — phone/email) | Airtable | Select your Airtable PAT connection |
| Update Record (Bookings — Confirmation_Sent) | Airtable | Select your Airtable PAT connection |
| Send Email (confirmation) | Gmail OAuth | Select hello@shesaidsail.com |
| HTTP — Quo SMS | HTTP | Add Authorization header: `Bearer YOUR_QUO_API_KEY` |
| HTTP — Call SSS-AUDIT-LOGGER | HTTP | Replace placeholder URL |
| HTTP — Call SSS-SLACK-ALERTS | HTTP | Replace placeholder URL |

**Verify after rebinding:**
- Watch trigger: table tbl72omPibBkn2hZL, filter Status = CONFIRMED
- Automations_Paused filter: exits if true — confirm this is the FIRST filter after trigger
- Emergency_Flag filter: exits if true — confirm this is the SECOND filter
- Confirmation_Sent filter: exits if true — idempotency gate
- Concierge_Assigned filter: exits if false — prerequisite gate
- Booking update: field `Confirmation_Sent` = true (checked)
- Gmail sender: hello@shesaidsail.com
- Quo: Authorization header populated
- No red connection warnings

---

## POST-REBINDING FINAL CHECK

After all 8 scenarios are rebound, run this final check before activation:

```
Make Connections page → verify 0 error states on all connections
```

| Check | Pass Condition |
|-------|---------------|
| Airtable connection | Green — no expired token |
| Slack connection | Green — workspace accessible |
| Gmail connection | Green — account accessible |
| Stripe connection | Green — test mode confirmed |

If any connection shows an error, re-authenticate before proceeding.

---

*SHE SAID SAIL + MARE EXECUTIVE — CONFIDENTIAL*
*08_PRODUCT_ENGINEERING/Make_Orchestration/STAGE_1_FINAL/docs/CREDENTIAL_REBINDING_CHECKLIST.md*
