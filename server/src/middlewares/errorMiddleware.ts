// src/middleware/errorMiddleware.ts
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import { ERROR_MESSAGES, ERROR_CODES } from "../config/errorConstants";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  let statusCode = err.statusCode || ERROR_CODES.INTERNAL_SERVER_ERROR;
  let message = err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;


  if (err.name === "CastError") {
    message = `${ERROR_MESSAGES.INVALID_OBJECT_ID}: ${err.path}`;
    statusCode = ERROR_CODES.BAD_REQUEST;
  }


  if (err.name === "JsonWebTokenError") {
    message = ERROR_MESSAGES.INVALID_JWT;
    statusCode = ERROR_CODES.UNAUTHORIZED;
  }

  if (err.name === "TokenExpiredError") {
    message = ERROR_MESSAGES.EXPIRED_JWT;
    statusCode = ERROR_CODES.UNAUTHORIZED;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ");
    message = `${ERROR_MESSAGES.DUPLICATE_ENTRY}${field}`;
    statusCode = ERROR_CODES.BAD_REQUEST;
  }


  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
