import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { requests } from '../../lib/airtable'

const STAGES = [
  'New Inquiry','Contacted','Qualified','Yacht Options Sent',
  'Awaiting Client Decision','Deposit Link Sent','Deposit Paid',
  'Agreement Sent','Agreement Signed','Balance Due','Fully Paid',
  'Charter Brief Ready','Completed','Follow-Up Sent','Review Requested','Lost',
]

function Field({ label, value }) {
  if (!value) return null
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a0a0a0', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, color: '#4f4f4f' }}>{value}</div>
    </div>
  )
}

export default function RequestDetail({ user, request: r }) {
  const router = useRouter()
  const [status, setStatus]     = useState(r.Status || 'New Inquiry')
  const [notes, setNotes]       = useState(r.Notes || r.Internal_Notes || '')
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)

  async function saveStatus() {
    setSaving(true)
    await fetch('/api/data/requests', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: r.id, status }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const fmtDate = d => d ? new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'
  const fmt$    = n => n ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n) : '—'

  return (
    <Layout user={user}>
      <div style={{ marginBottom: 20 }}>
        <Link href="/requests"><a style={{ fontSize: 13, color: '#7a7a7a' }}>← Back to Requests</a></Link>
      </div>

      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">{r.Name || 'Request Detail'}</h1>
            <p className="page-subtitle">{r.Email || ''} {r.Phone ? `· ${r.Phone}` : ''}</p>
          </div>
          <span className={`badge badge-navy`} style={{ fontSize: 13, padding: '6px 14px' }}>{status}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Main details */}
        <div>
          <div className="panel">
            <div className="panel-header"><h2 className="panel-title">Charter Details</h2></div>
            <div style={{ padding: '20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
              <Field label="Destination"   value={r.Destination} />
              <Field label="Charter Date"  value={fmtDate(r.Charter_Date)} />
              <Field label="Group Size"    value={r.Group_Size && `${r.Group_Size} guests`} />
              <Field label="Budget"        value={r.Budget_Range || (r.Budget && fmt$(r.Budget))} />
              <Field label="Vessel Type"   value={r.Vessel_Type} />
              <Field label="Occasion"      value={r.Occasion} />
              <Field label="Source"        value={r.Source} />
              <Field label="Assigned To"   value={r.Assigned_To} />
            </div>
          </div>

          {(r.Message || r.Notes || r.Client_Message) && (
            <div className="panel" style={{ marginTop: 16 }}>
              <div className="panel-header"><h2 className="panel-title">Client Message</h2></div>
              <div style={{ padding: '16px 20px', fontSize: 14, color: '#4f4f4f', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {r.Message || r.Notes || r.Client_Message}
              </div>
            </div>
          )}
        </div>

        {/* Actions sidebar */}
        <div>
          <div className="panel">
            <div className="panel-header"><h2 className="panel-title">Update Status</h2></div>
            <div style={{ padding: 16 }}>
              <div className="form-group">
                <label className="form-label">Stage</label>
                <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                  {STAGES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Internal Notes</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add notes..."
                />
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={saveStatus}
                disabled={saving}
              >
                {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
              </button>
            </div>
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel-header"><h2 className="panel-title">Record Info</h2></div>
            <div style={{ padding: '12px 16px' }}>
              <div style={{ fontSize: 11, color: '#a0a0a0', marginBottom: 8 }}>
                <span style={{ display: 'block', marginBottom: 4 }}>ID: {r.id}</span>
                <span style={{ display: 'block' }}>Created: {fmtDate(r.Created || r.createdTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = requireAuth([], async (ctx, user) => {
  const { id } = ctx.params
  const request = await requests.getById(id).catch(() => null)
  if (!request) return { notFound: true }
  return { props: { user, request } }
})
