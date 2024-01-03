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
    initial!: number;

    @property({ type: Number })
    final!: number;

    @property({ type: String })
    initialColor!: string;

    @property({ type: String })
    finalColor!: string;

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
        // Since the values of `initial` and `final` stops have to be controlled
        // so that one does not cross the other while the user is dragging the slider thumbs
        // their values have to be directly set on the DOM.
        if (changedProperties.has("initial")) {
            const initialSlider = this.shadowRoot.getElementById("initialSlider") as HTMLInputElement;
            initialSlider.value = this.initial.toString();
        }

        if (changedProperties.has("final")) {
            const finalSlider = this.shadowRoot.getElementById("finalSlider") as HTMLInputElement;
            finalSlider.value = this.final.toString();
        }

        if (
            changedProperties.has("initialColor") ||
            changedProperties.has("finalColor") ||
            changedProperties.has("_activeStop")
        ) {
            this._paintSliderThumbs();
        }

        this._dispatchSliderEvent();
    }

    private _paintSliderThumbs() {
        const initialSlider = this.shadowRoot.getElementById("initialSlider") as HTMLInputElement;
        const finalSlider = this.shadowRoot.getElementById("finalSlider") as HTMLInputElement;
        if (!initialSlider || !finalSlider) {
            return;
        }

        initialSlider.style.setProperty("--thumb-color", this.initialColor);
        finalSlider.style.setProperty("--thumb-color", this.finalColor);

        if (this._activeStop === Stop.Initial) {
            initialSlider.style.setProperty("--thumb-border", ACTIVE_BORDER);
            finalSlider.style.setProperty("--thumb-border", INACTIVE_BORDER);
        } else if (this._activeStop === Stop.Final) {
            initialSlider.style.setProperty("--thumb-border", INACTIVE_BORDER);
            finalSlider.style.setProperty("--thumb-border", ACTIVE_BORDER);
        }
    }

    private _handleSelect(activeThumb: Stop) {
        this._activeStop = activeThumb;
    }

    private _handleInitialChange(event: any): void {
        this._activeStop = Stop.Initial;

        const initialValue = parseInt(event.target.value, 10);
        if (initialValue > this.final) {
            this.initial = this.final;
        } else {
            this.initial = initialValue;
        }

        const initialSlider = this.shadowRoot.getElementById("initialSlider") as HTMLInputElement;
        initialSlider.value = this.initial.toString();

        // Revert superimposing the final slider thumb over the initial slider thumb.
        const finalSlider = this.shadowRoot.getElementById("finalSlider") as HTMLInputElement;
        finalSlider.style.zIndex = "0";
    }

    private _handleFinalChange(event: any): void {
        this._activeStop = Stop.Final;

        const finalValue = parseInt(event.target.value, 10);
        if (finalValue <= this.initial) {
            this.final = this.initial;
        } else {
            this.final = finalValue;
        }

        const finalSlider = this.shadowRoot.getElementById("finalSlider") as HTMLInputElement;
        finalSlider.value = this.final.toString();

        // Superimposing the final slider thumb over the initial slider thumb.
        if (finalValue <= this.initial + THUMB_WIDTH) {
            finalSlider.style.zIndex = "2";
        } else {
            finalSlider.style.zIndex = "0";
        }
    }

    private _dispatchSliderEvent() {
        const options = {
            detail: { initial: this.initial, final: this.final, activeStop: this._activeStop },
            bubbles: true,
            composed: true
        };

        this.dispatchEvent(new CustomEvent("change", options));
    }

    render() {
        return html`<div class="range-container">
            <div class="sliders-control">
                <input
                    id="initialSlider"
                    type="range"
                    style="background: linear-gradient(90deg, ${this.initialColor} 0%, ${this.finalColor} 100%);"
                    min=${this.minRange}
                    max=${this.maxRange}
                    @click=${() => this._handleSelect(Stop.Initial)}
                    @input=${this._handleInitialChange}
                />
                <input
                    id="finalSlider"
                    type="range"
                    style="background: linear-gradient(90deg, ${this.initialColor} 0%, ${this.finalColor} 100%);"
                    min=${this.minRange}
                    max=${this.maxRange}
                    @click=${() => this._handleSelect(Stop.Final)}
                    @input=${this._handleFinalChange}
                />
            </div>
        </div>`;
    }
}
