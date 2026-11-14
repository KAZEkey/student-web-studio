import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/site";

export function FaqList() {
  return (
    <div className="grid gap-4">
      {faqs.map((faq, index) => (
        <Reveal key={faq.question} delay={index * 50}>
          <details className="group rounded-3xl border border-line bg-white p-6 shadow-card open:border-violet/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-navy">
              {faq.question}
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-soft text-navy transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-navy/70">{faq.answer}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}