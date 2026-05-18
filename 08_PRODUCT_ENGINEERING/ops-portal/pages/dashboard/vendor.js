import Link from 'next/link'
import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { bookings, tasks } from '../../lib/airtable'

export default function VendorDashboard({ user, data }) {
  return (
    <Layout user={user}>
      <div className="page-header">
        <h1 className="page-title">My Assignments</h1>
        <p className="page-subtitle">Charters and tasks assigned to you</p>
      </div>
      <div className="panel">
        <div className="panel-header"><h2 className="panel-title">Assigned Charters</h2></div>
        {data.assignedBookings.length === 0 ? (
          <div className="panel-empty">No charters assigned to you yet.</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Charter</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {data.assignedBookings.map(b => (
                <tr key={b.id}>
                  <td><Link href={`/bookings/${b.id}`}><a style={{ color: '#0a2342', fontWeight: 500 }}>{b.Client_Name || '—'}</a></Link></td>
                  <td>{b.Charter_Date ? new Date(b.Charter_Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</td>
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

export const getServerSideProps = requireAuth(['Founder', 'Vendor'], async (ctx, user) => {
  const assignedBookings = await bookings.getActive().catch(() => [])
  return { props: { user, data: { assignedBookings } } }
})
