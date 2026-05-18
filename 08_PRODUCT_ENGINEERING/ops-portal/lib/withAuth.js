import withSession from '../pages/lib/withSession'

export const ROLE_HOME = {
  Founder:        '/dashboard/founder',
  'City Manager': '/dashboard/city-manager',
  Concierge:      '/dashboard/concierge',
  Marketing:      '/dashboard/marketing',
  Owner:          '/dashboard/owner',
  Operations:     '/dashboard/operations',
  Vendor:         '/dashboard/vendor',
  Finance:        '/dashboard/finance',
}

// Wrap getServerSideProps. allowedRoles=[] means any auth role is fine.
export function requireAuth(allowedRoles, gssp) {
  return withSession(async function (context) {
    const user = context.req.session.get('user')

    if (!user) {
      return { redirect: { destination: '/login', permanent: false } }
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return { redirect: { destination: ROLE_HOME[user.role] || '/login', permanent: false } }
    }

    try {
      return await gssp(context, user)
    } catch (err) {
      console.error('requireAuth error:', err)
      return { props: { user, error: err.message } }
    }
  })
}

// Wrap API route handlers.
export function requireApiAuth(allowedRoles, handler) {
  return withSession(async function (req, res) {
    const user = req.session.get('user')
    if (!user) return res.status(401).json({ error: 'Not authenticated' })
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' })
    }
    req.user = user
    return handler(req, res)
  })
}
