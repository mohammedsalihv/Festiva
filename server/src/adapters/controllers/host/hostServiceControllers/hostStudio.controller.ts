import { Request, Response } from "express";
import { IStudio } from "../../../../domain/baseInterfaces/hostBaseInterfaces/hostServicesInterfaces/interface.studio";
import { IHostStudioUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostServicesUsecaseInterfaces/interface.studioUseCase";
import { IHostStudioController } from "../../../../domain/controllerInterfaces/hostControllerInterfaces/hostServicesControllerInterfaces/interface.hostStudioController";
import { ILocationUseCase } from "../../../../domain/usecaseInterfaces/baseUsecaseInterfaces/baseServicesUsecaseInterfaces/interface.locationUsecase";
import ErrorHandler from "../../../../utils/baseUtilities/errors/CustomError";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import logger from "../../../../utils/baseUtilities/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import { uploadAssetImages } from "../../../../utils/baseUtilities/cloudinary/uploadAssetImage";
import { assetFilesValidate } from "../../../../utils/mapping/hostMappings/assetFilesValidate";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { authenticationRequest } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
  file?: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostStudioController implements IHostStudioController {
  constructor(
    private _hostStudioUseCase: IHostStudioUseCase,
    private _locationUsecase: ILocationUseCase
  ) {}

  async addStudioService(req: MulterRequest, res: Response): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        throw new ErrorHandler(
          statusMessages.unAuthorized,
          statusCodes.unAuthorized
        );
      }

      const newStudio = req.body;
      let parsedPackages: any[] = [];
      if (Array.isArray(newStudio.packages)) {
        parsedPackages = newStudio.packages.map((pkg: string) =>
          JSON.parse(pkg)
        );
      } else if (newStudio.packages === "string") {
        parsedPackages = [JSON.parse(newStudio.packages)];
      }

      const files = req.files?.["Images"] || [];
      const typeOfAsset = "studio";

      try {
        await assetFilesValidate({ files, typeOfAsset });
        const newLocation = await this._locationUsecase.execute(
          newStudio.location
        );

        if (!newLocation || !newLocation._id) {
          throw new ErrorHandler(
            "Failed to create location",
            statusCodes.serverError
          );
        }

        const timestamp = Date.now();
        const imageUrls = (
          await Promise.all(
            files.map((file, i) =>
              uploadAssetImages({
                assetType: typeOfAsset,
                buffer: file.buffer,
                filename: `${typeOfAsset}_${timestamp}_${i}`,
              })
            )
          )
        ).map((img) => img.url);

        const {
          studioName,
          timeSlots,
          availableDates,
          serviceFeatures,
          terms,
          description,
          about,
        } = newStudio;

        const studio: IStudio = {
          studioName,
          packages: parsedPackages,
          timeSlots,
          availableDates,
          serviceFeatures,
          terms,
          description,
          about,
          Images: imageUrls,
          location: new Types.ObjectId(newLocation._id),
          host: new Types.ObjectId(hostId),
        };

        const createdStudio = await this._hostStudioUseCase.addStudio(studio);
        res.status(statusCodes.Success).json(createdStudio);
        return;
      } catch (error: any) {
        res
          .status(error.statusCode || statusCodes.serverError)
          .json({ message: error.message || statusMessages.serverError });
      }
    } catch (error) {
      if (error instanceof ErrorHandler) {
        logger.error(error);
        res.status(error.statusCode).json({ message: error.message });
      } else {
        logger.error(error);
        res
          .status(statusCodes.serverError)
          .json({ message: "Failed to add new studio", error });
      }
    }
  }

  async studioFullDetails(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        throw new ErrorHandler(
          statusMessages.unAuthorized,
          statusCodes.unAuthorized
        );
      }

      const studioId = req.params.assetId;
      if (!studioId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Studio ID required",
        });
        return;
      }
      const studio = await this._hostStudioUseCase.studioDetails(studioId);
      res.status(statusCodes.Success).json({
        success: true,
        message: "studio details fetched successfully",
        data: studio,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(statusCodes.serverError).json({
          success: false,
          message: statusMessages.serverError,
        });
      }
    }
  }

  async requestReApproval(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        throw new ErrorHandler(
          statusMessages.unAuthorized,
          statusCodes.unAuthorized
        );
      }

      const studioId = req.params.assetId;

      if (!studioId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "Studio ID is required",
        });
        return;
      }
      const success = await this._hostStudioUseCase.reApplyStudio(studioId);
      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Studio re-apply failed",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "Studio re-apply request submitted successfully",
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(statusCodes.serverError).json({
          success: false,
          message: statusMessages.serverError,
        });
      }
    }
  }

  async availability(req: authenticationRequest, res: Response): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        throw new ErrorHandler(
          statusMessages.unAuthorized,
          statusCodes.unAuthorized
        );
      }
      const studioId = req.params.assetId;
      const { isAvailable } = req.body;

      if (!studioId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "studio ID is required",
        });
        return;
      }

      const success = await this._hostStudioUseCase.updateStudioAvailability(
        studioId,
        isAvailable
      );

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Failed to changing the studio status to un-avaialble",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: `Studio marked as ${
          isAvailable ? "available" : "unavailable"
        } successfully`,
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(statusCodes.serverError).json({
          success: false,
          message: statusMessages.serverError,
        });
      }
    }
  }

  async deleteRequest(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        throw new ErrorHandler(
          statusMessages.unAuthorized,
          statusCodes.unAuthorized
        );
      }

      const studioId = req.params.assetId;

      if (!studioId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "studio ID is required",
        });
        return;
      }

      const success = await this._hostStudioUseCase.removeStudio(studioId);

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Error while deleting the studio",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "studio deleted successfully",
      });
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(statusCodes.serverError).json({
          success: false,
          message: statusMessages.serverError,
        });
      }
    }
  }
}
