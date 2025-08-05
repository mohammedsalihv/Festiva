import { Request, Response } from "express";
import { IAdminStudioController } from "../../../../domain/controlInterface/admin/service controller interfaces/interface.adminStudioController";
import { AdminStudioUseCase } from "../../../../application/usecases/admin/adminServicesUsecases/usecase.adminStudio";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { getSignedImageUrl } from "../../../../utils/common/cloudinary/getSignedImageUrl";

export class AdminStudioController implements IAdminStudioController {
  constructor(private adminStudioUseCase: AdminStudioUseCase) {}

  async studioFullDetails(req: Request, res: Response): Promise<void> {
    try {
      const studioId = req.params.assetId;
      if (!studioId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Studio ID required",
        });
        return;
      }
      const studio = await this.adminStudioUseCase.studioDetails(studioId);
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
          message: "Unexpected server error",
        });
      }
    }
  }
}
