import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../domain/entities/controlInterface/authType";
import { JwtPayload } from "../domain/entities/controlInterface/authType";
import logger from "../utils/logger";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

if (!ACCESS_TOKEN_SECRET) {
  logger.error(
    "ACCESS_TOKEN_SECRET is undefined! Check your .env file or environment variables."
  );
  throw new Error("ACCESS_TOKEN_SECRET environment variable is not set.");
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies?.accesstoken ||
    (authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null);
  if (!token) {
    res
      .status(401)
      .json({ message: "Access Denied: No token provided", status: 401 });
    return;
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    req.auth = decoded;
    next();
  } catch (error) {
    console.log(" JWT Verification Error:", error);
    res.status(403).json({ message: "Invalid token", status: 498 });
  }
};

export const authrizeRoles = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const role = req.auth?.role;
    if (!req.auth || !role || !roles.includes(role)) {
      res
        .status(403)
        .json({ message: "Unauthorized: Insufficient permissions" });
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
  try {
    if (req.auth?.role !== "admin") {
      res.status(403).json({ message: "Admin access required", status: 403 });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};

export const isHost = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    if (req.auth?.role !== "host") {
      res.status(403).json({ message: "Host access required", status: 403 });
      return;
    }
    next();
  } catch (error) {
    logger.error(error);
  }
};
