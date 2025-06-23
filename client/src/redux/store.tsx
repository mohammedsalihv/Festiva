import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./Slice/user/userSlice";
import hostReducer from "@/redux/Slice/host/common/hostSlice";
import selectServiceReducer from "./Slice/host/common/selectServiceSlice";
import imageReducer from "./Slice/host/common/imageSlice";
import venueReducer from "@/redux/Slice/host/venue/venueSlice";
import rentcarReducer from "@/redux/Slice/host/rentcar/rentCarSlice"
import locationReducer from "@/redux/Slice/host/common/locationSlice";
import serviceTypeReducer from "@/redux/Slice/host/common/serviceTypeSlice"
import adminReduer from "@/redux/Slice/admin/adminSlice";
import userManagementReducer from "@/redux/Slice/admin/userManagementSlice";
import hostManagementReducer from "@/redux/Slice/admin/hostManagementSlice";
import assetManagementReducer from "@/redux/Slice/admin/assetManagementSlice";

const rootReducer = combineReducers({
  user: userReducer,
  host: hostReducer,
  selectService: selectServiceReducer,
  images: imageReducer,
  venue: venueReducer,
  rentcar:rentcarReducer,
  location: locationReducer,
  serviceType:serviceTypeReducer,
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
