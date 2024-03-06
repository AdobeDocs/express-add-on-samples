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

import "@spectrum-web-components/color-area/sp-color-area.js";
import "@spectrum-web-components/color-slider/sp-color-slider.js";
import "@spectrum-web-components/textfield/sp-textfield.js";

import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { COLOR_REGEX } from "../../constants";
import { style } from "./ColorPicker.css";

@customElement("add-on-color-picker")
export class ColorPicker extends LitElement {
    @property({ type: String })
    readonly defaultColor!: string;

    @property({ type: String })
    color!: string;

    @state()
    private _isColorValid = true;

    static get styles() {
        return style;
    }

    updated(): void {
        this._dispatchColorChangeEvent();
    }

    private _handleColorTextChange(event: { target: HTMLInputElement }): void {
        const color = String(event.target.value).toUpperCase();
        this._isColorValid = COLOR_REGEX.test(color);
        if (this._isColorValid) {
            this.color = color;
        }
    }

    private _handleColorSliderChange(event: any): void {
        // [Bug in SWC]: https://github.com/adobe/spectrum-web-components/issues/3883
        // Slider cannot be set beyond the range, for example - black (#000000) or white (#FFFFFF).
        // When the text input is set to outside the range,
        // subsequent slider changes returns the old value which was set
        // until the text input value is set back within the slider's range.
        const color = String(event.target.color).toUpperCase();
        this._isColorValid = true;
        this.color = color;
    }

    private _handleColorAreaChange(event: any): void {
        const color = String(event.target.color).toUpperCase();
        this._isColorValid = true;
        this.color = color;
    }

    private _dispatchColorChangeEvent(): void {
        const options = {
            detail: { color: this.color },
            bubbles: true,
            composed: true
        };

        this.dispatchEvent(new CustomEvent("change", options));
    }

    render() {
        return html`<div class="color-picker-container">
            <div class="row">
                <div class="column">
                    <sp-textfield
                        class="text-input"
                        size="l"
                        id="color"
                        placeholder=${this.defaultColor}
                        value=${this.color}
                        ?invalid=${!this._isColorValid}
                        @input=${this._handleColorTextChange}
                    ></sp-textfield>
                    <sp-color-slider
                        class="color-slider"
                        color=${this.color}
                        @change=${this._handleColorSliderChange}
                    ></sp-color-slider>
                </div>
                <sp-color-area
                    class="color-area"
                    color=${this.color}
                    @change=${this._handleColorAreaChange}
                ></sp-color-area>
            </div>
        </div>`;
    }
}
