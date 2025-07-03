import logger from "../../../../utils/common/messages/logger";
import { IUserServicesBaseController } from "../../../../domain/controlInterface/user/services interface/interface.userServicesBaseController";
import { statusCodes , statusMessages } from "../../../../utils/common/messages/constantResponses";
import { UserCatersController } from "./userCaters.controller";
import { UserStudioController } from "./userStudio.controller";
import { UserRentCarController } from "./userRentCar.controller";
import { UserVenueController } from "./userVenue.controller";

export class UserServiceBaseController implements IUserServicesBaseController {
  constructor(
        private userVenueController: UserVenueController,
        private userRentCarController: UserRentCarController,
        private userStudioController: UserStudioController,
        private userCatersController: UserCatersController
  ) {}

  async getServiceDetails(req: Request, res: Response): Promise<void> {
    try {

     const { typeOfAsset} = req.params.type;
      if (!typeOfAsset) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Asset type is required",
        });
        return;
      }

      switch (typeOfAsset) {
        case "venue":
          await this.userVenueController.getVenueDetails(req, res);
          break;
        case "rentcar":
          await this.userRentCarController.getRentCarDetails(req, res);
          break;
        case "studio":
          await this.userStudioController.getStudioDetails(req, res);
          break;
        case "caters":
          await this.userCatersController.getCatersDetails(req, res);
          break;
        default:
          res.status(statusCodes.forbidden).json({
            success: false,
            message: `Unknown type of asset '${typeOfAsset}'`,
          });
      }
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }
}
