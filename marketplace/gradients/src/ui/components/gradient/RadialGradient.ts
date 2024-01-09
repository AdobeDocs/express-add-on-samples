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
    Center = "Center",
    Top = "Top",
    Right = "Right",
    Bottom = "Bottom",
    Left = "Left"
}

const DEFAULT_RADIUS = 10;

@customElement("add-on-radial-gradient")
export class RadialGradient extends LitElement {
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
    private _fillDirection: FillDirection = FillDirection.Center;

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
        this._generatePreview(FillDirection.Center);
        this._generatePreview(FillDirection.Top);
        this._generatePreview(FillDirection.Right);
        this._generatePreview(FillDirection.Bottom);
        this._generatePreview(FillDirection.Left);
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
        let r0: number;
        let x1: number;
        let y1: number;
        let r1: number;

        switch (fillDirection) {
            case FillDirection.Center: {
                x0 = this.width / 2;
                y0 = this.height / 2;
                r0 = DEFAULT_RADIUS;
                x1 = this.width / 2;
                y1 = this.height / 2;
                r1 = this.height;

                break;
            }
            case FillDirection.Top: {
                x0 = this.width / 2;
                y0 = 0;
                r0 = DEFAULT_RADIUS;
                x1 = this.width / 2;
                y1 = this.height / 2;
                r1 = this.height;

                break;
            }
            case FillDirection.Right: {
                x0 = this.width;
                y0 = this.height / 2;
                r0 = DEFAULT_RADIUS;
                x1 = this.width / 2;
                y1 = this.height / 2;
                r1 = this.height;

                break;
            }
            case FillDirection.Bottom: {
                x0 = this.width / 2;
                y0 = this.height;
                r0 = DEFAULT_RADIUS;
                x1 = this.width / 2;
                y1 = this.height / 2;
                r1 = this.height;

                break;
            }
            case FillDirection.Left: {
                x0 = 0;
                y0 = this.height / 2;
                r0 = DEFAULT_RADIUS;
                x1 = this.width / 2;
                y1 = this.height / 2;
                r1 = this.height;

                break;
            }
            default: {
                throw new Error(`'${fillDirection}' is not a valid direction.`);
            }
        }

        return canvasContext.createRadialGradient(x0, y0, r0, x1, y1, r1);
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
                    <img id=${`preview${FillDirection.Center}`} style="margin: 0 8px 8px 0" @click=${() =>
                        this._handleFillDirectionChange(FillDirection.Center)}></img>
                    <label id=${`label${FillDirection.Center}`} style="text-align: center; margin: 0 8px 0 0;">${
                        FillDirection.Center
                    }</label>
                </div>
                <div class="image-group">
                    <img id=${`preview${FillDirection.Top}`} style="margin: 0 8px 8px 8px" @click=${() =>
                        this._handleFillDirectionChange(FillDirection.Top)}></img>
                    <label id=${`label${FillDirection.Top}`} style="text-align: center; margin: 0 8px 0 8px">${
                        FillDirection.Top
                    }</label>
                </div>
                <div class="image-group">
                    <img id=${`preview${FillDirection.Right}`} style="margin: 0 0 8px 8px" @click=${() =>
                        this._handleFillDirectionChange(FillDirection.Right)}></img>
                    <label id=${`label${FillDirection.Right}`} style="text-align: center; margin: 0 0 0 8px">${
                        FillDirection.Right
                    }</label>
                </div>
            </div>
            <div class="preview-container">
                <div class="image-group">
                    <img id=${`preview${FillDirection.Bottom}`} style="margin: 8px 8px 8px 0" @click=${() =>
                        this._handleFillDirectionChange(FillDirection.Bottom)}></img>
                    <label id=${`label${FillDirection.Bottom}`} style="text-align: center; margin: 0 8px 0 0;">${
                        FillDirection.Bottom
                    }</label>
                </div>
                <div class="image-group">
                    <img id=${`preview${FillDirection.Left}`} style="margin: 8px 8px 8px 8px" @click=${() =>
                        this._handleFillDirectionChange(FillDirection.Left)}></img>
                    <label id=${`label${FillDirection.Left}`} style="text-align: center; margin: 0 8px 0 8px">${
                        FillDirection.Left
                    }</label>
                </div>
            </div>
        </div>`;
    }
}
