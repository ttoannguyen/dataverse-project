export const jwtConfig = {
  secret: process.env.JWT_SECRET || "your-secret-key",
  expiresIn: "1h",
};
