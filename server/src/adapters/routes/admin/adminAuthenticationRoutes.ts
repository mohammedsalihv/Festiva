import express from "express";
import { ADMIN_ROUTES } from "../../../infrastructure/constants/admin.routes";
import {
  adminLoginController,
  adminLogoutController,
  refreshTokenController,
} from "../../../infrastructure/dependencyInjections/adminDependencyInjections/adminAuthenticationDependencyInjections/adminAuth.DI";
import logger from "../../../utils/baseUtilities/messages/logger";
import {
  authenticateToken,
  isAdmin,
} from "../../../utils/baseUtilities/middlewares/auth";

const adminAuthenticationRoutes = express.Router();

adminAuthenticationRoutes.post(
  ADMIN_ROUTES.Authentiation.adminLogin,
  async (req, res) => {
    try {
      await adminLoginController.adminLogin(req, res);
    } catch (error) {
      logger.info(error);
    }
  }
);

adminAuthenticationRoutes.post(
  ADMIN_ROUTES.Authentiation.Refresh_Token,
  refreshTokenController.refreshAccessToken.bind(refreshTokenController)
);

adminAuthenticationRoutes.delete(
  ADMIN_ROUTES.Authentiation.adminLogout,
  authenticateToken,
  isAdmin,
  async (req, res) => {
    try {
      await adminLogoutController.logoutByAdmin(req, res);
    } catch (error) {
      logger.info(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default adminAuthenticationRoutes;
