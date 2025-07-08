export const HOST_ROUTES = {
  Authentiation: {
    hostSignup: "/signup",
    hostLogin: "/login",
    Refresh_Token: "/refresh",
  },
  HostAccount: {
    notifications: "/notifications",
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
