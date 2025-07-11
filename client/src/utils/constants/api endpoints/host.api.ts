export const HOST_API = {
  Authentication: {
    hostLogin: "/auth/login",
    hostSignup: "/auth/signup",
    validateEmail: () => `/auth/validateEmail`
  },
  hostAccount: {
    notifications: "/notifications",
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
