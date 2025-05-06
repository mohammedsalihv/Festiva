import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../domain/entities/controlInterface/authType";
import { JwtPayload } from "../domain/entities/controlInterface/authType";
import logger from "../utils/logger";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

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
    res.status(401).json({ message: "Access Denied: No token provided" });
    return;
  }

  try {
    let decode = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    req.user = decode;
    next();
  } catch (error) {
    logger.info(error);
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};

export const authrizeRoles = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res
        .status(403)
        .json({ message: "Unauthorized: Insufficient permissions" });
      return;
    }
    next();
  };
};
