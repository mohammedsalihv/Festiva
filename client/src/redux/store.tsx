import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/user/userSlice';
import hostReducer from "@/redux/Slice/host/hostSlice";
import selectService from './Slice/host/selectService';
import locationFeatures from './Slice/host/locationFeaturesSlice';
import imageReducer from './Slice/host/imageSlice';



const store = configureStore({
    reducer:{
        user:userReducer,
        host:hostReducer,
        selectService:selectService,
        locationFeatures:locationFeatures,
        images: imageReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;