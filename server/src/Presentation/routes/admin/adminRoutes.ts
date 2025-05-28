import express, { Request, Response, RequestHandler } from "express";
import { userAdminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/UserManagement.dependancyContainer";
import { hostAdminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/HostManagement.dependancyContainer";
import { singleImageUpload } from "../../../middlewares/multer";
import { authenticateToken, isAdmin } from "../../../middlewares/auth";

const adminRoutes = express.Router();
export interface MulterRequest extends Request {
  file: Express.Multer.File;
}


adminRoutes.get(
  "/users",
  authenticateToken,
   isAdmin,
  userAdminController.Users.bind(userAdminController)
);
adminRoutes.patch(
  "/users/:userId/blockUnblock",
   authenticateToken,
   isAdmin,
  userAdminController.blockOrUnblockUser.bind(userAdminController)
);
adminRoutes.patch(
  "/users/:userId/edit",
   authenticateToken,
   isAdmin,
  userAdminController.editUser.bind(userAdminController)
);
adminRoutes.put(
  "/users/changeprofile/:userId",
   authenticateToken,
   isAdmin,
  singleImageUpload,
  userAdminController.changeProfile.bind(userAdminController) as RequestHandler
);
adminRoutes.delete(
  "/users/:userId",
   authenticateToken,
   isAdmin,
  userAdminController.deleteUser.bind(userAdminController)
);




// host management
adminRoutes.get(
  "/hosts",
   authenticateToken,
   isAdmin,
  hostAdminController.getHosts.bind(hostAdminController)
);

adminRoutes.patch(
  "/hosts/:hostId/blockUnblock",
   authenticateToken,
   isAdmin,
  hostAdminController.blockOrUnblockHost.bind(hostAdminController)
);
adminRoutes.patch(
  "/hosts/:hostId/edit",
   authenticateToken,
   isAdmin,
  hostAdminController.editHost.bind(hostAdminController)
);
adminRoutes.put(
  "/hosts/changeprofile/:hostId",
   authenticateToken,
   isAdmin,
  singleImageUpload,
  hostAdminController.changeProfile.bind(hostAdminController) as RequestHandler
);
adminRoutes.delete(
  "/hosts/:hostId",
   authenticateToken,
   isAdmin,
  hostAdminController.deleteHost.bind(hostAdminController)
);



// service management
adminRoutes.get(
  "/services",
   authenticateToken,
   isAdmin,
  hostAdminController.getHosts.bind(hostAdminController)
);



export default adminRoutes;
