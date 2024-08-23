import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/App";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(() => {
    const root = createRoot(document.getElementById("root"));
    root.render(<App addOnUISdk={addOnUISdk} />);
});
