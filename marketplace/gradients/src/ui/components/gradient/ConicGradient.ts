import "@spectrum-web-components/field-label/sp-field-label.js";

import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ACTIVE_BORDER, ACTIVE_FONT_WEIGHT, DEFAULT_FONT_WEIGHT, INACTIVE_BORDER, MAX_RANGE } from "../../constants";
import { style } from "./Gradient.css";

enum FillDirection {
    Center = "Center"
}

export const DEFAULT_ANGLE = 45;

@customElement("add-on-conic-gradient")
export class ConicGradient extends LitElement {
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
        let x: number;
        let y: number;

        switch (fillDirection) {
            case FillDirection.Center: {
                x = this.width / 2;
                y = this.height;

                break;
            }
            default: {
                throw new Error(`'${fillDirection}' is not a valid direction.`);
            }
        }

        return canvasContext.createConicGradient(DEFAULT_ANGLE, x, y);
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
                
            </div>
        </div>`;
    }
}
