import express, { Request } from "express";
import { VenueController } from "../../../infrastructure/frameworks/DependencyInjection/host/Service.dependancyContainer";
import logger from "../../../utils/logger";
import { authenticateToken, isHost } from "../../../middlewares/auth";
import { multipleImageUpload } from "../../../middlewares/multer";

interface MulterRequest extends Request {
  files?: Express.Multer.File[];
}

const hostRoutes = express.Router();

hostRoutes.post(
  "/addVenue",
  authenticateToken,
  isHost,
  multipleImageUpload,
  async (req, res) => {
    try {
      await VenueController.addVenue(req as MulterRequest, res);
    } catch (error) {
      logger.info(error);
      res
        .status(500)
        .json({ message: "An error occurred while adding the venue" });
    }
  }
);

export default hostRoutes;
