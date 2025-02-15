import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to authenticate user token
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      exp: number; // Expiry timestamp
    };

    // Check if the token has expired
    if (decoded.exp * 1000 < Date.now()) {
      res.status(403).json({ message: "Token has expired." });
      return;
    }

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token." });
    return;
  }
};

export default authenticateToken;
