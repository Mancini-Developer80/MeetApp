import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import * as atatus from "atatus-spa";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

atatus.config("f743440dca674b5aa221bc6c38f023a2").install();
atatus.notify(new Error("Test Atatus Setup"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();
