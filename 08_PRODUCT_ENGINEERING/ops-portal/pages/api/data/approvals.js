import { requireApiAuth } from '../../../lib/withAuth'
import { approvals } from '../../../lib/airtable'

export default requireApiAuth(['Founder', 'City Manager'], async function (req, res) {
  if (req.method === 'GET') {
    const data = await approvals.getPending()
    return res.json(data)
  }

  if (req.method === 'PATCH') {
    const { id, decision, note } = req.body
    if (!id || !decision) return res.status(400).json({ error: 'id and decision required' })
    const updated = await approvals.decide(id, decision, note, req.user.email)
    return res.json(updated)
  }

  res.status(405).end()
})
