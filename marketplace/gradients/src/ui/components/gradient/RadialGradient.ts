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
import { RadialFillDirection } from "./GradientType";

const DEFAULT_RADIUS = 10;

@customElement("add-on-radial-gradient")
export class RadialGradient extends GradientBase<RadialFillDirection> {
    constructor() {
        super(RadialFillDirection.Center);
    }

    protected override getAllDirections(): string[] {
        return Object.keys(RadialFillDirection);
    }

    protected override getGradientImage(fillDirection: RadialFillDirection): string {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        const canvasContext = this.canvas.getContext("2d");
        const canvasGradient = this._getGradient(canvasContext, fillDirection);

        const stop1 = Number((this.stop1 / MAX_RANGE).toFixed(1));
        const stop2 = Number((this.stop2 / MAX_RANGE).toFixed(1));

        canvasGradient.addColorStop(stop1, this.startingColor);
        canvasGradient.addColorStop(stop2, this.endingColor);

        canvasContext.fillStyle = canvasGradient;
        canvasContext.fillRect(0, 0, this.width, this.height);

        return this.canvas.toDataURL("image/png");
    }

    private _getGradient(canvasContext: CanvasRenderingContext2D, fillDirection: RadialFillDirection): CanvasGradient {
        let x0: number;
        let y0: number;
        let r0: number;
        let x1: number;
        let y1: number;
        let r1: number;

        switch (fillDirection) {
            case RadialFillDirection.Center: {
                x0 = this.width / 2;
                y0 = this.height / 2;
                r0 = DEFAULT_RADIUS;
                x1 = this.width / 2;
                y1 = this.height / 2;
                r1 = this.height;

                break;
            }
            case RadialFillDirection.Top: {
                x0 = this.width / 2;
                y0 = 0;
                r0 = DEFAULT_RADIUS;
                x1 = this.width / 2;
                y1 = this.height / 2;
                r1 = this.height;

                break;
            }
            case RadialFillDirection.Right: {
                x0 = this.width;
                y0 = this.height / 2;
                r0 = DEFAULT_RADIUS;
                x1 = this.width / 2;
                y1 = this.height / 2;
                r1 = this.height;

                break;
            }
            case RadialFillDirection.Bottom: {
                x0 = this.width / 2;
                y0 = this.height;
                r0 = DEFAULT_RADIUS;
                x1 = this.width / 2;
                y1 = this.height / 2;
                r1 = this.height;

                break;
            }
            case RadialFillDirection.Left: {
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
}
