import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"
import type { NextConfig } from "next";
import { civicAuthConfig } from "./app/api/auth/civic-config";

const nextConfig: NextConfig = {
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
};

const withCivicAuth = createCivicAuthPlugin(civicAuthConfig);

export default withCivicAuth(nextConfig); 