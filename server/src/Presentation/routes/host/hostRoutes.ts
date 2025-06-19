import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import { hostVenueController } from "../../../infrastructure/DI/host/hostVenue.DI";
import {
  authenticateToken,
  isHost,
} from "../../../utils/common/middlewares/auth";
import { multipleImageUpload } from "../../../utils/common/middlewares/multer";

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
}
const hostRoutes = express.Router();

hostRoutes.post(
  "/addVenue",
  authenticateToken,
  isHost,
  (req: Request, res: Response, next: NextFunction) => {
    multipleImageUpload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(413)
            .json({ error: "One or more files are too large" });
        }
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      hostVenueController.addVenue(req as MulterRequest, res);
    });
  }
);
export default hostRoutes;
