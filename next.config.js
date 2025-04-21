/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_CIVIC_CLIENT_ID: "65004c36-3e4f-41a1-b0eb-8a9fc72dbf04",
    CIVIC_OAUTH_SERVER: "https://auth.civic.com"
  }
}

export default nextConfig; 