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
import { customElement, property, state } from "lit/decorators.js";
import { ACTIVE_BORDER, ACTIVE_FONT_WEIGHT, DEFAULT_FONT_WEIGHT, INACTIVE_BORDER, MAX_RANGE } from "../../constants";
import { style } from "./Gradient.css";

enum FillDirection {
    Diagonal = "Diagonal",
    Horizontal = "Horizontal",
    Vertical = "Vertical"
}

@customElement("add-on-linear-gradient")
export class LinearGradient extends LitElement {
    @property({ type: String })
    initialColor!: string;

    @property({ type: String })
    finalColor!: string;

    @property({ type: Number })
    width!: number;

    @property({ type: Number })
    height!: number;

    @property({ type: Number })
    stop1!: number;

    @property({ type: Number })
    stop2!: number;

    @property({ type: Boolean })
    active!: boolean;

    @state()
    private _fillDirection: FillDirection = FillDirection.Diagonal;

    @state()
    private _gradientImageUrl: string;

    static get styles() {
        return style;
    }

    updated(): void {
        if (!this.active) {
            return;
        }

        this._generatePreviews();

        this._gradientImageUrl = this._getGradientImage(this._fillDirection);
        this._dispatchGradientEvent(this._gradientImageUrl);
    }

    private _generatePreviews() {
        this._generatePreview(FillDirection.Diagonal);
        this._generatePreview(FillDirection.Horizontal);
        this._generatePreview(FillDirection.Vertical);
    }

    private _generatePreview(fillDirection: FillDirection) {
        const previewImageUrl = this._getGradientImage(fillDirection);

        const previewImage = this.shadowRoot.getElementById(`preview${fillDirection}`);
        previewImage.setAttribute("src", previewImageUrl);

        const previewLabel = this.shadowRoot.getElementById(`label${fillDirection}`);

        if (fillDirection === this._fillDirection) {
            previewImage.style.border = ACTIVE_BORDER;
            previewLabel.style.fontWeight = ACTIVE_FONT_WEIGHT;
        } else {
            previewImage.style.border = INACTIVE_BORDER;
            previewLabel.style.fontWeight = DEFAULT_FONT_WEIGHT;
        }
    }

    private _getGradientImage(fillDirection: FillDirection): string {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;

        const canvasContext = canvas.getContext("2d");
        const canvasGradient = this._getGradient(canvasContext, fillDirection);

        const stop1 = Number((this.stop1 / MAX_RANGE).toFixed(1));
        const stop2 = Number((this.stop2 / MAX_RANGE).toFixed(1));

        canvasGradient.addColorStop(stop1, this.initialColor);
        canvasGradient.addColorStop(stop2, this.finalColor);

        canvasContext.fillStyle = canvasGradient;
        canvasContext.fillRect(0, 0, this.width, this.height);

        return canvas.toDataURL("image/png");
    }

    private _getGradient(canvasContext: CanvasRenderingContext2D, fillDirection: FillDirection): CanvasGradient {
        let x0: number;
        let y0: number;
        let x1: number;
        let y1: number;

        switch (fillDirection) {
            case FillDirection.Diagonal: {
                x0 = 0;
                y0 = 0;
                x1 = this.width;
                y1 = this.height;

                break;
            }
            case FillDirection.Vertical: {
                x0 = 0;
                y0 = 0;
                x1 = this.width;
                y1 = 0;

                break;
            }
            case FillDirection.Horizontal: {
                x0 = 0;
                y0 = 0;
                x1 = 0;
                y1 = this.height;

                break;
            }
            default: {
                throw new Error(`'${fillDirection}' is not a valid direction.`);
            }
        }

        return canvasContext.createLinearGradient(x0, y0, x1, y1);
    }

    private _handleFillDirectionChange(fillDirection: FillDirection): void {
        this._fillDirection = fillDirection;
    }

    private _dispatchGradientEvent(gradientImageUrl: string) {
        const options = {
            detail: { gradientImageUrl },
            bubbles: true,
            composed: true
        };

        this.dispatchEvent(new CustomEvent("change", options));
    }

    render() {
        return html`<div class="gradient-control-container">
            <sp-field-label class="text-label" size="l">Fill Direction</sp-field-label>
            <div class="preview-container">
                <div class="image-group">
                    <img id=${`preview${FillDirection.Diagonal}`} style="margin: 0 8px 8px 0" @click=${() =>
                        this._handleFillDirectionChange(FillDirection.Diagonal)}></img>
                    <label id=${`label${FillDirection.Diagonal}`} style="text-align: center; margin: 0 8px 0 0;">${
                        FillDirection.Diagonal
                    }</label>
                </div>
                <div class="image-group">
                    <img id=${`preview${FillDirection.Vertical}`} style="margin: 0 8px 8px 8px" @click=${() =>
                        this._handleFillDirectionChange(FillDirection.Vertical)}></img>
                    <label id=${`label${FillDirection.Vertical}`} style="text-align: center; margin: 0 8px 0 8px">${
                        FillDirection.Vertical
                    }</label>
                </div>
                <div class="image-group">
                    <img id=${`preview${FillDirection.Horizontal}`} style="margin: 0 0 8px 8px" @click=${() =>
                        this._handleFillDirectionChange(FillDirection.Horizontal)}></img>
                    <label id=${`label${FillDirection.Horizontal}`} style="text-align: center; margin: 0 0 0 8px">${
                        FillDirection.Horizontal
                    }</label>
                </div>
            </div>
        </div>`;
    }
}
