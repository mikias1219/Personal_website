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
          background: "#0b0e11",
          color: "#edf2f1",
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
          <span style={{ color: "#4fd6b0" }}>SOFTWARE / AI</span>
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
            borderTop: "1px solid #29332f",
            paddingTop: 24,
            fontSize: 22,
            color: "#a0adaa",
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
