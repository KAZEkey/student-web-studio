import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { PackageCard } from "@/components/cards/PackageCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBand } from "@/components/sections/CtaBand";
import { packages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Harga dan Paket Website",
  description:
    "Daftar paket pembuatan website: Starter, Bisnis, dan Custom. Termasuk fitur, estimasi pengerjaan, dan kebutuhan proyek.",
};

const includedFeatures = [
  "Desain responsif untuk HP, tablet, dan desktop",
  "Struktur kode rapi dan mudah dipelajari",
  "Panduan singkat setelah website selesai",
  "Konsultasi selama tahap pengerjaan",
  "Revisi sesuai jumlah paket",
  "Source code sesuai kesepakatan",
];

export default function PricingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Harga"
        title="Paket website yang jelas cakupannya"
        description="Harga berikut adalah harga mulai per proyek. Detail akhir tetap mengikuti fitur, jumlah halaman, dan kompleksitas kebutuhan."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((pack, index) => (
              <PackageCard key={pack.slug} pack={pack} index={index} />
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-12 rounded-3xl border border-line bg-white p-7 shadow-card">
              <h2 className="font-display text-2xl font-bold text-navy">
                Yang sudah termasuk dalam semua paket
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {includedFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-2xl bg-soft p-4 text-sm text-navy/80"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet" />
                    {feature}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-navy/60">
                Catatan: pembayaran dan jadwal revisi akan dijelaskan saat konsultasi. Perubahan
                scope di luar kesepakatan akan dibahas sebagai penyesuaian terpisah.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-20">
        <Container>
          <SectionHeading
            eyebrow="FAQ harga"
            title="Pertanyaan seputar pembayaran dan pengerjaan"
          />
          <div className="mt-10 grid lg:grid-cols-2">
            <FaqList />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Belum yakin pilih paket?"
        description="Konsultasikan dulu kebutuhanmu. Saya bantu rekomendasikan paket dan fitur yang paling sesuai."
      />
    </main>
  );
}