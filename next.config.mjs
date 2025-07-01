import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: resolve(__dirname, 'node_modules/crypto-browserify'),
      stream: resolve(__dirname, 'node_modules/stream-browserify'),
      buffer: resolve(__dirname, 'node_modules/buffer/'),
    }
    return config
  },
  // Configuração de headers simplificada para desenvolvimento
  async headers() {
    const isDev = process.env.NODE_ENV === 'development'
    
    if (isDev) {
      // Em desenvolvimento, usar configuração mais permissiva
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https: blob:; font-src 'self' data: https:; connect-src 'self' https: wss: blob:;"
            }
          ]
        }
      ]
    }
    
    // Configuração de produção
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.solana.com https://*.civic.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self';
              connect-src 'self' https://*.solana.com https://*.civic.com wss://*.solana.com;
              frame-src 'self' https://*.solana.com https://*.civic.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              block-all-mixed-content;
              upgrade-insecure-requests;
            `.replace(/\s+/g, ' ').trim()
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },
  // Otimiza o bundle size
  swcMinify: true,
  compiler: {
    removeConsole: false // Mantém os logs em todas as ambientes
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
