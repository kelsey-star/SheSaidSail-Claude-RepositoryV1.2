import Link from 'next/link'
import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { bookings } from '../../lib/airtable'

function fmt$(n) {
  if (!n) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function statusColor(s = '') {
  const map = {
    'Fully Paid': 'badge-green', 'Deposit Paid': 'badge-green', 'Completed': 'badge-green',
    'Cancelled': 'badge-red', 'Lost': 'badge-red',
    'Balance Due': 'badge-amber', 'Agreement Sent': 'badge-gold',
  }
  return map[s] || 'badge-default'
}

export default function BookingsPage({ user, activeBookings }) {
  return (
    <Layout user={user}>
      <div className="page-header">
        <h1 className="page-title">Bookings</h1>
        <p className="page-subtitle">{activeBookings.length} active bookings</p>
      </div>

      <div className="panel">
        {activeBookings.length === 0 ? (
          <div className="panel-empty">No active bookings found. Add bookings to your Airtable Bookings table.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Charter Date</th>
                <th>Destination</th>
                <th>Yacht</th>
                <th>Status</th>
                <th>Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {activeBookings.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="name-cell" style={{ color: '#0a2342' }}>{b.Client_Name || b.Name || '—'}</div>
                    <div className="sub-text">{b.Booking_Reference || b.Reference || ''}</div>
                  </td>
                  <td>{fmtDate(b.Charter_Date)}</td>
                  <td>{b.Destination || '—'}</td>
                  <td>{b.Yacht_Name || b.Vessel || '—'}</td>
                  <td><span className={`badge ${statusColor(b.Status)}`}>{b.Status || '—'}</span></td>
                  <td style={{ fontWeight: 500 }}>{fmt$(b.Total_Value)}</td>
                  <td>
                    <Link href={`/bookings/${b.id}`}>
                      <a className="btn btn-sm btn-ghost">Open</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = requireAuth([], async (ctx, user) => {
  const opts = user.role === 'Owner' ? { ownerId: user.id } : {}
  const activeBookings = await bookings.getActive(opts).catch(() => [])
  return { props: { user, activeBookings } }
})
