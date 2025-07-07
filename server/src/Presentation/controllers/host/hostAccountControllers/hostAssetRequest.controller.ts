import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IHostAssetRequestController } from "../../../../domain/controlInterface/common/account controller interface/interface.hostAssetRequestController";
import { IHostAssetRequestUseCase } from "../../../../domain/usecaseInterface/host/account usecase interfaces/interface.hostRequestsUseCase";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

interface AuthRequest extends Request {
  auth?: JwtPayload & { id: string; role?: string };
}
// controllers/HostAssetRequestController.ts
export class HostAssetRequestController implements IHostAssetRequestController {
  constructor(private hostAssetRequestUseCase: IHostAssetRequestUseCase) {}

  async getAllRequests(req: AuthRequest, res: Response) {
    try {
      const hostId = req.auth!.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const { data, totalPages } = await this.hostAssetRequestUseCase.getAllRequests(hostId, page, limit);
      res.status(statusCodes.Success).json({ data, totalPages });
    } catch (error) {
      console.error("Error fetching asset requests:", error);
      res.status(statusCodes.serverError).json({ message: "Failed to fetch asset requests" });
    }
  }
}
