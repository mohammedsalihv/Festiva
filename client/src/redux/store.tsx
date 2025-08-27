import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./Slice/user/userSlice";
import hostReducer from "@/redux/Slice/host/common/hostSlice";
import selectServiceReducer from "./Slice/host/common/selectServiceSlice";
import imageReducer from "./Slice/host/common/imageSlice";
import venueReducer from "@/redux/Slice/host/venue/venueSlice";
import rentcarReducer from "@/redux/Slice/host/rentcar/rentCarSlice";
import catersReducer from "@/redux/Slice/host/caters/catersSlice";
import studioReducer from "@/redux/Slice/host/studio/studioSlice";
import locationReducer from "@/redux/Slice/host/common/locationSlice";
import serviceTypeReducer from "@/redux/Slice/host/common/serviceTypeSlice";
import adminReduer from "@/redux/Slice/admin/adminSlice";
import userManagementReducer from "@/redux/Slice/admin/userManagementSlice";
import hostManagementReducer from "@/redux/Slice/admin/hostManagementSlice";
import assetManagementReducer from "@/redux/Slice/admin/assetManagementSlice";

import userVenueReducer from "@/redux/Slice/user/userVenueSlice";
import userRentcarReducer from "@/redux/Slice/user/userRentCarSlice";
import bookingReducer from "@/redux/Slice/user/bookingSlice";

import assetSearchReducer from "@/redux/Slice/user/assetSearchSlice";
import myAssetsReducer from "@/redux/Slice/host/common/myAssetsSlice";
import recivedBookings from "@/redux/Slice/host/common/bookingsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  host: hostReducer,
  selectService: selectServiceReducer,
  images: imageReducer,
  venue: venueReducer,
  rentcar: rentcarReducer,
  caters: catersReducer,
  studio: studioReducer,
  location: locationReducer,
  serviceType: serviceTypeReducer,
  admin: adminReduer,
  userManagement: userManagementReducer,
  hostManagement: hostManagementReducer,
  asset: assetManagementReducer,
  userVenue: userVenueReducer,
  userRentcar: userRentcarReducer,
  assetSearch: assetSearchReducer,
  booking: bookingReducer,
  myAssets: myAssetsReducer,
  hostRecivedBookings: recivedBookings,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["images"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["images"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
