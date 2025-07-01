import { Request, Response } from "express";
import { IAdminCatersController } from "../../../../domain/controlInterface/admin/service controller interfaces/interface.adminCatersController";
import { AdminCatersUseCase } from "../../../../application/use-cases/admin/adminServices/usecase.adminCaters";
import CustomError from "../../../../utils/common/errors/CustomError";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

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
      res.status(statusCodes.Success).json({
        success: true,
        message: "Caters details fetched successfully",
        data: caters,
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
