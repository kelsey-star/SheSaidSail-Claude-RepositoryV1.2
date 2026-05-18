import { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { requests, bookings, approvals, tasks, alerts, payments, payouts, issues } from '../../lib/airtable'

function fmt$(n) {
  if (!n && n !== 0) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function statusColor(s) {
  const map = {
    'Deposit Paid': 'badge-green',   'Fully Paid': 'badge-green',
    'New Inquiry': 'badge-navy',     'Contacted': 'badge-default',
    'Qualified': 'badge-gold',       'Deposit Link Sent': 'badge-amber',
    'Lost': 'badge-red',             'Completed': 'badge-green',
    'Charter Brief Ready': 'badge-gold',
  }
  return map[s] || 'badge-default'
}

export default function FounderDashboard({ user, data }) {
  const [tab, setTab] = useState('overview')
  const [approvalsList, setApprovals] = useState(data.approvalsList || [])
  const [deciding, setDeciding] = useState(null)
  const [note, setNote] = useState('')

  async function decide(id, decision) {
    setDeciding(id)
    await fetch('/api/data/approvals', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, decision, note }),
    })
    setApprovals(prev => prev.filter(a => a.id !== id))
    setDeciding(null)
    setNote('')
  }

  return (
    <Layout user={user}>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Command Center</h1>
            <p className="page-subtitle">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="flex gap-2">
            {(['overview','approvals','charters','marketing']).map(t => (
              <button key={t} className={`btn btn-sm ${tab === t ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab === 'overview' && (
        <>
          {/* Key metrics */}
          <div className="cards-grid">
            <div className="stat-card gold-accent">
              <div className="stat-card-label">Today's Leads</div>
              <div className="stat-card-value">{data.todayLeads}</div>
            </div>
            <div className={`stat-card ${data.hotLeads > 0 ? 'alert' : ''}`}>
              <div className="stat-card-label">Hot Leads</div>
              <div className={`stat-card-value ${data.hotLeads > 0 ? 'red' : ''}`}>{data.hotLeads}</div>
              <div className="stat-card-sub">Need attention</div>
            </div>
            <div className="stat-card gold-accent">
              <div className="stat-card-label">Booked Revenue</div>
              <div className="stat-card-value gold">{fmt$(data.bookedRevenue)}</div>
            </div>
            <div className="stat-card gold-accent">
              <div className="stat-card-label">Cash Collected</div>
              <div className="stat-card-value green">{fmt$(data.cashCollected)}</div>
            </div>
            <div className={`stat-card ${data.balanceDue > 0 ? 'warning' : ''}`}>
              <div className="stat-card-label">Balances Due</div>
              <div className="stat-card-value gold">{fmt$(data.balanceDue)}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Next 7 Days</div>
              <div className="stat-card-value">{data.next7Charters}</div>
              <div className="stat-card-sub">Charters</div>
            </div>
            <div className={`stat-card ${data.pendingApprovals > 0 ? 'alert' : ''}`}>
              <div className="stat-card-label">Approvals</div>
              <div className={`stat-card-value ${data.pendingApprovals > 0 ? 'red' : ''}`}>{data.pendingApprovals}</div>
              <div className="stat-card-sub">Pending</div>
            </div>
            <div className={`stat-card ${data.openIssues > 0 ? 'alert' : ''}`}>
              <div className="stat-card-label">Open Issues</div>
              <div className={`stat-card-value ${data.openIssues > 0 ? 'red' : ''}`}>{data.openIssues}</div>
            </div>
            <div className={`stat-card ${data.pendingPayouts > 0 ? 'warning' : ''}`}>
              <div className="stat-card-label">Pending Payouts</div>
              <div className="stat-card-value gold">{fmt$(data.pendingPayoutAmt)}</div>
              <div className="stat-card-sub">{data.pendingPayouts} owners</div>
            </div>
          </div>

          {/* Next 7 charters */}
          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Next 7 Days</h2>
              <Link href="/bookings"><a className="panel-link">All bookings →</a></Link>
            </div>
            {data.next7List.length === 0 ? (
              <div className="panel-empty">No charters in the next 7 days.</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Charter Date</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data.next7List.map(b => (
                    <tr key={b.id}>
                      <td><Link href={`/bookings/${b.id}`}><a className="name-cell" style={{ color: '#0a2342', fontWeight: 500 }}>{b.Client_Name || b.Name || '—'}</a></Link></td>
                      <td>{fmtDate(b.Charter_Date)}</td>
                      <td>{b.Destination || '—'}</td>
                      <td><span className={`badge ${statusColor(b.Status)}`}>{b.Status || '—'}</span></td>
                      <td>{fmt$(b.Total_Value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Top approvals preview */}
          {approvalsList.length > 0 && (
            <div className="panel">
              <div className="panel-header">
                <h2 className="panel-title">Approvals Needed ({approvalsList.length})</h2>
                <Link href="/approvals"><a className="panel-link">View all →</a></Link>
              </div>
              <div style={{ padding: '12px 16px' }}>
                {approvalsList.slice(0, 3).map(a => (
                  <div key={a.id} className="approval-card">
                    <div className="approval-type">{a.Request_Type || 'Request'}</div>
                    <div className="approval-title">{a.Request_Title || 'Approval Required'}</div>
                    <div className="approval-context">{a.Context || ''}</div>
                    <div className="approval-actions">
                      <button className="btn btn-sm btn-gold" onClick={() => decide(a.id, 'Approved')} disabled={deciding === a.id}>Approve</button>
                      <button className="btn btn-sm btn-danger" onClick={() => decide(a.id, 'Denied')} disabled={deciding === a.id}>Deny</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {tab === 'approvals' && (
        <div>
          <div className="page-header"><h2 className="page-title">Approval Queue</h2></div>
          {approvalsList.length === 0 ? (
            <div className="panel"><div className="panel-empty">No pending approvals.</div></div>
          ) : (
            approvalsList.map(a => (
              <div key={a.id} className="approval-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="approval-type">{a.Request_Type || 'Request'}</div>
                  <span className="text-xs text-muted">{fmtDate(a.Created)}</span>
                </div>
                <div className="approval-title">{a.Request_Title}</div>
                <div className="approval-context">{a.Context}</div>
                {a.Financial_Impact > 0 && (
                  <div className="text-sm" style={{ marginBottom: 10 }}>
                    <span style={{ color: '#7a7a7a' }}>Impact: </span>
                    <strong style={{ color: '#0a2342' }}>{fmt$(a.Financial_Impact)}</strong>
                  </div>
                )}
                <input
                  className="form-input"
                  style={{ marginBottom: 10 }}
                  placeholder="Decision note (optional)"
                  onChange={e => setNote(e.target.value)}
                />
                <div className="approval-actions">
                  <button className="btn btn-sm btn-gold" onClick={() => decide(a.id, 'Approved')} disabled={deciding === a.id}>Approve</button>
                  <button className="btn btn-sm btn-danger" onClick={() => decide(a.id, 'Denied')} disabled={deciding === a.id}>Deny</button>
                  <button className="btn btn-sm btn-ghost" onClick={() => decide(a.id, 'Modified')} disabled={deciding === a.id}>Modify</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => decide(a.id, 'Later')} disabled={deciding === a.id}>Later</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === 'charters' && (
        <div>
          <div className="page-header"><h2 className="page-title">All Active Bookings</h2></div>
          {data.next7List.length === 0 ? (
            <div className="panel"><div className="panel-empty">No bookings found.</div></div>
          ) : (
            <div className="panel">
              <table className="data-table">
                <thead><tr><th>Client</th><th>Date</th><th>Destination</th><th>Status</th><th>Value</th></tr></thead>
                <tbody>
                  {data.next7List.map(b => (
                    <tr key={b.id}>
                      <td><Link href={`/bookings/${b.id}`}><a style={{ color: '#0a2342', fontWeight: 500 }}>{b.Client_Name || '—'}</a></Link></td>
                      <td>{fmtDate(b.Charter_Date)}</td>
                      <td>{b.Destination || '—'}</td>
                      <td><span className={`badge ${statusColor(b.Status)}`}>{b.Status || '—'}</span></td>
                      <td>{fmt$(b.Total_Value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'marketing' && (
        <div>
          <div className="page-header"><h2 className="page-title">Marketing Overview</h2></div>
          <div className="panel"><div className="panel-empty">Connect campaign and UTM data in Airtable to see marketing metrics here.</div></div>
        </div>
      )}
    </Layout>
  )
}

export const getServerSideProps = requireAuth(['Founder'], async (context, user) => {
  const [
    todayLeads, hotLeads, next7List, activeBookings,
    pendingApprovals, openIssues, balancesDue, pendingPayoutsData,
    recentPayments,
  ] = await Promise.all([
    requests.getToday().catch(() => []),
    requests.getHot().catch(() => []),
    bookings.getNext7Days().catch(() => []),
    bookings.getActive().catch(() => []),
    approvals.getPending().catch(() => []),
    issues.getOpen().catch(() => []),
    payments.getBalancesDue().catch(() => []),
    payouts.getPending().catch(() => []),
    payments.getRecent().catch(() => []),
  ])

  const bookedRevenue = activeBookings.reduce((s, b) => s + (b.Total_Value || 0), 0)
  const cashCollected = recentPayments.filter(p => p.Paid).reduce((s, p) => s + (p.Amount || 0), 0)
  const balanceDue    = balancesDue.reduce((s, p) => s + (p.Amount || 0), 0)

  return {
    props: {
      user,
      data: {
        todayLeads:       todayLeads.length,
        hotLeads:         hotLeads.length,
        bookedRevenue,
        cashCollected,
        balanceDue,
        next7Charters:    next7List.length,
        next7List:        next7List.slice(0, 10),
        pendingApprovals: pendingApprovals.length,
        approvalsList:    pendingApprovals,
        openIssues:       openIssues.length,
        pendingPayouts:   pendingPayoutsData.length,
        pendingPayoutAmt: pendingPayoutsData.reduce((s, p) => s + (p.Amount || 0), 0),
      },
    },
  }
})
