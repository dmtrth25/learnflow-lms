import { NavLink, Outlet } from 'react-router-dom'
import { BookOpen, ClipboardCheck, GraduationCap, LayoutDashboard, Settings } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/courses', label: 'Courses', icon: BookOpen },
  { to: '/assignments', label: 'Assignments', icon: ClipboardCheck },
  { to: '/students', label: 'Students', icon: GraduationCap },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function AppLayout() {
  return (
    <div className="min-h-screen bg-muted/40">
      <aside className="fixed left-0 top-0 z-20 h-screen w-64 border-r bg-background px-4 py-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold">LearnFlow</h1>
          <p className="text-sm text-muted-foreground">LMS Platform</p>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                ].join(' ')
              }>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="ml-64 min-h-screen">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
