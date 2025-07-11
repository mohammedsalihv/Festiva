import express from "express";
import { HOST_ROUTES } from "../../../infrastructure/constants/host.routes";
import { hostSignupController , hostLoginController , refreshTokenController } from "../../../infrastructure/DI/host/auth dependency Injection/hostAuth.DI";
import logger from "../../../utils/common/messages/logger";
import { hostController } from "../../../infrastructure/DI/host/host.DI";

const hostAuthRoutes = express.Router();

hostAuthRoutes.post(HOST_ROUTES.Authentiation.hostSignup, async (req, res) => {
  try {
    await hostSignupController.hostSignup(req, res);
  } catch (error) {
    logger.info(error);
  }
});

hostAuthRoutes.post(HOST_ROUTES.Authentiation.hostLogin, async (req, res) => {
  try {
    await hostLoginController.hostLogin(req, res);
  } catch (error) {
    logger.info(error);
  }
});


hostAuthRoutes.post(HOST_ROUTES.Authentiation.hostEmailValidation, async (req, res) => {
  try {
    await hostController.mailValidation(req, res);
  } catch (error) {
    logger.info(error);
  }
});

hostAuthRoutes.post(
  HOST_ROUTES.Authentiation.Refresh_Token,
  refreshTokenController.refreshAccessToken.bind(refreshTokenController)
);

export default hostAuthRoutes;
