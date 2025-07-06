import { Request, Response } from "express";
import { IStudio } from "../../../../domain/entities/serviceInterface/interface.studio";
import { HostStudioUseCase } from "../../../../application/use-cases/host/hostServices/usecase.hostStudio";
import { IHostStudioController } from "../../../../domain/controlInterface/host/interface.hostStudioController";
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

export interface MulterRequest extends Request {
  files?: { [fieldname: string]: Express.Multer.File[] };
  file?: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostStudioController implements IHostStudioController {
  constructor(
    private hostStudioUseCase: HostStudioUseCase,
    private hostAssetlocationRepository: IHostAssetLocationRepository
  ) {}

  async addStudioService(req: MulterRequest, res: Response): Promise<void> {
    const hostId = req.auth?.id;
    if (!hostId) {
      throw new ErrorHandler(
        statusMessages.unAuthorized,
        statusCodes.unAuthorized
      );
    }

    try {
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

        const newLocation = await this.hostAssetlocationRepository.addLocation(
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
          location: newLocation._id,
          host: new Types.ObjectId(hostId),
        };

        const createdStudio = await this.hostStudioUseCase.addStudio(studio);
        res.status(statusCodes.Success).json(createdStudio);
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
          .json({ message: "Failed to add new studio", error });
      }
    }
  }
}
