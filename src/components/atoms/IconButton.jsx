import { X } from 'lucide-react'

export default function IconButton({ label = 'Tutup', onClick }) {
  return (
    <button className="icon-button" type="button" aria-label={label} onClick={onClick}>
      <X size={21} />
    </button>
  )
}