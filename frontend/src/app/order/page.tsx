import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { OrderClient } from "@/components/sections/OrderClient";

export const metadata: Metadata = {
  title: "Pesan Website",
  description:
    "Buat pesanan website baru atau cek status dan progres pengerjaan proyek kamu lewat kode pesanan.",
};

export default function OrderPage() {
  return (
    <main>
      <PageHero
        eyebrow="Pemesanan"
        title="Buat pesanan atau cek status proyek"
        description="Isi form untuk memulai pesanan baru, atau masukkan kode pesanan untuk melihat status dan progres pengerjaan."
      />
      <section className="py-16">
        <Container>
          <OrderClient />
        </Container>
      </section>
    </main>
  );
}