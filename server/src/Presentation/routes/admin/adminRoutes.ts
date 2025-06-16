import express, { Request, Response, RequestHandler } from "express";
import { adminUserController } from "../../../infrastructure/DI/admin/adminUserManagement.DI";
import { adminHostController } from "../../../infrastructure/DI/admin/adminHostManagement.DI";
import { adminAssetController } from "../../../infrastructure/DI/admin/adminAssetManagement.DI";
import { singleImageUpload } from "../../../utils/common/middlewares/multer";
import {
  authenticateToken,
  isAdmin,
} from "../../../utils/common/middlewares/auth";

const adminRoutes = express.Router();
export interface MulterRequest extends Request {
  file: Express.Multer.File;
}

adminRoutes.get(
  "/users",
  authenticateToken,
  isAdmin,
  adminUserController.Users.bind(adminUserController)
);
adminRoutes.patch(
  "/users/:userId/blockUnblock/:userId",
  authenticateToken,
  isAdmin,
  adminUserController.blockOrUnblockUser.bind(adminUserController)
);
adminRoutes.patch(
  "/users/edit/:userId",
  authenticateToken,
  isAdmin,
  adminUserController.editUser.bind(adminUserController)
);
adminRoutes.put(
  "/users/changeprofile/:userId",
  authenticateToken,
  isAdmin,
  singleImageUpload,
  adminUserController.changeProfile.bind(adminUserController) as RequestHandler
);
adminRoutes.delete(
  "/users/:userId",
  authenticateToken,
  isAdmin,
  adminUserController.deleteUser.bind(adminUserController)
);

// host management

adminRoutes.get(
  "/hosts",
  authenticateToken,
  isAdmin,
  adminHostController.Hosts.bind(adminHostController)
);

adminRoutes.patch(
  "/hosts/blockUnblock/:hostId",
  authenticateToken,
  isAdmin,
  adminHostController.blockOrUnblockHost.bind(adminHostController)
);
adminRoutes.patch(
  "/hosts/edit/:hostId",
  authenticateToken,
  isAdmin,
  adminHostController.editHost.bind(adminHostController)
);
adminRoutes.put(
  "/hosts/changeprofile/:hostId",
  authenticateToken,
  isAdmin,
  singleImageUpload,
  adminHostController.changeProfile.bind(adminHostController) as RequestHandler
);
adminRoutes.delete(
  "/hosts/:hostId",
  authenticateToken,
  isAdmin,
  adminHostController.deleteHost.bind(adminHostController)
);

// asset management

adminRoutes.get(
  "/assets/:typeOfAsset",
  authenticateToken,
  isAdmin,
  adminAssetController.Assets.bind(adminAssetController)
);

adminRoutes.get(
  "/assets/details/:assetId",
  authenticateToken,
  isAdmin,
  adminAssetController.assetDetails.bind(adminAssetController)
);

adminRoutes.put(
  "/assets/approve/:assetId",
  authenticateToken,
  isAdmin,
  adminAssetController.approveAsset.bind(adminAssetController)
);
adminRoutes.put(
  "/assets/reject/:assetId",
  authenticateToken,
  isAdmin,
  adminAssetController.rejectAsset.bind(adminAssetController)
);
export default adminRoutes;
