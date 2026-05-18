import { requireApiAuth } from '../../../lib/withAuth'
import { requests } from '../../../lib/airtable'

export default requireApiAuth([], async function (req, res) {
  if (req.method === 'GET') {
    const data = await requests.getActive({ cityId: req.query.cityId })
    return res.json(data)
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body
    if (!id || !status) return res.status(400).json({ error: 'id and status required' })
    const updated = await requests.updateStatus(id, status, req.user.email)
    return res.json(updated)
  }

  res.status(405).end()
})
