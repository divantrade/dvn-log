/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['sharp'],
  },
  transpilePackages: ['@tailwindcss/postcss'],
}
module.exports = nextConfig
