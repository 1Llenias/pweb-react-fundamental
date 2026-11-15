import ProductCard from '../molecules/ProductCard.jsx'

export default function ProductGrid({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p className="empty-state">Produk tidak ditemukan.</p>
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}