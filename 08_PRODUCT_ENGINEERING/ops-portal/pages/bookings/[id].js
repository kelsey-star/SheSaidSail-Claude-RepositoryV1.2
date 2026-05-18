import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { bookings } from '../../lib/airtable'

function Field({ label, value }) {
  if (value == null || value === '') return null
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a0a0a0', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, color: '#4f4f4f' }}>{value}</div>
    </div>
  )
}

function fmt$(n) {
  if (!n) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

const BOOKING_STATUSES = [
  'New','Deposit Paid','Agreement Sent','Agreement Signed',
  'Balance Due','Fully Paid','Charter Brief Ready','Completed','Cancelled',
]

export default function BookingDetail({ user, booking: b }) {
  const [status, setStatus] = useState(b.Status || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)

  async function saveStatus() {
    setSaving(true)
    await fetch('/api/data/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: b.id, Status: status }),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <Layout user={user}>
      <div style={{ marginBottom: 20 }}>
        <Link href="/bookings"><a style={{ fontSize: 13, color: '#7a7a7a' }}>← Back to Bookings</a></Link>
      </div>

      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">{b.Client_Name || b.Name || 'Booking Detail'}</h1>
            <p className="page-subtitle">{b.Booking_Reference || b.Reference || b.id}</p>
          </div>
          <span className="badge badge-navy" style={{ fontSize: 13, padding: '6px 14px' }}>{status || '—'}</span>
        </div>
      </div>

      {/* Finance summary */}
      <div className="cards-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card gold-accent">
          <div className="stat-card-label">Total Value</div>
          <div className="stat-card-value gold">{fmt$(b.Total_Value)}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Deposit</div>
          <div className="stat-card-value">{fmt$(b.Deposit_Amount || b.Deposit)}</div>
          <div className="stat-card-sub">{b.Deposit_Paid ? '✓ Paid' : 'Unpaid'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Balance Due</div>
          <div className="stat-card-value">{fmt$(b.Balance_Amount || b.Balance)}</div>
          <div className="stat-card-sub">{b.Balance_Due_Date ? `Due ${new Date(b.Balance_Due_Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Owner Payout</div>
          <div className="stat-card-value">{fmt$(b.Owner_Payout || b.Payout_Amount)}</div>
          <div className="stat-card-sub">{b.Payout_Status || ''}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        <div>
          <div className="panel">
            <div className="panel-header"><h2 className="panel-title">Charter Details</h2></div>
            <div style={{ padding: '20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
              <Field label="Charter Date"  value={fmtDate(b.Charter_Date)} />
              <Field label="Return Date"   value={fmtDate(b.Return_Date || b.Charter_End)} />
              <Field label="Destination"   value={b.Destination} />
              <Field label="Departure Port" value={b.Departure_Port} />
              <Field label="Yacht"         value={b.Yacht_Name || b.Vessel} />
              <Field label="Captain"       value={b.Captain_Name || b.Captain} />
              <Field label="Group Size"    value={b.Group_Size && `${b.Group_Size} guests`} />
              <Field label="Occasion"      value={b.Occasion} />
              <Field label="Assigned To"   value={b.Assigned_To} />
              <Field label="City"          value={b.City} />
            </div>
          </div>

          {(b.Special_Requests || b.Notes) && (
            <div className="panel" style={{ marginTop: 16 }}>
              <div className="panel-header"><h2 className="panel-title">Special Requests</h2></div>
              <div style={{ padding: '16px 20px', fontSize: 14, color: '#4f4f4f', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {b.Special_Requests || b.Notes}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="panel">
            <div className="panel-header"><h2 className="panel-title">Update Status</h2></div>
            <div style={{ padding: 16 }}>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
                  {BOOKING_STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={saveStatus}
                disabled={saving}
              >
                {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Status'}
              </button>
            </div>
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="panel-header"><h2 className="panel-title">Client Info</h2></div>
            <div style={{ padding: '12px 16px' }}>
              <Field label="Name"  value={b.Client_Name || b.Name} />
              <Field label="Email" value={b.Client_Email || b.Email} />
              <Field label="Phone" value={b.Client_Phone || b.Phone} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = requireAuth([], async (ctx, user) => {
  const { id } = ctx.params
  const booking = await bookings.getById(id).catch(() => null)
  if (!booking) return { notFound: true }
  return { props: { user, booking } }
})
