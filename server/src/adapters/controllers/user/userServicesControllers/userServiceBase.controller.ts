import { Request, Response } from "express";
import { IUserServicesBaseController } from "../../../../domain/controlInterface/user/services interface/interface.userServicesBaseController";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { UserCatersController } from "./userCaters.controller";
import { UserStudioController } from "./userStudio.controller";
import { UserRentCarController } from "./userRentCar.controller";
import { UserVenueController } from "./userVenue.controller";

export class UserServiceBaseController implements IUserServicesBaseController {
  constructor(
    private userVenueController: UserVenueController,
    private userRentCarController: UserRentCarController,
    private userCatersController: UserCatersController,
    private userStudioController: UserStudioController
  ) {}

  async getServiceDetails(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.query.assetType;
      if (!typeOfAsset) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Asset type is required",
        });
        return;
      }

      switch (typeOfAsset) {
        case "venue":
          await this.userVenueController.getVenueDetails(req, res);
          break;
        case "rentcar":
          await this.userRentCarController.getRentCarDetails(req, res);
          break;
        case "studio":
          await this.userStudioController.getStudioDetails(req, res);
          break;
        case "caters":
          await this.userCatersController.getCatersDetails(req, res);
          break;
        default:
          res.status(statusCodes.forbidden).json({
            success: false,
            message: `Unknown type of asset '${typeOfAsset}'`,
          });
      }
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async filterAssets(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.params.type;

      switch (typeOfAsset) {
        case "venue":
          await this.userVenueController.filterVenues(req, res);
          break;
        case "rentcar":
          await this.userRentCarController.filterRentCars(req, res);
          break;
        case "studio":
          await this.userStudioController.filterStudios(req, res);
          break;
        case "caters":
          await this.userCatersController.filterCaters(req, res);
          break;
        default:
          res
            .status(statusCodes.notfound)
            .json({ success: false, message: "Invalid asset type" });
      }
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async sortAssets(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.params.type;

      switch (typeOfAsset) {
        case "venue":
          await this.userVenueController.sortVenues(req, res);
          break;
        case "rentcar":
          await this.userRentCarController.sortRentCars(req, res);
          break;
        case "studio":
          await this.userStudioController.sortStudios(req, res);
          break;
        case "caters":
          await this.userCatersController.sortCaters(req, res);
          break;
        default:
          res
            .status(statusCodes.notfound)
            .json({ success: false, message: "Invalid asset type" });
      }
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }
}
