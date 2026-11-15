import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../components/atoms/Button.jsx'
import ProductSearch from '../components/molecules/ProductSearch.jsx'
import ProductGrid from '../components/organisms/ProductGrid.jsx'
import ProductModal from '../components/organisms/ProductModal.jsx'
import { initialProducts } from '../data/products.js'

export default function ProductPage() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)

  const filteredProducts = useMemo(
    () => products.filter((product) =>
      product.name.toLowerCase().includes(search.trim().toLowerCase()),
    ),
    [products, search],
  )

  function openAddModal() {
    setModal({ mode: 'add', product: null })
  }

  function openEditModal(product) {
    setModal({ mode: 'edit', product })
  }

  function openDeleteModal(product) {
    setModal({ mode: 'delete', product })
  }

  function saveProduct(data) {
    if (modal.mode === 'add') {
      const nextId = products.length
        ? Math.max(...products.map((product) => product.id)) + 1
        : 1
      setProducts((current) => [...current, { id: nextId, ...data }])
    } else {
      setProducts((current) => current.map((product) =>
        product.id === modal.product.id ? { ...product, ...data } : product,
      ))
    }
    setModal(null)
  }

  function deleteProduct() {
    setProducts((current) => current.filter(
      (product) => product.id !== modal.product.id,
    ))
    setModal(null)
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

      <div className="toolbar">
        <ProductSearch value={search} onChange={setSearch} />
        <span className="product-count">{filteredProducts.length} produk</span>
      </div>

      <ProductGrid
        products={filteredProducts}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      <p className="result-info">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>

      {modal && (
        <ProductModal
          mode={modal.mode}
          product={modal.product}
          onClose={() => setModal(null)}
          onSave={saveProduct}
          onConfirmDelete={deleteProduct}
        />
      )}
    </main>
  )
}