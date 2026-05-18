import { useState } from 'react'
import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { approvals } from '../../lib/airtable'

const TYPE_COLORS = {
  'discount request': 'badge-amber',
  'refund request': 'badge-red',
  'owner exception': 'badge-gold',
  'vendor issue': 'badge-amber',
  'high-cost add-on': 'badge-gold',
  'angry client': 'badge-red',
  'weather issue': 'badge-amber',
  'paid ad budget change': 'badge-navy',
  'influencer comp request': 'badge-gold',
  'payout exception': 'badge-amber',
  'charter reschedule': 'badge-amber',
  'damage issue': 'badge-red',
  'legal concern': 'badge-red',
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmt$(n) {
  if (!n) return null
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function ApprovalsPage({ user, pendingApprovals }) {
  const [queue, setQueue] = useState(pendingApprovals)
  const [notes, setNotes] = useState({})
  const [deciding, setDeciding] = useState(null)
  const [decided, setDecided] = useState([])

  async function decide(id, decision) {
    setDeciding(id)
    const res = await fetch('/api/data/approvals', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, decision, note: notes[id] || '' }),
    })
    if (res.ok) {
      setDecided(prev => [...prev, { id, decision }])
      setQueue(prev => prev.filter(a => a.id !== id))
    }
    setDeciding(null)
  }

  return (
    <Layout user={user}>
      <div className="page-header">
        <h1 className="page-title">Approval Queue</h1>
        <p className="page-subtitle">
          {queue.length} pending · {decided.length} decided this session
        </p>
      </div>

      {decided.length > 0 && (
        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '10px 16px', marginBottom: 16, fontSize: 13, color: '#166534' }}>
          ✓ {decided.length} approval{decided.length !== 1 ? 's' : ''} decided this session
        </div>
      )}

      {queue.length === 0 ? (
        <div className="panel">
          <div className="panel-empty">
            <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
            No pending approvals. You're all caught up.
          </div>
        </div>
      ) : (
        <div>
          {queue.map(a => {
            const typeKey = (a.Request_Type || '').toLowerCase()
            const typeColor = TYPE_COLORS[typeKey] || 'badge-default'
            const impact = fmt$(a.Financial_Impact)

            return (
              <div key={a.id} className="approval-card">
                <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${typeColor}`}>{a.Request_Type || 'Request'}</span>
                    {a.Urgency === 'URGENT' && (
                      <span className="badge badge-red">URGENT</span>
                    )}
                  </div>
                  <span style={{ fontSize: 11, color: '#a0a0a0' }}>{fmtDate(a.Created || a.Submitted_At)}</span>
                </div>

                <div className="approval-title">{a.Request_Title || 'Approval Required'}</div>

                {a.Context && (
                  <div className="approval-context">{a.Context}</div>
                )}

                {a.Proposed_Action && (
                  <div style={{ fontSize: 13, color: '#4f4f4f', marginBottom: 10 }}>
                    <strong>Proposed:</strong> {a.Proposed_Action}
                  </div>
                )}

                {impact && (
                  <div style={{ fontSize: 13, marginBottom: 12 }}>
                    <span style={{ color: '#7a7a7a' }}>Financial Impact: </span>
                    <strong style={{ color: '#0a2342' }}>{impact}</strong>
                  </div>
                )}

                {a.Submitted_By && (
                  <div style={{ fontSize: 11, color: '#a0a0a0', marginBottom: 12 }}>
                    Submitted by: {a.Submitted_By}
                  </div>
                )}

                <div className="form-group" style={{ marginBottom: 12 }}>
                  <label className="form-label">Decision Note (optional)</label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    placeholder="Add context to your decision..."
                    value={notes[a.id] || ''}
                    onChange={e => setNotes(prev => ({ ...prev, [a.id]: e.target.value }))}
                  />
                </div>

                <div className="approval-actions">
                  <button
                    className="btn btn-sm btn-gold"
                    onClick={() => decide(a.id, 'Approved')}
                    disabled={deciding === a.id}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => decide(a.id, 'Denied')}
                    disabled={deciding === a.id}
                  >
                    ✗ Deny
                  </button>
                  <button
                    className="btn btn-sm btn-ghost"
                    onClick={() => decide(a.id, 'Modified')}
                    disabled={deciding === a.id}
                  >
                    Modify
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => decide(a.id, 'Later')}
                    disabled={deciding === a.id}
                  >
                    Defer
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Layout>
  )
}

export const getServerSideProps = requireAuth(['Founder', 'City Manager'], async (ctx, user) => {
  const pendingApprovals = await approvals.getPending().catch(() => [])
  return { props: { user, pendingApprovals } }
})
