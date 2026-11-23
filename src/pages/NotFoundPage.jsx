import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <main className="page-shell">
      <h1>404 - Page Not Found</h1>
      <p>Halaman yang kamu cari tidak ditemukan.</p>
      <Link to="/">Kembali ke Dashboard</Link>
    </main>
  )
}