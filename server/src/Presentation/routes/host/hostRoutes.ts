import express, { Request } from "express";
import { hostVenueController } from "../../../infrastructure/DI/host/hostVenue.DI";
import {
  authenticateToken,
  isHost,
} from "../../../utils/common/middlewares/auth";
import { multipleImageUpload } from "../../../utils/common/middlewares/multer";

interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

const hostRoutes = express.Router();

hostRoutes.post(
  "/addVenue",
  authenticateToken,
  isHost,
  multipleImageUpload,
  async (req, res) =>
    await hostVenueController.addVenue(req as MulterRequest, res)
);

export default hostRoutes;
