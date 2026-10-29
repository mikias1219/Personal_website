import { ogImage } from "@/lib/og";
import { site } from "@/data/profile";
export function GET(req: Request) {
  return ogImage(new URL(req.url).searchParams.get("title") || site.role);
}
