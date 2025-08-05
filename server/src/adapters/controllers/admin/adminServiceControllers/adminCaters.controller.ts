import { Request, Response } from "express";
import { IAdminCatersController } from "../../../../domain/controlInterface/admin/service controller interfaces/interface.adminCatersController";
import { AdminCatersUseCase } from "../../../../application/usecases/admin/adminServicesUsecases/usecase.adminCaters";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";
import { getSignedImageUrl } from "../../../../utils/common/cloudinary/getSignedImageUrl";

export class AdminCatersController implements IAdminCatersController {
  constructor(private adminCatersUseCase: AdminCatersUseCase) {}

  async catersFullDetails(req: Request, res: Response): Promise<void> {
    try {
      const catersId = req.params.assetId;
      if (!catersId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Caters ID required",
        });
        return;
      }
      const caters = await this.adminCatersUseCase.catersDetails(catersId);
      const signedCaters = {
        ...caters,
        Images: (caters.Images ?? []).map((public_id: string) =>
          getSignedImageUrl(public_id, undefined, 800)
        ),
      };
      res.status(statusCodes.Success).json({
        success: true,
        message: "Caters details fetched successfully",
        data: signedCaters,
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
