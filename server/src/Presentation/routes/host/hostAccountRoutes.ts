import express from "express";
import {
  authenticateToken,
  isHost,
} from "../../../utils/common/middlewares/auth";
import { hostNotificationController } from "../../../infrastructure/DI/host/account Dependency Injections/hostNotification.DI";
import { hostAssetRequestController } from "../../../infrastructure/DI/host/account Dependency Injections/hostAssetRequest.DI";

const hostAccountRoutes = express.Router();

hostAccountRoutes.get(
  "/notifications",
  authenticateToken,
  isHost,
  hostNotificationController.getAllNotifications.bind(
    hostNotificationController
  )
);

hostAccountRoutes.get(
  "/requests",
  authenticateToken,
  isHost,
  hostAssetRequestController.getAllRequests.bind(hostAssetRequestController)
);

export default hostAccountRoutes;
