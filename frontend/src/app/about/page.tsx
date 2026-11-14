import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { advantages, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Student Web Studio",
  description:
    "Profil, visi, misi, dan keunggulan layanan pembuatan website untuk mahasiswa, organisasi kampus, UMKM, dan kebutuhan custom.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="Tentang kami"
        title="Layanan website yang sederhana dan terarah"
        description="Student Web Studio fokus membantu mahasiswa, organisasi, dan UMKM memperoleh website yang jelas tujuannya: rapi, responsif, dan mudah dipahami."
      />

      <section className="py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
                  Profil penyedia jasa
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold text-navy">
                  Dikerjakan langsung oleh satu developer
                </h2>
                <p className="mt-4 text-base text-navy/70">
                  {site.name} dikelola oleh satu orang, jadi komunikasi lebih langsung dan tidak
                  berpindah-pindah kontak. Kamu bisa bicara langsung tentang tujuan, fitur, dan
                  progres website.
                </p>
                <p className="mt-4 text-base text-navy/70">
                  Proyek dikerjakan secara terstruktur: mulai dari pemetaan kebutuhan, penyusunan
                  scope, pembuatan desain, pengembangan fitur, hingga pengujian sebelum di-deliver.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-3xl border border-line bg-white p-8 shadow-card">
                <h2 className="font-display text-2xl font-bold text-navy">Visi</h2>
                <p className="mt-3 text-base text-navy/70">
                  Membantu mahasiswa dan pelaku UMKM memiliki website yang berfungsi nyata, bukan
                  hanya sekadar punya alamat web.
                </p>
                <h2 className="mt-7 font-display text-2xl font-bold text-navy">Misi</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Membuat website yang jelas tujuan dan audiensnya",
                    "Menyediakan proses pengerjaan yang terbuka dan bisa dipantau",
                    "Mengutamakan tampilan responsif dan pengalaman pengguna",
                    "Memberikan panduan agar website tetap mudah digunakan",
                  ].map((mission) => (
                    <li key={mission} className="flex items-start gap-3 text-sm text-navy/75">
                      <span className="mt-2 h-2 w-2 rounded-full bg-violet" />
                      {mission}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-20">
        <Container>
          <SectionHeading eyebrow="Keunggulan" title="Kenapa bisa lebih tenang mengerjakan proyek" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((advantage, index) => (
              <Reveal key={advantage} delay={index * 70}>
                <div className="h-full rounded-3xl border border-line bg-soft p-6">
                  <span className="font-display text-2xl font-bold text-violet/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-base font-semibold text-navy">{advantage}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ProcessSection />
      <CtaBand />
    </main>
  );
}