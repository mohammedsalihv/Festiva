import express from "express";
import { userServiceBaseController } from "../../../infrastructure/DI/user/services/userServiceBase.DI";

const userServiceRoute = express.Router();

userServiceRoute.get(
  `/asset/details`,
  userServiceBaseController.getServiceDetails.bind(userServiceBaseController)
);

export default userServiceRoute;
