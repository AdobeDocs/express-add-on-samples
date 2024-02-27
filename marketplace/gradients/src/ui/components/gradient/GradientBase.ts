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

import "../card/PreviewCardGrid";

import { LitElement, html } from "lit";
import { property, state } from "lit/decorators.js";
import { PreviewCard } from "../../../models/index.js";
import { style } from "./Gradient.css";
import { FillDirection } from "./GradientType";

export abstract class GradientBase<T extends FillDirection> extends LitElement {
    @property({ type: String })
    startingColor!: string;

    @property({ type: String })
    endingColor!: string;

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
    private _fillDirection: T;

    static get styles() {
        return style;
    }

    constructor(defaultFillDirection: T) {
        super();
        this._fillDirection = defaultFillDirection;
    }

    protected abstract getAllDirections(): string[];

    protected abstract getGradientImage(fillDirection: T): string;

    protected updated(): void {
        if (!this.active) {
            return;
        }

        const gradientImageUrl = this.getGradientImage(this._fillDirection);
        this._dispatchGradientEvent(gradientImageUrl);
    }

    private _handleFillDirectionChange(event: CustomEvent): void {
        if (event.detail === undefined) {
            return;
        }

        this._fillDirection = event.detail.id as T;
    }

    private _dispatchGradientEvent(gradientImageUrl: string): void {
        const options = {
            detail: { gradientImageUrl },
            bubbles: true,
            composed: true
        };

        this.dispatchEvent(new CustomEvent("change", options));
    }

    private _generateGridData() {
        const allDirections = this.getAllDirections();

        const gridData = new Map<string, PreviewCard>();
        allDirections.forEach(direction => {
            const previewCard: PreviewCard = {
                id: direction,
                imageSrc: this.getGradientImage(direction as unknown as T),
                heading: direction,
                isActive: this._fillDirection === direction
            };

            gridData.set(previewCard.id, previewCard);
        });

        return gridData;
    }

    render() {
        return html`<add-on-preview-card-grid
            .data=${this._generateGridData()}
            @change=${this._handleFillDirectionChange}
        ></add-on-preview-card-grid>`;
    }
}
