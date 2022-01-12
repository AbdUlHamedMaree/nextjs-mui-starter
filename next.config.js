/** @type {import('next').NextConfig} */
module.exports = {
  distDir: (process.env.DIST_DIR || 'dist').trim(),
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack5: true,
  optimizeFonts: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};
