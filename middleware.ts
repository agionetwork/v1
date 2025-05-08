import { authMiddleware } from "@civic/auth-web3/nextjs/middleware"

export default authMiddleware({
  clientId: "65004c36-3e4f-41a1-b0eb-8a9fc72dbf04",
  oauthServer: "https://auth.civic.com"
})

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|sitemap.xml|robots.txt|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.gif|waitlist).*)',
  ],
} 