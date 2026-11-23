
import { useOutletContext } from 'react-router'
import { Grid2X2, List } from 'lucide-react'

export default function SettingsPage() {
  const { viewMode, setViewMode } = useOutletContext()

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Atur preferensi tampilan aplikasi.</p>
        </div>
      </header>

      <section className="settings-card">
        <div className="settings-description">
          <h2>Tampilan Produk</h2>
          <p>
            Pilih bagaimana produk ditampilkan pada halaman Products.
          </p>
        </div>

        <div className="view-options">
          <button
            type="button"
            className={`view-option ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-pressed={viewMode === 'grid'}
          >
            <Grid2X2 size={20} />
            <span>Grid View</span>
          </button>

          <button
            type="button"
            className={`view-option ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
          >
            <List size={20} />
            <span>List View</span>
          </button>
        </div>

        <p className="settings-current">
          Tampilan aktif: <strong>{viewMode === 'grid' ? 'Grid' : 'List'}</strong>
        </p>
      </section>
    </main>
  )
}
