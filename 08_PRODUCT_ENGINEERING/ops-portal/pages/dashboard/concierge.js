import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { requests, tasks } from '../../lib/airtable'

const STAGES = [
  'New Inquiry','Contacted','Qualified','Yacht Options Sent',
  'Awaiting Client Decision','Deposit Link Sent','Deposit Paid',
  'Agreement Sent','Agreement Signed','Balance Due','Fully Paid',
  'Charter Brief Ready','Completed','Follow-Up Sent','Review Requested','Lost',
]

function stageColor(s) {
  const map = {
    'New Inquiry': 'badge-navy', 'Contacted': 'badge-default',
    'Qualified': 'badge-gold',   'Yacht Options Sent': 'badge-gold',
    'Deposit Paid': 'badge-green','Fully Paid': 'badge-green',
    'Completed': 'badge-green',  'Lost': 'badge-red',
    'Charter Brief Ready': 'badge-gold','Balance Due': 'badge-amber',
  }
  return map[s] || 'badge-default'
}

function timeAgo(iso) {
  if (!iso) return '—'
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return `${Math.floor(diff / 60000)}m ago`
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function ConciergeDashboard({ user, leads, openTasks }) {
  const [activeStage, setActiveStage] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = leads.filter(l => {
    const matchStage = activeStage === 'All' || l.Status === activeStage
    const matchSearch = !search ||
      (l.Name || '').toLowerCase().includes(search.toLowerCase()) ||
      (l.Email || '').toLowerCase().includes(search.toLowerCase())
    return matchStage && matchSearch
  })

  const stageCounts = STAGES.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.Status === s).length
    return acc
  }, {})

  return (
    <Layout user={user}>
      <div className="page-header">
        <h1 className="page-title">Concierge Pipeline</h1>
        <p className="page-subtitle">{leads.length} active requests</p>
      </div>

      {openTasks.length > 0 && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#92400e', fontSize: 13 }}>
            ⚠ You have {openTasks.length} open task{openTasks.length !== 1 ? 's' : ''}
          </span>
          <Link href="/tasks"><a style={{ fontSize: 12, color: '#b45309', fontWeight: 500 }}>View tasks →</a></Link>
        </div>
      )}

      {/* Stage filter */}
      <div className="pipeline-stages">
        <button className={`stage-chip${activeStage === 'All' ? ' active' : ''}`} onClick={() => setActiveStage('All')}>
          All <span className="count">{leads.length}</span>
        </button>
        {STAGES.map(s => stageCounts[s] > 0 && (
          <button key={s} className={`stage-chip${activeStage === s ? ' active' : ''}`} onClick={() => setActiveStage(s)}>
            {s} <span className="count">{stageCounts[s]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          className="form-input"
          style={{ maxWidth: 300 }}
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="panel">
        {filtered.length === 0 ? (
          <div className="panel-empty">No requests match this filter.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Destination</th>
                <th>Charter Date</th>
                <th>Group</th>
                <th>Received</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>
                    <div className="name-cell">{r.Name || '—'}</div>
                    <div className="sub-text">{r.Email || ''}</div>
                  </td>
                  <td><span className={`badge ${stageColor(r.Status)}`}>{r.Status || 'New Inquiry'}</span></td>
                  <td>{r.Destination || '—'}</td>
                  <td>{r.Charter_Date ? new Date(r.Charter_Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</td>
                  <td>{r.Group_Size || '—'}</td>
                  <td><span style={{ fontSize: 11, color: '#a0a0a0' }}>{timeAgo(r.Created || r.createdTime)}</span></td>
                  <td><Link href={`/requests/${r.id}`}><a className="btn btn-sm btn-ghost">Open →</a></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}

export const getServerSideProps = requireAuth(['Founder', 'Concierge'], async (ctx, user) => {
  const [leads, openTasks] = await Promise.all([
    requests.getActive().catch(() => []),
    tasks.getOpen({ email: user.email }).catch(() => []),
  ])
  return { props: { user, leads, openTasks } }
})
