import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
  external?: boolean;
  withArrow?: boolean;
};

const variants = {
  primary:
    "bg-violet text-white hover:bg-navy focus-visible:bg-navy",
  secondary:
    "border border-line bg-white text-navy hover:border-violet hover:text-violet",
  light:
    "bg-white text-navy hover:bg-violet hover:text-white",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
  withArrow = false,
}: ButtonLinkProps) {
  const classes = [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300",
    variants[variant],
    className,
  ].join(" ");

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {withArrow ? <ArrowRightIcon className="h-4 w-4" /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {withArrow ? <ArrowRightIcon className="h-4 w-4" /> : null}
    </Link>
  );
}