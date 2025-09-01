export const USER_API = {
  Authentication: {
    userLogin: "/auth/login",
    userGoogleLogin: "/auth/google-login",
    userSignup: "/auth/signup",
    sendOtp: "/auth/send-otp",
    verifyOtp: "/auth/verifyOtp",
    validateEmail: (email: string) => `/auth/checkMail/${email}`,
    passwordChange: "/auth/passwordModify",
    passwordReset: "/auth/password/reset",
    userLogout: "/auth/logout",
  },
  userAccount: {
    profileDelete: "/auth/profile/delete",
    changeProfile: "/setProfilePhoto",
    profileEdit: "/profileModify",
    profileImage: (userId: string) => `/profile/image/${userId}`,
  },
  userAssets: {
    getAssetDetails: (assetId: string, assetType: string) =>
      `/asset/details/?assetId=${assetId}&assetType=${assetType}`,
    filterAssets: (type: string) => `/assets/filter/${type}`,
    sortAssets: (type: string) => `/assets/sort/${type}`,
  },
  bookingRoutes : {
    createBooking:'createBooking',
    getMyBookings:'/myBookings',
    bookingDetails: (bookingId:string) => `/bookings/${bookingId}/details`
  },
  paymentRoutes: {
    startPayment: "/startPayment",
    paymentStatus:'/payment/status'
  },
  reviewRoutes : {
    Rating:'/newReview'
  },
  venueService: {
    getVenues: "/getVenues",
  },
  rentcarService: {
    getRentcars: "/getRentcars",
  },
  studioService: {
    getStudios: "/getStudios",
  },
  catersService: {
    getCaters: "/getCaters",
  },
};
