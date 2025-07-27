export const ADMIN_API = {
  Authentication: {
    adminLogin: "/auth/login",
  },
  assetManagement: {
    getAllAssets: (type: string) => `/assets/${type}`,
    getSingleAssetDetails: (assetId: string, type: string) =>
      `/assets/details/${assetId}?type=${type}`,
    approveAsset: (assetId: string, type: string) =>
      `/assets/approve/${assetId}?assetStatus=approved&type=${type}`,
    rejectAsset: (assetId: string, type: string , reason:string) =>
      `/assets/reject/${assetId}?assetStatus=rejected&type=${type}&reason=${reason}`,
  },
  hostManagement: {
    getAllHosts: "/hosts",
    blockUnblock: (hostId: string) => `/hosts/blockUnblock/${hostId}`,
    editHost: (hostId: string) => `/hosts/edit/${hostId}`,
    changeProfile: (hostId: string) => `/hosts/changeprofile/${hostId}`,
    deleteHost: (hostId: string) => `/hosts/${hostId}`,
  },
  userManagement: {
    getAllUsers: "/users",
    blockUnblock: (userId: string) => `/users/blockUnblock/${userId}`,
    editUser: (userId: string) => `/users/edit/${userId}`,
    changeProfile: (userId: string) => `/users/changeprofile/${userId}`,
    deleteUser: (userId: string) => `/users/${userId}`,
  },
};
