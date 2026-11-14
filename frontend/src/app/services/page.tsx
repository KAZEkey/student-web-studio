import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Layanan Pembuatan Website",
  description:
    "Layanan pembuatan website untuk tugas kuliah, organisasi kampus, UMKM, company profile, e-commerce, sistem informasi, dan proyek custom.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Layanan"
        title="Jenis website yang bisa dibuat"
        description="Pilih jenis website yang paling sesuai kebutuhanmu. Setiap layanan sudah mencakup desain responsif, konten yang rapi, dan proses pengerjaan yang bisa dipantau."
      />

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Katalog layanan"
            title="Semua layanan website"
            description="Harga dan estimasi waktu dapat disesuaikan setelah detail kebutuhan dan fitur didiskusikan."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Butuh jenis website lain?"
        description="Kalau kebutuhanmu belum ada di daftar, jelaskan bentuk website yang diinginkan. Saya bantu susun fitur dan estimasinya."
      />
    </main>
  );
}