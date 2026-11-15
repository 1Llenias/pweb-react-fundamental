# Manajemen Produk — Fundamental React

Aplikasi CRUD produk sederhana menggunakan React, Vite, JSX, props, event handler, dan `useState`.

## Menjalankan proyek

Pastikan Node.js versi LTS sudah terpasang.

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite (umumnya `http://localhost:5173`).

## Build production

```bash
npm run build
npm run preview
```

## Fitur

- Menampilkan lima data produk awal.
- Mencari produk berdasarkan nama.
- Menambah produk melalui modal.
- Mengubah nama dan harga produk melalui modal edit.
- Menghapus produk melalui modal konfirmasi.
- Validasi nama dan harga harus lebih dari nol.
- Data dikelola menggunakan state React (belum menggunakan database).

## Struktur folder

```text
src/
├── components/
│   ├── atoms/
│   │   ├── Button.jsx
│   │   └── IconButton.jsx
│   ├── molecules/
│   │   ├── ProductSearch.jsx
│   │   └── ProductCard.jsx
│   └── organisms/
│       ├── ProductGrid.jsx
│       └── ProductModal.jsx
├── data/
│   └── products.js
├── pages/
│   └── ProductPage.jsx
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

Pembagian ini mengadaptasi Atomic Design sebagai pendekatan organisasi komponen, bukan aturan wajib React.
