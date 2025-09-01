export const USER_ROUTES = {
  Authentiation: {
    userSignup: "/signup",
    userLogin: "/login",
    sendOtp: "/send-otp",
    verifyOtp: "/verifyOtp",
    Refresh_Token: "/refresh",
    userGoogleLogin: "/google-login",
    mailValidate: "/checkMail/:email",
    passwordReset: "/password/reset",
    passwordChange: "/passwordModify",
    profileDelete: "/profile/delete",
    userLogout: "/logout",
  },
  UserAccount: {
    setProfilePhoto: "/setProfilePhoto",
    profileEdit: "/profileModify",
    profilePic: (userId: string) => `/profile/image/${userId}`,
    getProfileImage: "/profile/image/:userId",
  },
  VenueService: {
    allVenues: "/getVenues",
  },
  RentcarService: {
    allRentcars: "/getRentcars",
  },
  CatersService: {
    allCaters: "/getCaters",
  },
  StudioService: {
    allStudios: "/getStudios",
  },
  UserServices: {
    serviceDetails: "/asset/details",
    filterAssets: "/assets/filter/:type",
    sortAssets: "/assets/sort/:type",
  },
  bookingRoutes: {
    createbooking: "/createbooking",
    allBookings:'/myBookings',
    bookingDetails:"/bookings/:bookingId/details"
  },
  paymentRoutes: {
    startPayment: "/startPayment",
    statusUpdate: "/payment/status",
  },
  reviewRoutes: {
    addNewReview: "/newReview",
  },
} as const;
