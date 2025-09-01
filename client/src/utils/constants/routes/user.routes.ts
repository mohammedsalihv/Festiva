export const USER_ROUTE = {
  userRoutes: "/user/*",
  Authentication: {
    userLanding: "/",
    userLogin: "/login",
    userSignup: "/signup",
  },
  userPages: {
    home: "/home",
    profile: "/profile",
    bookings: "/bookings",
    bookingDetail: "/bookings/detail/:bookingId",
    payment:"/payment",
    services: "/services",
    assetType: "/assets/:type",
    assetDetails: "/services/:type/details/:id",
  },
  notfound: "*",
  userRedirectLinks: {
    toUserHome: "/user/home",
  },
} as const;
