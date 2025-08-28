import express from "express";
import { HOST_ROUTES } from "../../../infrastructure/constants/host.routes";
import {
  authenticateToken,
  isHost,
} from "../../../utils/common/middlewares/auth";
import { hostNotificationController } from "../../../infrastructure/DI/host/hostAccountDependencyInjections/hostNotification.DI";
import { hostAssetController } from "../../../infrastructure/DI/host/hostAccountDependencyInjections/hostAsset.DI";
import { hostBookingController } from "../../../infrastructure/DI/host/hostAccountDependencyInjections/hostBookings.DI";
import { hostReviewsController } from "../../../infrastructure/DI/host/hostAccountDependencyInjections/hostReviews.DI";


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
  HOST_ROUTES.HostAccount.bookings,
  authenticateToken,
  isHost,
  hostBookingController.getAllBookings.bind(hostBookingController)
);

hostAccountRoutes.put(
  HOST_ROUTES.HostAccount.bookingUpdates,
  authenticateToken,
  isHost,
  hostBookingController.updateBookingsStatus.bind(hostBookingController)
);

hostAccountRoutes.get(
  HOST_ROUTES.HostAccount.reviews,
  authenticateToken,
  isHost,
  hostReviewsController.allReviews.bind(hostReviewsController)
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
  HOST_ROUTES.HostAccount.assetAvailability,
  authenticateToken,
  isHost,
  hostAssetController.assetAvailability.bind(hostAssetController)
);

hostAccountRoutes.patch(
  HOST_ROUTES.HostAccount.assetDelete,
  authenticateToken,
  isHost,
  hostAssetController.deleteAsset.bind(hostAssetController)
);

export default hostAccountRoutes;
