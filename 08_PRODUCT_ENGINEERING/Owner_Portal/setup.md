# Owner Portal — Setup Guide
## She Said Sail · Deploy in Under 15 Minutes

---

## Step 1 — Open the HTML file and configure it

Open `owner-portal.html` in a text editor. Find the CONFIG block near the top (line ~30). Fill in these values:

```javascript
const CONFIG = {
  OWNER_PASSWORD:  'your-password-here',   // Pick anything. You'll type this to log in.
  AIRTABLE_TOKEN:  'pat...',               // See Step 2 below
  ...
```

**Save the file.**

---

## Step 2 — Get your Airtable Personal Access Token

1. Go to [airtable.com/account](https://airtable.com/account)
2. Click **Developer Hub** → **Personal access tokens**
3. Click **Create new token**
4. Name it: `SSS Owner Portal`
5. Scopes needed: `data.records:read`, `data.records:write`, `schema.bases:read`
6. Access: **She Said Sail** base
7. Copy the token (starts with `pat...`)
8. Paste into `AIRTABLE_TOKEN` in the CONFIG block

---

## Step 3 — Create the Approval Queue and Lessons tables

Follow `airtable-schema.md` exactly.

After creating each table:
1. Click the table in Airtable
2. Copy the table ID from the URL (the part that starts with `tbl`)
3. Add to CONFIG in the HTML file:
   ```javascript
   APPROVAL_QUEUE: 'tblXXXXXXXXXXXXXX',
   LESSONS:        'tblXXXXXXXXXXXXXX',
   ```

---

## Step 4 — Open the portal in your browser

Double-click `owner-portal.html`. It opens in your browser.

Type your password. You're in.

**Note:** Babel (the JS transpiler) runs in the browser on first load. Expect 2-4 seconds before the UI appears. This is normal for the single-file version.

---

## Step 5 — Add to iPhone Home Screen (recommended)

For the best experience, host the file and add it as a PWA shortcut.

### Option A — Host on Netlify (free, 2 minutes)
1. Go to [netlify.com](https://netlify.com) → New site → Deploy manually
2. Drag the `Owner_Portal` folder into the drop zone
3. Netlify gives you a URL like `https://your-site.netlify.app`
4. On iPhone: open that URL in Safari → Share → Add to Home Screen
5. The portal opens full-screen like a native app

### Option B — Run locally with a simple server
```bash
cd 08_PRODUCT_ENGINEERING/Owner_Portal
python3 -m http.server 8080
# Open http://localhost:8080/owner-portal.html
```

---

## Step 6 — Configure optional webhooks

For the **HOLD MESSAGE** button (sends a holding email to the lead):
1. Create a new Make scenario that accepts a webhook with fields: `email`, `first_name`, `message`
2. The scenario should send the message via Gmail
3. Paste the webhook URL into `WEBHOOKS.HOLDING_MESSAGE` in CONFIG

For the **BALANCE REMINDER** button:
1. Create a Make scenario accepting: `booking_id`, `client_email`, `client_name`, `balance`, `charter_date`
2. Paste the URL into `WEBHOOKS.BALANCE_REMINDER` in CONFIG

Until these are configured, the buttons show an error message. The portal still works without them.

---

## Step 7 — Enable AI Chat (optional)

1. Get an Anthropic API key at [console.anthropic.com](https://console.anthropic.com)
2. Paste it into `ANTHROPIC_KEY` in CONFIG

**Security note:** In the single HTML file version, the API key is visible in the page source. This is acceptable for personal use on your own device. When migrating to Next.js, move the key to a server-side API route.

If you see a CORS error when using AI Chat: Anthropic supports browser-side requests with the `anthropic-dangerous-direct-browser-access: true` header (already included). If it still fails, deploy to Netlify or Vercel and the request will work.

---

## QUALIFY Flow — How It Works

When you tap **QUALIFY** on a lead:
1. Portal prompts for the charter price (full amount)
2. Portal writes `Base Price = [price]` and `Status = AVAILABILITY_CONFIRMED` to the Requests record
3. **Make scenario M-BOOKING-CREATION fires automatically** (it watches for Status = AVAILABILITY_CONFIRMED)
4. Make creates a Booking record, generates a Stripe payment link (50% deposit), and emails it to the client

**Important:** M-BOOKING-CREATION uses `Base Price` to calculate the 50% deposit. If you qualify without setting a price, the Stripe link will be for $0. The portal enforces price entry before qualifying.

**Why AVAILABILITY_CONFIRMED, not QUALIFIED?**
The M-BOOKING-CREATION blueprint watches for `AVAILABILITY_CONFIRMED`, not `QUALIFIED`. Your QUALIFY tap is both the qualification and the availability confirmation — you're personally reviewing the lead, so no separate availability check step is needed. This is documented in a comment in owner-portal.html.

---

## Known Limitations (v1 — single HTML file)

| Limitation | Workaround |
|---|---|
| Babel transpiles on load (~3s) | Normal for single-file React. Disappears in Next.js build |
| ANTHROPIC_KEY visible in source | Acceptable for personal device. Move to server-side in Next.js |
| Marketing tab shows placeholder data | Connect ad platform to Airtable via Make for live data |
| People tab requires specific field names | Verify field names in airtable-schema.md match your Clients table |
| Session is localStorage, not HTTP cookie | Fine for personal use |
| No offline support | Requires network for Airtable calls |

---

## Moving to Next.js

When you're ready to deploy properly:

1. `npx create-next-app sss-portal --typescript --tailwind`
2. Move each tab component to `app/` pages
3. Create `/api/chat` route for Anthropic (keeps key server-side)
4. Create `/api/airtable/[...path]` proxy route (keeps Airtable token server-side)
5. Read env vars from `.env.local` (see `.env.example`)
6. Deploy to Vercel — push to GitHub, connect repo, done

The component architecture in `owner-portal.html` maps directly to Next.js pages and components with minimal changes.

---

## Troubleshooting

**"Table ID not configured" error**
→ Add the table ID to CONFIG.TABLES in the HTML file

**"HTTP 403" from Airtable**
→ Your PAT doesn't have access to this base or table. Regenerate with correct scopes.

**"HTTP 422" from Airtable on QUALIFY**
→ Status field "AVAILABILITY_CONFIRMED" is not a defined option. Add it to the Status Single Select field in the Requests table.

**Leads tab empty even though leads exist**
→ Check if leads have `Status = CLOSED` or `BOOKED` — these are filtered out. Change filter in `fetchData` if needed.

**People tab shows no results**
→ The Clients table may not have `Last Contacted`, `Birthday`, or `Client Type` fields. Create them per airtable-schema.md.

**AI Chat CORS error**
→ Deploy to Netlify/Vercel. Browser-to-Anthropic API calls may be blocked in some environments.
