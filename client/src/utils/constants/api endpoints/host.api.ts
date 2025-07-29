export const HOST_API = {
  Authentication: {
    hostLogin: "/auth/login",
    hostSignup: "/auth/signup",
    validateEmail: () => `/auth/validateEmail`,
    hostLogout: "/auth/logout",
  },
  hostAccount: {
    notifications: "/notifications",
    markAllReadNotifications: "/notifications/mark-all-read",
    myAssets: "/myassets",
    assetFullDetails: (assetId: string) => `/assets/details/${assetId}`,
    requets: "/requests",
  },
  venueService: {
    addVenue: "/addVenue",
  },
  rentcarService: {
    addRentcar: "/addRentCar",
  },
  catersService: {
    addCaters: "/addCaters",
  },
  studioService: {
    addStudio: "/addStudio",
  },
} as const;
