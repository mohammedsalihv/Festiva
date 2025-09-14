import express from "express";
import { HOST_ROUTES } from "../../../infrastructure/constants/host.routes";
import {
  hostSignupController,
  hostLoginController,
  hostGoogleSignupController,
  refreshTokenController,
  hostLogoutController,
  hostGoogleLoginController,
} from "../../../infrastructure/dependencyInjections/hostDependencyInjections/hostAuthenticationDependencyInjections/hostAuth.DI";
import logger from "../../../utils/baseUtilities/messages/logger";
import { hostController } from "../../../infrastructure/dependencyInjections/hostDependencyInjections/hostBaseDependencyInjections/host.DI";
import {
  authenticateToken,
  isHost,
} from "../../../utils/baseUtilities/middlewares/auth";

const hostAuthenticationRoutes = express.Router();

hostAuthenticationRoutes.post(
  HOST_ROUTES.Authentiation.hostSignup,
  async (req, res) => {
    try {
      await hostSignupController.signupNewHost(req, res);
    } catch (error) {
      logger.info(error);
    }
  }
);

hostAuthenticationRoutes.post(
  HOST_ROUTES.Authentiation.hostGoogleSignup,
  async (req, res) => {
    try {
      await hostGoogleSignupController.googleSignup(req, res);
    } catch (error) {
      logger.info(error);
    }
  }
);

hostAuthenticationRoutes.post(
  HOST_ROUTES.Authentiation.hostLogin,
  async (req, res) => {
    try {
      await hostLoginController.hostLogin(req, res);
    } catch (error) {
      logger.info(error);
    }
  }
);

hostAuthenticationRoutes.post(
  HOST_ROUTES.Authentiation.hostGoogleLogin,
  async (req, res) => {
    try {
      await hostGoogleLoginController.googleLogin(req, res);
    } catch (error) {
      logger.info(error);
    }
  }
);

hostAuthenticationRoutes.post(
  HOST_ROUTES.Authentiation.hostEmailValidation,
  async (req, res) => {
    try {
      await hostController.mailValidation(req, res);
    } catch (error) {
      logger.info(error);
    }
  }
);

hostAuthenticationRoutes.post(
  HOST_ROUTES.Authentiation.Refresh_Token,
  refreshTokenController.refreshAccessToken.bind(refreshTokenController)
);

hostAuthenticationRoutes.delete(
  HOST_ROUTES.Authentiation.hostLogout,
  authenticateToken,
  isHost,
  async (req, res) => {
    try {
      await hostLogoutController.hostLogout(req, res);
    } catch (error) {
      logger.info(error);
    }
  }
);

export default hostAuthenticationRoutes;
