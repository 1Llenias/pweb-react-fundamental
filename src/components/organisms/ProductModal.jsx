
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

  const inputClasses =
    'mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose()
      }}
    >
      <section
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="absolute right-4 top-4">
          <IconButton onClick={onClose} />
        </div>

        {isDelete ? (
          <>
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={27} />
            </div>

            <h2
              id="modal-title"
              className="text-xl font-bold text-slate-900"
            >
              Hapus Produk?
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Produk yang dihapus tidak dapat dikembalikan.
            </p>

            <div className="mt-5 flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="text-xs text-slate-400">
                ID: {product.id}
              </span>
              <strong className="break-words text-sm text-slate-800">
                {product.name}
              </strong>
              <b className="text-base text-blue-600">
                {formatPrice(product.price)}
              </b>
            </div>

            {error && (
              <p
                className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
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
            <h2
              id="modal-title"
              className="pr-10 text-xl font-bold text-slate-900"
            >
              {isEdit ? 'Edit Produk' : 'Tambah Produk'}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {isEdit
                ? 'Perbarui informasi produk yang dipilih.'
                : 'Masukkan informasi produk baru.'}
            </p>

            {isEdit && (
              <p className="mt-3 text-xs font-medium text-slate-400">
                ID: {product.id}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6">
              <label className="mb-5 block">
                <span className="text-sm font-semibold text-slate-700">
                  Nama Produk
                </span>
                <input
                  autoFocus
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value)
                    setValidationError('')
                  }}
                  placeholder="Contoh: Pulpen"
                  disabled={saving}
                  className={inputClasses}
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700">
                  Harga (Rp)
                </span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value)
                    setValidationError('')
                  }}
                  placeholder="Contoh: 5000"
                  disabled={saving}
                  className={inputClasses}
                />
                <small className="mt-2 block text-xs text-slate-400">
                  Harga harus lebih dari 0.
                </small>
              </label>

              {(validationError || error) && (
                <p
                  className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                  role="alert"
                >
                  {validationError || error}
                </p>
              )}

              <div className="mt-7 flex justify-end gap-3">
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
