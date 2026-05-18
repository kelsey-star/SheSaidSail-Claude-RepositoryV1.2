import { useRouter } from 'next/router'
import Link from 'next/link'

const NAV = {
  Founder: [
    { href: '/dashboard/founder',    label: 'Command Center', icon: '◈' },
    { href: '/requests',             label: 'Requests',       icon: '◎' },
    { href: '/bookings',             label: 'Bookings',       icon: '⬡' },
    { href: '/approvals',            label: 'Approvals',      icon: '◇', alert: true },
    { href: '/tasks',                label: 'Tasks & Alerts', icon: '△' },
    { href: '/dashboard/marketing',  label: 'Marketing',      icon: '◉' },
    { href: '/dashboard/finance',    label: 'Finance',        icon: '◑' },
  ],
  'City Manager': [
    { href: '/dashboard/city-manager', label: 'City Dashboard', icon: '◈' },
    { href: '/requests',               label: 'Requests',       icon: '◎' },
    { href: '/bookings',               label: 'Bookings',       icon: '⬡' },
    { href: '/tasks',                  label: 'Tasks',          icon: '△' },
    { href: '/approvals',              label: 'Approvals',      icon: '◇' },
  ],
  Concierge: [
    { href: '/dashboard/concierge', label: 'Pipeline',     icon: '◈' },
    { href: '/requests',            label: 'Requests',     icon: '◎' },
    { href: '/bookings',            label: 'Bookings',     icon: '⬡' },
    { href: '/tasks',               label: 'Tasks',        icon: '△' },
  ],
  Marketing: [
    { href: '/dashboard/marketing', label: 'Dashboard',   icon: '◈' },
    { href: '/requests',            label: 'Leads',        icon: '◎' },
    { href: '/tasks',               label: 'Tasks',        icon: '△' },
  ],
  Owner: [
    { href: '/dashboard/owner', label: 'My Yachts',       icon: '◈' },
    { href: '/bookings',        label: 'My Bookings',     icon: '⬡' },
  ],
  Operations: [
    { href: '/bookings',  label: 'Charters',   icon: '⬡' },
    { href: '/tasks',     label: 'Tasks',      icon: '△' },
    { href: '/requests',  label: 'Requests',   icon: '◎' },
  ],
  Vendor: [
    { href: '/bookings', label: 'Assignments', icon: '⬡' },
    { href: '/tasks',    label: 'Tasks',       icon: '△' },
  ],
  Finance: [
    { href: '/dashboard/finance', label: 'Dashboard', icon: '◈' },
    { href: '/bookings',          label: 'Bookings',  icon: '⬡' },
    { href: '/tasks',             label: 'Tasks',     icon: '△' },
  ],
}

export default function Layout({ children, user }) {
  const router = useRouter()
  const navItems = NAV[user?.role] || []

  async function handleLogout() {
    await fetch('/api/auth/logout')
    router.push('/login')
  }

  return (
    <div className="portal-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-name">She Said Sail</div>
          <div className="sidebar-logo-sub">Operations</div>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Navigation</div>
          {navItems.map(item => {
            const active = router.pathname === item.href ||
              (item.href !== '/dashboard/founder' && router.pathname.startsWith(item.href))
            return (
              <Link key={item.href} href={item.href}>
                <a className={`sidebar-link${active ? ' active' : ''}`}>
                  <span className="icon">{item.icon}</span>
                  {item.label}
                </a>
              </Link>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user-name">{user?.name || user?.email}</div>
          <div className="sidebar-user-role">{user?.role}</div>
          <button className="sidebar-logout" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
