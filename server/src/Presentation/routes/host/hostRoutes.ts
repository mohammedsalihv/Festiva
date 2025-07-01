import express, { Request, Response, NextFunction } from "express";
import { hostVenueController } from "../../../infrastructure/DI/host/hostVenue.DI";
import { hostRentCarController } from "../../../infrastructure/DI/host/hostRentCar.DI";
import { hostCatersController } from "../../../infrastructure/DI/host/hostCaters.DI";
import { hostStudioController } from "../../../infrastructure/DI/host/hostStudio.DI";
import {
  authenticateToken,
  isHost,
} from "../../../utils/common/middlewares/auth";
import { withImageUpload } from "../../../utils/common/middlewares/withImageUpload";

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
}
const hostRoutes = express.Router();

hostRoutes.post(
  "/addVenue",
  authenticateToken,
  isHost,
  withImageUpload((req, res) =>
    hostVenueController.addVenueService(req as MulterRequest, res)
  )
);

hostRoutes.post(
  "/addRentCar",
  authenticateToken,
  isHost,
  withImageUpload((req, res) =>
    hostRentCarController.addRentCarService(req as MulterRequest, res)
  )
);

hostRoutes.post(
  "/addCaters",
  authenticateToken,
  isHost,
  withImageUpload((req, res) =>
    hostCatersController.addCatersService(req as MulterRequest, res)
  )
);

hostRoutes.post(
  "/addStudio",
  authenticateToken,
  isHost,
  withImageUpload((req, res) =>
    hostStudioController.addStudioService(req as MulterRequest, res)
  )
);

export default hostRoutes;
