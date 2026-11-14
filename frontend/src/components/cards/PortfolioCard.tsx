import { Reveal } from "@/components/ui/Reveal";
import type { PortfolioItem } from "@/lib/site";

type PortfolioCardProps = {
  item: PortfolioItem;
  index?: number;
};

export function PortfolioCard({ item, index = 0 }: PortfolioCardProps) {
  return (
    <Reveal delay={index * 70}>
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover">
        <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${item.gradient}`}>
          <div
            aria-hidden="true"
            className="absolute inset-x-5 top-5 rounded-t-xl bg-white/20 backdrop-blur-sm"
          />
          <div className="absolute inset-5 top-8 rounded-xl bg-white/90 p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div className="h-2.5 w-20 rounded-full bg-navy/20" />
              <div className="flex gap-1.5">
                <div className="h-2 w-6 rounded-full bg-navy/10" />
                <div className="h-2 w-6 rounded-full bg-navy/10" />
              </div>
            </div>
            <div className="mt-4 h-5 w-28 rounded-lg bg-navy/80" />
            <div className="mt-2 h-2.5 w-36 rounded-full bg-navy/15" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="h-10 rounded-lg bg-violet/15" />
              <div className="h-10 rounded-lg bg-accent/15" />
              <div className="h-10 rounded-lg bg-navy/10" />
            </div>
          </div>
          <span className="absolute left-5 top-5 rounded-full bg-navy/85 px-3 py-1 text-xs font-semibold text-white">
            {item.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-bold text-navy transition-colors group-hover:text-violet">
            {item.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">{item.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-soft px-2.5 py-1 text-xs font-medium text-navy/65"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}