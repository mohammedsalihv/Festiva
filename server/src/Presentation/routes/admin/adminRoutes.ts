import express, { Request, Response, RequestHandler } from "express";
import { userAdminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/UserManagement.dependancyContainer";
import { hostAdminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/HostManagement.dependancyContainer";
import { singleImageUpload } from "../../../middlewares/multer";
import logger from "../../../utils/logger";

const adminRoutes = express.Router();
export interface MulterRequest extends Request {
  file: Express.Multer.File;
}




// User Management
adminRoutes.get(
  "/users",
  userAdminController.getUsers.bind(userAdminController)
);
adminRoutes.patch(
  "/users/:userId/blockUnblock",
  userAdminController.blockOrUnblockUser.bind(userAdminController)
);
adminRoutes.patch(
  "/users/:userId/edit",
  userAdminController.editUser.bind(userAdminController)
);
adminRoutes.put(
  "/users/changeprofile/:userId",
  singleImageUpload,
  userAdminController.changeProfile.bind(userAdminController) as RequestHandler
);
adminRoutes.delete(
  "/users/:userId",
  userAdminController.deleteUser.bind(userAdminController)
);




// host management
adminRoutes.get(
  "/hosts",
  hostAdminController.getHosts.bind(hostAdminController)
);

adminRoutes.patch(
  "/hosts/:hostId/blockUnblock",
  hostAdminController.blockOrUnblockHost.bind(hostAdminController)
);
adminRoutes.patch(
  "/hosts/:hostId/edit",
  hostAdminController.editHost.bind(hostAdminController)
);
adminRoutes.put(
  "/hosts/changeprofile/:hostId",
  singleImageUpload,
  hostAdminController.changeProfile.bind(hostAdminController) as RequestHandler
);
adminRoutes.delete(
  "/hosts/:hostId",
  hostAdminController.deleteHost.bind(hostAdminController)
);

export default adminRoutes;
