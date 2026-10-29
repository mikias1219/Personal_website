/** One canonical origin for metadata, links, APIs and the assistant. */
export const SITE_URL = (
  process.env.SITE_URL || "https://mikiasabatesite.vercel.app"
).replace(/\/$/, "");
export const absoluteUrl = (path = "/") =>
  new URL(path, `${SITE_URL}/`).toString();
