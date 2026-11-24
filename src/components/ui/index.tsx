import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] font-semibold no-underline transition duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-55";

const buttonVariants = {
  primary:
    "btn-grad text-on-accent active:scale-[0.98]",
  secondary:
    "border border-line bg-surface/60 text-text backdrop-blur hover:border-accent/60 hover:bg-surface-2 active:scale-[0.98]",
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
      className={`scroll-mt-24 py-20 md:py-28 ${className}`.trim()}
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
  eyebrow,
}: {
  title: string;
  lede: string;
  titleId: string;
  action?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden />
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={titleId}
          className="text-3xl tracking-tight md:text-5xl"
        >
          {title}
        </h2>
        <p className="mt-4 max-w-[62ch] text-base text-muted md:text-lg">
          {lede}
        </p>
      </div>
      {action}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-surface-2/70 px-3 py-1 text-[0.8rem] font-medium text-muted">
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
      className={`card-glow rounded-[1.25rem] border border-line bg-surface p-6 shadow-card ${className}`.trim()}
    >
      {children}
    </div>
  );
}
