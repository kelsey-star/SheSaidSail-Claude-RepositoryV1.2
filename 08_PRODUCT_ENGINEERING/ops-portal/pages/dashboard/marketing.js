import Layout from '../components/Layout'
import { requireAuth } from '../../lib/withAuth'
import { requests, campaigns, utms } from '../../lib/airtable'

function fmt$(n) {
  if (!n) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function MarketingDashboard({ user, data }) {
  const { leads, campaignList, utmList } = data

  // Aggregate leads by source
  const bySource = leads.reduce((acc, l) => {
    const src = l.Source || 'Unknown'
    if (!acc[src]) acc[src] = { count: 0, revenue: 0 }
    acc[src].count++
    acc[src].revenue += l.Total_Value || 0
    return acc
  }, {})

  const sourceSorted = Object.entries(bySource).sort((a, b) => b[1].count - a[1].count)

  return (
    <Layout user={user}>
      <div className="page-header">
        <h1 className="page-title">Marketing Dashboard</h1>
        <p className="page-subtitle">{leads.length} total leads tracked</p>
      </div>

      {/* Stats */}
      <div className="cards-grid">
        <div className="stat-card gold-accent">
          <div className="stat-card-label">Total Leads</div>
          <div className="stat-card-value">{leads.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Active Campaigns</div>
          <div className="stat-card-value">{campaignList.filter(c => c.Status === 'Active').length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Lead Sources</div>
          <div className="stat-card-value">{sourceSorted.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">UTM Links</div>
          <div className="stat-card-value">{utmList.length}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Leads by source */}
        <div className="panel">
          <div className="panel-header"><h2 className="panel-title">Leads by Source</h2></div>
          {sourceSorted.length === 0 ? (
            <div className="panel-empty">No source data yet. Add a Source field to your Requests table.</div>
          ) : (
            <table className="data-table">
              <thead><tr><th>Source</th><th>Leads</th><th>Revenue</th></tr></thead>
              <tbody>
                {sourceSorted.map(([src, d]) => (
                  <tr key={src}>
                    <td className="name-cell">{src}</td>
                    <td>{d.count}</td>
                    <td>{fmt$(d.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Campaigns */}
        <div className="panel">
          <div className="panel-header"><h2 className="panel-title">Campaigns</h2></div>
          {campaignList.length === 0 ? (
            <div className="panel-empty">No campaigns found. Add campaigns to your Airtable Campaigns table.</div>
          ) : (
            <table className="data-table">
              <thead><tr><th>Campaign</th><th>Status</th><th>Spend</th><th>Leads</th></tr></thead>
              <tbody>
                {campaignList.slice(0, 10).map(c => (
                  <tr key={c.id}>
                    <td className="name-cell">{c.Name || c.Campaign_Name || '—'}</td>
                    <td><span className={`badge ${c.Status === 'Active' ? 'badge-green' : 'badge-default'}`}>{c.Status || '—'}</span></td>
                    <td>{fmt$(c.Spend || c.Ad_Spend)}</td>
                    <td>{c.Lead_Count || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* UTMs */}
        <div className="panel" style={{ gridColumn: '1 / -1' }}>
          <div className="panel-header"><h2 className="panel-title">UTM Performance</h2></div>
          {utmList.length === 0 ? (
            <div className="panel-empty">No UTM data yet. Add UTMs to your Airtable UTMs table.</div>
          ) : (
            <table className="data-table">
              <thead><tr><th>UTM Name</th><th>Source</th><th>Medium</th><th>Campaign</th><th>Clicks</th><th>Leads</th></tr></thead>
              <tbody>
                {utmList.slice(0, 15).map(u => (
                  <tr key={u.id}>
                    <td className="name-cell">{u.Name || u.UTM_Name || '—'}</td>
                    <td>{u.UTM_Source || u.Source || '—'}</td>
                    <td>{u.UTM_Medium || u.Medium || '—'}</td>
                    <td>{u.UTM_Campaign || u.Campaign || '—'}</td>
                    <td>{u.Clicks || '—'}</td>
                    <td>{u.Lead_Count || '—'}</td>
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

export const getServerSideProps = requireAuth(['Founder', 'Marketing'], async (ctx, user) => {
  const [leads, campaignList, utmList] = await Promise.all([
    requests.getActive().catch(() => []),
    campaigns.getAll().catch(() => []),
    utms.getAll().catch(() => []),
  ])
  return { props: { user, data: { leads, campaignList, utmList } } }
})
