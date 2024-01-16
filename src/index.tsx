import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Forecast } from "./forecast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Forecast />
  </React.StrictMode>
);
