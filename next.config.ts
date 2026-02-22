import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ["potrace", "jimp", "imagetracerjs"],
};

export default nextConfig;
