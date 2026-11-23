
import { X } from 'lucide-react'

export default function IconButton({ label = 'Tutup', onClick }) {
  return (
    <button
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      <X size={21} />
    </button>
  )
}
