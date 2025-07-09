export const USER_ROUTE = {
  Authentication: {
    userLanding: "/",
    userLogin: "/login",
    userSignup: "/signup",
  },
  userPages: {
    home: "/home",
    profile: "/profile",
    bookings: "/bookings",
    services: "/services",
    assetType: "/assets/:type",
    assetDetails: "/services/:type/details/:id",
  },
  venuService: {
    venueTypesPage: "/venues/types",
  },
  notfound: "*",
  userRedirectLinks: {
    toUserHome: "/user/home",
  },
} as const;
