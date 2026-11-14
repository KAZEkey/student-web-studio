# AGENTS.md — Student Web Studio

## Status
- **Fase 1 (Setup): SELESAI** — Next.js 16 + Laravel 13 + DB migrasi berjalan.
- **Fase 2 (Halaman Publik & Landing): SELESAI** — Home, Layanan (10 + 10 detail), Portfolio, Harga, Tentang, FAQ, Kontak selesai.
- **Fase 3 (Backend REST API): SELESAI** — 12 models, migrations, controllers, Sanctum auth, seeders, semua endpoint public + admin CRUD teruji.
- **Fase 4 (Integrasi Pemesanan): SELESAI** — Halaman `/order` (form pemesanan + cek status via kode), tautan dari halaman kontak, helper API di `src/lib/api.ts`. Build Next.js sukses, semua route 200.
- **Fase 5 (Dashboard Admin): BERIKUTNYA** — Panel admin frontend untuk kelola order/pembayaran/proyek.

## Role
Senior full-stack developer. Build incrementally: frontend (Next.js) separate from backend (Laravel). Report each phase.

## Stack
- Frontend: Next.js 16, React, TypeScript, Tailwind CSS 4, shadcn/ui, Motion.
- Backend: Laravel 13, PHP 8.3+, REST API, Laravel Sanctum.
- DB: MySQL 8 (XAMPP/MariaDB locally).

## Rules
1. Do not change architecture without clear technical reason.
2. Frontend and backend are separate apps; API is the contract between them.
3. Reusable components only; never put the whole app in one file.
4. Use database migrations; validate in backend; never trust frontend input.
5. Responsive design + restrained, professional animation.
6. Test each feature after it is built.
7. Do not delete unrelated files; no dummy production data.
8. Document API endpoints.
9. Work in phases; wait for setup verification before feature build.

## Security
- Hash passwords (BCrypt).
- Admin dashboard requires authentication.
- Laravel Sanctum + rate limiting.
- File upload: restricted format/size, private storage, no public access.
- Order codes hard to guess; no API keys in frontend; HTTPS in deployment; regular DB backup; verify payment in backend.

## Folder layout
- `frontend/src/app/{about,services,portfolio,pricing,order,track-order,contact,admin}`
- `backend/app/Http/{Controllers/Api,Requests,Middleware}`, `app/{Models,Services,Policies}`, `database/{migrations,seeders}`, `routes/api.php`, `storage`, `tests`
- `docs/` + `README.md` + this file.
