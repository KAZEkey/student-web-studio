import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={site.name}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet to-navy text-lg font-bold text-white shadow-card transition-transform duration-300 group-hover:-rotate-6">
        S
      </span>
      <span className={`font-display text-base font-bold ${dark ? "text-white" : "text-navy"}`}>
        Student Web Studio
      </span>
    </Link>
  );
}