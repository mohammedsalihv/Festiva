import express, { Request, Response, RequestHandler } from "express";
import { userAdminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/userManagement.dependancyContainer";
import { hostAdminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/hostManagement.dependancyContainer";
import { assetAdminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/assetManagement.dependancyContainer";
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
  "/users/:userId/blockUnblock/:userId",
   authenticateToken,
   isAdmin,
  userAdminController.blockOrUnblockUser.bind(userAdminController)
);
adminRoutes.patch(
  "/users/edit/:userId",
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
  "/hosts/blockUnblock/:hostId",
   authenticateToken,
   isAdmin,
  hostAdminController.blockOrUnblockHost.bind(hostAdminController)
);
adminRoutes.patch(
  "/hosts/edit/:hostId",
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
  "/assets/:typeOfAsset",
   authenticateToken,
   isAdmin,
  assetAdminController.AllAssets.bind(assetAdminController)
);



export default adminRoutes;
