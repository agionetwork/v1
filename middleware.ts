import { authMiddleware } from "@civic/auth-web3/nextjs/middleware"

// Use client ID directly here to avoid any potential SSR/ESM import issues
const CIVIC_CLIENT_ID = "65004c36-3e4f-41a1-b0eb-8a9fc72dbf04"

export default authMiddleware({
  // Use hardcoded client ID to avoid any import issues
  clientId: CIVIC_CLIENT_ID,
  // Routes that require authentication
  include: ["/dashboard/*", "/borrow-lend/*", "/loan-offers/*"],
  // Public routes that don't require authentication
  exclude: ["/_next/*", "/", "/api/*", "/images/*", "/favicon.ico", "/fonts/*"]
})

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|sitemap.xml|robots.txt|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.gif|api).*)',
  ],
} 