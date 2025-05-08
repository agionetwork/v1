<<<<<<< HEAD
import { authMiddleware } from "@civic/auth-web3/nextjs/middleware"

export default authMiddleware()

export const config = {
  matcher: [ "/api/:path*", "/admin/:path*" ]
=======
import { authMiddleware } from '@civic/auth/nextjs/middleware'

export default authMiddleware({
  clientId: "65004c36-3e4f-41a1-b0eb-8a9fc72dbf04",
  oauthServer: "https://auth.civic.com"
});

export const config = {
  // Protege todas as rotas exceto a landing page
  matcher: [
    '/((?!_next|favicon.ico|sitemap.xml|robots.txt|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.gif|waitlist).*)',
  ],
>>>>>>> 025e3451d4709ad6790584b8ac4d22891d03b944
} 