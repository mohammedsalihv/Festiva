import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/user/userSlice";
import hostReducer from "@/redux/Slice/host/hostSlice";
import selectServiceReducer from "./Slice/host/selectServiceSlice";
import locationFeaturesReducer from "./Slice/host/locationFeaturesSlice";
import imageReducer from "./Slice/host/imageSlice";
import venueDetailsReducer from "@/redux/Slice/host/venueDetailsSlice";
import locationReducer from "@/redux/Slice/host/locationSlice";
import adminReduer from "@/redux/Slice/admin/adminSlice";
import userManagementReducer from "@/redux/Slice/admin/userManagementSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    host: hostReducer,
    selectService: selectServiceReducer,
    locationFeatures: locationFeaturesReducer,
    images: imageReducer,
    venueDetails: venueDetailsReducer,
    location: locationReducer,
    admin: adminReduer,
    userManagement: userManagementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
