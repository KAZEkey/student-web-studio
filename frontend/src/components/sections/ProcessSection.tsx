import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/site";

export function ProcessSection() {
  return (
    <section className="border-b border-line bg-white py-20">
      <Container>
        <SectionHeading
          eyebrow="Proses kerja"
          title="Alur pengerjaan yang jelas"
          description="Kamu tahu website sedang berada di tahap apa. Tidak perlu menebak progres atau khawatir scope berubah tanpa kesepakatan."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 80}>
              <div className="relative h-full rounded-3xl border border-line bg-soft p-6">
                <span className="font-display text-4xl font-bold text-violet/20">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}