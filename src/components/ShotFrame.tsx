import Image from "next/image";

/**
 * Presents a screenshot inside a lightweight browser frame, so product shots
 * read as real software and not as loose images.
 */
export function ShotFrame({
  src,
  alt,
  width,
  height,
  label,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 640px",
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-card ${className}`}
    >
      <div
        className="flex items-center gap-2 border-b border-line bg-surface-2 px-3 py-2"
        aria-hidden
      >
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="ml-2 truncate rounded-md bg-bg/60 px-3 py-0.5 text-[0.7rem] text-muted">
          {label}
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </div>
  );
}
