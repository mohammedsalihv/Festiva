import { Request, Response } from "express";
import { authenticationRequest } from "../../../../domain/controlInterface/common/authentication/authRequest";
import { IHostAssetController } from "../../../../domain/controlInterface/common/account/interface.hostAssetController";
import { IHostAssetUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostAssetUseCase";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { IHostVenueController } from "../../../../domain/controlInterface/host/service controller interfaces/interface.hostVenueController";
import { IHostRentCarController } from "../../../../domain/controlInterface/host/service controller interfaces/interface.hostRentCarController";
import { IHostCatersController } from "../../../../domain/controlInterface/host/service controller interfaces/interface.hostCatersController";
import { IHostStudioController } from "../../../../domain/controlInterface/host/service controller interfaces/interface.hostStudioController";

export class HostAssetController implements IHostAssetController {
  constructor(
    private _hostAssetUseCase: IHostAssetUseCase,
    private _hostVenueController: IHostVenueController,
    private _hostRentCarController: IHostRentCarController,
    private _hostCatersController: IHostCatersController,
    private _hostStudioController: IHostStudioController
  ) {}

  async allAssets(req: authenticationRequest, res: Response): Promise<void> {
    try {
      const hostId = req.auth!.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const type = req.query.assetType as any;
      const search = req.query.search as string;
      const status = req.query.status as string | string[];
      const sortBy = req.query.sortBy as "newest" | "oldest";

      const { data, totalPages } = await this._hostAssetUseCase.getAllAssets(
        hostId,
        page,
        limit,
        type,
        search,
        status,
        sortBy
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
          await this._hostVenueController.venueFullDetails(req, res);
          break;
        case "rentcar":
          await this._hostRentCarController.carFullDetails(req, res);
          break;
        case "studio":
          await this._hostStudioController.studioFullDetails(req, res);
          break;
        case "caters":
          await this._hostCatersController.catersFullDetails(req, res);
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

      const search = (req.query.search as string) || "";
      const status = (req.query.status as string) || "";
      const sortByRaw = req.query.sortBy as string;
      const order = (req.query.order as "asc" | "desc") || "desc";
      const assetType = req.query.serviceType as string;

      const validSortFields = ["reqDate", "actionDate", "status"] as const;
      const sortBy = validSortFields.includes(sortByRaw as any)
        ? (sortByRaw as (typeof validSortFields)[number])
        : undefined;

      const { data, totalPages } = await this._hostAssetUseCase.getAllRequests(
        hostId,
        page,
        limit,
        search,
        status,
        sortBy,
        order,
        assetType
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
          await this._hostVenueController.requestReApproval(req, res);
          break;
        case "rentcar":
          await this._hostRentCarController.requestReApproval(req, res);
          break;
        case "studio":
          await this._hostStudioController.requestReApproval(req, res);
          break;
        case "caters":
          await this._hostCatersController.requestReApproval(req, res);
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
          await this._hostVenueController.availability(req, res);
          break;
        case "rentcar":
          await this._hostRentCarController.availability(req, res);
          break;
        case "studio":
          await this._hostStudioController.availability(req, res);
          break;
        case "caters":
          await this._hostCatersController.availability(req, res);
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
          await this._hostVenueController.deleteRequest(req, res);
          break;
        case "rentcar":
          await this._hostRentCarController.deleteRequest(req, res);
          break;
        case "studio":
          await this._hostStudioController.deleteRequest(req, res);
          break;
        case "caters":
          await this._hostCatersController.deleteRequest(req, res);
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
