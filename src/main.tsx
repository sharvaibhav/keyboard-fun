import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { generateSoundAssets } from "./utils/generateSoundAssets";

// Generate sound assets before rendering
generateSoundAssets();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
