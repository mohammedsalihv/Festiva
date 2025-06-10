import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./Slice/user/userSlice";
import hostReducer from "@/redux/Slice/host/hostSlice";
import selectServiceReducer from "./Slice/host/selectServiceSlice";
import locationFeaturesReducer from "./Slice/host/locationFeaturesSlice";
import imageReducer from "./Slice/host/imageSlice";
import venueDetailsReducer from "@/redux/Slice/host/venueDetailsSlice";
import locationReducer from "@/redux/Slice/host/locationSlice";
import adminReduer from "@/redux/Slice/admin/adminSlice";
import userManagementReducer from "@/redux/Slice/admin/userManagementSlice";
import hostManagementReducer from "@/redux/Slice/admin/hostManagementSlice";
import assetManagementReducer from "@/redux/Slice/admin/assetManagementSlice";

const rootReducer = combineReducers({
  user: userReducer,
  host: hostReducer,
  selectService: selectServiceReducer,
  locationFeatures: locationFeaturesReducer,
  images: imageReducer,
  venueDetails: venueDetailsReducer,
  location: locationReducer,
  admin: adminReduer,
  userManagement: userManagementReducer,
  hostManagement: hostManagementReducer,
  asset: assetManagementReducer,
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
