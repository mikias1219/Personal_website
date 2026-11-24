import Link from "next/link";
import type { ReactNode } from "react";

function safeHref(value: string) {
  if ((value.startsWith("/") && !value.startsWith("//")) || value.startsWith("#"))
    return value;
  try {
    const url = new URL(value);
    return ["https:", "http:", "mailto:"].includes(url.protocol)
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function inline(text: string): ReactNode[] {
  const pieces: ReactNode[] = [];
  const tokens =
    /(\*\*[^*\n]+\*\*|`[^`\n]+`|\[[^\]\n]+\]\([^\s)]+\))/g;
  let start = 0;
  for (const match of text.matchAll(tokens)) {
    if (match.index! > start) pieces.push(text.slice(start, match.index));
    const value = match[0];
    const key = match.index;
    if (value.startsWith("**"))
      pieces.push(<strong key={key}>{value.slice(2, -2)}</strong>);
    else if (value.startsWith("`"))
      pieces.push(
        <code
          key={key}
          className="rounded bg-surface px-1 py-0.5 text-[0.9em]"
        >
          {value.slice(1, -1)}
        </code>,
      );
    else {
      const link = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/)!;
      const href = safeHref(link[2]);
      pieces.push(
        href ? (
          href.startsWith("/") || href.startsWith("#") ? (
            <Link
              key={key}
              href={href}
              className="font-semibold text-accent underline underline-offset-2"
            >
              {link[1]}
            </Link>
          ) : (
            <a
              key={key}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="font-semibold text-accent underline underline-offset-2"
            >
              {link[1]}
            </a>
          )
        ) : (
          <span key={key}>{link[1]}</span>
        ),
      );
    }
    start = match.index! + value.length;
  }
  if (start < text.length) pieces.push(text.slice(start));
  return pieces;
}

/** A small, text-only Markdown renderer: no HTML interpretation or executable URLs. */
export function ChatAnswer({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith("```")) {
      const start = i++;
      const code: string[] = [];
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      if (i < lines.length) i++;
      blocks.push(
        <pre
          key={start}
          className="overflow-x-auto rounded-xl bg-surface p-3 text-xs"
        >
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }
    if (/^#{1,6}\s/.test(line)) {
      blocks.push(
        <h3 key={i} className="mt-3 text-sm font-semibold first:mt-0">
          {inline(line.replace(/^#{1,6}\s+/, ""))}
        </h3>,
      );
      i++;
      continue;
    }
    if (/^\s*([-*•]|\d+[.)])\s+/.test(line)) {
      const start = i;
      const ordered = /^\s*\d+[.)]\s/.test(line);
      const items: ReactNode[] = [];
      while (
        i < lines.length &&
        (ordered ? /^\s*\d+[.)]\s+/ : /^\s*[-*•]\s+/).test(lines[i])
      ) {
        items.push(
          <li key={i} className="leading-relaxed">
            {inline(lines[i].replace(/^\s*([-*•]|\d+[.)])\s+/, ""))}
          </li>,
        );
        i++;
      }
      blocks.push(
        ordered ? (
          <ol key={start} className="my-2 list-decimal space-y-1 pl-5">
            {items}
          </ol>
        ) : (
          <ul key={start} className="my-2 list-disc space-y-1 pl-5">
            {items}
          </ul>
        ),
      );
      continue;
    }
    const start = i;
    const paragraph = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6}\s|\s*[-*•]\s|\s*\d+[.)]\s|```)/.test(lines[i])
    )
      paragraph.push(lines[i++]);
    blocks.push(
      <p key={start} className="leading-relaxed">
        {inline(paragraph.join("\n"))}
      </p>,
    );
  }
  return <div className="space-y-2">{blocks}</div>;
}
