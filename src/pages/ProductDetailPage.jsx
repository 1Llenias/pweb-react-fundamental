
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, Package } from 'lucide-react'
import { getProductById } from '../services/productService.js'
import { formatPrice } from '../data/products.js'

export default function ProductDetailPage() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        setError('')
        setProduct(null)

        const data = await getProductById(id)
        setProduct(data)
      } catch (err) {
        setError(err.message || 'Gagal mengambil detail produk.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <main className="page-shell">
        <p>Memuat detail produk...</p>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="page-shell">
        <h1>Produk tidak ditemukan</h1>
        <p>{error || 'Data produk tidak tersedia.'}</p>
        <Link to="/products">Kembali ke Products</Link>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <h1>Detail Produk</h1>
          <p>Informasi lengkap produk yang dipilih.</p>
        </div>
      </header>

      <section className="detail-card">
        <div className="detail-icon">
          <Package size={32} />
        </div>

        <p className="product-id">ID: {product.id}</p>
        <h2>{product.name}</h2>
        <p className="detail-price">{formatPrice(product.price)}</p>

        <div className="detail-info">
          <div>
            <span>Deskripsi</span>
            <p>{product.description || 'Tidak ada deskripsi.'}</p>
          </div>

          <div>
            <span>Stok</span>
            <p>{product.stock} unit</p>
          </div>
        </div>

        <Link to="/products" className="button button--outline detail-back">
          <ArrowLeft size={17} />
          Kembali ke Products
        </Link>
      </section>
    </main>
  )
}
