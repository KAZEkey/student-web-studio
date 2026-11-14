import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { FaqList } from "@/components/sections/FaqList";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan umum seputar layanan pembuatan website, pemesanan, pembayaran, revisi, pengerjaan, dan sistem informasi.",
};

export default function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="FAQ"
        title="Pertanyaan yang sering ditanyakan"
        description="Kumpulan jawaban ringkas tentang cara pemesanan, pembayaran, revisi, waktu pengerjaan, dan dukungan setelah website selesai."
      />

      <section className="py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <FaqList />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Masih ada pertanyaan lain?"
        description="Konsultasikan dulu lewat WhatsApp. Kamu bisa bertanya sebelum memutuskan paket atau fitur."
      />
    </main>
  );
}