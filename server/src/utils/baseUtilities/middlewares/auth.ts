import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
  AuthRequest,
  JwtPayload,
} from "../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authType";
import logger from "../messages/logger";
import { statusCodes, statusMessages } from "../messages/constantResponses";
import { authenticationRequest } from "../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";

export const authenticateToken = (
  req: authenticationRequest,
  res: Response,
  next: NextFunction
): void => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

  if (!ACCESS_TOKEN_SECRET) {
    logger.error(statusMessages.noAccessToken);
    res
      .status(500)
      .json({ message: statusMessages.noAccessToken, status: 500 });
    return;
  }

  const authHeader = req.headers.authorization;
  const token =
    req.cookies?.accesstoken ||
    (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

  if (!token) {
    res
      .status(401)
      .json({
        message: statusMessages.noToken,
        status: statusCodes.unAuthorized,
      });
    return;
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    req.auth = decoded;
    next();
  } catch (error) {
    logger.error(statusMessages.jwtVerificationFailed, error);
    res
      .status(statusCodes.invalidToken)
      .json({
        message: statusMessages.invalidToken,
        status: statusCodes.invalidToken,
      });
    return;
  }
};

export const authorizeRoles = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const userRole = req.auth?.role;

    if (!req.auth || !userRole || !roles.includes(userRole)) {
      res.status(403).json({
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
