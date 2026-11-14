import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/site";

export function TestimonialsSection() {
  return (
    <section className="border-b border-line bg-soft py-20">
      <Container>
        <SectionHeading
          eyebrow="Testimoni"
          title="Klien yang merasa lebih tenang"
          description="Website selesai bukan hanya urusan kode, tapi juga kejelasan komunikasi dan kepastian hasil."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 80}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card">
                <div className="flex text-accent" aria-hidden="true">
                  {[...Array(5)].map((_, star) => (
                    <span key={star} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy/75">
                  “{testimonial.message}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-display text-lg font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-navy">{testimonial.name}</p>
                    <p className="text-xs text-navy/55">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}