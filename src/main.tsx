import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Initialize Tempo Devtools only in development
if (import.meta.env.DEV) {
  import("tempo-devtools")
    .then(({ TempoDevtools }) => {
      /* TempoDevtools.init() [deprecated] */;
    })
    .catch(() => {
      console.log("Tempo devtools not available");
    });
}

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
