
import { Link } from 'react-router'
import { formatPrice } from '../../data/products.js'
import Button from '../atoms/Button.jsx'

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  viewMode = 'grid',
}) {
  const isList = viewMode === 'list'

  const cardClasses = isList
    ? 'flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 sm:flex-row sm:items-center sm:justify-between'
    : 'flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md'

  return (
    <article className={cardClasses}>
      <div className="min-w-0">
        <p className="mb-2 text-xs font-medium text-slate-400">
          ID: {product.id}
        </p>

        <h2 className="break-words text-base font-bold text-slate-900">
          {product.name}
        </h2>

        <p className="mt-2 text-lg font-extrabold text-blue-600">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          to={`/products/${product.id}`}
          className="button button--outline"
        >
          Detail
        </Link>

        <Button variant="outline" onClick={() => onEdit(product)}>
          Edit
        </Button>

        <Button variant="danger-outline" onClick={() => onDelete(product)}>
          Hapus
        </Button>
      </div>
    </article>
  )
}
