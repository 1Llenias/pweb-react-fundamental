
import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { useOutletContext } from 'react-router'
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
  const { viewMode } = useOutletContext()

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
    () =>
      products.filter((product) =>
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
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Manajemen Produk
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>

        <Button onClick={openAddModal}>
          <Plus size={18} />
          Tambah Produk
        </Button>
      </header>

      {error && (
        <p
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ProductSearch value={search} onChange={setSearch} />

        <span className="whitespace-nowrap text-sm text-slate-500">
          {filteredProducts.length} produk
        </span>
      </div>

      {loading ? (
        <p className="py-8 text-sm text-slate-500">
          Memuat produk...
        </p>
      ) : (
        <>
          <ProductGrid
            products={filteredProducts}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            viewMode={viewMode}
          />

          <p className="mt-5 text-xs text-slate-500">
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
