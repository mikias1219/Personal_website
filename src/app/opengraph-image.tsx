import { ogImage } from "@/lib/og";
export const alt = "Mikias Abate — Software Developer & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return ogImage("I build products. And the AI inside.");
}
