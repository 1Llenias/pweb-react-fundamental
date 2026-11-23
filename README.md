# Product Manager — Tugas 4 Fundamental React

Aplikasi manajemen produk berbasis React dengan backend Express.js dan database PostgreSQL menggunakan Prisma ORM.

## Teknologi

### Frontend
- React 18
- Vite
- React Router 7
- Tailwind CSS 4
- Lucide React

### Backend
- Node.js
- Express.js 5
- Prisma ORM 6
- PostgreSQL (Neon)

## Fitur

- Dashboard ringkasan produk.
- Menampilkan daftar produk dari database.
- Pencarian produk berdasarkan nama.
- Tampilan produk dalam mode grid dan list.
- Menambahkan produk.
- Mengedit informasi produk.
- Menghapus produk dengan konfirmasi.
- Melihat detail produk berdasarkan ID.
- Validasi nama dan harga produk.
- Menyimpan preferensi tampilan grid/list.
- Halaman 404 untuk URL yang tidak ditemukan.

## Persyaratan

Pastikan sudah memasang:
- Node.js versi LTS.
- npm.
- Database PostgreSQL (project ini menggunakan Neon).

## Konfigurasi Environment

Buat file `backend/.env` berdasarkan `backend/.env.example`.

Isi `DATABASE_URL` dengan connection string Neon pooled dan `DIRECT_URL` dengan connection string Neon direct.

Jangan membagikan atau mengunggah file `.env` karena berisi kredensial database.

## Menjalankan Backend

Buka terminal pada folder utama project:

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

Backend berjalan secara default pada:

`http://localhost:3000`

Endpoint pemeriksaan:
- `GET /api/health`
- `GET /api/health/db`

## Menjalankan Frontend

Buka terminal baru pada folder utama project:

```bash
npm install
npm run dev
```

Frontend berjalan secara default pada:

`http://localhost:5173`

Pastikan backend sudah berjalan agar fitur manajemen produk dapat digunakan.

## API Endpoints

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/products` | Mengambil semua produk |
| GET | `/api/products/:id` | Mengambil detail produk |
| POST | `/api/products` | Menambahkan produk |
| PUT | `/api/products/:id` | Memperbarui produk |
| DELETE | `/api/products/:id` | Menghapus produk |

## Production Build

Untuk membangun frontend:

```bash
npm run build
```

Untuk menjalankan preview hasil build:

```bash
npm run preview
```

## Struktur Project

```text
.
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

Komponen frontend diorganisasikan menggunakan pendekatan Atomic Design.