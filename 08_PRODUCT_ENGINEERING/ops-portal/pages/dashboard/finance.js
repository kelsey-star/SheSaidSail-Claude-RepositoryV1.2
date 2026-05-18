import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { payments, payouts, bookings } from '../../lib/airtable'

function fmt$(n) {
  if (!n && n !== 0) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function FinanceDashboard({ user, data }) {
  const cashCollected = data.recentPayments.filter(p => p.Paid).reduce((s, p) => s + (p.Amount || 0), 0)
  const balanceDue    = data.balancesDue.reduce((s, p) => s + (p.Amount || 0), 0)
  const pendingPayoutAmt = data.pendingPayouts.reduce((s, p) => s + (p.Amount || 0), 0)
  const bookedRevenue = data.activeBookings.reduce((s, b) => s + (b.Total_Value || 0), 0)

  return (
    <Layout user={user}>
      <div className="page-header">
        <h1 className="page-title">Finance Dashboard</h1>
        <p className="page-subtitle">Payments, payouts, and margin overview</p>
      </div>

      <div className="cards-grid">
        <div className="stat-card gold-accent">
          <div className="stat-card-label">Cash Collected</div>
          <div className="stat-card-value green">{fmt$(cashCollected)}</div>
        </div>
        <div className={`stat-card ${balanceDue > 0 ? 'warning' : ''}`}>
          <div className="stat-card-label">Balances Due</div>
          <div className="stat-card-value gold">{fmt$(balanceDue)}</div>
          <div className="stat-card-sub">{data.balancesDue.length} outstanding</div>
        </div>
        <div className="stat-card gold-accent">
          <div className="stat-card-label">Booked Revenue</div>
          <div className="stat-card-value">{fmt$(bookedRevenue)}</div>
        </div>
        <div className={`stat-card ${pendingPayoutAmt > 0 ? 'warning' : ''}`}>
          <div className="stat-card-label">Pending Payouts</div>
          <div className="stat-card-value gold">{fmt$(pendingPayoutAmt)}</div>
          <div className="stat-card-sub">{data.pendingPayouts.length} owners</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="panel">
          <div className="panel-header"><h2 className="panel-title">Balances Due</h2></div>
          {data.balancesDue.length === 0 ? (
            <div className="panel-empty">No outstanding balances.</div>
          ) : (
            <table className="data-table">
              <thead><tr><th>Client</th><th>Amount</th><th>Due Date</th></tr></thead>
              <tbody>
                {data.balancesDue.map(p => (
                  <tr key={p.id}>
                    <td className="name-cell">{p.Client_Name || p.Name || '—'}</td>
                    <td style={{ color: '#c0392b', fontWeight: 500 }}>{fmt$(p.Amount)}</td>
                    <td>{fmtDate(p.Due_Date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="panel">
          <div className="panel-header"><h2 className="panel-title">Pending Owner Payouts</h2></div>
          {data.pendingPayouts.length === 0 ? (
            <div className="panel-empty">No pending payouts.</div>
          ) : (
            <table className="data-table">
              <thead><tr><th>Owner</th><th>Amount</th><th>Charter</th></tr></thead>
              <tbody>
                {data.pendingPayouts.map(p => (
                  <tr key={p.id}>
                    <td className="name-cell">{p.Owner_Name || p.Name || '—'}</td>
                    <td style={{ fontWeight: 500 }}>{fmt$(p.Amount)}</td>
                    <td style={{ fontSize: 12, color: '#a0a0a0' }}>{p.Booking_Reference || p.Charter || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="panel" style={{ gridColumn: '1 / -1' }}>
          <div className="panel-header"><h2 className="panel-title">Recent Payments</h2></div>
          {data.recentPayments.length === 0 ? (
            <div className="panel-empty">No payments found. Add payments to your Airtable Payments table.</div>
          ) : (
            <table className="data-table">
              <thead><tr><th>Client</th><th>Type</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {data.recentPayments.slice(0, 20).map(p => (
                  <tr key={p.id}>
                    <td className="name-cell">{p.Client_Name || p.Name || '—'}</td>
                    <td>{p.Type || '—'}</td>
                    <td style={{ fontWeight: 500 }}>{fmt$(p.Amount)}</td>
                    <td>{fmtDate(p.Created || p.Payment_Date)}</td>
                    <td><span className={`badge ${p.Paid ? 'badge-green' : 'badge-amber'}`}>{p.Paid ? 'Paid' : 'Pending'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = requireAuth(['Founder', 'Finance'], async (ctx, user) => {
  const [recentPayments, balancesDue, pendingPayouts, activeBookings] = await Promise.all([
    payments.getRecent().catch(() => []),
    payments.getBalancesDue().catch(() => []),
    payouts.getPending().catch(() => []),
    bookings.getActive().catch(() => []),
  ])
  return { props: { user, data: { recentPayments, balancesDue, pendingPayouts, activeBookings } } }
})
