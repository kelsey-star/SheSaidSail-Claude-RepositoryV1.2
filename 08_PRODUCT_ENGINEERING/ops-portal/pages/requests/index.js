import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { requests } from '../../lib/airtable'

const STAGES = [
  'New Inquiry','Contacted','Qualified','Yacht Options Sent',
  'Awaiting Client Decision','Deposit Link Sent','Deposit Paid',
  'Agreement Sent','Agreement Signed','Balance Due','Fully Paid',
  'Charter Brief Ready','Completed','Follow-Up Sent','Review Requested','Lost',
]

function stageColor(s) {
  const positive = ['Deposit Paid','Fully Paid','Completed','Charter Brief Ready','Agreement Signed']
  const negative = ['Lost']
  const warm = ['Qualified','Yacht Options Sent','Deposit Link Sent','Agreement Sent']
  if (positive.includes(s)) return 'badge-green'
  if (negative.includes(s)) return 'badge-red'
  if (warm.includes(s)) return 'badge-gold'
  return 'badge-default'
}

function timeAgo(iso) {
  if (!iso) return '—'
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return `${Math.floor(diff / 60000)}m ago`
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function RequestsPage({ user, leads }) {
  const [activeStage, setActiveStage] = useState('All')
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState(null)

  const filtered = leads.filter(l => {
    const matchStage  = activeStage === 'All' || l.Status === activeStage
    const matchSearch = !search || [l.Name, l.Email, l.Destination, l.Phone].some(
      f => f && f.toLowerCase().includes(search.toLowerCase())
    )
    return matchStage && matchSearch
  })

  const stageCounts = STAGES.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.Status === s).length
    return acc
  }, {})

  async function updateStatus(id, status) {
    setUpdating(id)
    await fetch('/api/data/requests', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setUpdating(null)
    // Soft refresh: just update local state
  }

  return (
    <Layout user={user}>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Requests</h1>
            <p className="page-subtitle">{leads.length} active · {filtered.length} shown</p>
          </div>
          <input
            className="form-input"
            style={{ width: 240 }}
            placeholder="Search name, email, destination..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stage filter pills */}
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
                <th>Source</th>
                <th>Received</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>
                    <div className="name-cell" style={{ color: '#0a2342' }}>{r.Name || '—'}</div>
                    <div className="sub-text">{r.Email || r.Phone || ''}</div>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      style={{ fontSize: 11, padding: '3px 6px', minWidth: 140 }}
                      value={r.Status || ''}
                      onChange={e => updateStatus(r.id, e.target.value)}
                      disabled={updating === r.id}
                    >
                      {STAGES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>{r.Destination || '—'}</td>
                  <td>{r.Charter_Date ? new Date(r.Charter_Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</td>
                  <td>{r.Group_Size || '—'}</td>
                  <td><span style={{ fontSize: 11, color: '#7a7a7a' }}>{r.Source || '—'}</span></td>
                  <td><span style={{ fontSize: 11, color: '#a0a0a0' }}>{timeAgo(r.Created || r.createdTime)}</span></td>
                  <td>
                    <Link href={`/requests/${r.id}`}>
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
  const opts = user.role === 'City Manager' ? { cityId: user.cityId } : {}
  const leads = await requests.getActive(opts).catch(() => [])
  return { props: { user, leads } }
})
