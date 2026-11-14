"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { nav, waLink } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-soft/85 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active ? "text-violet" : "text-navy/70 hover:text-navy hover:bg-navy/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <ButtonLink href={waLink("Halo Student Web Studio, saya mau konsultasi website.")} external>
              Konsultasi
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-navy lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-line bg-soft lg:hidden">
          <Container className="py-4">
            <nav className="grid gap-1" aria-label="Navigasi seluler">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    pathname === item.href
                      ? "bg-white text-violet"
                      : "text-navy/75 hover:bg-white hover:text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ButtonLink
              href={waLink("Halo Student Web Studio, saya mau konsultasi website.")}
              external
              className="mt-4 w-full"
            >
              Konsultasi via WhatsApp
            </ButtonLink>
          </Container>
        </div>
      ) : null}
    </header>
  );
}