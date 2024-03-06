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

import "@spectrum-web-components/action-button/sp-action-button.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/divider/sp-divider.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-refresh.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "../color-picker/ColorPicker";
import "../info-label/InfoLabel";
import "../range-slider/RangeSlider";
import "./ConicGradient";
import "./LinearGradient";
import "./RadialGradient";

import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { PageSize, SandboxApi } from "../../../models/index";
import { style } from "./Gradient.css";

import { AddOnSDKAPI, RuntimeType } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { ENDING_COLOR, MAX_RANGE, MIN_RANGE, PREVIEW_IMAGE_WIDTH, STARTING_COLOR } from "../../constants";
import { GradientType } from "./GradientType";

@customElement("add-on-gradient-form")
export class GradientForm extends LitElement {
    @property({ type: Object })
    addOnUISdk!: AddOnSDKAPI;

    @state()
    private _sandboxApi!: SandboxApi;

    @state()
    private _startingColor = STARTING_COLOR;

    @state()
    private _endingColor = ENDING_COLOR;

    @state()
    private _isColorValid = true;

    @state()
    private _stop1 = MIN_RANGE;

    @state()
    private _stop2 = MAX_RANGE;

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

        await this._checkIfPageIsUpdated();
    }

    async updated(): Promise<void> {
        await this._previewGradient();
    }

    private _handleStartingColorChange(event: CustomEvent) {
        if (event.detail !== undefined) {
            this._startingColor = event.detail.color;
        }
    }

    private _handleEndingColorChange(event: CustomEvent) {
        if (event.detail !== undefined) {
            this._endingColor = event.detail.color;
        }
    }

    private _handleStopChange(event: CustomEvent): void {
        if (event.detail !== undefined) {
            this._stop1 = event.detail.starting;
            this._stop2 = event.detail.ending;
        }
    }

    private _handleGradientTabChange(event: any) {
        // [Bug in SWC]: Selected tab is returned as `undefined`
        // for any user action inside the tab besides the tab selection/toggle.
        const activeGradientType = event.target.selected as GradientType;
        if (activeGradientType !== undefined) {
            this._activeGradientType = activeGradientType;
        }
    }

    private _handleGradientChange(event: CustomEvent): void {
        if (event.detail !== undefined) {
            this._gradientImageUrl = event.detail.gradientImageUrl;
        }
    }

    private async _refreshPreview(): Promise<void> {
        await this._checkIfPageIsUpdated();
        this._previewGradient();
    }

    private _previewGradient(): Promise<void> {
        if (this._pageSize === undefined) {
            return;
        }

        const previewImage = document.createElement("img");
        previewImage.setAttribute("src", this._gradientImageUrl);

        const previewImageScale = Number((this._pageSize.width / PREVIEW_IMAGE_WIDTH).toFixed(2));
        const previewImageHeight = Math.round(this._pageSize.height / previewImageScale);

        previewImage.style.width = `${PREVIEW_IMAGE_WIDTH}px`;
        previewImage.style.height = `${previewImageHeight}px`;

        const previewContainer = this.shadowRoot.getElementById("preview-container");
        previewContainer.replaceChildren(previewImage);
    }

    private _reset() {
        this._startingColor = STARTING_COLOR;
        this._endingColor = ENDING_COLOR;
        this._stop1 = MIN_RANGE;
        this._stop2 = MAX_RANGE;
        this._activeGradientType = GradientType.Linear;
    }

    private async _drawGradient(): Promise<void> {
        // Re-generate the gradient before applying to page.
        await this._refreshPreview();

        const gradientBlob = await fetch(this._gradientImageUrl).then(response => response.blob());
        await this._sandboxApi.drawImage(gradientBlob);
    }

    private async _checkIfPageIsUpdated(): Promise<void> {
        const currentPageSize = await this._sandboxApi.getPageSize();
        if (
            this._pageSize === undefined ||
            this._pageSize.width !== currentPageSize.width ||
            this._pageSize.height !== currentPageSize.height
        ) {
            this._pageSize = currentPageSize;
        }
    }

    private _renderActiveGradient() {
        let activeGradient = html``;
        switch (this._activeGradientType) {
            case GradientType.Linear: {
                activeGradient = html`<add-on-linear-gradient
                    .startingColor=${this._startingColor}
                    .endingColor=${this._endingColor}
                    .width=${this._pageSize.width}
                    .height=${this._pageSize.height}
                    .stop1=${this._stop1}
                    .stop2=${this._stop2}
                    .active=${true}
                    @change=${this._handleGradientChange}
                ></add-on-linear-gradient>`;
                break;
            }
            case GradientType.Radial: {
                activeGradient = html`<add-on-radial-gradient
                    .startingColor=${this._startingColor}
                    .endingColor=${this._endingColor}
                    .width=${this._pageSize.width}
                    .height=${this._pageSize.height}
                    .stop1=${this._stop1}
                    .stop2=${this._stop2}
                    .active=${true}
                    @change=${this._handleGradientChange}
                ></add-on-radial-gradient>`;
                break;
            }
            case GradientType.Conic: {
                activeGradient = html`<add-on-conic-gradient
                    .startingColor=${this._startingColor}
                    .endingColor=${this._endingColor}
                    .width=${this._pageSize.width}
                    .height=${this._pageSize.height}
                    .stop1=${this._stop1}
                    .stop2=${this._stop2}
                    .active=${true}
                    @change=${this._handleGradientChange}
                ></add-on-conic-gradient>`;
                break;
            }
        }

        return activeGradient;
    }

    render() {
        if (this._pageSize === undefined) {
            return nothing;
        }

        return html`<div class="container">
            <div class="row">
                <add-on-info-label
                    text="Preview"
                    infoText="Use the controls below to generate and preview your gradient."
                ></add-on-info-label>
                <sp-action-button class="refresh-button" size="m" quiet @click=${this._refreshPreview}>
                    <sp-icon-refresh slot="icon"></sp-icon-refresh>
                </sp-action-button>
            </div>
            <div id="preview-container"></div>

            <add-on-info-label
                text="Fill direction"
                infoText="Select the fill direction of your gradient."
            ></add-on-info-label>
            <sp-tabs
                selected=${this._activeGradientType}
                size="m"
                style="margin-top: -16px"
                @change=${this._handleGradientTabChange}
            >
                <sp-tab label=${GradientType.Linear} value=${GradientType.Linear}></sp-tab>
                <sp-tab label=${GradientType.Radial} value=${GradientType.Radial}></sp-tab>
                <sp-tab label=${GradientType.Conic} value=${GradientType.Conic}></sp-tab>
            </sp-tabs>
            ${this._renderActiveGradient()}

            <add-on-info-label
                text="Color stops"
                infoText="Control the color stops in your gradient."
            ></add-on-info-label>
            <add-on-range-slider
                starting=${this._stop1}
                ending=${this._stop2}
                startingColor=${this._startingColor}
                endingColor=${this._endingColor}
                minRange=${MIN_RANGE}
                maxRange=${MAX_RANGE}
                @change=${this._handleStopChange}
            ></add-on-range-slider>

            <add-on-info-label
                text="Starting color"
                infoText="Select the starting color of your gradient."
            ></add-on-info-label>
            <add-on-color-picker
                defaultColor=${STARTING_COLOR}
                color=${this._startingColor}
                @change=${this._handleStartingColorChange}
            ></add-on-color-picker>

            <add-on-info-label
                text="Ending color"
                infoText="Select the ending color of your gradient."
            ></add-on-info-label>
            <add-on-color-picker
                defaultColor=${ENDING_COLOR}
                color=${this._endingColor}
                @change=${this._handleEndingColorChange}
            ></add-on-color-picker>

            <sp-button
                class="button"
                size="l"
                static="black"
                ?disabled=${!this._isColorValid}
                @click=${this._drawGradient}
                >Add to page</sp-button
            >
            <sp-button class="button" size="l" variant="accent" ?disabled=${!this._isColorValid} @click=${this._reset}
                >Reset to default</sp-button
            >
        </div>`;
    }
}
