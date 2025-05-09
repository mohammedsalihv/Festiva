import express from "express";
import { userAdminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/UserManagement.dependancyContainer";
import { hostAdminController } from "../../../infrastructure/frameworks/DependencyInjection/admin/HostManagement.dependancyContainer";
import logger from "../../../utils/logger";



const adminRoutes = express.Router();


// host management

adminRoutes.get("/getAllUsers", async (req, res) => {
  try {
    await userAdminController.getUsers(req, res);
  } catch (error) {
    logger.error(error instanceof Error ? error.message : 'Unknown error');
  }
});

















// user management

adminRoutes.get("/getAllHosts", async (req, res) => {
  try {
    await hostAdminController.getHosts(req, res);
  } catch (error) {
    logger.error(error instanceof Error ? error.message : 'Unknown error');
  }
});

adminRoutes.patch("/users/:userId/blockUnblock", async (req, res) => {
  try {
    await userAdminController.blockOrUnblockUser(req, res);
  } catch (error) {
    logger.error(error instanceof Error ? error.message : 'Unknown error');
  }
});



export default adminRoutes