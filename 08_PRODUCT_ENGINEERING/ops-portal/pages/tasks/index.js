import { useState } from 'react'
import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { tasks, alerts } from '../../lib/airtable'

function fmtDate(d) {
  if (!d) return null
  const date = new Date(d)
  const today = new Date()
  const diff = Math.floor((date - today) / 86400000)
  const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  if (diff < 0)  return { label, color: '#c0392b' }
  if (diff === 0) return { label: 'Today', color: '#d97706' }
  if (diff <= 2)  return { label, color: '#d97706' }
  return { label, color: '#a0a0a0' }
}

function priorityColor(p) {
  return { High: 'badge-red', Medium: 'badge-amber', Low: 'badge-default' }[p] || 'badge-default'
}

function severityColor(s) {
  return { CRITICAL: 'badge-red', ERROR: 'badge-red', WARNING: 'badge-amber', INFO: 'badge-default' }[s] || 'badge-default'
}

export default function TasksPage({ user, openTasks, openAlerts }) {
  const [taskList, setTasks] = useState(openTasks)
  const [alertList, setAlerts] = useState(openAlerts)
  const [completing, setCompleting] = useState(null)
  const [tab, setTab] = useState('tasks')

  async function completeTask(id) {
    setCompleting(id)
    const res = await fetch('/api/data/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type: 'task' }),
    })
    if (res.ok) setTasks(prev => prev.filter(t => t.id !== id))
    setCompleting(null)
  }

  async function resolveAlert(id) {
    setCompleting(id)
    const res = await fetch('/api/data/tasks', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type: 'alert' }),
    })
    if (res.ok) setAlerts(prev => prev.filter(a => a.id !== id))
    setCompleting(null)
  }

  return (
    <Layout user={user}>
      <div className="page-header">
        <h1 className="page-title">Tasks & Alerts</h1>
        <p className="page-subtitle">{taskList.length} open tasks · {alertList.length} active alerts</p>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-2" style={{ marginBottom: 20 }}>
        <button className={`btn btn-sm ${tab === 'tasks' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab('tasks')}>
          Tasks ({taskList.length})
        </button>
        <button className={`btn btn-sm ${tab === 'alerts' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab('alerts')}>
          {alertList.length > 0 && <span style={{ background: '#c0392b', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: 4 }}>{alertList.length}</span>}
          Alerts ({alertList.length})
        </button>
      </div>

      {tab === 'tasks' && (
        <div>
          {taskList.length === 0 ? (
            <div className="panel"><div className="panel-empty">✓ No open tasks. Well done.</div></div>
          ) : (
            <div className="panel">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Assigned To</th>
                    <th>Related</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {taskList.map(t => {
                    const due = fmtDate(t.Due_Date)
                    return (
                      <tr key={t.id}>
                        <td>
                          <div className="name-cell">{t.Title || t.Task_Name || t.Name || '—'}</div>
                          {t.Description && <div className="sub-text">{t.Description}</div>}
                        </td>
                        <td><span className={`badge ${priorityColor(t.Priority)}`}>{t.Priority || '—'}</span></td>
                        <td>
                          {due ? (
                            <span style={{ fontSize: 12, fontWeight: 500, color: due.color }}>{due.label}</span>
                          ) : '—'}
                        </td>
                        <td style={{ fontSize: 12, color: '#7a7a7a' }}>{t.Assigned_To || t.Assignee || '—'}</td>
                        <td style={{ fontSize: 12, color: '#a0a0a0' }}>{t.Related_To || t.Entity || '—'}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-gold"
                            onClick={() => completeTask(t.id)}
                            disabled={completing === t.id}
                          >
                            {completing === t.id ? '...' : 'Done'}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'alerts' && (
        <div>
          {alertList.length === 0 ? (
            <div className="panel"><div className="panel-empty">✓ No active alerts.</div></div>
          ) : (
            alertList.map(a => (
              <div key={a.id} style={{ background: '#f9f6f0', border: '1px solid #e0dbd2', borderRadius: 8, padding: '16px 20px', marginBottom: 12, borderLeft: `3px solid ${a.Severity === 'CRITICAL' || a.Severity === 'ERROR' ? '#c0392b' : '#d97706'}` }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${severityColor(a.Severity)}`}>{a.Severity || 'ALERT'}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#0a2342' }}>{a.Title || a.Alert_Type || a.Event_Type || 'Alert'}</span>
                  </div>
                  <span style={{ fontSize: 11, color: '#a0a0a0' }}>
                    {a.Created ? new Date(a.Created).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                  </span>
                </div>
                {a.Details && (
                  <p style={{ fontSize: 13, color: '#4f4f4f', margin: '0 0 12px', lineHeight: 1.5 }}>{a.Details}</p>
                )}
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => resolveAlert(a.id)}
                  disabled={completing === a.id}
                >
                  {completing === a.id ? 'Resolving...' : 'Resolve'}
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </Layout>
  )
}

export const getServerSideProps = requireAuth([], async (ctx, user) => {
  const opts = user.role === 'Founder' ? {} : { email: user.email }
  const [openTasks, openAlerts] = await Promise.all([
    tasks.getOpen(opts).catch(() => []),
    alerts.getUnresolved().catch(() => []),
  ])
  return { props: { user, openTasks, openAlerts } }
})
