import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MailIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { nav, services, site, waLink } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:max-w-sm">
            <Logo dark />
            <p className="mt-4 text-sm leading-relaxed text-white/70">{site.tagline}</p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">Navigasi</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">Layanan</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">Kontak</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <a
                  href={waLink("Halo Student Web Studio, saya mau tanya layanan website.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <WhatsAppIcon className="h-4 w-4 text-accent" />
                  Konsultasi WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <MailIcon className="h-4 w-4 text-violet" />
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <PinIcon className="h-4 w-4 text-white/40" />
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {year} {site.name}. Dibuat dengan Next.js dan Laravel.
        </div>
      </Container>
    </footer>
  );
}