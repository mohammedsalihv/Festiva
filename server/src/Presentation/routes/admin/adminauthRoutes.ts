import express from "express";
import { adminLoginController } from "../../../infrastructure/DI/admin/adminAuth.DI";
import { refreshTokenController } from "../../../infrastructure/DI/admin/adminAuth.DI";
import logger from "../../../utils/common/messages/logger";

const adminAuthRoutes = express.Router();

adminAuthRoutes.post("/login", async (req, res) => {
  try {
    await adminLoginController.adminLogin(req, res);
  } catch (error) {
    logger.info(error);
  }
});

adminAuthRoutes.post(
  "/refresh",
  refreshTokenController.refreshAccessToken.bind(refreshTokenController)
);

export default adminAuthRoutes;
