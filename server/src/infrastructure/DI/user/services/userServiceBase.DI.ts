import { UserServiceBaseController } from "../../../../Presentation/controllers/user/userServicesControllers/userServiceBase.controller";
import { userVenueController } from "./userVenue.DI";
import { userRentCarController } from "./userRentCar.DI";
import { userCatersController } from "./userCaters.DI";
import { userStudioController } from "./userStudio.DI";


const userServiceBaseController = new UserServiceBaseController(
    userVenueController,
    userRentCarController,
    userCatersController,
    userStudioController
)

export {userServiceBaseController}