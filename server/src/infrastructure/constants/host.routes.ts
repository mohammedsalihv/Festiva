export const HOST_ROUTES = {
  Authentiation: {
    hostSignup: "/signup",
    hostGoogleSignup: "/google/signup",
    hostLogin: "/login",
    hostGoogleLogin: "/google/login",
    hostEmailValidation:"/validateEmail",
    Refresh_Token: "/refresh",
    hostLogout: "/logout",
  }, 
  HostAccount: {
    notifications: "/notifications",
    notificationsMarkAllRead: "/notifications/mark-all-read",
    myAssets:'/myassets',
    bookings:'/bookings',
    bookingUpdates:'/bookings/status/:bookingId',
    reviews:'/reviews',
    assetDetails: "/assets/details/:assetId",
    assetReApply:"/assets/re-apply/:assetId",
   assetAvailability: "/assets/:assetId",
    assetDelete:"/assets/delete/:assetId",
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
