import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(91,92,226,0.12),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(32,201,151,0.10),transparent_30%)]"
      />
      <Container className="relative py-16 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-navy sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-navy/70">{description}</p>
        </Reveal>
      </Container>
    </section>
  );
}