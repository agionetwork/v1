import { authMiddleware } from "@civic/auth-web3/nextjs/middleware"

// Use client ID directly here to avoid any potential SSR/ESM import issues
const CIVIC_CLIENT_ID = "65004c36-3e4f-41a1-b0eb-8a9fc72dbf04"

export default authMiddleware({
  // Use hardcoded client ID to avoid any import issues
  clientId: CIVIC_CLIENT_ID,
  // Routes that require authentication
  include: ["/dashboard/*", "/borrow-lend/*", "/loan-offers/*"],
  // Public routes that don't require authentication - expanded to include all static assets
  exclude: [
    "/_next/*", 
    "/", 
    "/api/*", 
    "/images/*", 
    "/favicon.ico", 
    "/fonts/*",
    "/_next/static/*",
    "/_next/webpack-hmr",
    "/manifest.json",
    "/robots.txt",
    "/sitemap.xml"
  ]
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|images|fonts|manifest.json|robots.txt|sitemap.xml|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.ico|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.eot|.*\\.css|.*\\.js|.*\\.map).*)',
  ],
} 