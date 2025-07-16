import { Request, Response } from "express";
import { IRentCar } from "../../../../domain/entities/serviceInterface/interface.rentCar";
import { HostRentCarUseCase } from "../../../../application/use-cases/host/hostServices/usecase.hostRentcar";
import { IHostRentCarController } from "../../../../domain/controlInterface/host/service controller interfaces/interface.hostRentCarController";
import { IHostAssetLocationRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostAssetLocationRepostory";
import ErrorHandler from "../../../../utils/common/errors/CustomError";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { uploadAssetImages } from "../../../../utils/common/cloudinary/uploadAssetImage";
import { assetFilesValidate } from "../../../../utils/host/assetFilesValidate";
import { geocodeAddress } from "../../../../utils/common/geocoding/geocodeAddress";

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
  file?: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostRentCarController implements IHostRentCarController {
  constructor(
    private hostRentCarUseCase: HostRentCarUseCase,
    private hostAssetlocationRepository: IHostAssetLocationRepository
  ) {}

  async addRentCarService(req: MulterRequest, res: Response): Promise<void> {
    const hostId = req.auth?.id;
    if (!hostId) {
      throw new ErrorHandler(
        statusMessages.unAuthorized,
        statusCodes.unAuthorized
      );
    }

    try {
      const newRentCar = req.body;
      const files = req.files?.["Images"] || [];
      const typeOfAsset = "rentcar";

      try {
        await assetFilesValidate({ files, typeOfAsset: typeOfAsset });
        const fullAddress = `${newRentCar.location.houseNo}, ${newRentCar.location.street}, ${newRentCar.location.district}, ${newRentCar.location.state}, ${newRentCar.location.country}, ${newRentCar.location.zip}`;

        const { lat, lng } = await geocodeAddress(fullAddress);

        newRentCar.location.coordinates = {
          type: "Point",
          coordinates: [lng, lat],
        };

        const newLocation = await this.hostAssetlocationRepository.addLocation(
          newRentCar.location
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
          businessName,
          carName,
          rent,
          make,
          model,
          timeSlots,
          availableDates,
          color,
          fuel,
          transmission,
          seats,
          deposite,
          carFeatures,
          additionalFeatures,
          termsOfUse,
          about,
          description,
          guidelines,
          userDocument,
        } = newRentCar;

        const rentCar: IRentCar = {
          businessName,
          carName,
          rent,
          make,
          model,
          timeSlots,
          availableDates,
          color,
          fuel,
          transmission,
          seats,
          deposite,
          carFeatures,
          additionalFeatures,
          termsOfUse,
          about,
          description,
          guidelines,
          userDocument,
          Images: imageUrls,
          location: new Types.ObjectId(newLocation._id),
          host: new Types.ObjectId(hostId),
        };

        const createdRentCar = await this.hostRentCarUseCase.addRentCar(
          rentCar
        );
        res.status(statusCodes.Success).json(createdRentCar);
        return;
      } catch (error: any) {
        res
          .status(error.statusCode || statusCodes.serverError)
          .json({ message: error.message || "Something went wrong" });
      }
    } catch (error) {
      if (error instanceof ErrorHandler) {
        logger.error(error);
        res.status(error.statusCode).json({ message: error.message });
      } else {
        logger.error(error);
        res
          .status(statusCodes.serverError)
          .json({ message: "Failed to add new rent car", error });
      }
    }
  }
}
