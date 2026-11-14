import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { PortfolioCard } from "@/components/cards/PortfolioCard";
import { portfolio, services } from "@/lib/site";

export default function HomePage() {
  const featuredServices = services.slice(0, 6);
  const featuredPortfolio = portfolio.slice(0, 3);

  return (
    <main>
      <Hero />

      <section className="border-b border-line bg-white py-20">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
                Layanan
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
                Jenis website yang bisa dibuat
              </h2>
              <p className="mt-4 max-w-xl text-base text-navy/70">
                Mulai dari website tugas dan portofolio sampai sistem informasi, e-commerce, dan
                proyek custom.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ButtonLink href="/services" variant="secondary" withArrow>
                Lihat semua layanan
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <ProcessSection />

      <section className="border-b border-line bg-soft py-20">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
                Portfolio
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
                Contoh hasil website
              </h2>
              <p className="mt-4 max-w-xl text-base text-navy/70">
                Sebagian contoh tampilan dan struktur konten yang pernah dibuat.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <ButtonLink href="/portfolio" variant="secondary" withArrow>
                Lihat portfolio
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredPortfolio.map((item, index) => (
              <PortfolioCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </Container>
      </section>

      <TestimonialsSection />
      <CtaBand />
    </main>
  );
}
