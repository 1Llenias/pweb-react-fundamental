
import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../components/atoms/Button.jsx'
import ProductSearch from '../components/molecules/ProductSearch.jsx'
import ProductGrid from '../components/organisms/ProductGrid.jsx'
import ProductModal from '../components/organisms/ProductModal.jsx'
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/productService.js'

export default function ProductPage() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [modalError, setModalError] = useState('')

  // Fetch products from backend
  async function fetchProducts() {
    try {
      setLoading(true)
      setError('')

      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message || 'Gagal mengambil data produk.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = useMemo(
    () => products.filter((product) =>
      product.name.toLowerCase().includes(search.trim().toLowerCase()),
    ),
    [products, search],
  )

    function openAddModal() {
      setError('')
      setModalError('')
      setModal({ mode: 'add', product: null })
    }

    function openEditModal(product) {
      setError('')
      setModalError('')
      setModal({ mode: 'edit', product })
    }

    function openDeleteModal(product) {
      setError('')
      setModalError('')
      setModal({ mode: 'delete', product })
    }

  // Create or update product
  async function saveProduct(data) {
    try {
      setSaving(true)
      setError('')

      if (modal.mode === 'add') {
        await createProduct(data)
      } else {
        await updateProduct(modal.product.id, data)
      }

      await fetchProducts()
      setModal(null)
    } catch (err) {
      setModalError(err.message || 'Gagal menyimpan produk.')
    } finally {
      setSaving(false)
    }
  }

  // Delete product
  async function handleDeleteProduct() {
    try {
      setSaving(true)
      setError('')

      await deleteProduct(modal.product.id)

      await fetchProducts()
      setModal(null)
    } catch (err) {
      setModalError(err.message || 'Gagal menghapus produk.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <h1>Manajemen Produk</h1>
          <p>Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <Button onClick={openAddModal}>
          <Plus size={18} /> Tambah Produk
        </Button>
      </header>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="toolbar">
        <ProductSearch value={search} onChange={setSearch} />
        <span className="product-count">{filteredProducts.length} produk</span>
      </div>

      {loading ? (
        <p>Memuat produk...</p>
      ) : (
        <>
          <ProductGrid
            products={filteredProducts}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />

          <p className="result-info">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>
        </>
      )}

      {modal && (
        <ProductModal
          mode={modal.mode}
          product={modal.product}
          onClose={() => {
            if (!saving) setModal(null)
          }}
          onSave={saveProduct}
          onConfirmDelete={handleDeleteProduct}
          saving={saving}
          error={modalError}
        />
      )}
    </main>
  )
}
