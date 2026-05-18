import Link from 'next/link'
import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { bookings, tasks } from '../../lib/airtable'

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function OperationsDashboard({ user, data }) {
  return (
    <Layout user={user}>
      <div className="page-header">
        <h1 className="page-title">Operations</h1>
        <p className="page-subtitle">{data.activeBookings.length} active charters · {data.openTasks.length} open tasks</p>
      </div>
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">Active Charters</h2>
          <Link href="/bookings"><a className="panel-link">View all →</a></Link>
        </div>
        {data.activeBookings.length === 0 ? (
          <div className="panel-empty">No active charters.</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Client</th><th>Charter Date</th><th>Destination</th><th>Status</th></tr></thead>
            <tbody>
              {data.activeBookings.slice(0, 15).map(b => (
                <tr key={b.id}>
                  <td><Link href={`/bookings/${b.id}`}><a style={{ color: '#0a2342', fontWeight: 500 }}>{b.Client_Name || '—'}</a></Link></td>
                  <td>{fmtDate(b.Charter_Date)}</td>
                  <td>{b.Destination || '—'}</td>
                  <td><span className="badge badge-default">{b.Status || '—'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = requireAuth(['Founder', 'Operations'], async (ctx, user) => {
  const [activeBookings, openTasks] = await Promise.all([
    bookings.getActive().catch(() => []),
    tasks.getOpen({ email: user.email }).catch(() => []),
  ])
  return { props: { user, data: { activeBookings, openTasks } } }
})
