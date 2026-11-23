
import { useOutletContext } from 'react-router'
import { Grid2X2, List } from 'lucide-react'

export default function SettingsPage() {
  const { viewMode, setViewMode } = useOutletContext()

  const viewOptions = [
    {
      value: 'grid',
      label: 'Grid View',
      icon: Grid2X2,
    },
    {
      value: 'list',
      label: 'List View',
      icon: List,
    },
  ]

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Atur preferensi tampilan aplikasi.
        </p>
      </header>

      <section className="max-w-2xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Tampilan Produk
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Pilih bagaimana produk ditampilkan pada halaman Products.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {viewOptions.map(({ value, label, icon: Icon }) => {
            const isActive = viewMode === value

            return (
              <button
                key={value}
                type="button"
                onClick={() => setViewMode(value)}
                aria-pressed={isActive}
                className={`flex items-center justify-center gap-3 rounded-lg border p-5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            )
          })}
        </div>

        <p className="mt-5 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
          Tampilan aktif:{' '}
          <strong className="font-bold text-blue-700">
            {viewMode === 'grid' ? 'Grid' : 'List'}
          </strong>
        </p>
      </section>
    </main>
  )
}
