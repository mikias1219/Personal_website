"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/profile";

function formatTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 30_000);
  return () => window.clearInterval(id);
}

export function LocalTime() {
  const time = useSyncExternalStore(subscribe, formatTime, () => "");

  return (
    <span>
      {site.location} · {site.utcOffset}
      {time ? ` · ${time} local` : ""}
    </span>
  );
}
