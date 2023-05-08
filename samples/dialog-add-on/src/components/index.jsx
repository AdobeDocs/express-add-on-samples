import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

AddOnSdk.ready.then(() => {
  console.log("AddOnSdk is ready for use.");

  const root = createRoot(document.getElementById("root"));
  root.render(<App addOnSdk={AddOnSdk} />);
});
