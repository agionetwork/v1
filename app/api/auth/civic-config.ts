// Use hardcoded client ID to avoid any potential issues with ESM/CJS imports
const CIVIC_CLIENT_ID = "65004c36-3e4f-41a1-b0eb-8a9fc72dbf04"

export const civicAuthConfig = {
  clientId: CIVIC_CLIENT_ID,
  // Token storage settings
  storage: {
    type: "localStorage",
    prefix: "civic_auth_"
  }
} 