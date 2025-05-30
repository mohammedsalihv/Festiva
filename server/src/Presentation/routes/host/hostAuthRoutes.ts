import express from "express";
import {
  hostRegisterController,
  hostLoginController,
  refreshTokenController,
} from "../../../infrastructure/frameworks/DependencyInjection/host/Auth.dependancyContainer";
import logger from "../../../utils/logger";

const hostAuthRoutes = express.Router();

hostAuthRoutes.post("/register", async (req, res) => {
  try {
    await hostRegisterController.hostRegister(req, res);
  } catch (error) {
    logger.info(error);
  }
});

hostAuthRoutes.post("/login-host", async (req, res) => {
  try {
    await hostLoginController.hostLogin(req, res);
  } catch (error) {
    logger.info(error);
  }
});

hostAuthRoutes.post(
  "/refresh",
  refreshTokenController.refreshAccessToken.bind(refreshTokenController)
);

export default hostAuthRoutes;
