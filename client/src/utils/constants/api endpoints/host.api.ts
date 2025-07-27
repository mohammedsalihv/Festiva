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
    myAssets:'/myassets',
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
