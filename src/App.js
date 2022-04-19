import React from "react";
import AuthRoute from "./shared/routes/authRoute";
import AOS from "aos";
import "aos/dist/aos.css";
import Toast from "./shared/components/common/toast";

AOS.init();
const App = () => {
  return (
    <div>
      <AuthRoute />
      <Toast />
    </div>
  );
};

export default App;
