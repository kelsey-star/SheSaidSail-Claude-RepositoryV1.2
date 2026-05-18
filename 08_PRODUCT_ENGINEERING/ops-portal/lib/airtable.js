import Airtable from 'airtable'

let _base = null
let _finBase = null

function getBase() {
  if (_base) return _base
  _base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(process.env.AIRTABLE_BASE_ID)
  return _base
}

function getFinBase() {
  if (_finBase) return _finBase
  const finId = process.env.AIRTABLE_FINANCIALS_BASE_ID || process.env.AIRTABLE_BASE_ID
  _finBase = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(finId)
  return _finBase
}

export const T = {
  // Main SSS base (appdZ49WqgjRXxA1R)
  PORTAL_USERS:       process.env.AT_TABLE_PORTAL_USERS       || 'tblWrvF72JOrFmPkV',
  REQUESTS:           process.env.AT_TABLE_REQUESTS            || 'tblTlSB9CO4dTGodg',
  BOOKINGS:           process.env.AT_TABLE_BOOKINGS            || 'tbl72omPibBkn2hZL',
  CITIES:             process.env.AT_TABLE_CITIES              || 'tblzqHlzECDvJ8KRH',
  YACHTS:             process.env.AT_TABLE_YACHTS              || 'tblvyZk1SorIQ6KWF',
  VENDORS:            process.env.AT_TABLE_VENDORS             || 'tbl4xD1mKhf0QL9Fe',
  CAMPAIGNS:          process.env.AT_TABLE_CAMPAIGNS           || 'tblTs5px03BPrUpG4',
  CREATIVE_ASSETS:    process.env.AT_TABLE_CREATIVE_ASSETS     || 'tblutlUhd804erPev',
  CITY_FINANCIALS:    process.env.AT_TABLE_CITY_FINANCIALS     || 'tblycuku5Yq9s3fIw',
  FOUNDER_DECISIONS:  process.env.AT_TABLE_FOUNDER_DECISIONS   || 'tblFCE26qDwfp4Jwd',
  AUDIT_LOG:          process.env.AT_TABLE_AUDIT_LOG           || 'tblrMpTfMk8q1eNHp',
  AVAILABILITY:       process.env.AT_TABLE_AVAILABILITY        || 'tblDOoV4CHh8t4qpO',
  REVIEWS:            process.env.AT_TABLE_REVIEWS             || 'tblE2tMb5A1IqwOzW',
  CONTENT_CAPTURES:   process.env.AT_TABLE_CONTENT_CAPTURES    || 'tbl09BGFacWim5Rk7',
  UTMS:               process.env.AT_TABLE_UTMS                || 'tblVsxlNdP9xHDipE',
  OWNERS:             process.env.AT_TABLE_OWNERS              || '',
  APPROVALS:          process.env.AT_TABLE_APPROVALS           || '',
  TASKS:              process.env.AT_TABLE_TASKS               || '',
  ALERTS:             process.env.AT_TABLE_ALERTS              || '',
  ISSUES:             process.env.AT_TABLE_ISSUES              || '',
  // Financials base (apprDKQtV2GInThwE)
  PAYMENTS:           process.env.AT_TABLE_PAYMENTS            || 'tblFLiODVbQENbL5U',
  PAYOUTS:            process.env.AT_TABLE_PAYOUTS             || 'tblaoU1alZ8lPJZKY',
}

// ─── Core ─────────────────────────────────────────────────────────────────────

export async function getAll(tableId, opts = {}) {
  if (!tableId || !process.env.AIRTABLE_PAT) return []
  const useFinBase = opts.financials === true
  try {
    const base = useFinBase ? getFinBase() : getBase()
    const records = await base(tableId).select({
      maxRecords: opts.maxRecords || 500,
      ...(opts.filter && { filterByFormula: opts.filter }),
      ...(opts.sort   && { sort: opts.sort }),
      ...(opts.fields && opts.fields.length && { fields: opts.fields }),
    }).all()
    return records.map(r => ({ id: r.id, ...r.fields }))
  } catch (err) {
    console.error(`AT getAll [${tableId}]:`, err.message)
    return []
  }
}

export async function getOne(tableId, recordId, opts = {}) {
  if (!tableId || !recordId || !process.env.AIRTABLE_PAT) return null
  const useFinBase = opts.financials === true
  try {
    const base = useFinBase ? getFinBase() : getBase()
    const r = await base(tableId).find(recordId)
    return { id: r.id, ...r.fields }
  } catch (err) {
    console.error(`AT getOne [${tableId}/${recordId}]:`, err.message)
    return null
  }
}

export async function patch(tableId, recordId, fields, opts = {}) {
  if (!tableId || !recordId) throw new Error('tableId and recordId required')
  const useFinBase = opts.financials === true
  const base = useFinBase ? getFinBase() : getBase()
  const r = await base(tableId).update(recordId, fields)
  return { id: r.id, ...r.fields }
}

export async function create(tableId, fields, opts = {}) {
  if (!tableId) throw new Error('tableId required')
  const useFinBase = opts.financials === true
  const base = useFinBase ? getFinBase() : getBase()
  const r = await base(tableId).create(fields)
  return { id: r.id, ...r.fields }
}

async function auditLog(eventType, entity, entityId, actor, details = '') {
  if (!T.AUDIT_LOG) return
  try {
    await create(T.AUDIT_LOG, {
      Event_Type: eventType, Entity: entity, Entity_ID: entityId,
      Actor: actor, Details: details,
    })
  } catch { /* best-effort */ }
}

// ─── Portal Users (Team_Members table) ───────────────────────────────────────
// Fields: Name, Email, Role (singleSelect), Status (singleSelect), City (link)
// Add Password_Hash (singleLineText) to Team_Members to enable per-user passwords.
// Without it, auth falls back to PORTAL_DEFAULT_PASSWORD env var.

export const portalUsers = {
  async findByEmail(email) {
    const rows = await getAll(T.PORTAL_USERS, {
      filter: `LOWER({Email})="${email.toLowerCase().replace(/"/g, '')}"`,
      maxRecords: 1,
    })
    if (!rows[0]) return null
    const u = rows[0]
    return {
      ...u,
      Active: u.Status === 'Active' || u.Active === true,
      cityId: Array.isArray(u.City) ? (u.City[0] || null) : (u.City_ID || null),
    }
  },
}

// ─── Requests ─────────────────────────────────────────────────────────────────

export const requests = {
  async getActive(opts = {}) {
    const base = `NOT(OR({Status}="Lost",{Status}="Completed",{Status}="Follow-Up Sent",{Status}="Review Requested"))`
    return getAll(T.REQUESTS, {
      filter: base,
      sort: [{ field: 'Submission Date', direction: 'desc' }],
    })
  },

  async getToday() {
    return getAll(T.REQUESTS, {
      filter: `IS_SAME(CREATED_TIME(),TODAY(),"day")`,
      maxRecords: 200,
    })
  },

  async getHot() {
    return getAll(T.REQUESTS, {
      filter: `AND(NOT(OR({Status}="Lost",{Status}="Completed")),{Lead Score}>6)`,
      maxRecords: 50,
    })
  },

  async getById(id) { return getOne(T.REQUESTS, id) },

  async updateStatus(id, status, actor) {
    const r = await patch(T.REQUESTS, id, { Status: status })
    await auditLog('STATUS_CHANGE', 'Request', id, actor, `→ ${status}`)
    return r
  },
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const bookings = {
  async getActive(opts = {}) {
    const base = `NOT(OR({Status}="Cancelled",{Status}="Completed"))`
    return getAll(T.BOOKINGS, {
      filter: base,
      sort: [{ field: 'Charter Date', direction: 'asc' }],
    })
  },

  async getNext7Days() {
    return getAll(T.BOOKINGS, {
      filter: `AND(IS_AFTER({Charter Date},TODAY()),IS_BEFORE({Charter Date},DATEADD(TODAY(),7,"days")),NOT({Status}="Cancelled"))`,
      sort: [{ field: 'Charter Date', direction: 'asc' }],
    })
  },

  async getById(id) { return getOne(T.BOOKINGS, id) },

  async update(id, fields, actor) {
    const r = await patch(T.BOOKINGS, id, fields)
    await auditLog('BOOKING_UPDATED', 'Booking', id, actor, JSON.stringify(fields))
    return r
  },
}

// ─── Approvals (Founder Decisions table until a dedicated Approvals table exists)

export const approvals = {
  async getPending() {
    if (T.APPROVALS) {
      return getAll(T.APPROVALS, {
        filter: `{Status}="Pending"`,
        sort: [{ field: 'Created', direction: 'desc' }],
      })
    }
    // Fallback to Founder Decisions
    return getAll(T.FOUNDER_DECISIONS, {
      filter: `{Status}="Pending"`,
      sort: [{ field: 'Created Time', direction: 'desc' }],
    })
  },

  async decide(id, decision, note, actor) {
    const tableId = T.APPROVALS || T.FOUNDER_DECISIONS
    const r = await patch(tableId, id, {
      Status: decision,
      Decision_Note: note || '',
      Decided_By: actor,
      Decided_At: new Date().toISOString(),
    })
    await auditLog('APPROVAL_DECISION', 'Approval', id, actor, `${decision}: ${note}`)
    return r
  },
}

// ─── Tasks ────────────────────────────────────────────────────────────────────

export const tasks = {
  async getOpen(opts = {}) {
    if (!T.TASKS) return []
    const base = `NOT({Status}="Done")`
    const filter = opts.email ? `AND(${base},{Assignee_Email}="${opts.email}")` : base
    return getAll(T.TASKS, { filter, sort: [{ field: 'Due_Date', direction: 'asc' }] })
  },

  async complete(id, actor) {
    if (!T.TASKS) return null
    const r = await patch(T.TASKS, id, { Status: 'Done', Completed_At: new Date().toISOString() })
    await auditLog('TASK_DONE', 'Task', id, actor)
    return r
  },
}

export const alerts = {
  async getUnresolved() {
    if (!T.ALERTS) return []
    return getAll(T.ALERTS, {
      filter: `NOT({Resolved}=1)`,
      sort: [{ field: 'Created', direction: 'desc' }],
      maxRecords: 50,
    })
  },

  async resolve(id, actor) {
    if (!T.ALERTS) return null
    const r = await patch(T.ALERTS, id, { Resolved: true })
    await auditLog('ALERT_RESOLVED', 'Alert', id, actor)
    return r
  },
}

// ─── Payments / Payouts ── (Financials base: apprDKQtV2GInThwE) ───────────────

export const payments = {
  async getRecent() {
    return getAll(T.PAYMENTS, {
      sort: [{ field: 'Charter Date', direction: 'desc' }],
      maxRecords: 100,
      financials: true,
    })
  },
  async getBalancesDue() {
    return getAll(T.PAYMENTS, {
      filter: `AND(NOT({Balance Paid}=1),{Balance Amount}>0)`,
      financials: true,
    })
  },
}

export const payouts = {
  async getPending() {
    return getAll(T.PAYOUTS, { filter: `NOT({Paid}=1)`, financials: true })
  },
  async getAll() {
    return getAll(T.PAYOUTS, { sort: [{ field: 'Payout ID', direction: 'desc' }], financials: true })
  },
}

// ─── Marketing ────────────────────────────────────────────────────────────────

export const campaigns = {
  async getAll() {
    return getAll(T.CAMPAIGNS, { sort: [{ field: 'Name', direction: 'asc' }] })
  },
}

export const utms = {
  async getAll() {
    return getAll(T.UTMS, { sort: [{ field: 'Ad Name', direction: 'desc' }], maxRecords: 200 })
  },
}

// ─── Ops ──────────────────────────────────────────────────────────────────────

export const cities = {
  async getAll() { return getAll(T.CITIES) },
  async getById(id) { return getOne(T.CITIES, id) },
}

export const yachts = {
  async getAll() { return getAll(T.YACHTS) },
}

export const issues = {
  async getOpen() {
    if (!T.ISSUES) return []
    return getAll(T.ISSUES, {
      filter: `NOT({Status}="Resolved")`,
      sort: [{ field: 'Created', direction: 'desc' }],
    })
  },
}
