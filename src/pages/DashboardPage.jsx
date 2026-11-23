
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
      <main className="page-shell">
        <p>Memuat dashboard...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="page-shell">
        <h1>Dashboard</h1>
        <p className="form-error">{error}</p>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Ringkasan informasi inventaris produk.</p>
        </div>
      </header>

      <section className="dashboard-grid">
        {statistics.map((item) => {
          const Icon = item.icon

          return (
            <article className="stat-card" key={item.title}>
              <div className="stat-icon">
                <Icon size={23} />
              </div>

              <p>{item.title}</p>
              <h2>{item.value}</h2>
            </article>
          )
        })}
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>Stok Rendah</h2>
            <p>Produk yang memiliki stok 5 unit atau kurang.</p>
          </div>

          <Link to="/products">
            Lihat Semua <ArrowRight size={16} />
          </Link>
        </div>

        {lowStockProducts.length === 0 ? (
          <p className="empty-state">
            Tidak ada produk dengan stok rendah.
          </p>
        ) : (
          <div className="low-stock-list">
            {lowStockProducts.map((product) => (
              <div className="low-stock-item" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <span>ID: {product.id}</span>
                </div>

                <span className="stock-warning">
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
