import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-dark.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-dark.js";
import "@spectrum-web-components/theme/theme-light.js";

import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/action-group/sp-action-group.js";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/textfield/sp-textfield.js";

import App from "./components/App";
import store from "./Store.js";

await AddOnSdk.ready;
window.AddOnSdk = AddOnSdk;
console.log("AddOnSdk is ready for use.");
await store.ready(AddOnSdk.instance.clientStorage);
console.log("Store is ready");

const root = createRoot(document.getElementById("root"));
root.render(
    <sp-theme theme="express" color="light" scale="medium">
        <App addOnSdk={AddOnSdk} store={store} />
    </sp-theme>
);
