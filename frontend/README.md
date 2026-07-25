# 📚 Sistem Peminjaman Buku Perpustakaan

## Deskripsi Proyek

Sistem Peminjaman Buku Perpustakaan merupakan aplikasi berbasis web yang digunakan untuk mengelola data buku dan proses peminjaman buku secara digital. Aplikasi ini dibangun menggunakan **Svelte** sebagai frontend, **Node.js & Express.js** sebagai backend, serta **MySQL** sebagai database.

Fitur utama aplikasi meliputi:

- Login Administrator menggunakan JWT Authentication.
- Manajemen data buku (Tambah, Lihat, Ubah, Hapus).
- Manajemen data peminjaman buku.
- Validasi input pada form.
- Dashboard statistik buku dan peminjaman.
- Sistem autentikasi menggunakan JSON Web Token (JWT).

---

# 👨‍💻 Anggota Kelompok

| Nama | NIM | Tugas |
|------|------|----------------------------|
| Mohammad Ifandi | 2024520032 | Membuat Backend API, CRUD Buku, CRUD Peminjaman, Login JWT, Integrasi Database MySQL |
| Mohammad Efendi | 2024520033 | Mendesain Tampilan Frontend, Validasi Form, Dashboard, Dokumentasi Proyek, Pengujian Sistem |

---

# 🗄️ Dokumentasi Database

Database yang digunakan bernama **perpustakaan**.

## Tabel User

| Field | Tipe |
|------|------|
| id | INT (PK) |
| nama | VARCHAR(100) |
| email | VARCHAR(100) |
| password | VARCHAR(255) |

---

## Tabel Buku

| Field | Tipe |
|------|------|
| id | INT (PK) |
| judul | VARCHAR(255) |
| penulis | VARCHAR(255) |
| penerbit | VARCHAR(255) |
| tahun | YEAR |

---

## Tabel Peminjaman

| Field | Tipe |
|------|------|
| id | INT (PK) |
| nama_peminjam | VARCHAR(255) |
| judul_buku | VARCHAR(255) |
| tanggal_pinjam | DATE |
| tanggal_kembali | DATE |
| status | ENUM('Dipinjam','Dikembalikan') |

---

## Relasi Database

```
User
 │
 │ Login
 ▼

Peminjaman
     │
     │ Menggunakan
     ▼

Buku
```

---

# 📡 Dokumentasi Endpoint API

## Authentication

### Login

```
POST /api/auth/login
```

### Request Body

```json
{
    "email": "admin@gmail.com",
    "password": "123456"
}
```

### Response

```json
{
    "token": "JWT_TOKEN"
}
```

---

## Buku

### Ambil Semua Buku

```
GET /api/books
```

Response

```json
[
    {
        "id": 1,
        "judul": "Pemrograman Web",
        "penulis": "Andi",
        "penerbit": "Informatika",
        "tahun": 2024
    }
]
```

---

### Tambah Buku

```
POST /api/books
```

Request

```json
{
    "judul":"Pemrograman Web",
    "penulis":"Andi",
    "penerbit":"Informatika",
    "tahun":2024
}
```

Response

```json
{
    "message":"Buku berhasil ditambahkan"
}
```

---

### Update Buku

```
PUT /api/books/:id
```

Request

```json
{
    "judul":"Pemrograman Web",
    "penulis":"Andi",
    "penerbit":"Informatika",
    "tahun":2025
}
```

Response

```json
{
    "message":"Buku berhasil diupdate"
}
```

---

### Hapus Buku

```
DELETE /api/books/:id
```

Response

```json
{
    "message":"Buku berhasil dihapus"
}
```

---

## Peminjaman

### Ambil Semua Peminjaman

```
GET /api/peminjaman
```

Response

```json
[
    {
        "id":1,
        "nama_peminjam":"Budi",
        "judul_buku":"Pemrograman Web",
        "tanggal_pinjam":"2026-07-01",
        "tanggal_kembali":"2026-07-10",
        "status":"Dipinjam"
    }
]
```

---

### Tambah Peminjaman

```
POST /api/peminjaman
```

Request

```json
{
    "nama_peminjam":"Budi",
    "judul_buku":"Pemrograman Web",
    "tanggal_pinjam":"2026-07-01",
    "tanggal_kembali":"2026-07-10",
    "status":"Dipinjam"
}
```

Response

```json
{
    "message":"Peminjaman berhasil ditambahkan"
}
```

---

### Mengembalikan Buku

```
PUT /api/peminjaman/:id
```

Response

```json
{
    "message":"Status peminjaman berhasil diperbarui"
}
```

---

# ▶️ Cara Menjalankan Aplikasi

## 1. Clone Repository

```bash
git clone https://github.com/ifandi28/uas-pemrograman-web.git
```

---

## 2. Masuk ke Folder Project

```bash
cd uas-pemrograman-web
```

---

## 3. Install Backend

```bash
cd backend
npm install
```

---

## 4. Jalankan Backend

```bash
npm run dev
```

Backend berjalan pada:

```
http://localhost:5000
```

---

## 5. Install Frontend

```bash
cd ../frontend
npm install
```

---

## 6. Jalankan Frontend

```bash
npm run dev
```

Frontend berjalan pada:

```
http://localhost:5173
```

atau

```
http://localhost:5174
```

---

## 7. Konfigurasi Database

- Install MySQL Server.
- Buat database dengan nama **perpustakaan**.
- Import file SQL yang telah disediakan.
- Sesuaikan konfigurasi database pada file `.env`.

Contoh konfigurasi:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=perpustakaan

JWT_SECRET=uaspemrogramanweb2026
PORT=5000
```

---

# 🛠️ Teknologi yang Digunakan

- Frontend : Svelte + Vite
- Backend : Node.js + Express.js
- Database : MySQL
- Authentication : JSON Web Token (JWT)
- HTTP Client : Axios
- Styling : CSS
- Package Manager : npm

---

# 📌 Kesimpulan

Aplikasi Sistem Peminjaman Buku Perpustakaan berhasil dibangun sebagai solusi digital untuk mempermudah pengelolaan data buku dan proses peminjaman. Dengan menerapkan autentikasi JWT, sistem CRUD, validasi input, serta dashboard informasi, aplikasi ini mampu memberikan pengalaman penggunaan yang lebih aman, efisien, dan mudah digunakan.
