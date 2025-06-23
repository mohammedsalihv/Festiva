import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { multipleImageUpload } from "./multer";
import { statusCodes } from "../messages/constantResponses";

export const withImageUpload = (
  controller: (req: Request, res: Response) => void
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    multipleImageUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(statusCodes.entityTooLarge)
            .json({ error: "One or more files are too large" });
        }
        return res.status(statusCodes.badRequest).json({ error: err.message });
      } else if (err) {
        return res.status(statusCodes.badRequest).json({ error: err.message });
      }

      controller(req, res);
    });
  };
};
