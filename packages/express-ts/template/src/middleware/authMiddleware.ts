import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const jwt = require("jsonwebtoken");

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

// Middleware to verify JWT token
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get the token from the request header
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify and decode the token
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err: Error, decoded: string | JwtPayload | undefined) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // Attach the decoded payload to the request object
      req.user = decoded;

      // Call the next middleware
      next();
    }
  );
};

export { verifyToken };
