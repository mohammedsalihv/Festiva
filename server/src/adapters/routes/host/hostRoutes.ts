import express, { Request, Response, NextFunction } from "express";
import { HOST_ROUTES } from "../../../infrastructure/constants/host.routes";
import { hostVenueController } from "../../../infrastructure/DI/host/services dependency Injection/hostVenue.DI";
import { hostRentCarController } from "../../../infrastructure/DI/host/services dependency Injection/hostRentCar.DI";
import { hostCatersController } from "../../../infrastructure/DI/host/services dependency Injection/hostCaters.DI";
import { hostStudioController } from "../../../infrastructure/DI/host/services dependency Injection/hostStudio.DI";
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
  HOST_ROUTES.VenueService.addVenue,
  authenticateToken,
  isHost,
  withImageUpload((req, res) =>
    hostVenueController.addVenueService(req as MulterRequest, res)
  )
);

hostRoutes.post(
  HOST_ROUTES.RentcarService.addRentcar,
  authenticateToken,
  isHost,
  withImageUpload((req, res) =>
    hostRentCarController.addRentCarService(req as MulterRequest, res)
  )
);

hostRoutes.post(
  HOST_ROUTES.CatersService.addCaters,
  authenticateToken,
  isHost,
  withImageUpload((req, res) =>
    hostCatersController.addCatersService(req as MulterRequest, res)
  )
);

hostRoutes.post(
  HOST_ROUTES.StudioService.addStudio,
  authenticateToken,
  isHost,
  withImageUpload((req, res) =>
    hostStudioController.addStudioService(req as MulterRequest, res)
  )
);

export default hostRoutes;
