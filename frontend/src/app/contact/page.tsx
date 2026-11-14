import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MailIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Student Web Studio untuk konsultasi pembuatan website mahasiswa, organisasi kampus, UMKM, dan kebutuhan custom.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Kontak"
        title="Konsultasi langsung lewat WhatsApp"
        description="Ceritakan kebutuhan website, deadline, dan referensi yang kamu suka. Saya bantu rekomendasikan jenis website dan fitur yang paling sesuai."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-3xl border border-line bg-white p-7 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-soft text-violet">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-navy">WhatsApp</h2>
                <p className="mt-2 text-sm text-navy/65">
                  Cara tercepat untuk konsultasi dan diskusi kebutuhan.
                </p>
                <ButtonLink
                  href={waLink("Halo Student Web Studio, saya mau konsultasi website.")}
                  external
                  className="mt-6 w-full"
                >
                  Mulai konsultasi
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="h-full rounded-3xl border border-line bg-white p-7 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-soft text-violet">
                  <MailIcon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-navy">Email</h2>
                <p className="mt-2 text-sm text-navy/65">
                  Cocok untuk penawaran formal, dokumen proyek, atau lampiran.
                </p>
                <ButtonLink href={`mailto:${site.email}`} external variant="secondary" className="mt-6 w-full">
                  {site.email}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="h-full rounded-3xl border border-line bg-white p-7 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-soft text-violet">
                  <PinIcon className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-navy">Area kerja</h2>
                <p className="mt-2 text-sm text-navy/65">
                  Pengerjaan dilakukan secara remote dan komunikasi online.
                </p>
                <p className="mt-6 rounded-2xl bg-soft p-4 text-sm font-semibold text-navy">
                  {site.location}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="mt-10 rounded-3xl border border-line bg-white p-7 shadow-card">
              <h2 className="font-display text-2xl font-bold text-navy">
                Informasi yang membantu saat konsultasi
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Jenis website atau sistem yang dibutuhkan",
                  "Tujuan website dan siapa penggunanya",
                  "Fitur utama yang harus ada",
                  "Deadline atau target presentasi",
                  "Referensi website yang kamu suka",
                  "Estimasi anggaran yang tersedia",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-soft p-4 text-sm text-navy/75">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-navy/60">
                Kalau kebutuhanmu sudah jelas, kamu bisa langsung isi form pemesanan lewat halaman{" "}
                <Link href="/order" className="font-semibold text-violet underline">
                  Pesan Website
                </Link>
                . Setelah form terkirim, kamu akan mendapat kode pesanan untuk cek status dan melanjutkan
                konsultasi lewat WhatsApp.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}