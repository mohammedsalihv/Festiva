import express from "express";
import { userServiceBaseController } from "../../../infrastructure/DI/user/services/userServiceBase.DI";

const userServiceRoute = express.Router();

userServiceRoute.get(
  `/asset/details`,
  userServiceBaseController.getServiceDetails.bind(userServiceBaseController)
);

userServiceRoute.get(
  `/assets/filter/:type`,
  userServiceBaseController.filterAssets.bind(userServiceBaseController)
);

userServiceRoute.get(
  `/assets/sort/:type`,
  userServiceBaseController.sortAssets.bind(userServiceBaseController)
);

export default userServiceRoute;
