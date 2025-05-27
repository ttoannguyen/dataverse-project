export const oauthConfig = {
  clientId: process.env.CLIENT_ID || "your-client-id",
  clientSecret: process.env.CLIENT_SECRET || "your-client-secret",
  redirectUri:
    process.env.REDIRECT_URI || "http://localhost:3000/auth/callback",
  tokenSecret: process.env.TOKEN_SECRET || "your-token-secret",
  accessTokenExpiresIn: "1h",
  refreshTokenExpiresIn: "7d",
  issuer: process.env.ISSUER || "http://localhost:3000",
  allowedScopes: ["read:users", "write:users", "read:profile"],
};
