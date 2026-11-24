import { ImageResponse } from "next/og";
import { site } from "@/data/profile";

export function ogImage(title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          background: "#0b1220",
          color: "#e8eef8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
          }}
        >
          <span>MA · {site.name}</span>
          <span style={{ color: "#60a5fa" }}>Software & AI</span>
        </div>
        <div
          style={{
            fontSize: title.length > 40 ? 64 : 82,
            lineHeight: 1.1,
            letterSpacing: "-3px",
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {title.slice(0, 100)}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #243044",
            paddingTop: 24,
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          <span>{site.role}</span>
          <span>
            {site.location} · {site.utcOffset}
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
