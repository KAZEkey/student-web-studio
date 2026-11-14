import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/icons";
import { waLink } from "@/lib/site";

const trustPoints = [
  "Konsultasi gratis",
  "Scope & harga jelas",
  "Responsif di HP, tablet, desktop",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-soft">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(91,92,226,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(32,201,151,0.12),transparent_36%)]"
      />
      <Container className="relative py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
                Jasa website mahasiswa & UMKM
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl lg:text-6xl">
                Website rapi untuk tugas, organisasi, dan bisnismu.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-navy/70">
                Saya membantu membuat website yang jelas tujuannya: untuk tugas, proyek kampus,
                organisasi, UMKM, atau sistem informasi. Mulai dari diskusi kebutuhan sampai
                website siap digunakan.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href="/pricing">Lihat paket harga</ButtonLink>
                <ButtonLink
                  href={waLink("Halo Student Web Studio, saya mau konsultasi website.")}
                  external
                  variant="secondary"
                >
                  Konsultasi WhatsApp
                </ButtonLink>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy/65">
                {trustPoints.map((point) => (
                  <li key={point} className="inline-flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-violet/20 via-violet-soft to-accent/10 blur-2xl"
              />
              <div className="rounded-3xl border border-line bg-white p-4 shadow-hover">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-violet/70" />
                  <span className="h-3 w-3 rounded-full bg-accent/70" />
                  <span className="h-3 w-3 rounded-full bg-navy/20" />
                  <span className="ml-3 rounded-md bg-soft px-2.5 py-1 text-xs text-navy/50">
                    studentwebstudio.id
                  </span>
                </div>

                <div className="mt-4 space-y-4 rounded-2xl bg-soft p-5">
                  <div className="flex items-center justify-between">
                    <div className="h-2.5 w-28 rounded-full bg-navy/15" />
                    <div className="flex gap-2">
                      <div className="h-2 w-10 rounded-full bg-navy/10" />
                      <div className="h-2 w-10 rounded-full bg-navy/10" />
                      <div className="h-2 w-10 rounded-full bg-navy/10" />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-violet to-navy p-6 text-white">
                    <div className="h-3 w-32 rounded-full bg-white/30" />
                    <div className="mt-3 h-6 w-52 rounded-xl bg-white/80" />
                    <div className="mt-2 h-3 w-40 rounded-full bg-white/25" />
                    <div className="mt-5 flex gap-2">
                      <div className="h-8 w-24 rounded-lg bg-white" />
                      <div className="h-8 w-24 rounded-lg border border-white/40" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {["Layanan", "Portfolio", "Kontak"].map((label) => (
                      <div key={label} className="rounded-xl bg-white p-3 shadow-card">
                        <div className="h-8 w-8 rounded-lg bg-violet/15" />
                        <div className="mt-3 h-2.5 w-16 rounded-full bg-navy/15" />
                        <div className="mt-2 h-2 w-full rounded-full bg-navy/10" />
                        <span className="sr-only">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-line bg-white px-4 py-3 shadow-card sm:block">
                <p className="text-xs font-semibold text-navy">Responsif di semua layar</p>
                <p className="text-xs text-navy/60">HP · Tablet · Desktop</p>
              </div>

              <div className="absolute -right-5 -top-5 hidden rounded-2xl border border-line bg-white px-4 py-3 shadow-card sm:block">
                <p className="text-xs font-semibold text-navy">Kode rapi</p>
                <p className="text-xs text-navy/60">Next.js · Laravel · MySQL</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}