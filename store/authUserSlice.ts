import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authUser",
  initialState: {
    authUser: {uid: "121", firstName: "Joshua"},
  },
  reducers: {
    setUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
