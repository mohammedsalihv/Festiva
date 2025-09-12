import { Request, Response } from "express";
import { IVenue } from "../../../../domain/entities/serviceInterface/host/interface.venue";
import { ILocationUseCase } from "../../../../domain/usecaseInterface/host/baseUsecaseInterfaces/interface.locationUsecase";
import { IHostVenueController } from "../../../../domain/controllerInterfaces/hostControllerInterfaces/hostServicesControllerInterfaces/interface.hostVenueController";
import { IHostVenueUseCase } from "../../../../domain/usecaseInterface/host/services usecase interfaces/interface.venueUseCase";
import ErrorHandler from "../../../../utils/baseUtilities/errors/CustomError";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import { uploadAssetImages } from "../../../../utils/baseUtilities/cloudinary/uploadAssetImage";
import { assetFilesValidate } from "../../../../utils/mapping/hostMappings/assetFilesValidate";
import logger from "../../../../utils/baseUtilities/messages/logger";
import CustomError from "../../../../utils/baseUtilities/errors/CustomError";
import { authenticationRequest } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
  file?: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostVenueController implements IHostVenueController {
  constructor(
    private _hostVenueUseCase: IHostVenueUseCase,
    private _locationUsecase: ILocationUseCase
  ) {}

  async addVenueService(req: MulterRequest, res: Response): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        res
          .status(statusCodes.unAuthorized)
          .json({ message: statusMessages.unAuthorized });
        return;
      }

      const newVenue = req.body;
      const files = req.files?.["Images"] || [];
      const typeOfAsset = "venue";

      await assetFilesValidate({ files, typeOfAsset });

      const newLocation = await this._locationUsecase.execute(
        newVenue.location
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
        venueName,
        rent,
        capacity,
        shift,
        squareFeet,
        timeSlots,
        availableDates,
        about,
        features,
        parkingFeatures,
        description,
        terms,
      } = newVenue;

      const venue: IVenue = {
        venueName,
        rent,
        capacity,
        shift,
        squareFeet,
        timeSlots,
        availableDates,
        about,
        features,
        parkingFeatures,
        description,
        terms,
        Images: imageUrls,
        location: new Types.ObjectId(newLocation._id),
        host: new Types.ObjectId(hostId),
      };

      const createdVenue = await this._hostVenueUseCase.addVenue(venue);
      res.status(statusCodes.Success).json(createdVenue);
    } catch (error: any) {
      logger.error(error);
      if (error instanceof ErrorHandler) {
        res
          .status(error.statusCode)
          .json({ message: error.message || statusMessages.serverError });
      } else {
        res.status(statusCodes.serverError).json({
          message: "Failed to add new venue",
          error: error.message || statusMessages.serverError,
        });
      }
    }
  }

  async venueFullDetails(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        res
          .status(statusCodes.unAuthorized)
          .json({ message: statusMessages.unAuthorized });
        return;
      }

      const venueId = req.params.assetId;
      if (!venueId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "venue ID required",
        });
        return;
      }
      const venue = await this._hostVenueUseCase.venueDetails(venueId);
      res.status(statusCodes.Success).json({
        success: true,
        message: "Venue details fetched successfully",
        data: venue,
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

  async requestReApproval(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const hostId = req.auth?.id;
      if (!hostId) {
        res
          .status(statusCodes.unAuthorized)
          .json({ message: statusMessages.unAuthorized });
        return;
      }

      const venueId = req.params.assetId;
      if (!venueId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "Venue ID is required",
        });
        return;
      }
      const success = await this._hostVenueUseCase.reApplyVenue(venueId);
      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Failed to re-apply venue",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "Venue re-apply request submitted successfully",
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
        res
          .status(statusCodes.unAuthorized)
          .json({ message: statusMessages.unAuthorized });
        return;
      }

      const venueId = req.params.assetId;
      const { isAvailable } = req.body;

      if (!venueId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "Venue ID is required",
        });
        return;
      }

      if (typeof isAvailable !== "boolean") {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "`isAvailable` boolean is required",
        });
        return;
      }

      const success = await this._hostVenueUseCase.updateVenueAvailability(
        venueId,
        isAvailable
      );

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: `Failed to change venue availability to ${
            isAvailable ? "available" : "unavailable"
          }`,
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: `Venue marked as ${
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
        res
          .status(statusCodes.unAuthorized)
          .json({ message: statusMessages.unAuthorized });
        return;
      }

      const venueId = req.params.assetId;

      if (!venueId) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "Venue ID is required",
        });
        return;
      }

      const success = await this._hostVenueUseCase.removeVenue(venueId);

      if (!success) {
        res.status(statusCodes.serverError).json({
          success: false,
          message: "Error while deleting the venue",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "Venue deleted successfully",
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
