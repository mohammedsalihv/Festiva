import { IHostAssetRequestController } from "../../../../domain/controlInterface/common/account controller interface/interface.hostAssetRequestController";
import { Request, Response } from "express";
import { IHostAssetRequestUseCase } from "../../../../domain/usecaseInterface/host/account usecase interfaces/interface.hostRequestsUseCase";

export class HostAssetRequestController implements IHostAssetRequestController {
  constructor(private hostAssetRequestUseCase: IHostAssetRequestUseCase) {}

  async getAllRequests(req: Request, res: Response) {
    try {
      const requests = await this.hostAssetRequestUseCase.getAllRequests();
      res.status(200).json(requests);
    } catch (error) {
      console.error("Error fetching asset requests:", error);
      res.status(500).json({ message: "Failed to fetch asset requests" });
    }
  }
}
