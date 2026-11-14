import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Fraunces({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Jasa Pembuatan Website Mahasiswa & UMKM`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${inter.variable} ${jakarta.variable}`}><body className="min-h-screen bg-soft text-navy">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
