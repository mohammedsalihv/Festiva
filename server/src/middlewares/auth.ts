
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  AuthRequest,
  JwtPayload,
} from "../domain/entities/controlInterface/authType";
import logger from "../utils/logger";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

if (!ACCESS_TOKEN_SECRET) {
  logger.error(
    "ACCESS_TOKEN_SECRET is undefined. Please check your environment variables."
  );
  throw new Error("ACCESS_TOKEN_SECRET is not set in environment variables.");
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies?.accesstoken ||
    (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

  if (!token) {
    res
      .status(401)
      .json({ message: "Access denied: No token provided", status: 401 });
    return;
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    req.auth = decoded;
    next();
  } catch (error) {
    logger.error("JWT verification failed:", error);
    res.status(403).json({ message: "Invalid or expired token", status: 498 });
  }
};

export const authorizeRoles = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const userRole = req.auth?.role;

    if (!req.auth || !userRole || !roles.includes(userRole)) {
      res
        .status(403)
        .json({
          message: "Unauthorized: Insufficient permissions",
          status: 403,
        });
      return;
    }

    next();
  };
};

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.auth?.role !== "admin") {
    res.status(403).json({ message: "Admin access required", status: 403 });
    return;
  }

  next();
};

export const isHost = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.auth?.role !== "host") {
    res.status(403).json({ message: "Host access required", status: 403 });
    return;
  }

  next();
};
