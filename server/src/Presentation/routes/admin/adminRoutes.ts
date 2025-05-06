import express from "express";
import { adminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/UserManagement.dependancyContainer";
import logger from "../../../utils/logger";



const adminRoutes = express.Router();

adminRoutes.get("/getAllUsers", async (req, res) => {
  try {
    await adminController.getUsers(req, res);
  } catch (error) {
    logger.info(error);
  }
});

export default adminRoutes