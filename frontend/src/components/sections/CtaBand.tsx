import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { waLink } from "@/lib/site";

type CtaBandProps = {
  title?: string;
  description?: string;
};

export function CtaBand({
  title = "Siap mulai proyek website?",
  description = "Ceritakan kebutuhanmu sekarang. Saya bantu susun scope, estimasi waktu, dan rekomendasi paket yang paling cocok.",
}: CtaBandProps) {
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 h-56 w-4/5 -translate-x-1/2 rounded-full bg-violet/30 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
              <p className="mt-4 text-white/70">{description}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href="/contact">Isi kebutuhan website</ButtonLink>
                <ButtonLink
                  href={waLink("Halo Student Web Studio, saya mau mulai proyek website.")}
                  external
                  variant="light"
                >
                  Chat WhatsApp
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}