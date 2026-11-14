# API — Student Web Studio (Laravel 13)

Base: `http://127.0.0.1:8000/api`
Auth: Laravel Sanctum Bearer token.
Content-Type: `application/json`, Accept: `application/json`.

## Public (no auth)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/services` | List layanan aktif + packages |
| GET | `/services/{slug}` | Detail layanan + packages |
| GET | `/portfolio` | List portfolio |
| GET | `/testimonials` | Testimoni terpublikasi |
| GET | `/faqs` | FAQ terurut |
| POST | `/orders` | Buat pesanan; returns `order_code` |
| GET | `/orders/{order_code}` | Cek status pesanan (public) |
| POST | `/admin/login` | Login admin; returns token |

### POST `/orders` body
```json
{
  "customer_name": "Budi",
  "email": "budi@example.com",
  "whatsapp": "628123456789",
  "project_name": "Website Tugas",
  "description": "Company profile sederhana",
  "budget": 1500000,
  "deadline": "2026-12-01",
  "service_id": 1,
  "package_id": 1
}
```
Response 201: `{ "data": { "order_code": "SWS-XXXX", ... } }`

## Admin (Bearer token)

Header: `Authorization: Bearer <token>`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/admin/login` | Login |
| POST | `/admin/logout` | Logout current token |
| GET | `/admin/me` | Profil admin |
| GET | `/admin/dashboard` | Statistik: total orders/customers/revenue/chart |
| GET | `/admin/orders?status=` | List order (paginated) |
| GET | `/admin/orders/{order}` | Detail order (files/payments/project) |
| PATCH | `/admin/orders/{order}/status` | Ubah status |
| DELETE | `/admin/orders/{order}` | Hapus order |
| GET/POST | `/admin/services` | CRUD service |
| PATCH/DELETE | `/admin/services/{service}` | Update/delete service |
| GET/POST | `/admin/packages` | CRUD package |
| PATCH/DELETE | `/admin/packages/{package}` | Update/delete package |
| GET | `/admin/payments` | List pembayaran |
| POST | `/admin/payments` | Catat pembayaran |
| POST | `/admin/payments/{payment}/proof` | Upload bukti (jpg/png/pdf, max 2MB) |
| PATCH | `/admin/payments/{payment}/verify` | Verifikasi: menunggu_verifikasi/terverifikasi/ditolak |
| GET | `/admin/projects` | List proyek |
| GET | `/admin/projects/{project}` | Detail + updates |
| PATCH | `/admin/projects/{project}` | Update progress/stage/notes |
| POST | `/admin/projects/{project}/updates` | Tambah catatan progres |
| GET/POST | `/admin/portfolio` | CRUD portfolio |
| PATCH/DELETE | `/admin/portfolio/{portfolio}` | Update/delete portfolio |
| GET/POST | `/admin/testimonials` | CRUD testimoni |
| PATCH/DELETE | `/admin/testimonials/{testimonial}` | Update/delete testimoni |
| GET | `/admin/settings` | List pengaturan |
| PATCH | `/admin/settings` | Update multiple settings |

## Order statuses
`menunggu_konfirmasi` → `konsultasi` → `menunggu_pembayaran` → `dalam_pengerjaan` → `revisi` → `selesai` (atau `dibatalkan`).

## Seed admin account
```
email: admin@studentwebstudio.id
password: admin123
```
Ganti password di produksi.

## Conventions
- JSON; list = `{ data: [...] }`; error = Laravel validation `{ message, errors }`.
- 401 unauthenticated, 422 validation, 404 not found.
- Rate limit default Laravel.
