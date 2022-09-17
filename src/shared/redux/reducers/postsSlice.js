import { createSlice } from "@reduxjs/toolkit";

const initState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: initState,
  reducers: {
    setAllPosts: (state, action) => {
      let tempObj = { ...state, ...action.payload };
      return tempObj;
    },
    resetPosts: () => initState,
  },
});

export const { setAllPosts, resetPosts } = postsSlice.actions;

export default postsSlice.reducer;
