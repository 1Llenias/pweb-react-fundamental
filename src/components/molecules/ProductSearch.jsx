
import { Search } from 'lucide-react'

export default function ProductSearch({ value, onChange }) {
  return (
    <label className="flex h-11 w-full max-w-[560px] items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 text-slate-400 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
      <Search size={19} aria-hidden="true" />

      <input
        type="search"
        placeholder="Cari nama produk..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Cari nama produk"
        className="w-full min-w-0 border-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />
    </label>
  )
}
