import express from "express";
import {
  hostSignupController,
  hostLoginController,
  refreshTokenController,
} from "../../../infrastructure/DI/host/hostAuth.DI";
import logger from "../../../utils/common/messages/logger";

const hostAuthRoutes = express.Router();

hostAuthRoutes.post("/signup", async (req, res) => {
  try {
    await hostSignupController.hostSignup(req, res);
  } catch (error) {
    logger.info(error);
  }
});

hostAuthRoutes.post("/login", async (req, res) => {
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
