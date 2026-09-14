import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  env: process.env.VERCEL
    ? {
        DATABASE_URL: "file:/tmp/dev.db",
      }
    : undefined,
  outputFileTracingIncludes: {
    "/api/**/*": ["./prisma/dev.db"],
  },
};

export default nextConfig;
