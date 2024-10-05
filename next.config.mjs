/** @type {import('next').NextConfig} */
import { resolve } from "node:path";
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.alias["@"] = resolve(process.cwd(), "src");
    return config;
  },
};

export default nextConfig;
