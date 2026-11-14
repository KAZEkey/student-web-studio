# Database — student_web_studio (MySQL 8)

## users
id, name, email, password, role, created_at, updated_at

## services
id, name, slug, description, image, is_active, created_at, updated_at

## packages
id, service_id, name, price, features, created_at, updated_at

## orders
id, order_code, customer_name, email, whatsapp, project_name, description, budget, deadline, status, created_at, updated_at

## order_details
id, order_id, service_id, package_id, description, price_snapshot, created_at, updated_at

## order_files
id, order_id, file_path, file_type, created_at

## payments
id, order_id, amount, payment_method, status, proof_path, paid_at, created_at, updated_at

## projects
id, order_id, progress, current_stage, notes, created_at, updated_at

## project_updates
id, project_id, title, description, created_at

## portfolios
id, title, slug, category, description, image, project_url, created_at, updated_at

## testimonials
id, customer_name, message, rating, is_published, created_at

## faqs
id, question, answer, sort_order, created_at, updated_at

## settings
id, setting_key, setting_value, updated_at

## Key relations
- services 1:N packages
- orders 1:N order_details, order_files, payments
- orders 1:1 projects
- projects 1:N project_updates
- order_details N:1 services, packages

## Constraints / safety
- Foreign keys with restrictive deletes where required.
- Private storage for order files; not publicly browsable.
- Password hashed.
- Payment evidence verified server-side.
