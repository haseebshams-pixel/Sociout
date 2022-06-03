import { createSlice } from "@reduxjs/toolkit";

const initState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      let tempObj = { ...state, ...action.payload };
      return tempObj;
    },
    resetUser: () => initState,
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
