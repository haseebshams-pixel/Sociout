import { createSlice } from "@reduxjs/toolkit";

const initState = {
  conversations: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState: initState,
  reducers: {
    setChat: (state, action) => {
      let tempObj = { ...state, ...action.payload };
      return tempObj;
    },
    resetChat: () => initState,
  },
});

export const { setChat, resetChat } = chatSlice.actions;

export default chatSlice.reducer;
