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

import "@spectrum-web-components/field-label/sp-field-label.js";

import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { style } from "./InfoLabel.css";

@customElement("add-on-info-label")
export class InfoLabel extends LitElement {
    @property({ type: String })
    text!: string;

    @property({ type: String })
    infoText!: string;

    static get styles() {
        return style;
    }

    render() {
        return html`<div class="label-group">
            <sp-field-label class="text-label">${this.text}</sp-field-label>
            <sp-field-label size="s">${this.infoText}</sp-field-label>
        </div>`;
    }
}
