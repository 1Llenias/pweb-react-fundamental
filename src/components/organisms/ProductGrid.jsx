
import ProductCard from '../molecules/ProductCard.jsx'

export default function ProductGrid({
  products,
  onEdit,
  onDelete,
  viewMode = 'grid',
}) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center text-sm text-slate-500">
        Produk tidak ditemukan.
      </p>
    )
  }

  const gridClasses =
    viewMode === 'list'
      ? 'grid grid-cols-1 gap-3'
      : 'grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3'

  return (
    <div className={gridClasses}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          viewMode={viewMode}
        />
      ))}
    </div>
  )
}
