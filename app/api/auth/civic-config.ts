import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"

export const civicAuthConfig = {
  clientId: "65004c36-3e4f-41a1-b0eb-8a9fc72dbf04",
  // Configurações de armazenamento de token
  storage: {
    type: "localStorage",
    prefix: "civic_auth_"
  }
} 