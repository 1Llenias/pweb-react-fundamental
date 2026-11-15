import { formatPrice } from '../../data/products.js'
import Button from '../atoms/Button.jsx'

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <p className="product-id">ID: {product.id}</p>
      <h2>{product.name}</h2>
      <p className="product-price">{formatPrice(product.price)}</p>
      <div className="product-actions">
        <Button variant="outline" onClick={() => onEdit(product)}>Edit</Button>
        <Button variant="danger-outline" onClick={() => onDelete(product)}>Hapus</Button>
      </div>
    </article>
  )
}