
import { useEffect, useState } from 'react'
import {
  Package,
  Boxes,
  Wallet,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router'
import { getProducts } from '../services/productService.js'
import { formatPrice } from '../data/products.js'

export default function DashboardPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (err) {
        setError(err.message || 'Gagal mengambil data dashboard.')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const totalProducts = products.length

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0,
  )

  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  )

  const lowStockProducts = products.filter(
    (product) => product.stock <= 5,
  )

  const statistics = [
    {
      title: 'Total Produk',
      value: totalProducts,
      icon: Package,
    },
    {
      title: 'Total Stok',
      value: totalStock,
      icon: Boxes,
    },
    {
      title: 'Nilai Inventaris',
      value: formatPrice(inventoryValue),
      icon: Wallet,
    },
    {
      title: 'Stok Rendah',
      value: lowStockProducts.length,
      icon: AlertTriangle,
    },
  ]

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
        <p className="text-sm text-slate-500">
          Memuat dashboard...
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
        <h1 className="mb-2 text-2xl font-extrabold text-slate-900">
          Dashboard
        </h1>
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Ringkasan informasi inventaris produk.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => {
          const Icon = item.icon

          return (
            <article
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              key={item.title}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <Icon size={23} />
              </div>

              <p className="mb-2 text-sm text-slate-500">
                {item.title}
              </p>

              <h2 className="break-words text-xl font-extrabold text-slate-900 sm:text-2xl">
                {item.value}
              </h2>
            </article>
          )
        })}
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Stok Rendah
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Produk yang memiliki stok 5 unit atau kurang.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900"
          >
            Lihat Semua
            <ArrowRight size={16} />
          </Link>
        </div>

        {lowStockProducts.length === 0 ? (
          <p className="rounded-lg bg-slate-50 p-5 text-center text-sm text-slate-500">
            Tidak ada produk dengan stok rendah.
          </p>
        ) : (
          <div className="grid gap-3">
            {lowStockProducts.map((product) => (
              <div
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-4"
                key={product.id}
              >
                <div className="grid gap-1">
                  <strong className="text-sm font-semibold text-slate-800">
                    {product.name}
                  </strong>
                  <span className="text-xs text-slate-500">
                    ID: {product.id}
                  </span>
                </div>

                <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                  {product.stock} unit
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
