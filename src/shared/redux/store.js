import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./reducers/userSlice.js";
const rootReducer = combineReducers({
  user: user,
});
const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});
export { store };
