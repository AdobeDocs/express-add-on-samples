/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
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
