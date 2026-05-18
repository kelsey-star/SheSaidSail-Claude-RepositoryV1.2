import Link from 'next/link'
import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { requests, bookings, tasks, issues } from '../../lib/airtable'

function fmt$(n) {
  if (!n) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function CityManagerDashboard({ user, data }) {
  const totalRevenue = data.cityBookings.reduce((s, b) => s + (b.Total_Value || 0), 0)

  return (
    <Layout user={user}>
      <div className="page-header">
        <h1 className="page-title">City Dashboard</h1>
        <p className="page-subtitle">{user.cityId ? `Viewing assigned city` : 'All cities'}</p>
      </div>

      <div className="cards-grid">
        <div className="stat-card gold-accent">
          <div className="stat-card-label">Active Leads</div>
          <div className="stat-card-value">{data.cityLeads.length}</div>
        </div>
        <div className="stat-card gold-accent">
          <div className="stat-card-label">Active Bookings</div>
          <div className="stat-card-value">{data.cityBookings.length}</div>
        </div>
        <div className="stat-card gold-accent">
          <div className="stat-card-label">City Revenue</div>
          <div className="stat-card-value gold">{fmt$(totalRevenue)}</div>
        </div>
        <div className={`stat-card ${data.cityIssues.length > 0 ? 'alert' : ''}`}>
          <div className="stat-card-label">Open Issues</div>
          <div className={`stat-card-value ${data.cityIssues.length > 0 ? 'red' : ''}`}>{data.cityIssues.length}</div>
        </div>
        <div className={`stat-card ${data.cityTasks.length > 0 ? 'warning' : ''}`}>
          <div className="stat-card-label">Open Tasks</div>
          <div className="stat-card-value">{data.cityTasks.length}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Upcoming Charters</h2>
            <Link href="/bookings"><a className="panel-link">View all →</a></Link>
          </div>
          {data.cityBookings.length === 0 ? (
            <div className="panel-empty">No active bookings.</div>
          ) : (
            <table className="data-table">
              <thead><tr><th>Client</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {data.cityBookings.slice(0, 8).map(b => (
                  <tr key={b.id}>
                    <td><Link href={`/bookings/${b.id}`}><a style={{ color: '#0a2342', fontWeight: 500 }}>{b.Client_Name || b.Name || '—'}</a></Link></td>
                    <td>{fmtDate(b.Charter_Date)}</td>
                    <td><span className="badge badge-default">{b.Status || '—'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Active Leads</h2>
            <Link href="/requests"><a className="panel-link">View all →</a></Link>
          </div>
          {data.cityLeads.length === 0 ? (
            <div className="panel-empty">No active leads.</div>
          ) : (
            <table className="data-table">
              <thead><tr><th>Lead</th><th>Status</th></tr></thead>
              <tbody>
                {data.cityLeads.slice(0, 8).map(r => (
                  <tr key={r.id}>
                    <td><Link href={`/requests/${r.id}`}><a style={{ color: '#0a2342', fontWeight: 500 }}>{r.Name || '—'}</a></Link></td>
                    <td><span className="badge badge-default">{r.Status || '—'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {data.cityIssues.length > 0 && (
          <div className="panel" style={{ gridColumn: '1 / -1' }}>
            <div className="panel-header"><h2 className="panel-title">Open Issues</h2></div>
            <table className="data-table">
              <thead><tr><th>Issue</th><th>Priority</th><th>Status</th></tr></thead>
              <tbody>
                {data.cityIssues.map(i => (
                  <tr key={i.id}>
                    <td className="name-cell">{i.Title || i.Name || '—'}</td>
                    <td><span className={`badge ${i.Priority === 'High' ? 'badge-red' : 'badge-amber'}`}>{i.Priority || '—'}</span></td>
                    <td><span className="badge badge-default">{i.Status || '—'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = requireAuth(['Founder', 'City Manager'], async (ctx, user) => {
  const cityId = user.cityId
  const [cityLeads, cityBookings, cityTasks, cityIssues] = await Promise.all([
    requests.getActive({ cityId }).catch(() => []),
    bookings.getActive().catch(() => []),
    tasks.getOpen({ email: user.email }).catch(() => []),
    issues.getOpen().catch(() => []),
  ])
  return { props: { user, data: { cityLeads, cityBookings, cityTasks, cityIssues } } }
})
