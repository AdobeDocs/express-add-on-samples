import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/color-slider/sp-color-slider.js";
import "@spectrum-web-components/divider/sp-divider.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-refresh.js";
import "@spectrum-web-components/tabs/sp-tab-panel.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/textfield/sp-textfield.js";
import "../slider/RangeSlider";
import "./ConicGradient";
import "./LinearGradient";
import "./RadialGradient";

import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { PageSize, SandboxApi } from "../../../models";
import { style } from "./Gradient.css";

import { AddOnSDKAPI, RuntimeType } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { COLOR_REGEX, FINAL_COLOR, INITIAL_COLOR, MAX_RANGE, MIN_RANGE, PREVIEW_IMAGE_WIDTH } from "../../constants";
import { Stop } from "../slider/RangeSlider";

enum GradientType {
    Linear = "Linear",
    Radial = "Radial",
    Conic = "Conic"
}

@customElement("add-on-gradient")
export class Gradient extends LitElement {
    @property({ type: Object })
    addOnUISdk!: AddOnSDKAPI;

    @state()
    private _sandboxApi!: SandboxApi;

    @state()
    private _initialColor = INITIAL_COLOR;

    @state()
    private _finalColor = FINAL_COLOR;

    @state()
    private _isColorValid = true;

    @state()
    private _stop1 = MIN_RANGE;

    @state()
    private _stop2 = MAX_RANGE;

    @state()
    private _activeStop = Stop.Initial;

    @state()
    private _activeGradientType = GradientType.Linear;

    @state()
    private _pageSize: PageSize;

    @state()
    private _gradientImageUrl: string;

    static get styles() {
        return style;
    }

    async firstUpdated(): Promise<void> {
        const { runtime } = this.addOnUISdk.instance;
        this._sandboxApi = await runtime.apiProxy(RuntimeType.documentSandbox);

        // [ToDo]: Till the time an API is available which notifies the add-on
        // about the current page change, we may have the below `setInterval()` block
        // to check if the current page size has changed.
        // setInterval(async () => await this._checkIfPageIsUpdated(), 500);
    }

    async updated(): Promise<void> {
        await this._previewGradient();
    }

    private async _handleColorSliderChange(event: any, point: Stop): Promise<void> {
        this._isColorValid = true;

        // [ToDo] Bug in SWC: https://github.com/adobe/spectrum-web-components/issues/3883
        // Slider cannot be set beyond the range, for example - black (#000000) or white (#FFFFFF).
        // When the text input is set to outside the range,
        // subsequent slider changes returns the old value which was set
        // until the text input value is set back within the slider's range.
        if (point === Stop.Initial) {
            this._initialColor = String(event.target.color).toUpperCase();
        } else if (point === Stop.Final) {
            this._finalColor = String(event.target.color).toUpperCase();
        }
    }

    private async _handleColorTextChange(event: any, point: Stop): Promise<void> {
        const color = String(event.target.value).toUpperCase();
        if (!COLOR_REGEX.test(color)) {
            this._isColorValid = false;
            return;
        }

        this._isColorValid = true;

        if (point === Stop.Initial) {
            this._initialColor = color;
        } else if (point === Stop.Final) {
            this._finalColor = color;
        }
    }

    private _handleStopChange(event: CustomEvent): void {
        this._stop1 = event.detail.initial;
        this._stop2 = event.detail.final;
        this._activeStop = event.detail.activeStop;
    }

    private _handleGradientTabChange(event: any) {
        // [ToDo]: Bug in SWC: Selected tab is returned as `undefined`
        // for any user action inside the tab besides the tab selection/toggle.
        const activeGradientType = event.target.selected as GradientType;
        if (activeGradientType !== undefined) {
            this._activeGradientType = activeGradientType;
        }
    }

    private _handleGradientChange(event: CustomEvent): void {
        this._gradientImageUrl = event.detail.gradientImageUrl;
    }

    private async _previewGradient(): Promise<void> {
        if (this._sandboxApi === undefined) {
            return;
        }

        await this._checkIfPageIsUpdated();

        const previewImage = document.createElement("img");
        previewImage.setAttribute("src", this._gradientImageUrl);

        const previewImageScale = Number((this._pageSize.width / PREVIEW_IMAGE_WIDTH).toFixed(2));
        const previewImageHeight = Math.round(this._pageSize.height / previewImageScale);

        previewImage.style.width = `${PREVIEW_IMAGE_WIDTH}px`;
        previewImage.style.height = `${previewImageHeight}px`;

        const previewContainer = this.shadowRoot.getElementById("preview-container");
        previewContainer.replaceChildren(previewImage);

        // [ToDo]: Do not support drag and drop for the following reasons:
        // 1. It removes a previous image which is present in the document
        // 2. When the user switches to a page which is of different dimension,
        // the image has to be re-generated before the drag starts.
        // In case the user starts the drag before the new image is generated, the drag fails.
        // 3. No control on the position where the image would be placed in the document.
        // 4. Drag and drop might not be possible on shapes in the later releases.
        // Best to set the correct expectation to users from the very beginning.
        // this._enableDragToDocument(previewImage);
    }

    private async _reset() {
        this._initialColor = INITIAL_COLOR;
        this._finalColor = FINAL_COLOR;
        this._stop1 = MIN_RANGE;
        this._stop2 = MAX_RANGE;
        this._activeStop = Stop.Initial;
        this._activeGradientType = GradientType.Linear;
    }

    private async _drawGradient(): Promise<void> {
        // Re-generate the gradient before applying to page.
        await this._previewGradient();

        const gradientBlob = await fetch(this._gradientImageUrl).then(response => response.blob());
        await this._sandboxApi.drawImage(gradientBlob);
    }

    private async _checkIfPageIsUpdated(): Promise<void> {
        // [ToDo]: Till the time an API is available which notifies
        // the add-on about the current page change, we have to keep the below checks.
        const currentPageSize = await this._sandboxApi.getPageSize();
        if (
            this._pageSize === undefined ||
            this._pageSize.width !== currentPageSize.width ||
            this._pageSize.height !== currentPageSize.height
        ) {
            this._pageSize = currentPageSize;
        }
    }

    private get _activeColor(): string {
        switch (this._activeStop) {
            case Stop.Initial:
                return this._initialColor;
            case Stop.Final:
                return this._finalColor;
            default:
                throw new Error(`'${this._activeStop}' is not a valid stop.`);
        }
    }

    /*
    private _enableDragToDocument(image: HTMLImageElement) {
        this.addOnUISdk.app.enableDragToDocument(image, {
            previewCallback: (element: HTMLImageElement) => {
                return new URL(element.src);
            },
            completionCallback: async (element: HTMLImageElement) => {
                const blob = await fetch(element.src).then(response => response.blob());
                return [{ blob }];
            }
        });
    }
    */

    render() {
        if (this._pageSize === undefined) {
            return nothing;
        }

        return html`<div class="container">
            <div class="row">
                <heading>Preview</heading>
                <sp-action-button quiet class="action-button" @click=${this._previewGradient}>
                    <sp-icon-refresh slot="icon"></sp-icon-refresh>
                </sp-action-button>
            </div>
            <sp-divider size="m" class="divider"></sp-divider>
            <div id="preview-container"></div>
            <sp-tabs
                selected=${this._activeGradientType}
                size="l"
                style="margin-bottom: 8px;"
                @change=${this._handleGradientTabChange}
            >
                <sp-tab label=${GradientType.Linear} value=${GradientType.Linear}></sp-tab>
                <sp-tab label=${GradientType.Radial} value=${GradientType.Radial}></sp-tab>
                <sp-tab label=${GradientType.Conic} value=${GradientType.Conic}></sp-tab>
                <sp-tab-panel value=${GradientType.Linear}
                    ><add-on-linear-gradient
                        .initialColor=${this._initialColor}
                        .finalColor=${this._finalColor}
                        .width=${this._pageSize.width}
                        .height=${this._pageSize.height}
                        .stop1=${this._stop1}
                        .stop2=${this._stop2}
                        .active=${this._activeGradientType === GradientType.Linear}
                        @change=${this._handleGradientChange}
                    ></add-on-linear-gradient
                ></sp-tab-panel>
                <sp-tab-panel value=${GradientType.Radial}
                    ><add-on-radial-gradient
                        .initialColor=${this._initialColor}
                        .finalColor=${this._finalColor}
                        .width=${this._pageSize.width}
                        .height=${this._pageSize.height}
                        .stop1=${this._stop1}
                        .stop2=${this._stop2}
                        .active=${this._activeGradientType === GradientType.Radial}
                        @change=${this._handleGradientChange}
                    ></add-on-radial-gradient
                ></sp-tab-panel>
                <sp-tab-panel value=${GradientType.Conic}
                    ><add-on-conic-gradient
                        .initialColor=${this._initialColor}
                        .finalColor=${this._finalColor}
                        .width=${this._pageSize.width}
                        .height=${this._pageSize.height}
                        .stop1=${this._stop1}
                        .stop2=${this._stop2}
                        .active=${this._activeGradientType === GradientType.Conic}
                        @change=${this._handleGradientChange}
                    ></add-on-conic-gradient
                ></sp-tab-panel>
            </sp-tabs>
            <sp-field-label class="text-label" size="l">Stops</sp-field-label>
            <add-on-range-slider
                .initial=${this._stop1}
                .final=${this._stop2}
                .initialColor=${this._initialColor}
                .finalColor=${this._finalColor}
                .minRange=${MIN_RANGE}
                .maxRange=${MAX_RANGE}
                @change=${this._handleStopChange}
            ></add-on-range-slider>
            <sp-field-label class="text-label" size="l" for="color" required>${this._activeStop} Color</sp-field-label>
            <div class="row">
                <sp-textfield
                    class="text-input"
                    size="l"
                    id="color"
                    placeholder=${this._activeStop === Stop.Initial ? INITIAL_COLOR : FINAL_COLOR}
                    value=${this._activeColor}
                    ?invalid=${!this._isColorValid}
                    @input=${async (event: any) => await this._handleColorTextChange(event, this._activeStop)}
                ></sp-textfield>
                <div class="color-preview" style="background-color: ${this._activeColor}"></div>
            </div>
            <sp-color-slider
                class="color-slider"
                color=${this._activeColor}
                @change=${async (event: any) => await this._handleColorSliderChange(event, this._activeStop)}
            ></sp-color-slider>
            <sp-button
                class="button"
                size="m"
                static="black"
                ?disabled=${!this._isColorValid}
                @click=${this._drawGradient}
                >Add to page</sp-button
            >
            <sp-button class="button" size="m" variant="accent" ?disabled=${!this._isColorValid} @click=${this._reset}
                >Reset to default</sp-button
            >
        </div>`;
    }
}
