/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    cpus: 1,
  },
  allowedDevOrigins: ["*.metasal.xyz", "rpccheck.metasal.xyz"],
}

export default nextConfig
