/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.EXPORT === 'true' ? 'export' : undefined,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.jsdelivr.net' }],
    unoptimized: process.env.EXPORT === 'true'
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei']
};
module.exports = nextConfig;
