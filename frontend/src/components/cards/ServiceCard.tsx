import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/icons";
import { formatIDR, type Service } from "@/lib/site";

type ServiceCardProps = {
  service: Service;
  index?: number;
};

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <Reveal delay={index * 70}>
      <Link
        href={`/services/${service.slug}`}
        className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 hover:shadow-hover"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-violet-soft px-3 py-1 text-xs font-semibold text-violet">
            {service.category}
          </span>
          <span className="text-xs font-medium text-navy/50">{service.timeline}</span>
        </div>

        <h3 className="mt-4 font-display text-xl font-bold text-navy">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/65">{service.short}</p>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <span className="text-sm font-semibold text-navy">
            {service.priceFrom ? `Mulai ${formatIDR(service.priceFrom)}` : "Harga custom"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet transition-transform duration-300 group-hover:translate-x-1">
            Detail
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}