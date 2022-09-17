import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "./reducers/userSlice.js";
import chat from "./reducers/chatSlice.js";
import posts from "./reducers/postsSlice";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "chat"],
};
const rootReducer = combineReducers({
  user: user,
  chat: chat,
  posts: posts,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["register"],
        ignoredActionPaths: ["rehydrate", "register"],
        ignoredPaths: ["register"],
      },
    }),
});
const persistor = persistStore(store);
export { store, persistor };
