import express from "express";
import { USER_ROUTES } from "../../../infrastructure/constants/user.routes";
import { userServiceBaseController } from "../../../infrastructure/DI/user/userServicesDependencyInjections/userServiceBase.DI";

const userServiceRoute = express.Router();

userServiceRoute.get(
  USER_ROUTES.UserServices.serviceDetails,
  userServiceBaseController.getServiceDetails.bind(userServiceBaseController)
);

userServiceRoute.get(
  USER_ROUTES.UserServices.filterAssets,
  userServiceBaseController.filterAssets.bind(userServiceBaseController)
);

userServiceRoute.get(
  USER_ROUTES.UserServices.sortAssets,
  userServiceBaseController.sortAssets.bind(userServiceBaseController)
);


export default userServiceRoute;
