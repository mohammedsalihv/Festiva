import { Request, Response } from "express";
import { Types } from "mongoose";
import { IUserServicesBaseController } from "../../../../domain/controllerInterfaces/userControllerInterfaces/userServicesControllerInterfaces/interface.userServicesBaseController";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import { IUserVenueController } from "../../../../domain/controllerInterfaces/userControllerInterfaces/userServicesControllerInterfaces/interface.userVenueController";
import { IUserRentCarController } from "../../../../domain/controllerInterfaces/userControllerInterfaces/userServicesControllerInterfaces/interface.userRentCarController";
import { IUserCatersController } from "../../../../domain/controllerInterfaces/userControllerInterfaces/userServicesControllerInterfaces/interface.userCatersController";
import { IUserStudioController } from "../../../../domain/controllerInterfaces/userControllerInterfaces/userServicesControllerInterfaces/interface.userStudioController";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
export class UserServiceBaseController implements IUserServicesBaseController {
  constructor(
    private _userVenueController: IUserVenueController,
    private _userRentCarController: IUserRentCarController,
    private _userCatersController: IUserCatersController,
    private _userStudioController: IUserStudioController
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
          await this._userVenueController.getVenueDetails(req, res);
          break;
        case "rentcar":
          await this._userRentCarController.getRentCarDetails(req, res);
          break;
        case "studio":
          await this._userStudioController.getStudioDetails(req, res);
          break;
        case "caters":
          await this._userCatersController.getCatersDetails(req, res);
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
          await this._userVenueController.filterVenues(req, res);
          break;
        case "rentcar":
          await this._userRentCarController.filterRentCars(req, res);
          break;
        case "studio":
          await this._userStudioController.filterStudios(req, res);
          break;
        case "caters":
          await this._userCatersController.filterCaters(req, res);
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
          await this._userVenueController.sortVenues(req, res);
          break;
        case "rentcar":
          await this._userRentCarController.sortRentCars(req, res);
          break;
        case "studio":
          await this._userStudioController.sortStudios(req, res);
          break;
        case "caters":
          await this._userCatersController.sortCaters(req, res);
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

  async reviewReceiver(
    assetType: string,
    assetId: string
  ): Promise<Types.ObjectId | string> {
    try {
      switch (assetType) {
        case "venue":
          return await this._userVenueController.getHostId(assetId);
        case "rentcar":
          return await this._userRentCarController.getHostId(assetId);
        case "studio":
          return await this._userStudioController.getHostId(assetId);
        case "caters":
          return await this._userCatersController.getHostId(assetId);
        default:
          throw new CustomError("Invalid asset type", statusCodes.notfound);
      }
    } catch (error) {
      return "Failed to fech host id";
    }
  }
}
