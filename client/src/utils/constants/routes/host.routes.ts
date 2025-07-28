export const HOST_ROUTES = {
  hostRoutes: "/host/*",
  hostPublicRoutes: "/*",
  Authentication: {
    hostLogin: "/host/login",
    hostLandingPage: "/host/landing",
  },
  hostAccount: {
    hostDashboard: "dashboard",
    assetStatus: "/asset/status",
    myAssets:"assets",
    assetDetails:"/assets/details",
    hostProfile:"/profile"
  },
  hostPages: {
    kindOfServicePage: "kind-of-service",
  },
  hostListingServices: {
    venueService: {
      venueServiceForm: "/list/venue-service",
      venueServiceDetailsForm: "/list/venue-details",
    },
    rentcarService: {
      rentcarServiceForm: "/list/rentcar-service",
      rentcarServiceDetailsForm: "/list/rentcar-details",
    },
    catersService: {
      catersServiceForm: "/list/caters-service",
      catersServiceDetailsForm: "/list/caters-details",
    },
    studioService: {
      studioServiceForm: "/list/studio-service",
      studioServiceDetailsForm: "/list/studio-details",
    },
    imageUpload: "/list/image-upload",
    locationDetails: "/list/location-details",
  },

  redirectRoutes: {
    toDashboard: "/host/dashbaord",
    toLanding:"/host/landing"
  },
  notfound: "*",
  error: "/error",
} as const;
