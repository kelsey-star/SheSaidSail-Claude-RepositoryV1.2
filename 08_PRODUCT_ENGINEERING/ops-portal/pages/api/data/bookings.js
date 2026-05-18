import { requireApiAuth } from '../../../lib/withAuth'
import { bookings } from '../../../lib/airtable'

export default requireApiAuth([], async function (req, res) {
  if (req.method === 'GET') {
    const { id, ownerId } = req.query

    if (id) {
      const record = await bookings.getById(id)
      if (!record) return res.status(404).json({ error: 'Not found' })
      return res.json(record)
    }

    const data = await bookings.getActive({ ownerId })
    return res.json(data)
  }

  if (req.method === 'PATCH') {
    const { id, ...fields } = req.body
    if (!id) return res.status(400).json({ error: 'id required' })
    const updated = await bookings.update(id, fields, req.user.email)
    return res.json(updated)
  }

  res.status(405).end()
})
