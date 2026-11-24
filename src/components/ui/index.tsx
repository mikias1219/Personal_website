import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({
  children,
  className = "",
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={`container ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={`section ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}

export function SectionHead({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-head">
      <div>
        <h2 className="section-title">{title}</h2>
        {lede && <p className="section-lede">{lede}</p>}
      </div>
      {children}
    </div>
  );
}

type ButtonProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: "primary" | "secondary";
  size?: "default" | "small";
};

/** Internal paths use next/link; mailto:, downloads and external URLs use a plain anchor. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  const classes =
    `button button-${variant} ${size === "small" ? "button-small" : ""} ${className}`.trim();
  const internal = href.startsWith("/") || href.startsWith("#");
  if (internal && !props.download)
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
