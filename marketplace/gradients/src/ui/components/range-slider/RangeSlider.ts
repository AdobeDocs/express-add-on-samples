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

import { LitElement, PropertyValueMap, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ACTIVE_BORDER, INACTIVE_BORDER } from "../../constants";
import { style } from "./RangeSlider.css";

export enum Stop {
    Initial = "Initial",
    Final = "Final"
}

const THUMB_WIDTH = 8;

@customElement("add-on-range-slider")
export class RangeSlider extends LitElement {
    @property({ type: Number })
    starting!: number;

    @property({ type: Number })
    ending!: number;

    @property({ type: String })
    startingColor!: string;

    @property({ type: String })
    endingColor!: string;

    @property({ type: Number })
    minRange!: number;

    @property({ type: Number })
    maxRange!: number;

    @state()
    private _activeStop = Stop.Initial;

    static get styles() {
        return style;
    }

    updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        // Since the values of `starting` and `ending` stops have to be controlled
        // so that one does not cross the other while the user is dragging the slider thumbs
        // their values have to be directly set on the DOM.
        if (changedProperties.has("starting")) {
            const startingSlider = this.shadowRoot.getElementById("startingSlider") as HTMLInputElement;
            startingSlider.value = this.starting.toString();
        }

        if (changedProperties.has("ending")) {
            const endingSlider = this.shadowRoot.getElementById("endingSlider") as HTMLInputElement;
            endingSlider.value = this.ending.toString();
        }

        if (
            changedProperties.has("startingColor") ||
            changedProperties.has("endingColor") ||
            changedProperties.has("_activeStop")
        ) {
            this._paintSliderThumbs();
        }

        this._dispatchSliderEvent();
    }

    private _paintSliderThumbs() {
        const startingSlider = this.shadowRoot.getElementById("startingSlider") as HTMLInputElement;
        const endingSlider = this.shadowRoot.getElementById("endingSlider") as HTMLInputElement;
        if (!startingSlider || !endingSlider) {
            return;
        }

        startingSlider.style.setProperty("--thumb-color", this.startingColor);
        endingSlider.style.setProperty("--thumb-color", this.endingColor);

        if (this._activeStop === Stop.Initial) {
            startingSlider.style.setProperty("--thumb-border", ACTIVE_BORDER);
            endingSlider.style.setProperty("--thumb-border", INACTIVE_BORDER);
        } else if (this._activeStop === Stop.Final) {
            startingSlider.style.setProperty("--thumb-border", INACTIVE_BORDER);
            endingSlider.style.setProperty("--thumb-border", ACTIVE_BORDER);
        }
    }

    private _handleSelect(activeThumb: Stop) {
        this._activeStop = activeThumb;
    }

    private _handleInitialChange(event: { target: HTMLInputElement }): void {
        this._activeStop = Stop.Initial;

        const startingValue = parseInt(event.target.value, 10);
        if (startingValue > this.ending) {
            this.starting = this.ending;
        } else {
            this.starting = startingValue;
        }

        const startingSlider = this.shadowRoot.getElementById("startingSlider") as HTMLInputElement;
        startingSlider.value = this.starting.toString();

        // Revert superimposing the ending slider thumb over the starting slider thumb.
        const endingSlider = this.shadowRoot.getElementById("endingSlider") as HTMLInputElement;
        endingSlider.style.zIndex = "0";
    }

    private _handleFinalChange(event: { target: HTMLInputElement }): void {
        this._activeStop = Stop.Final;

        const endingValue = parseInt(event.target.value, 10);
        if (endingValue <= this.starting) {
            this.ending = this.starting;
        } else {
            this.ending = endingValue;
        }

        const endingSlider = this.shadowRoot.getElementById("endingSlider") as HTMLInputElement;
        endingSlider.value = this.ending.toString();

        // Superimposing the ending slider thumb over the starting slider thumb.
        if (endingValue <= this.starting + THUMB_WIDTH) {
            endingSlider.style.zIndex = "2";
        } else {
            endingSlider.style.zIndex = "0";
        }
    }

    private _dispatchSliderEvent(): void {
        const options = {
            detail: { starting: this.starting, ending: this.ending, activeStop: this._activeStop },
            bubbles: true,
            composed: true
        };

        this.dispatchEvent(new CustomEvent("change", options));
    }

    render() {
        return html`<div class="range-container">
            <div class="sliders-control">
                <input
                    id="startingSlider"
                    type="range"
                    style="background: linear-gradient(90deg, ${this.startingColor} 0%, ${this.endingColor} 100%);"
                    min=${this.minRange}
                    max=${this.maxRange}
                    @click=${() => this._handleSelect(Stop.Initial)}
                    @input=${this._handleInitialChange}
                />
                <input
                    id="endingSlider"
                    type="range"
                    style="background: linear-gradient(90deg, ${this.startingColor} 0%, ${this.endingColor} 100%);"
                    min=${this.minRange}
                    max=${this.maxRange}
                    @click=${() => this._handleSelect(Stop.Final)}
                    @input=${this._handleFinalChange}
                />
            </div>
        </div>`;
    }
}
