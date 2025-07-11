import { IHostCatersController } from "../../../../domain/controlInterface/host/service controller interfaces/interface.hostCatersController";
import { HostCatersUseCase } from "../../../../application/use-cases/host/hostServices/usecase.hostCaters";
import { ICaters } from "../../../../domain/entities/serviceInterface/interface.caters";
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
import { Request, Response } from "express";

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
  file?: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostCatersController implements IHostCatersController {
  constructor(
    private hostCatersUseCase: HostCatersUseCase,
    private hostAssetlocationRepository: IHostAssetLocationRepository
  ) {}

  async addCatersService(req: MulterRequest, res: Response): Promise<void> {
    const hostId = req.auth?.id;
    if (!hostId) {
      throw new ErrorHandler(
        statusMessages.unAuthorized,
        statusCodes.unAuthorized
      );
    }

    try {
      const newCaters = req.body;
      const files = req.files?.["Images"] || [];
      const typeOfAsset = "caters";

      try {
        await assetFilesValidate({ files, typeOfAsset });

        const newLocation = await this.hostAssetlocationRepository.addLocation(
          newCaters.location
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
          catersName,
          manpower,
          charge,
          totalAmount,
          timeSlots,
          availableDates,
          description,
          features,
          serviceTypes,
          terms,
          conditions,
          about,
        } = newCaters;

        const caters: ICaters = {
          catersName,
          manpower,
          charge,
          totalAmount,
          timeSlots,
          availableDates,
          description,
          features,
          serviceTypes,
          terms,
          conditions,
          about,
          Images: imageUrls,
          location: newLocation._id,
          host: new Types.ObjectId(hostId)
        };

        const createdCaters = await this.hostCatersUseCase.addCaters(caters);
        res.status(statusCodes.Success).json(createdCaters);
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
          .json({ message: "Failed to add new caters", error });
      }
    }
  }
}
