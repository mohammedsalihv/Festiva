import { Request, Response } from "express";
import { IUserRentCarUseCase } from "../../../../domain/usecaseInterface/user/interface.userRentCarUseCase";
import { IUserRentCarController } from "../../../../domain/controlInterface/user/rentcars controller interfaces/interface.userRentCarController";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class UserRentCarController implements IUserRentCarController {
  constructor(private userRentCarUseCase: IUserRentCarUseCase) {}

  async getRentCars(req: Request, res: Response): Promise<void> {
    try {
      const cars = await this.userRentCarUseCase.allRentCars();

      if (cars.length === 0) {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "cars list empty",
        });
        return;
      }
      res.status(statusCodes.Success).json({
        success: true,
        message: "cars fetched successfully",
        data: cars,
      });
    } catch (error) {
      logger.error("Error fetching cars:", error);

      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }
}
