# Student Web Studio — Blueprint

## Concept
Jasa pembuatan website for students (UTS/UAS projects, campus organizations, thesis/research, UMKM, custom clients). Owner = single admin/provider. Customers browse services, choose package, submit order form, then consult via WhatsApp.

## Stack
Frontend: Next.js 16 + React + TypeScript + Tailwind CSS 4 + shadcn/ui + Motion.
Backend: Laravel 13 + PHP 8.3+ + Laravel Sanctum + REST API.
Database: MySQL 8.
Tools: VS Code, Hermes Agent, Git/GitHub, Node/npm, Composer, XAMPP MySQL.

## Design
Modern creative digital agency. Premium, minimal, responsive, smooth tasteful animation.
Palette: Dark Navy `#101827`, Electric Violet `#5B5CE2`, Soft Background `#F4F6FA`, Accent Green `#20C997`, White `#FFFFFF`.
Fonts: Inter, Plus Jakarta Sans.
Animation: fade-up, scroll reveal, hover, transitions, stagger, image reveal, button interaction — used sparingly.

## Public pages
- Beranda: hero, service description, advantages, featured services, portfolio, testimonials, CTA, footer.
- About: provider profile, vision/mission, advantages, process.
- Services: company profile, organization, campus, academic info system, management info system, e-commerce, UMKM, landing page, portfolio website, custom.
- Service detail: name, description, features, estimated price, estimated time, order button.
- Portfolio: gallery, categories, preview image, description, technology, demo link if available.
- Pricing/packages: package list, price, features, estimated time, order button.
- Order form: customer name, email, WhatsApp, website type, project name, needs, desired features, design reference, budget, deadline, supporting documents.
- Track order: order code input, customer info, service detail, status, progress, notes.
- Contact: WhatsApp, email, contact info, consultation button.
- FAQ: general, ordering, payment, revisions, timeline.

## Admin dashboard
Stats: total orders, new, in progress, completed, total customers, revenue, order chart.
Manage services, packages, orders, payments, projects, portfolio, testimonials, website settings.

## Order flow
1. Visit site → 2. choose service → 3. view detail/price → 4. fill form → 5. save order → 6. generate unique code → 7. redirect to WhatsApp → 8. WhatsApp opens message with code + summary → 9. admin consults → 10. update status → 11. project starts after agreement/payment → 12. update progress until done.
Statuses: waiting confirmation, consultation, waiting payment, in progress, revision, completed, cancelled. Customer needs no account; order code is enough.

## Database
`student_web_studio`
Tables: users, services, packages, orders, order_details, order_files, payments, projects, project_updates, portfolios, testimonials, faqs, settings.
Relations: service → packages; order → details/files/payments; order → one project; project → updates; order_details → service + package.

## Development phases
1. Setup structure, Next.js, Laravel, DB, docs, AGENTS.md.
2. Frontend pages, responsive, animation.
3. Backend DB, migrations, models, controllers, REST API, admin auth.
4. Order system: form, save, code, upload, WhatsApp, status tracking.
5. Admin dashboard management.
6. Testing, performance, SEO, deployment.

## Agent rules
Senior full-stack developer; follow fixed stack; separate frontend/backend; reusable components; migrations; backend validation; responsive design; professional restrained animation; test every feature; report each phase; don’t build everything at once.
