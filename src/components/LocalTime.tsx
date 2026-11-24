"use client";
import { useEffect, useState } from "react";
import { site } from "@/data/profile";

export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: site.timeZone,
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    const frame = requestAnimationFrame(update);
    const timer = setInterval(update, 30000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(timer);
    };
  }, []);
  return (
    <span suppressHydrationWarning>
      {time
        ? `${site.location}. It’s ${time} there (${site.utcOffset}).`
        : `${site.location} (${site.utcOffset})`}
    </span>
  );
}
