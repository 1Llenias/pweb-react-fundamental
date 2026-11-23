
import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router'
import { LayoutDashboard, Package, Settings } from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: 'Products',
    path: '/products',
    icon: Package,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: Settings,
    end: true,
  },
]

export default function MainLayout() {
  const [viewMode, setViewMode] = useState(() => {
    const savedMode = localStorage.getItem('product-view-mode')
    return savedMode === 'list' ? 'list' : 'grid'
  })

  useEffect(() => {
    localStorage.setItem('product-view-mode', viewMode)
  }, [viewMode])

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-x-0 top-0 z-20 w-full border-b border-slate-200 bg-white px-4 py-4 md:inset-y-0 md:right-auto md:w-[250px] md:border-b-0 md:border-r md:px-[18px] md:py-7">
        <div className="mb-4 flex items-center gap-[11px] px-2 text-lg font-extrabold text-blue-700 md:mb-[38px]">
          <Package size={25} />
          <span>Product Manager</span>
        </div>

        <nav className="flex flex-wrap gap-2 md:grid">
          {navigation.map(({ name, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold no-underline transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-500 hover:bg-blue-50 hover:text-blue-700'
                }`
              }
            >
              <Icon size={19} />
              {name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="min-h-screen pt-[130px] md:ml-[250px] md:pt-0">
        <Outlet context={{ viewMode, setViewMode }} />
      </main>
    </div>
  )
}
