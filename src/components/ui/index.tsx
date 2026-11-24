import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] font-semibold no-underline transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-55";

const buttonVariants = {
  primary:
    "border border-transparent bg-accent text-on-accent hover:brightness-110 active:scale-[0.98]",
  secondary:
    "border border-line bg-transparent text-text hover:bg-surface-2 active:scale-[0.98]",
  ghost:
    "border border-transparent bg-transparent text-muted hover:bg-surface-2 hover:text-text",
} as const;

type ButtonVariant = keyof typeof buttonVariants;

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  download,
  ...props
}: {
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  download?: string | boolean;
} & Omit<ComponentProps<"button">, "className"> &
  Omit<ComponentProps<"a">, "className" | "href">) {
  const classes = `${buttonBase} ${buttonVariants[variant]} ${className}`.trim();
  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external || download) {
      return (
        <a
          className={classes}
          href={href}
          download={download || undefined}
          {...(external && !href.startsWith("mailto:")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[75rem] px-5 sm:px-6 lg:px-8 ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  ariaLabelledby,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`scroll-mt-24 py-24 md:py-28 ${className}`.trim()}
    >
      {children}
    </section>
  );
}

export function SectionHead({
  title,
  lede,
  titleId,
  action,
}: {
  title: string;
  lede: string;
  titleId: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-12">
      <div className="max-w-2xl">
        <h2 id={titleId} className="text-3xl tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-[70ch] text-base text-muted md:text-lg">
          {lede}
        </p>
      </div>
      {action}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface p-6 shadow-card ${className}`.trim()}
    >
      {children}
    </div>
  );
}
