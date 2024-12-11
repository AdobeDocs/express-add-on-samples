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

import { customElement } from "lit/decorators.js";
import { MAX_RANGE } from "../../constants";
import { GradientBase } from "./GradientBase";
import { ConicFillDirection } from "./GradientType";

export const DEFAULT_ANGLE = 45;

@customElement("add-on-conic-gradient")
export class ConicGradient extends GradientBase<ConicFillDirection> {
    constructor() {
        super(ConicFillDirection.Center);
    }

    protected override getAllDirections(): string[] {
        return Object.keys(ConicFillDirection);
    }

    protected override getGradientImage(fillDirection: ConicFillDirection): string {
        this._canvas.width = this.width;
        this._canvas.height = this.height;

        const canvasContext = this._canvas.getContext("2d");
        const canvasGradient = this._getGradient(canvasContext, fillDirection);

        const stop1 = Number((this.stop1 / MAX_RANGE).toFixed(1));
        const stop2 = Number((this.stop2 / MAX_RANGE).toFixed(1));

        canvasGradient.addColorStop(stop1, this.startingColor);
        canvasGradient.addColorStop(stop2, this.endingColor);

        canvasContext.fillStyle = canvasGradient;
        canvasContext.fillRect(0, 0, this.width, this.height);

        return this._canvas.toDataURL("image/png");
    }

    private _getGradient(canvasContext: CanvasRenderingContext2D, fillDirection: ConicFillDirection): CanvasGradient {
        let x: number;
        let y: number;

        switch (fillDirection) {
            case ConicFillDirection.Center: {
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
}
