import { Request, Response } from "express";
import { IUserStudioController } from "../../../../domain/controlInterface/user/services interface/interface.userStudioController";
import { IUserStudioUseCase } from "../../../../domain/usecaseInterface/user/userServiceUseCaseInterfaces/interface.userStudioUseCase";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import CustomError from "../../../../utils/common/errors/CustomError";
import { getSignedImageUrl } from "../../../../utils/common/cloudinary/getSignedImageUrl";

export class UserStudioController implements IUserStudioController {
  constructor(private userStudioUseCase: IUserStudioUseCase) {}

  async getStudios(req: Request, res: Response): Promise<void> {
    try {
      const studios = await this.userStudioUseCase.allStudios();

      if (studios.length === 0) {
        res.status(statusCodes.Success).json({
          success: true,
          message: "studio list empty",
        });
        return;
      }

      const signedStudios = studios.map((studio) => ({
        ...(studio.toObject?.() ?? studio),
        Images: (studio.Images ?? []).map((public_id: string) =>
          getSignedImageUrl(public_id, undefined, 600)
        ),
      }));

      res.status(statusCodes.Success).json({
        success: true,
        message: "studios fetched successfully",
        data: signedStudios,
      });
    } catch (error) {
      logger.error("Error fetching studio:", error);

      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async getStudioDetails(req: Request, res: Response): Promise<void> {
    try {
      const Id = req.query.assetId;

      const studioId: string | undefined =
        typeof Id === "string"
          ? Id
          : Array.isArray(Id) && typeof Id[0] === "string"
          ? Id[0]
          : undefined;

      if (!studioId) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Invalid or missing studio Id",
        });
        return;
      }
      const studio = await this.userStudioUseCase.studioDetails(studioId);
      const signedStudio = {
        ...studio,
        Images: (studio.Images ?? []).map((public_id: string) =>
          getSignedImageUrl(public_id, undefined, 800)
        ),
      };
      res.status(statusCodes.Success).json({
        success: true,
        message: "studio details fetched successfully",
        data: signedStudio,
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
  async filterStudios(req: Request, res: Response): Promise<void> {
    try {
      const filters = req.query;
      const page = parseInt(filters.page as string) || 1;
      const limit = parseInt(filters.limit as string) || 10;
      const result = await this.userStudioUseCase.filterStudios(
        filters,
        page,
        limit
      );

      const signedStudios = result.data.map((studio) => ({
        ...studio,
        Images: (studio.Images ?? []).map((public_id: string) =>
          getSignedImageUrl(public_id, undefined, 800)
        ),
      }));

      res.status(statusCodes.Success).json({
        success: true,
        message: "Studios fetched successfully",
        data: signedStudios,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      });
    } catch (error) {
      logger.error("Error filtering studios:", error);
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async sortStudios(req: Request, res: Response): Promise<void> {
    try {
      const sorts = req.query;
      const page = parseInt(sorts.page as string) || 1;
      const limit = parseInt(sorts.limit as string) || 10;
      const result = await this.userStudioUseCase.sortStudios(
        sorts,
        page,
        limit
      );
      const signedStudios = result.data.map((studio) => ({
        ...studio,
        Images: (studio.Images ?? []).map((public_id: string) =>
          getSignedImageUrl(public_id, undefined, 800)
        ),
      }));

      res.status(statusCodes.Success).json({
        success: true,
        message: "Studios fetched successfully",
        data: signedStudios,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      });
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }
}
