# Airtable Schema — Owner Portal Required Tables
## She Said Sail · SSS Operations Base: appdZ49WqgjRXxA1R

Create both tables in the SSS Operations base. After creating, add the table IDs to `CONFIG.TABLES` in `owner-portal.html`.

---

## TABLE 1: Approval Queue

**Purpose:** Centralized founder decision queue. Every item requiring Will's or Luciana's approval routes here. No approvals happen in Slack, text, or email.

### Create Table
Name: `Approval Queue`

### Fields to Create

| Field Name | Type | Options / Notes |
|---|---|---|
| Approval ID | Formula | `"AQ-" & RECORD_ID()` |
| Request Title | Single line text | Required |
| Submitted By | Single select | Options: Will, Luciana, AI System, Make |
| Request Type | Single select | Options: Discount, Refund, Comp Add-On, New Vendor, Expense, Lead Qualify, Other |
| Urgency | Single select | Options: URGENT, TODAY, THIS WEEK, LOW |
| Context | Long text | Background / situation |
| Proposed Action | Long text | What is being requested |
| Financial Impact | Currency | Dollar amount of impact (USD) |
| Decision | Single select | Options: Pending, Approved, Denied, Modified, Later |
| Decision Note | Long text | Will's notes on the decision |
| Approved Modification | Long text | If Modified — what was actually approved |
| Decided At | Date + time | When decision was made |
| Submitted At | Date + time | Default: creation time |
| Environment | Single select | Options: Production, Sandbox |
| Auto-Apply | Checkbox | If checked, Make will apply the decision automatically |
| Linked Booking ID | Single line text | Optional — Airtable record ID of related booking |
| Linked Client ID | Single line text | Optional — Airtable record ID of related client |
| Audit UUID | Formula | `RECORD_ID()` |

### After Creating
1. Copy the table ID (starts with `tbl...`) from the URL
2. Add to `owner-portal.html` CONFIG: `APPROVAL_QUEUE: 'tbl...'`
3. Set a default view showing `Decision = Pending`, sorted by Urgency descending

### Authority Reference (from Commercial Authority Framework)
- Champagne comp up to $150: Luciana approves → still routes here for logging
- Discounts up to 10%: Luciana approves → still routes here for logging
- Any refund: Will only — routes here, DO NOT auto-approve
- Add-on comp up to $200: Luciana approves
- New vendor: Will only
- Any single expense above $500: Will only

---

## TABLE 2: Lessons

**Purpose:** Permanent institutional intelligence database. Every operational insight becomes searchable, AI-readable, and founder-approved.

### Create Table
Name: `Lessons`

### Fields to Create

| Field Name | Type | Options / Notes |
|---|---|---|
| Lesson ID | Formula | `"L-" & YEAR(Created) & "-" & RECORD_ID()` |
| Lesson Title | Single line text | Required |
| Date | Date | Date lesson was learned |
| Category | Single select | Options: Sales, Hospitality, Operations, Broker, Creator, Advertising, Pricing, Client Behavior, Relationship, Expansion, AI System, Financial, Brand, Vendor |
| Severity | Single select | Options: Critical, High, Medium, Low |
| Status | Single select | Options: Active, Pending Review, Applied, Tested, Archived |
| Repeatable? | Checkbox | Is this a repeatable pattern? |
| Situation | Long text | What was happening |
| Problem | Long text | What went wrong or what was discovered |
| What Happened | Long text | Full description |
| What Was Changed | Long text | What action was taken |
| Outcome Before | Single select | Options: Positive, Negative, Neutral |
| Outcome After | Single select | Options: Improved, Worsened, No Change, Unknown |
| Why It Worked | Long text | If outcome improved |
| Why It Failed | Long text | If outcome worsened |
| Suggested Future Action | Long text | What to do next time |
| AI Prompt Tag | Single line text | Tag for AI retrieval (e.g. BACHELORETTE_LATE_LEAD, BROKER_SILENCE) |
| Emotional Signal | Single select | Options: Delight, Frustration, Confusion, Trust, Urgency |
| Founder Insight | Long text | Will's direct perspective |
| AI Insight | Long text | AI-generated observation (read-only for AI) |
| Decision Note | Long text | Final operational ruling |
| Will Approved | Checkbox | Must be checked before entering AI Active Context |
| Reviewed At | Date | When Will reviewed |
| Environment | Single select | Options: Production, Sandbox |
| Created At | Created time | Auto |
| Created By | Collaborator | Auto |
| Lesson UUID | Formula | `RECORD_ID()` |

### After Creating
1. Copy the table ID from the URL
2. Add to `owner-portal.html` CONFIG: `LESSONS: 'tbl...'`
3. Create these views:
   - **AI Active Context** — filter: `Will Approved = true AND Status = Active`
   - **Pending Will Review** — filter: `Status = Pending Review`
   - **Do This Friday** — filter: `Status = Pending Review`, sorted by Severity
   - **Intelligence Library** — all records, searchable

---

## EXISTING TABLE NOTES

### Requests (Leads): tblTlSB9CO4dTGodg
Verify these Single Select options exist:
- Status: `NEW, HOLD, CONTACTED, QUALIFIED, AVAILABILITY_PENDING, AVAILABILITY_CONFIRMED, BOOKED, CLOSED, VOID`
- Environment: `Production, Sandbox`
- Brand: `SSS, ME`
- Source_System: `Make, Manual, Webflow, Owner Portal`

The QUALIFY action in the portal writes `Base Price` (Number) and sets `Status = AVAILABILITY_CONFIRMED`.
Make sure a `Base Price` Number field exists in this table.

### Bookings: tbl72omPibBkn2hZL
The Money tab looks for these field names — verify they match or update CONFIG.MONEY_FIELDS:
- Revenue: `Total Revenue` (Currency)
- Balance: `Balance Due` (Currency)
- Charter Date: `Charter Date` (Date)

### Clients: tblr84vRIWC5HmKvo
The People tab looks for these field names:
- `Last Contacted` or `Last Contact Date` (Date)
- `Birthday` or `Birth Date` (Date)
- `Client Type` or `Type` (Single select with options including "Broker", "Planner")
- `HV Flag` — field ID: `fldlEaA9g9LqZIjoJ`
- `Last Booking Date` or `Last Charter Date` (Date)

---

## FIELD NAMING CONVENTION

All new fields follow the locked governance standard:
- Snake_Case for system fields: `Source_System`, `Audit_UUID`, `Legacy_Record_ID`
- Title Case for operational fields: `Decision Note`, `Proposed Action`
- Every table must contain: Environment, Source_System, and a UUID formula field
