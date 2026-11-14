import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/icons";
import { formatIDR, waLink, type ServicePackage } from "@/lib/site";

type PackageCardProps = {
  pack: ServicePackage;
  index?: number;
};

export function PackageCard({ pack, index = 0 }: PackageCardProps) {
  const highlighted = Boolean(pack.highlighted);
  const waMessage = pack.price
    ? `Halo Student Web Studio, saya tertarik paket ${pack.name}.`
    : `Halo Student Web Studio, saya mau diskusi proyek custom.`;

  return (
    <Reveal delay={index * 90}>
      <div
        className={`relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
          highlighted
            ? "border-violet bg-navy text-white shadow-hover"
            : "border-line bg-white text-navy shadow-card hover:shadow-hover"
        }`}
      >
        {highlighted ? (
          <span className="absolute -top-3 right-6 rounded-full bg-violet px-3 py-1 text-xs font-semibold text-white">
            Paling populer
          </span>
        ) : null}

        <h3 className="font-display text-xl font-bold">{pack.name}</h3>
        <p className={`mt-2 text-sm leading-relaxed ${highlighted ? "text-white/70" : "text-navy/65"}`}>
          {pack.description}
        </p>

        <div className="mt-6">
          <span className="font-display text-3xl font-bold">
            {pack.price ? formatIDR(pack.price) : "Custom"}
          </span>
          <span className={`text-sm font-medium ${highlighted ? "text-white/60" : "text-navy/50"}`}>
            {pack.price ? " /proyek" : " sesuai scope"}
          </span>
        </div>
        <p className={`mt-1 text-sm ${highlighted ? "text-white/60" : "text-navy/55"}`}>
          Estimasi {pack.timeline}
        </p>

        <ul className="mt-6 flex-1 space-y-3">
          {pack.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span className={highlighted ? "text-white/80" : "text-navy/75"}>{feature}</span>
            </li>
          ))}
        </ul>

        <ButtonLink
          href={waLink(waMessage)}
          external
          variant={highlighted ? "light" : "primary"}
          className="mt-8 w-full"
        >
          {pack.price ? "Pilih paket" : "Diskusikan proyek"}
        </ButtonLink>
      </div>
    </Reveal>
  );
}