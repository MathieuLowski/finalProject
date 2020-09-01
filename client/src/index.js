import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import CurrentUserProvider from "./components/CurrentUserContext";
import TourProvider from "./components/TourContext";

ReactDOM.render(
  <CurrentUserProvider>
    <TourProvider>
      <App />
    </TourProvider>
  </CurrentUserProvider>,
  document.getElementById("root")
);
