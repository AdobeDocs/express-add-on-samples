/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import React, { useRef, useEffect } from "react";

export function PixImage({pixels, bgColor, enableDrag, addOnSdk, canvasWidth=64, canvasHeight=64, styleWidth, styleHeight} = {}) {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const width = canvasWidth, height = canvasHeight;

        canvas.style.width = styleWidth ? `${styleWidth}px` : `${width}px`;
        canvas.style.height = styleHeight ? `${styleHeight}px` : `${height}px`;

        const scale = window.devicePixelRatio;
        canvas.width = width * scale;
        canvas.height = height * scale;

        ctx.scale(scale, scale);

        ctx.fillStyle=bgColor;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);

        const pixelSize = canvasWidth / 16;

        for (let i = 0; i < pixels.length; i++) {
            const y = Math.floor(i/16);
            const x = i % 16;
            const c = pixels[i];

            ctx.fillStyle=c || "transparent";
            ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
        }

        if (enableDrag) {
            enableDrag(canvas, {
                previewCallback: el => new URL(canvas.toDataURL()),
                completionCallback: async el => {
                    const r = await fetch(canvas.toDataURL());
                    const blob = await r.blob();
                    return [{blob}];
                }
            })
        }
    });
    return <>
        <canvas style={{width:`${canvasWidth}px`, height: `${canvasHeight}px`}} ref={canvasRef}></canvas>
    </>
}

