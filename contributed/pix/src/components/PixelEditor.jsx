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
import React, { useRef } from "react";

export function PixelEditor({pixels, currentColor, bgColor, onChange}) {

    function pixelClicked(which, el) {
        el.style.backgroundColor = currentColor;
        pixels[which] = currentColor;
        onChange && onChange(which, currentColor);
    }

    return (
        <div className="pixel-grid" style={{backgroundColor: bgColor}}>
            {pixels.map((pixel, idx) =>
                <div key={idx} className="pixel" style={{backgroundColor: pixel || "transparent"}}
                     onClick={evt => pixelClicked(idx, evt.target)}></div>)}</div>
    );
}
