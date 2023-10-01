import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GlobalStatesProvider } from "./components/globalStatesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalStatesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalStatesProvider>
);
