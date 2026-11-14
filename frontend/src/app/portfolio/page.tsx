import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { portfolio } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio Website",
  description:
    "Contoh portfolio pembuatan website untuk proyek mahasiswa, organisasi, UMKM, company profile, e-commerce, dan landing page.",
};

const categories = ["Semua", "Company Profile", "Organisasi", "Sistem Informasi", "E-Commerce", "Landing Page", "Portofolio"];

export default function PortfolioPage() {
  return (
    <main>
      <PageHero
        eyebrow="Portfolio"
        title="Contoh hasil website"
        description="Sebagian contoh tampilan dan struktur konten untuk berbagai kebutuhan. Setiap proyek disesuaikan dengan tujuan dan konten masing-masing."
      />

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Kategori proyek"
            title="Portfolio pilihan"
            description="Contoh di bawah menunjukkan variasi jenis website yang sering dikerjakan."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy/70"
              >
                {category}
              </span>
            ))}
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((item, index) => (
              <PortfolioCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Mau website seperti ini?"
        description="Ceritakan jenis website dan fitur yang dibutuhkan. Saya bantu susun tampilan dan strukturnya."
      />
    </main>
  );
}