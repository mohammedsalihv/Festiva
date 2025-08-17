import { Request, Response } from "express";
import { IUserServicesBaseController } from "../../../../domain/controlInterface/user/services interface/interface.userServicesBaseController";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { IUserVenueController } from "../../../../domain/controlInterface/user/services interface/interface.userVenueController";
import { IUserRentCarController } from "../../../../domain/controlInterface/user/services interface/interface.userRentCarController";
import { IUserCatersController } from "../../../../domain/controlInterface/user/services interface/interface.userCatersController";
import { IUserStudioController } from "../../../../domain/controlInterface/user/services interface/interface.userStudioController";
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
}
