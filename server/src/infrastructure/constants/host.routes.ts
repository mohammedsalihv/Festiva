export const HOST_ROUTES = {
  Authentiation: {
    hostSignup: "/signup",
    hostLogin: "/login",
    hostEmailValidation:"/validateEmail",
    Refresh_Token: "/refresh",
    hostLogout: "/logout",
  }, 
  HostAccount: {
    notifications: "/notifications",
    notificationsMarkAllRead: "/notifications/mark-all-read",
    myAssets:'/myassets',
    assetDetails: "/assets/details/:assetId",
    requests: "/requests",
  },
  VenueService: {
    addVenue: "/addVenue",
  },
  RentcarService: {
    addRentcar: "/addRentCar",
  },
  CatersService: {
    addCaters: "/addCaters",
  },
  StudioService: {
    addStudio: "/addStudio",
  },
} as const;
