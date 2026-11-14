export type NavItem = { href: string; label: string };

export type Service = {
  slug: string;
  name: string;
  category: string;
  short: string;
  description: string;
  features: string[];
  priceFrom: number | null;
  timeline: string;
};

export type ServicePackage = {
  slug: string;
  name: string;
  description: string;
  price: number | null;
  timeline: string;
  features: string[];
  highlighted?: boolean;
};

export type PortfolioItem = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  gradient: string;
};

export type Testimonial = {
  name: string;
  role: string;
  message: string;
};

export type Faq = { question: string; answer: string };

export type ProcessStep = { title: string; description: string };

export const site = {
  name: "Student Web Studio",
  tagline:
    "Jasa pembuatan website untuk mahasiswa, organisasi kampus, UMKM, dan kebutuhan custom.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "6281234567890",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@studentwebstudio.id",
  location: "Remote — Indonesia",
};

export const nav: NavItem[] = [
  { href: "/", label: "Beranda" },
  { href: "/services", label: "Layanan" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Harga" },
  { href: "/about", label: "Tentang" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Kontak" },
];

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const advantages: string[] = [
  "Konsultasi langsung dengan pembuat website",
  "Scope dan harga jelas sejak awal",
  "Revisi terarah, bukan tanpa arah",
  "Kode dan struktur file rapi",
  "Responsif di HP, tablet, dan desktop",
  "Panduan setelah website selesai",
];

export const processSteps: ProcessStep[] = [
  {
    title: "Diskusi kebutuhan",
    description:
      "Jelaskan tugas, proyek, atau bisnismu. Saya bantu pilih jenis website yang pas.",
  },
  {
    title: "Scope & harga",
    description:
      "Daftar fitur, halaman, dan estimasi pengerjaan ditulis jelas sebelum mulai.",
  },
  {
    title: "Desain & development",
    description:
      "Tampilan, konten, dan fitur dibangun bertahap. Progress bisa dipantau.",
  },
  {
    title: "Revisi & delivery",
    description:
      "Revisi terarah, lalu website di-deliver beserta panduan singkatnya.",
  },
];

export const services: Service[] = [
  {
    slug: "company-profile",
    name: "Company Profile",
    category: "Bisnis",
    short: "Website profesional untuk perusahaan, studio, atau brand.",
    description:
      "Website company profile untuk memperkenalkan bisnis, layanan, dan kepercayaan kepada calon pelanggan. Struktur rapi, copy yang jelas, dan tampilan yang enak dilihat di semua ukuran layar.",
    features: [
      "Sampai 5 halaman inti",
      "Hero section yang kuat",
      "Halaman layanan & keunggulan",
      "Kontak & lokasi",
      "SEO dasar",
    ],
    priceFrom: 1500000,
    timeline: "7–14 hari",
  },
  {
    slug: "website-organisasi",
    name: "Website Organisasi",
    category: "Organisasi",
    short: "Website untuk UKM, BEM, himpunan, atau komunitas.",
    description:
      "Website organisasi untuk memuat profil, struktur pengurus, agenda kegiatan, alur pendaftaran anggota, dan informasi publikasi. Cocok untuk organisasi kampus maupun komunitas.",
    features: [
      "Profil & visi misi",
      "Struktur kepengurusan",
      "Agenda & galeri kegiatan",
      "Pendaftaran anggota",
      "Integrasi Instagram",
    ],
    priceFrom: 1200000,
    timeline: "7–10 hari",
  },
  {
    slug: "website-kampus",
    name: "Website Kampus",
    category: "Kampus",
    short: "Website prodi, fakultas, atau program studi.",
    description:
      "Website kampus atau program studi dengan struktur konten besar: berita, kurikulum, dosen, jadwal, dan informasi akademik. Dibuat agar mudah diperbarui oleh admin kampus.",
    features: [
      "Berita & pengumuman",
      "Halaman kurikulum",
      "Data dosen & staff",
      "Jadwal akademik",
      "Panel admin ringan",
    ],
    priceFrom: 2500000,
    timeline: "10–14 hari",
  },
  {
    slug: "sistem-informasi-akademik",
    name: "Sistem Informasi Akademik",
    category: "Sistem Informasi",
    short: "SIAKAD mini untuk proyek kuliah atau skripsi.",
    description:
      "Sistem informasi akademik dengan peran mahasiswa, dosen, dan admin. Pendataan mata kuliah, KRS, nilai, kehadiran, serta laporan dasar. Cocok untuk proyek studi maupun kebutuhan kampus.",
    features: [
      "Login & role pengguna",
      "Manajemen mata kuliah",
      "Pengisian KRS",
      "Input & rekap nilai",
      "Laporan sederhana",
    ],
    priceFrom: 3500000,
    timeline: "14–30 hari",
  },
  {
    slug: "sistem-informasi-manajemen",
    name: "Sistem Informasi Manajemen",
    category: "Sistem Informasi",
    short: "Aplikasi manajemen data yang sesuai alur kerja.",
    description:
      "Sistem informasi manajemen untuk inventaris, keuangan, kepegawaian, kasir, atau proses bisnis lainnya. Alur kerja diubah agar match kebutuhan, bukan memaksa template.",
    features: [
      "Sesuai alur kerja",
      "Dashboard statistik",
      "Manajemen data inti",
      "Filter & ekspor data",
      "Role & hak akses",
    ],
    priceFrom: 4000000,
    timeline: "14–30 hari",
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    category: "Bisnis",
    short: "Toko online untuk produk fisik maupun digital.",
    description:
      "Website e-commerce dengan katalog produk, keranjang, checkout, dan panel admin untuk kelola pesanan. Pembayaran menyesuaikan metode yang sudah kamu pakai.",
    features: [
      "Katalog & kategori",
      "Keranjang & checkout",
      "Detail pesanan",
      "Panel admin produk",
      "Ringkasan penjualan",
    ],
    priceFrom: 3000000,
    timeline: "14–30 hari",
  },
  {
    slug: "website-umkm",
    name: "Website UMKM",
    category: "Bisnis",
    short: "Website sederhana agar UMKM mudah ditemukan.",
    description:
      "Website UMKM yang ringan dan cepat: profil usaha, menu/produk, lokasi, jam operasional, dan tombol WhatsApp. Supaya calon pelanggan bisa langsung kontak.",
    features: [
      "Sampai 4 halaman",
      "Katalog sederhana",
      "Tombol WhatsApp",
      "Peta lokasi",
      "Rapi di HP",
    ],
    priceFrom: 1500000,
    timeline: "7–14 hari",
  },
  {
    slug: "landing-page",
    name: "Landing Page",
    category: "Marketing",
    short: "Satu halaman fokus untuk promo, event, atau iklan.",
    description:
      "Landing page satu halaman dengan satu tujuan: jualan, pendaftaran, pengumpulan lead, atau promosi. Copy dan CTA dirancang agar pengunjung tahu harus melakukan apa.",
    features: [
      "1 halaman fokus",
      "Headline & CTA jelas",
      "Form atau tombol aksi",
      "Hero visual kuat",
      "Optimasi kecepatan",
    ],
    priceFrom: 800000,
    timeline: "3–7 hari",
  },
  {
    slug: "website-portofolio",
    name: "Website Portofolio",
    category: "Personal",
    short: "Portofolio personal untuk magang, kerja, atau lomba.",
    description:
      "Website portofolio untuk menampilkan karya, pengalaman, sertifikat, dan kontak. Cocok untuk pelamaran magang, kerja, atau tugas desain.",
    features: [
      "Sampai 3 halaman",
      "Galeri projek",
      "Halaman pengalaman",
      "CV & kontak",
      "Tampilan rapi di HP",
    ],
    priceFrom: 700000,
    timeline: "3–7 hari",
  },
  {
    slug: "website-custom",
    name: "Website Custom",
    category: "Custom",
    short: "Website dari nol sesuai kebutuhan khusus.",
    description:
      "Butuh tampilan atau fitur yang tidak ada di layanan lain? Website custom dikembangkan dari nol sesuai alur kerja dan kebutuhan ekspektasimu.",
    features: [
      "Sesuai brief",
      "Fitur custom",
      "Integrasi pilihan",
      "Monitoring progres",
      "Panduan penggunaan",
    ],
    priceFrom: null,
    timeline: "Sesuai scope",
  },
];

export const packages: ServicePackage[] = [
  {
    slug: "starter",
    name: "Starter",
    description: "Cocok untuk tugas kuliah, portofolio, dan presentasi cepat.",
    price: 750000,
    timeline: "3–7 hari",
    features: [
      "Sampai 1 halaman / landing page",
      "Desain responsif",
      "1 ronde revisi terarah",
      "Sumber kode (source code)",
      "Panduan singkat online",
    ],
  },
  {
    slug: "bisnis",
    name: "Bisnis",
    description: "Paling cocok untuk company profile, organisasi, dan UMKM.",
    price: 1500000,
    timeline: "7–14 hari",
    highlighted: true,
    features: [
      "Sampai 5 halaman inti",
      "Desain responsif",
      "Form atau aksi WhatsApp",
      "SEO dasar & metadata",
      "2 ronde revisi terarah",
      "Support 30 hari setelah selesai",
    ],
  },
  {
    slug: "custom",
    name: "Custom",
    description: "Untuk sistem informasi, e-commerce, atau fitur khusus.",
    price: null,
    timeline: "Sesuai scope",
    features: [
      "Sesuai brief & alur kerja",
      "Panel admin sesuai kebutuhan",
      "Database & REST API",
      "Revisi sesuai kesepakatan",
      "Monitoring progres",
    ],
  },
];

export const portfolio: PortfolioItem[] = [
  {
    title: "SIAKAD Mini",
    category: "Sistem Informasi",
    description:
      "Portal akademik dengan role mahasiswa, dosen, dan admin untuk proyek studi.",
    tech: ["Next.js", "Laravel", "MySQL"],
    gradient: "from-violet to-navy",
  },
  {
    title: "Kopi Senja",
    category: "Company Profile",
    description:
      "Website kafe dengan menu, cerita brand, galeri, dan tombol reservasi WhatsApp.",
    tech: ["Next.js", "Tailwind"],
    gradient: "from-accent to-emerald-700",
  },
  {
    title: "BEM Kampus",
    category: "Organisasi",
    description:
      "Website organisasi kampus dengan struktur kepengurusan dan agenda kegiatan.",
    tech: ["Next.js", "Tailwind"],
    gradient: "from-sky-500 to-violet",
  },
  {
    title: "Toko Rasa",
    category: "E-Commerce",
    description:
      "Toko online UMKM dengan katalog, keranjang, dan panel pesanan sederhana.",
    tech: ["Next.js", "Laravel", "MySQL"],
    gradient: "from-rose-400 to-violet",
  },
  {
    title: "Portofolio Rani",
    category: "Portofolio",
    description:
      "Website portofolio desainer untuk pengajuan magang dan proyek freelance.",
    tech: ["Next.js", "Tailwind"],
    gradient: "from-teal-400 to-navy",
  },
  {
    title: "Landing Kelas",
    category: "Landing Page",
    description:
      "Landing page pendaftaran kelas dengan form, jadwal, dan testimoni peserta.",
    tech: ["Next.js", "Tailwind"],
    gradient: "from-indigo-500 to-violet",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Raka",
    role: "Mahasiswa Sistem Informasi",
    message:
      "Website tugas UAS selesai sebelum deadline. Scope dan revisinya jelas, jadi saya tidak bingung harus revisi bagian mana.",
  },
  {
    name: "Nadia",
    role: "Ketua UKM",
    message:
      "Website organisasi kami jadi rapi dan mudah dilihat anggota baru. Bantuan untuk struktur kontennya sangat membantu.",
  },
  {
    name: "Bu Sari",
    role: "Pemilik UMKM",
    message:
      "Pelanggan sekarang lebih mudah menemukan menu dan lokasi. Tampilan di HP terlihat profesional dan ringan.",
  },
];

export const faqs: Faq[] = [
  {
    question: "Saya bukan orang IT. Apakah tetap bisa ikut proses?",
    answer:
      "Bisa. Dari awal, saya menanyakan tujuan, audiens, dan contoh website yang kamu suka. Semua istilah teknis dijelaskan dengan bahasa biasa.",
  },
  {
    question: "Apakah pemesanan wajib membuat akun?",
    answer:
      "Tidak wajib. Kamu cukup mengisi form pemesanan, lalu melanjutkan konsultasi lewat WhatsApp. Progress proyek dapat dicek dengan kode pesanan.",
  },
  {
    question: "Pembayaran dilakukan seperti apa?",
    answer:
      "Pembayaran dilakukan setelah scope fitur dan harga disepakati. Metode dan jadwal cicilan akan dijelaskan pada tahap konsultasi.",
  },
  {
    question: "Berapa jumlah revisi yang diberikan?",
    answer:
      "Setiap paket mencantumkan jumlah revisi. Perbaikan seputar typo, gambar, dan penyesuaian kecil masuk dalam revisi biasa.",
  },
  {
    question: "Apakah website responsif di HP?",
    answer:
      "Ya. Setiap website dikerjakan responsif untuk smartphone, tablet, dan desktop, lalu dicek pada beberapa ukuran layar.",
  },
  {
    question: "Apakah saya mendapat source code?",
    answer:
      "Ya. Setelah proyek selesai, source code dan panduan singkat diberikan sesuai kesepakatan paket.",
  },
  {
    question: "Apakah bisa revisi setelah website selesai?",
    answer:
      "Bisa. Perubahan kecil dilakukan sesuai masa support, sedangkan penambahan fitur baru dapat dinegosiasikan sebagai scope baru.",
  },
  {
    question: "Apakah bisa menangani proyek sistem informasi?",
    answer:
      "Bisa. Mulai dari sistem akademik, manajemen, kasir, inventaris, sampai aplikasi custom sesuai alur kerja dan kebutuhan skripsi.",
  },
];