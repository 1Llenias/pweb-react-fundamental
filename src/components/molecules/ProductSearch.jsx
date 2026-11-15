import { Search } from 'lucide-react'

export default function ProductSearch({ value, onChange }) {
  return (
    <label className="search-box">
      <Search size={19} aria-hidden="true" />
      <input
        type="search"
        placeholder="Cari nama produk..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Cari nama produk"
      />
    </label>
  )
}