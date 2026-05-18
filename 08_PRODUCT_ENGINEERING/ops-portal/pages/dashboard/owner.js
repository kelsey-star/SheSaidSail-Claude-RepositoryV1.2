import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { yachts, bookings, payouts } from '../../lib/airtable'

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmt$(n) {
  if (!n) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function OwnerDashboard({ user, data }) {
  return (
    <Layout user={user}>
      <div className="page-header">
        <h1 className="page-title">Owner Dashboard</h1>
        <p className="page-subtitle">Your yachts and upcoming charters</p>
      </div>

      <div className="cards-grid">
        <div className="stat-card gold-accent">
          <div className="stat-card-label">My Yachts</div>
          <div className="stat-card-value">{data.myYachts.length}</div>
        </div>
        <div className="stat-card gold-accent">
          <div className="stat-card-label">Active Bookings</div>
          <div className="stat-card-value">{data.myBookings.length}</div>
        </div>
        <div className={`stat-card ${data.pendingPayouts.length > 0 ? 'gold-accent' : ''}`}>
          <div className="stat-card-label">Pending Payouts</div>
          <div className="stat-card-value gold">{fmt$(data.pendingPayouts.reduce((s, p) => s + (p.Amount || 0), 0))}</div>
          <div className="stat-card-sub">{data.pendingPayouts.length} pending</div>
        </div>
      </div>

      {/* My Yachts */}
      <div className="panel" style={{ marginBottom: 20 }}>
        <div className="panel-header"><h2 className="panel-title">My Yachts</h2></div>
        {data.myYachts.length === 0 ? (
          <div className="panel-empty">No yachts found. Your yachts will appear once linked in Airtable.</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Yacht</th><th>Type</th><th>Capacity</th><th>Base Port</th><th>Status</th></tr></thead>
            <tbody>
              {data.myYachts.map(y => (
                <tr key={y.id}>
                  <td className="name-cell">{y.Name || y.Yacht_Name || '—'}</td>
                  <td>{y.Type || y.Vessel_Type || '—'}</td>
                  <td>{y.Capacity || y.Guest_Capacity || '—'}</td>
                  <td>{y.Base_Port || y.Home_Port || '—'}</td>
                  <td><span className={`badge ${y.Active ? 'badge-green' : 'badge-default'}`}>{y.Active ? 'Active' : 'Inactive'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Upcoming Bookings */}
      <div className="panel">
        <div className="panel-header"><h2 className="panel-title">Upcoming Charters</h2></div>
        {data.myBookings.length === 0 ? (
          <div className="panel-empty">No active bookings for your yachts.</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Client</th><th>Charter Date</th><th>Yacht</th><th>Status</th><th>Payout</th></tr></thead>
            <tbody>
              {data.myBookings.map(b => (
                <tr key={b.id}>
                  <td className="name-cell">{b.Client_Name || b.Name || '—'}</td>
                  <td>{fmtDate(b.Charter_Date)}</td>
                  <td>{b.Yacht_Name || b.Vessel || '—'}</td>
                  <td><span className="badge badge-default">{b.Status || '—'}</span></td>
                  <td>{fmt$(b.Owner_Payout || b.Payout_Amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = requireAuth(['Founder', 'Owner'], async (ctx, user) => {
  const [myYachts, myBookings, pendingPayouts] = await Promise.all([
    yachts.getByOwner(user.id).catch(() => []),
    bookings.getActive({ ownerId: user.id }).catch(() => []),
    payouts.getPending().catch(() => []),
  ])
  return { props: { user, data: { myYachts, myBookings, pendingPayouts } } }
})
