import { requireApiAuth } from '../../../lib/withAuth'
import { tasks, alerts } from '../../../lib/airtable'

export default requireApiAuth([], async function (req, res) {
  if (req.method === 'GET') {
    const opts = req.user.role === 'Founder' ? {} : { email: req.user.email }
    const [openTasks, openAlerts] = await Promise.all([
      tasks.getOpen(opts),
      alerts.getUnresolved(),
    ])
    return res.json({ tasks: openTasks, alerts: openAlerts })
  }

  if (req.method === 'PATCH') {
    const { id, type } = req.body
    if (!id) return res.status(400).json({ error: 'id required' })

    if (type === 'alert') {
      const r = await alerts.resolve(id, req.user.email)
      return res.json(r)
    }
    const r = await tasks.complete(id, req.user.email)
    return res.json(r)
  }

  res.status(405).end()
})
