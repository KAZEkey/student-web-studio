type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <div className={alignClasses}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base text-navy/70">{description}</p>
      ) : null}
    </div>
  );
}