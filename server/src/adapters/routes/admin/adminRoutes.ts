import express, { Request, Response, RequestHandler } from "express";
import { ADMIN_ROUTES } from "../../../infrastructure/constants/admin.routes";
import { adminUserController } from "../../../infrastructure/DI/admin/adminManagementDependencyInjections/adminUserManagement.DI";
import { adminHostController } from "../../../infrastructure/DI/admin/adminManagementDependencyInjections/adminHostManagement.DI";
import { adminAssetManagementController } from "../../../infrastructure/DI/admin/adminManagementDependencyInjections/adminAssetManagement.DI";
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
  ADMIN_ROUTES.UserManagement.allUsers,
  authenticateToken,
  isAdmin,
  adminUserController.getAllUsers.bind(adminUserController)
);
adminRoutes.patch(
  ADMIN_ROUTES.UserManagement.blockAndUnblock,
  authenticateToken,
  isAdmin,
  adminUserController.blockOrUnblockUser.bind(adminUserController)
);

adminRoutes.patch(
  ADMIN_ROUTES.UserManagement.userEdit,
  authenticateToken,
  isAdmin,
  adminUserController.editUser.bind(adminUserController)
);
adminRoutes.put(
  ADMIN_ROUTES.UserManagement.profileImageUpdate,
  authenticateToken,
  isAdmin,
  singleImageUpload,
  adminUserController.changeProfile.bind(adminUserController) as RequestHandler
);
adminRoutes.delete(
  ADMIN_ROUTES.UserManagement.userDelete,
  authenticateToken,
  isAdmin,
  adminUserController.deleteUser.bind(adminUserController)
);

// host management

adminRoutes.get(
  ADMIN_ROUTES.HostManagement.allHosts,
  authenticateToken,
  isAdmin,
  adminHostController.getAllHosts.bind(adminHostController)
);

adminRoutes.patch(
  ADMIN_ROUTES.HostManagement.blockAndUnblock,
  authenticateToken,
  isAdmin,
  adminHostController.blockOrUnblockHost.bind(adminHostController)
);
adminRoutes.patch(
  ADMIN_ROUTES.HostManagement.hostEdit,
  authenticateToken,
  isAdmin,
  adminHostController.editHost.bind(adminHostController)
);
adminRoutes.put(
  ADMIN_ROUTES.HostManagement.profileImageUpdate,
  authenticateToken,
  isAdmin,
  singleImageUpload,
  adminHostController.changeProfile.bind(adminHostController) as RequestHandler
);
adminRoutes.delete(
  ADMIN_ROUTES.HostManagement.hostDelete,
  authenticateToken,
  isAdmin,
  adminHostController.deleteHost.bind(adminHostController)
);

// asset management

adminRoutes.get(
  ADMIN_ROUTES.AssetManagement.allAssets,
  authenticateToken,
  isAdmin,
  adminAssetManagementController.Assets.bind(adminAssetManagementController)
);

adminRoutes.get(
  ADMIN_ROUTES.AssetManagement.assetDetails,
  authenticateToken,
  isAdmin,
  adminAssetManagementController.assetDetails.bind(
    adminAssetManagementController
  )
);

adminRoutes.put(
  ADMIN_ROUTES.AssetManagement.assetApprove,
  authenticateToken,
  isAdmin,
  adminAssetManagementController.approveAsset.bind(
    adminAssetManagementController
  )
);
adminRoutes.put(
  ADMIN_ROUTES.AssetManagement.assetReject,
  authenticateToken,
  isAdmin,
  adminAssetManagementController.rejectAsset.bind(
    adminAssetManagementController
  )
);
export default adminRoutes;
