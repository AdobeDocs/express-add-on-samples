import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";
import "@spectrum-web-components/theme/theme-light.js";
import "../gradient/Gradient";

import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { style } from "./App.css";

import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

@customElement("add-on-app")
export class App extends LitElement {
    @property({ type: Object })
    addOnUISdk!: AddOnSDKAPI;

    static get styles() {
        return style;
    }

    render() {
        return html`<sp-theme theme="express" color="light" scale="medium">
            <add-on-gradient .addOnUISdk=${this.addOnUISdk}></add-on-gradient>
        </sp-theme>`;
    }
}
