import jwt, { SignOptions } from "jsonwebtoken";

interface User {
  id: string;
  username: string;
  role: string;
}

function generateUserToken(user: User): string {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const options: SignOptions = {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      ? parseInt(process.env.ACCESS_TOKEN_EXPIRY)
      : 3600, // Default to 1 hour if not set
    issuer: "", // Add your issuer here if needed
    audience: user.username,
  };

  const secret = process.env.ACCESS_TOKEN_SECRET as string;

  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }

  return jwt.sign(payload, secret, options);
}

export { generateUserToken };
