export const HOST_ROUTES = {
  Authentication: {
    hostLogin: "",
    hostLandingPage:"/host/landing",
    
  },
  hostAccount: {
    hostDashboard: "dashboard",
    assetStatus: "/asset/status",
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
  notfound: "*",
} as const;
