"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { adminApi, adminToken } from "@/lib/api";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/orders", label: "Pesanan" },
  { href: "/admin/projects", label: "Proyek" },
  { href: "/admin/services", label: "Layanan" },
  { href: "/admin/packages", label: "Paket" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/testimonials", label: "Testimoni" },
  { href: "/admin/settings", label: "Pengaturan" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!adminToken.get()) router.replace("/admin/login");
  }, [router]);

  const logout = async () => {
    await adminApi.logout();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-navy/5">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-line bg-white lg:block">
          <div className="p-6">
            <p className="font-display text-lg font-bold text-navy">Student Web Studio</p>
            <p className="text-xs text-navy/60">Panel Admin</p>
          </div>
          <nav className="space-y-1 px-3 pb-6">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-4 py-2 text-sm font-medium transition ${
                    active ? "bg-violet text-white" : "text-navy/70 hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={logout}
              className="mt-6 block w-full rounded-xl border border-line px-4 py-2 text-sm font-medium text-navy/70 hover:border-red-500 hover:text-red-600"
            >
              Keluar
            </button>
          </nav>
        </aside>

        <div className="flex-1">
          <header className="flex h-16 items-center justify-between border-b border-line bg-white px-6 lg:hidden">
            <span className="font-display font-bold text-navy">SWS Admin</span>
            <button type="button" onClick={logout} className="text-sm text-navy/70">Keluar</button>
          </header>
          <nav className="flex gap-1 overflow-x-auto border-b border-line bg-white px-4 py-2 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-3 py-1 text-xs font-medium ${
                  pathname === item.href ? "bg-violet text-white" : "text-navy/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <main className="p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}