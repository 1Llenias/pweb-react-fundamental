
import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router'
import { LayoutDashboard, Package, Settings } from 'lucide-react'
import '../styles/layout.css'

export default function MainLayout() {
  const [viewMode, setViewMode] = useState(() => {
    const savedMode = localStorage.getItem('product-view-mode')
    return savedMode === 'list' ? 'list' : 'grid'
  })

  useEffect(() => {
    localStorage.setItem('product-view-mode', viewMode)
  }, [viewMode])

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <Package size={25} />
          <span>Product Manager</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <Package size={19} />
            Products
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <Settings size={19} />
            Settings
          </NavLink>
        </nav>
      </aside>

      <div className="main-content">
        <Outlet context={{ viewMode, setViewMode }} />
      </div>
    </div>
  )
}
