export const ADMIN_ROUTES = {
  Authentiation: {
    adminLogin: "/login",
    Refresh_Token: "/refresh",
  },
  UserManagement: {
    allUsers: "/users",
    blockAndUnblock: "/users/blockUnblock/:userId",
    userEdit: "/users/edit/:userId",
    profileImageUpdate: "/users/changeprofile/:userId",
    userDelete: "/users/:userId",
  },
  HostManagement: {
    allHosts: "/hosts",
    blockAndUnblock: "/hosts/blockUnblock/:hostId",
    hostEdit: "/hosts/edit/:hostId",
    profileImageUpdate: "/hosts/changeprofile/:hostId",
    hostDelete: "/hosts/:hostId",
  },
  AssetManagement: {
    allAssets: "/assets/:typeOfAsset",
    assetDetails: "/assets/details/:assetId",
    assetApprove: "/assets/approve/:assetId",
    assetReject: "/assets/reject/:assetId",
  },
  BookingManagement: {
    allBookings: "/bookings",
  },
  dashboardManagement: {
    dashboard: "/dashboard",
  },
} as const;
