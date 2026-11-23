import { Link, useParams } from 'react-router'

export default function ProductDetailPage() {
  const { id } = useParams()

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <h1>Product Detail</h1>
          <p>Detail produk dengan ID: {id}</p>
        </div>
      </header>

      <Link to="/products">Kembali ke Products</Link>
    </main>
  )
}