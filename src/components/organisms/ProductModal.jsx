
import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import Button from '../atoms/Button.jsx'
import IconButton from '../atoms/IconButton.jsx'
import { formatPrice } from '../../data/products.js'

export default function ProductModal({
  mode,
  product,
  onClose,
  onSave,
  onConfirmDelete,
  saving = false,
  error = '',
}) {
  const [name, setName] = useState(product?.name ?? '')
  const [price, setPrice] = useState(product ? String(product.price) : '')
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && !saving) onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, saving])

  function handleSubmit(event) {
    event.preventDefault()
    const numericPrice = Number(price)

    if (!name.trim()) {
      setValidationError('Nama produk wajib diisi.')
      return
    }

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setValidationError('Harga harus lebih dari 0.')
      return
    }

    setValidationError('')
    onSave({ name: name.trim(), price: numericPrice })
  }

  const isDelete = mode === 'delete'
  const isEdit = mode === 'edit'

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose()
      }}
    >
      <section
        className={`modal ${isDelete ? 'modal--delete' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <IconButton onClick={onClose} />

        {isDelete ? (
          <>
            <div className="delete-icon"><Trash2 size={27} /></div>

            <h2 id="modal-title" className="modal-title modal-title--center">
              Hapus Produk?
            </h2>

            <p className="modal-description modal-description--center">
              Produk yang dihapus tidak dapat dikembalikan.
            </p>

            <div className="delete-product-preview">
              <span>ID: {product.id}</span>
              <strong>{product.name}</strong>
              <b>{formatPrice(product.price)}</b>
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <div className="modal-actions">
              <Button variant="outline" onClick={onClose} disabled={saving}>
                Batal
              </Button>
              <Button
                variant="danger"
                onClick={onConfirmDelete}
                disabled={saving}
              >
                {saving ? 'Menghapus...' : 'Hapus Produk'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 id="modal-title">
              {isEdit ? 'Edit Produk' : 'Tambah Produk'}
            </h2>

            <p className="modal-description">
              {isEdit
                ? 'Perbarui informasi produk yang dipilih.'
                : 'Masukkan informasi produk baru.'}
            </p>

            {isEdit && <p className="editing-id">ID: {product.id}</p>}

            <form onSubmit={handleSubmit}>
              <label className="form-field">
                <span>Nama Produk</span>
                <input
                  autoFocus
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Contoh: Pulpen"
                  disabled={saving}
                />
              </label>

              <label className="form-field">
                <span>Harga (Rp)</span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="Contoh: 5000"
                  disabled={saving}
                />
                <small>Harga harus lebih dari 0.</small>
              </label>

              {(validationError || error) && (
                <p className="form-error" role="alert">
                  {validationError || error}
                </p>
              )}

              <div className="modal-actions">
                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={saving}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving
                    ? 'Menyimpan...'
                    : isEdit
                      ? 'Simpan Perubahan'
                      : 'Simpan Produk'}
                </Button>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
