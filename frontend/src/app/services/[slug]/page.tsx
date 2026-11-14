import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CheckIcon } from "@/components/icons";
import { formatIDR, services, waLink } from "@/lib/site";

type ServiceDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServiceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return { title: "Layanan tidak ditemukan" };
  }

  return {
    title: service.name,
    description: service.short,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <main>
      <PageHero
        eyebrow={service.category}
        title={service.name}
        description={service.description}
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <Reveal className="lg:col-span-2">
              <div className="rounded-3xl border border-line bg-white p-7 shadow-card">
                <h2 className="font-display text-2xl font-bold text-navy">Fitur yang ditawarkan</h2>
                <p className="mt-3 text-base text-navy/70">
                  Fitur berikut adalah scope standar untuk layanan ini. Penambahan fitur bisa
                  didiskusikan pada tahap konsultasi.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 rounded-2xl bg-soft p-4 text-sm text-navy/80"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <aside className="h-full rounded-3xl border border-line bg-white p-7 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">
                  Estimasi layanan
                </p>
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="text-sm text-navy/60">Estimasi harga</p>
                    <p className="mt-1 font-display text-2xl font-bold text-navy">
                      {service.priceFrom ? `Mulai ${formatIDR(service.priceFrom)}` : "Custom"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-navy/60">Estimasi pengerjaan</p>
                    <p className="mt-1 text-base font-semibold text-navy">{service.timeline}</p>
                  </div>
                </div>
                <div className="mt-7 space-y-3">
                  <ButtonLink
                    href={waLink(
                      `Halo Student Web Studio, saya tertarik layanan ${service.name}.`
                    )}
                    external
                    withArrow
                  >
                    Pesan layanan ini
                  </ButtonLink>
                  <ButtonLink href="/contact" variant="secondary" className="w-full">
                    Isi formulir kebutuhan
                  </ButtonLink>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-soft py-20">
        <Container>
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-navy">Layanan lainnya</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((item, index) => (
              <ServiceCard key={item.slug} service={item} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}