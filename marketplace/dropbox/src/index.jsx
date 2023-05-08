import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

AddOnSdk.ready.then(() => {
    const root = createRoot(document.getElementById("root"));
    root.render(<App addOnSdk={AddOnSdk} />);
});
