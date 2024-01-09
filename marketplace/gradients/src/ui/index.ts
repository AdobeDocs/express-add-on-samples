/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { until } from "lit/directives/until.js";
import "./components/app/App";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

@customElement("add-on-root")
export class Root extends LitElement {
    @state()
    private _isAddOnUISdkReady = addOnUISdk.ready;

    render() {
        return html`
            ${until(
                this._isAddOnUISdkReady.then(() => {
                    return html`<add-on-app .addOnUISdk=${addOnUISdk}></add-on-app>`;
                })
            )}
        `;
    }
}
