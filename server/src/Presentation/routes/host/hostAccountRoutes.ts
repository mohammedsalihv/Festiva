import express from "express";
import { HOST_ROUTES } from "../../../infrastructure/constants/host.routes";
import {
  authenticateToken,
  isHost,
} from "../../../utils/common/middlewares/auth";
import { hostNotificationController } from "../../../infrastructure/DI/host/account dependency Injection/hostNotification.DI";
import { hostAssetController } from "../../../infrastructure/DI/host/account dependency Injection/hostAsset.DI";

const hostAccountRoutes = express.Router();

hostAccountRoutes.get(
  HOST_ROUTES.HostAccount.notifications,
  authenticateToken,
  isHost,
  hostNotificationController.getAllNotifications.bind(
    hostNotificationController
  )
);

hostAccountRoutes.patch(
  HOST_ROUTES.HostAccount.notificationsMarkAllRead,
  authenticateToken,
  isHost,
  hostNotificationController.markAllRead.bind(hostNotificationController)
);

hostAccountRoutes.get(
  HOST_ROUTES.HostAccount.myAssets,
  authenticateToken,
  isHost,
  hostAssetController.allAssets.bind(hostAssetController)
);

hostAccountRoutes.get(
  HOST_ROUTES.HostAccount.assetDetails,
  authenticateToken,
  isHost,
  hostAssetController.findAssetDetails.bind(hostAssetController)
);

hostAccountRoutes.get(
  HOST_ROUTES.HostAccount.requests,
  authenticateToken,
  isHost,
  hostAssetController.getAllRequests.bind(hostAssetController)
);

hostAccountRoutes.patch(
  HOST_ROUTES.HostAccount.assetReApply,
  authenticateToken,
  isHost,
  hostAssetController.reSubmit.bind(hostAssetController)
);

hostAccountRoutes.patch(
  HOST_ROUTES.HostAccount.assetUnavailable,
  authenticateToken,
  isHost,
  hostAssetController.unavailableAsset.bind(hostAssetController)
);

hostAccountRoutes.patch(
  HOST_ROUTES.HostAccount.assetDelete,
  authenticateToken,
  isHost,
  hostAssetController.deleteAsset.bind(hostAssetController)
);

export default hostAccountRoutes;
