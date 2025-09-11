import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVenueBase } from "@/utils/Types/user/venueTypes";

const initialUserVenueStates: IVenueBase[] = [];

const userVenueSlice = createSlice({
  name: "userVenue",
  initialState: initialUserVenueStates,
  reducers: {
    setVenues: (state, action: PayloadAction<IVenueBase[]>) => {
      return action.payload;
    },

    resetVenues: () => {
      return initialUserVenueStates;
    },
  },
});

export const { setVenues, resetVenues } = userVenueSlice.actions;
export default userVenueSlice.reducer;
