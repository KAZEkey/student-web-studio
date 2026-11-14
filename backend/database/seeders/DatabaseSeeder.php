<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => 'Admin',
            'email' => 'admin@studentwebstudio.id',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
        ]);

        $services = [
            ['Company Profile', 'Website profesional untuk perusahaan, studio, atau brand.'],
            ['Website Organisasi', 'Website untuk UKM, BEM, himpunan, atau komunitas.'],
            ['Website Kampus', 'Website prodi, fakultas, atau program studi.'],
            ['Sistem Informasi Akademik', 'SIAKAD mini untuk proyek kuliah atau skripsi.'],
            ['Sistem Informasi Manajemen', 'Aplikasi manajemen data yang sesuai alur kerja.'],
            ['E-Commerce', 'Toko online untuk produk fisik maupun digital.'],
            ['Website UMKM', 'Website sederhana agar UMKM mudah ditemukan.'],
            ['Landing Page', 'Satu halaman fokus untuk promo, event, atau iklan.'],
            ['Website Portofolio', 'Portofolio personal untuk magang, kerja, atau lomba.'],
            ['Website Custom', 'Website dari nol sesuai kebutuhan khusus.'],
        ];
        foreach ($services as [$name, $desc]) {
            \App\Models\Service::create(['name' => $name, 'slug' => \Illuminate\Support\Str::slug($name), 'description' => $desc, 'is_active' => true]);
        }

        $packages = [
            ['Company Profile', 'Starter', 1500000, '7–14 hari', ['Sampai 5 halaman', 'Hero section', 'Kontak & lokasi', 'SEO dasar']],
            ['Company Profile', 'Bisnis', 3000000, '14–21 hari', ['Sampai 10 halaman', 'Blog & berita', 'Form kontak', 'Analytics']],
            ['Website UMKM', 'Starter', 1500000, '7–14 hari', ['Sampai 4 halaman', 'Katalog sederhana', 'Tombol WhatsApp', 'Peta lokasi']],
            ['E-Commerce', 'Custom', 5000000, '30–45 hari', ['Katalog produk', 'Keranjang & checkout', 'Panel admin', 'Ringkasan penjualan']],
            ['Landing Page', 'Starter', 800000, '3–7 hari', ['1 halaman fokus', 'Headline & CTA', 'Form aksi', 'Optimasi kecepatan']],
        ];
        foreach ($packages as [$svc, $name, $price, $timeline, $features]) {
            $service = \App\Models\Service::where('name', $svc)->first();
            if ($service) {
                \App\Models\Package::create(['service_id' => $service->id, 'name' => $name, 'price' => $price, 'timeline' => $timeline, 'features' => $features]);
            }
        }

        $faqs = [
            ['Saya bukan orang IT. Apakah tetap bisa ikut proses?', 'Bisa. Saya menanyakan tujuan, audiens, dan contoh website yang kamu suka.'],
            ['Apakah pemesanan wajib membuat akun?', 'Tidak wajib. Cukup isi form pemesanan, lanjut konsultasi lewat WhatsApp.'],
            ['Pembayaran dilakukan seperti apa?', 'Pembayaran setelah scope fitur dan harga disepakati.'],
            ['Berapa jumlah revisi yang diberikan?', 'Setiap paket mencantumkan jumlah revisi.'],
            ['Apakah website responsif di HP?', 'Ya. Responsif untuk smartphone, tablet, dan desktop.'],
            ['Apakah saya mendapat source code?', 'Ya. Source code dan panduan singkat diberikan sesuai kesepakatan.'],
            ['Apakah bisa revisi setelah website selesai?', 'Bisa. Perubahan kecil sesuai masa support.'],
            ['Apakah bisa menangani proyek sistem informasi?', 'Bisa. Mulai dari sistem akademik, manajemen, kasir, inventaris.'],
        ];
        foreach ($faqs as $i => [$q, $a]) {
            \App\Models\Faq::create(['question' => $q, 'answer' => $a, 'sort_order' => $i + 1]);
        }

        \App\Models\Testimonial::create(['customer_name' => 'Raka', 'message' => 'Website tugas UAS selesai sebelum deadline. Scope dan revisinya jelas.', 'rating' => 5, 'is_published' => true]);
        \App\Models\Testimonial::create(['customer_name' => 'Nadia', 'message' => 'Website organisasi kami jadi rapi dan mudah dilihat anggota baru.', 'rating' => 5, 'is_published' => true]);
        \App\Models\Testimonial::create(['customer_name' => 'Bu Sari', 'message' => 'Pelanggan sekarang lebih mudah menemukan menu dan lokasi.', 'rating' => 5, 'is_published' => true]);

        $settings = [['website_name', 'Student Web Studio'], ['whatsapp', '6281234567890'], ['email', 'hello@studentwebstudio.id'], ['location', 'Remote — Indonesia']];
        foreach ($settings as [$key, $value]) {
            \App\Models\Setting::create(['setting_key' => $key, 'setting_value' => $value]);
        }
    }
}
