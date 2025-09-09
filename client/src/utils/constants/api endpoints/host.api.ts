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
    dashboard:'/dashboard',
    notifications: "/notifications",
    markAllReadNotifications: "/notifications/mark-all-read",
    myAssets: "/myassets",
    assetFullDetails: (assetId: string) => `/assets/details/${assetId}`,
    assetReApplying: (assetId: string) => `/assets/re-apply/${assetId}`,
    updateAvailability: (assetId: string) => `/assets/${assetId}`,
    assetDelete: (assetId: string) => `/assets/delete/${assetId}`,
    requets: "/requests",
    hostBookings: "/bookings",
    updateBookingStatus: (
      bookingId: string,
      status: string,
      reason?: string
    ) => {
      let url = `/bookings/status/${bookingId}?status=${status}`;
      if (reason) {
        url += `&reason=${encodeURIComponent(reason)}`;
      }
      return url;
    },
    hostReviews: "/reviews",
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
