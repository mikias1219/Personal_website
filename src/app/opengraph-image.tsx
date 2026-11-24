import { ogImage } from "@/lib/og";
import { site } from "@/data/profile";
export const alt = "Mikias Abate — Software Developer & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return ogImage(site.headline);
}
