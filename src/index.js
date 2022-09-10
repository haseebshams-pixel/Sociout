import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/shared/redux/store";
import "./index.css";
import App from "./App";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

axios.defaults.baseURL = "https://sociout-dev.herokuapp.com/api/";
// axios.defaults.baseURL = "http://localhost:8000/api/";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <App />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
