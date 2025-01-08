import { createSlice } from "@reduxjs/toolkit";

const deviceSlice = createSlice({
  name: "deviceToken",
  initialState: {
    deviceToken: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.deviceToken = action.payload;
    },
  },
});

export const { setToken } = deviceSlice.actions;
export default deviceSlice.reducer;
