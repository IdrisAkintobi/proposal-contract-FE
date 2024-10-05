/** @type {import('next').NextConfig} */
import { resolve } from "node:path";
const cwd = process.cwd();
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.alias["@"] = resolve(cwd, "src");
    config.resolve.alias["@/components"] = resolve(cwd, "src/app/components");
    config.resolve.alias["@/hooks"] = resolve(cwd, "src/app/hooks");
    config.resolve.alias["@/context"] = resolve(cwd, "src/app/context");
    return config;
  },
};

export default nextConfig;
