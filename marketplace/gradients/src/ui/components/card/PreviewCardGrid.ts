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
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { PreviewCard } from "../../../models/index";
import { style } from "./PreviewCardGrid.css";

@customElement("add-on-preview-card-grid")
export class PreviewCardGrid extends LitElement {
    @property({ type: Map })
    data!: Map<string, PreviewCard>;

    static get styles() {
        return style;
    }

    private _dispatchChangeEvent(id: string): void {
        for (const key of this.data.keys()) {
            if (key === id) {
                this.data.set(id, { ...this.data[key], isActive: true });
            } else {
                this.data.set(id, { ...this.data[key], isActive: false });
            }
        }

        const options = {
            detail: { id },
            bubbles: true,
            composed: true
        };

        this.dispatchEvent(new CustomEvent("change", options));
    }

    private _renderCard(cardData: PreviewCard) {
        const previewImage =
            cardData.imageSrc !== undefined
                ? html`<img
                      class=${classMap({ active: cardData.isActive, inactive: !cardData.isActive })}
                      alt=${cardData.heading}
                      src=${cardData.imageSrc}
                  />`
                : html`<img alt=${cardData.heading} />`;

        return html`<div class="column">
            <div class="card" @click=${() => this._dispatchChangeEvent(cardData.id)}>
                ${previewImage}
                <div class=${classMap({ "card-heading": true, "card-heading-active": cardData.isActive })}>
                    ${cardData.heading}
                </div>
            </div>
        </div>`;
    }

    private get _gridData(): PreviewCard[] {
        return Array.from(this.data.values());
    }

    render() {
        return html`<div class="grid-container">
            <div class="row">${this._gridData.map(item => this._renderCard(item))}</div>
        </div>`;
    }
}
