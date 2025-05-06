import express from "express";
import { adminLoginController } from "../../../infrastructure/frameworks/DependencyInjection/admin/adminAuth.dependancyContainer";
import logger from "../../../utils/logger";

const adminAuthRoutes = express.Router();

adminAuthRoutes.post("/login-admin", async (req, res) => {
  try {
    await adminLoginController.adminLogin(req, res);
  } catch (error) {
    logger.info(error);
  }
});


export default adminAuthRoutes;
