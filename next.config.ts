import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  experimental: { cpus: 2 },
};
export default config;
