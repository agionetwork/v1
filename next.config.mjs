import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  }
}

// Use hardcoded client ID to avoid any ESM/CJS issues
const CIVIC_CLIENT_ID = "65004c36-3e4f-41a1-b0eb-8a9fc72dbf04"

const withCivicAuth = createCivicAuthPlugin({
  clientId: CIVIC_CLIENT_ID,
  storage: {
    type: "localStorage",
    prefix: "civic_auth_"
  }
})

export default withCivicAuth(nextConfig)
