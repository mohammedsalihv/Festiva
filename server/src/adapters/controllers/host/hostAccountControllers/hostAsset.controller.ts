import { Request, Response } from "express";
import { authenticationRequest } from "../../../../domain/controlInterface/common/authentication/authRequest";
import { IHostAssetController } from "../../../../domain/controlInterface/common/account/interface.hostAssetController";
import { IHostAssetUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostAssetUseCase";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { HostVenueController } from "../hostServiceControllers/hostVenue.controller";
import { HostRentCarController } from "../hostServiceControllers/hostRentCar.controller";
import { HostCatersController } from "../hostServiceControllers/hostCaters.controller";
import { HostStudioController } from "../hostServiceControllers/hostStudio.controller";

export class HostAssetController implements IHostAssetController {
  constructor(
    private hostAssetUseCase: IHostAssetUseCase,
    private hostVenueController: HostVenueController,
    private hostRentCarController: HostRentCarController,
    private hostCatersController: HostCatersController,
    private hostStudioController: HostStudioController
  ) {}

  async allAssets(req: authenticationRequest, res: Response): Promise<void> {
    try {
      const hostId = req.auth!.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { data, totalPages } = await this.hostAssetUseCase.getAllAssets(
        hostId,
        page,
        limit
      );
      res.status(statusCodes.Success).json({ data, totalPages });
    } catch (error) {
      console.error("Error fetching all assets:", error);
      res
        .status(statusCodes.serverError)
        .json({ message: "Failed to fetch all assets request" });
    }
  }

  async findAssetDetails(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.query.type?.toString().toLowerCase();
      const assetId = req.params.assetId;

      if (!typeOfAsset) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Asset type is required",
        });
        return;
      }

      if (!assetId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Asset ID is required",
        });
        return;
      }

      switch (typeOfAsset) {
        case "venue":
          await this.hostVenueController.venueFullDetails(req, res);
          break;
        case "rentcar":
          await this.hostRentCarController.carFullDetails(req, res);
          break;
        case "studio":
          await this.hostStudioController.studioFullDetails(req, res);
          break;
        case "caters":
          await this.hostCatersController.catersFullDetails(req, res);
          break;
        default:
          res.status(statusCodes.forbidden).json({
            success: false,
            message: `Unknown type of asset '${typeOfAsset}'`,
          });
          return;
      }
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async getAllRequests(req: authenticationRequest, res: Response) {
    try {
      const hostId = req.auth!.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { data, totalPages } = await this.hostAssetUseCase.getAllRequests(
        hostId,
        page,
        limit
      );
      res.status(statusCodes.Success).json({ data, totalPages });
    } catch (error) {
      console.error("Error fetching asset requests:", error);
      res
        .status(statusCodes.serverError)
        .json({ message: "Failed to fetch asset requests" });
    }
  }

  async reSubmit(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.query.type?.toString().toLowerCase();
      const assetId = req.params.assetId;

      if (!typeOfAsset) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Asset type is required",
        });
        return;
      }

      if (!assetId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Asset ID is required",
        });
        return;
      }

      switch (typeOfAsset) {
        case "venue":
          await this.hostVenueController.requestReApproval(req, res);
          break;
        case "rentcar":
          await this.hostRentCarController.requestReApproval(req, res);
          break;
        case "studio":
          await this.hostStudioController.requestReApproval(req, res);
          break;
        case "caters":
          await this.hostCatersController.requestReApproval(req, res);
          break;
        default:
          res.status(statusCodes.forbidden).json({
            success: false,
            message: `Unknown type of asset '${typeOfAsset}'`,
          });
          return;
      }
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async assetAvailability(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.query.type?.toString().toLowerCase();
      const assetId = req.params.assetId;

      if (!typeOfAsset) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Asset type is required",
        });
        return;
      }

      if (!assetId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Asset ID is required",
        });
        return;
      }

      switch (typeOfAsset) {
        case "venue":
          await this.hostVenueController.availability(req, res);
          break;
        case "rentcar":
          await this.hostRentCarController.availability(req, res);
          break;
        case "studio":
          await this.hostStudioController.availability(req, res);
          break;
        case "caters":
          await this.hostCatersController.availability(req, res);
          break;
        default:
          res.status(statusCodes.forbidden).json({
            success: false,
            message: `Unknown type of asset '${typeOfAsset}'`,
          });
          return;
      }
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async deleteAsset(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.query.type?.toString().toLowerCase();
      const assetId = req.params.assetId;

      if (!typeOfAsset) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Asset type is required",
        });
        return;
      }

      if (!assetId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Asset ID is required",
        });
        return;
      }

      switch (typeOfAsset) {
        case "venue":
          await this.hostVenueController.deleteRequest(req, res);
          break;
        case "rentcar":
          await this.hostRentCarController.deleteRequest(req, res);
          break;
        case "studio":
          await this.hostStudioController.deleteRequest(req, res);
          break;
        case "caters":
          await this.hostCatersController.deleteRequest(req, res);
          break;
        default:
          res.status(statusCodes.forbidden).json({
            success: false,
            message: `Unknown type of asset '${typeOfAsset}'`,
          });
          return;
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
