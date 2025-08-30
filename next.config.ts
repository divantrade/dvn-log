/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['sharp'],
  webpack: (config) => {
    config.externals = [...(config.externals || []), {
      'lightningcss': 'lightningcss',
      '@tailwindcss/postcss': '@tailwindcss/postcss'
    }]
    return config
  }
}
module.exports = nextConfig
