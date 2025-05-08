import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  }
}

const withCivicAuth = createCivicAuthPlugin({
  clientId: "65004c36-3e4f-41a1-b0eb-8a9fc72dbf04"
})

export default withCivicAuth(nextConfig)
