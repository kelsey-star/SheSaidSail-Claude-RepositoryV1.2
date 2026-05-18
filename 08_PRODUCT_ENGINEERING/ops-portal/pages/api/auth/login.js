import crypto from 'crypto'
import withSession from '../../lib/withSession'
import { portalUsers } from '../../../lib/airtable'

function sha256(str) {
  return crypto.createHash('sha256').update(str).digest('hex')
}

export default withSession(async function (req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  try {
    const user = await portalUsers.findByEmail(email)

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    if (user.Active === false) {
      return res.status(401).json({ error: 'Account is inactive.' })
    }

    // Password check: compare against Password_Hash field (if set on the record),
    // or fall back to PORTAL_DEFAULT_PASSWORD env var for initial setup.
    const storedHash = user.Password_Hash || ''
    const defaultHash = sha256(process.env.PORTAL_DEFAULT_PASSWORD || 'changeme')
    const inputHash = sha256(password)

    const isValid =
      (storedHash && (storedHash === inputHash || storedHash === password)) ||
      (!storedHash && (inputHash === defaultHash || password === process.env.PORTAL_DEFAULT_PASSWORD))

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    req.session.set('user', {
      id: user.id,
      name: user.Name || email,
      email: email.toLowerCase(),
      role: user.Role || 'Concierge',
      cityId: user.cityId || null,
    })
    await req.session.save()

    return res.status(200).json({ role: user.Role })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ error: 'Login failed. Please try again.' })
  }
})
