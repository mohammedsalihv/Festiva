import express from "express";
import { ADMIN_ROUTES } from "../../../infrastructure/constants/admin.routes";
import { adminLoginController } from "../../../infrastructure/DI/admin/authentication/adminAuth.DI";
import { refreshTokenController } from "../../../infrastructure/DI/admin/authentication/adminAuth.DI";
import logger from "../../../utils/common/messages/logger";

const adminAuthRoutes = express.Router();

adminAuthRoutes.post(ADMIN_ROUTES.Authentiation.adminLogin, async (req, res) => {
  try {
    await adminLoginController.adminLogin(req, res);
  } catch (error) {
    logger.info(error);
  }
});

adminAuthRoutes.post(
  ADMIN_ROUTES.Authentiation.Refresh_Token,
  refreshTokenController.refreshAccessToken.bind(refreshTokenController)
);

export default adminAuthRoutes;
