import express from "express";
import { HOST_ROUTES } from "../../../infrastructure/constants/host.routes";
import {
  authenticateToken,
  isHost,
} from "../../../utils/common/middlewares/auth";
import { hostNotificationController } from "../../../infrastructure/DI/host/account dependency Injection/hostNotification.DI";
import { hostAssetRequestController } from "../../../infrastructure/DI/host/account dependency Injection/hostAssetRequest.DI";

const hostAccountRoutes = express.Router();

hostAccountRoutes.get(
  HOST_ROUTES.HostAccount.notifications,
  authenticateToken,
  isHost,
  hostNotificationController.getAllNotifications.bind(
    hostNotificationController
  )
);

hostAccountRoutes.get(
  HOST_ROUTES.HostAccount.requests,
  authenticateToken,
  isHost,
  hostAssetRequestController.getAllRequests.bind(hostAssetRequestController)
);

export default hostAccountRoutes;
