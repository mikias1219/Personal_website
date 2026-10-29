import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Container({
  children,
  className = "",
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={`container ${className}`} {...props}>
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
    <section className={`section ${className}`} {...props}>
      {children}
    </section>
  );
}
export function Card({
  children,
  className = "",
  ...props
}: ComponentProps<"article">) {
  return (
    <article className={`card ${className}`} {...props}>
      {children}
    </article>
  );
}
export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}
export function Button({
  href,
  children,
  variant = "primary",
  ...props
}: ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "quiet";
}) {
  return (
    <Link href={href} className={`button button-${variant}`} {...props}>
      {children}
    </Link>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  children,
}: {
  number?: string;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          {number && <span>{number} / </span>}
          {label}
        </p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
