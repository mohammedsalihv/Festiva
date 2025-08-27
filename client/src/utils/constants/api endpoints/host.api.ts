export const HOST_API = {
  Authentication: {
    hostLogin: "/auth/login",
    hostGoogleLogin: "/auth/google/login",
    hostSignup: "/auth/signup",
    hostGoogleSignup: "/auth/google/signup",
    validateEmail: () => `/auth/validateEmail`,
    hostLogout: "/auth/logout",
  },
  hostAccount: {
    notifications: "/notifications",
    markAllReadNotifications: "/notifications/mark-all-read",
    myAssets: "/myassets",
    assetFullDetails: (assetId: string) => `/assets/details/${assetId}`,
    assetReApplying: (assetId: string) => `/assets/re-apply/${assetId}`,
    updateAvailability: (assetId: string) => `/assets/${assetId}`,
    assetDelete: (assetId: string) => `/assets/delete/${assetId}`,
    requets: "/requests",
    hostBookings: "/bookings",
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
