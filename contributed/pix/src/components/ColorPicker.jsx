import React, { useRef } from "react";
import '@spectrum-web-components/swatch/sp-swatch.js';
import '@spectrum-web-components/swatch/sp-swatch-group.js';
import '@spectrum-web-components/overlay/sync/overlay-trigger.js';
import '@spectrum-web-components/popover/sp-popover.js';

import {WC} from "./WC.jsx";

/* create a color palette */
const colors = [];
const STOPS = 3;
const GAP = 256/STOPS;
for (let r = 0; r <= STOPS; r++) {
    const redHex = Math.floor(Math.min(r * GAP, 255)).toString(16).padStart(2, "0");
    for (let g = 0; g <= STOPS; g++) {
        const greenHex = Math.floor(Math.min(g * GAP, 255)).toString(16).padStart(2, "0");
        for (let b = 0; b <= STOPS; b++) {
            const blueHex = Math.floor(Math.min(b * GAP, 255)).toString(16).padStart(2, "0");
            const hexColor = `#${redHex}${greenHex}${blueHex}`;
            colors.push(hexColor);
        }
    }
}
colors.push("transparent");

export function ColorPicker({currentColor = "white", onChange}) {

    const popoverRef = useRef(null);
    const currentColorRef = useRef(null);
    const swatchGroupRef = useRef(null);

    function colorPicked(color) {
        currentColorRef.current.color = color;
        currentColorRef.current.selected = true;
        popoverRef.current.dispatchEvent(new Event("close", {bubbles: true, composed: true}));
        onChange && onChange(color);
    }
    return <>
        <overlay-trigger placement="bottom-start" class="--pix-color-bg">
            <sp-swatch size="xs" slot="trigger" selected color={currentColor} rounding="none" ref={currentColorRef}></sp-swatch>
            <sp-popover slot="click-content" dialog tip ref={popoverRef} style={{minWidth: "200px"}}>
                <WC onChange={evt => colorPicked(swatchGroupRef.current.selected[0])}>
                    <sp-swatch-group selects="single" size="s" ref={swatchGroupRef}>
                        {colors.map((color, idx) =>
                            <sp-swatch key={idx} color={color} size="s" selected={color === currentColor ? true : undefined}></sp-swatch>
                        )}
                    </sp-swatch-group>
                </WC>
            </sp-popover>
        </overlay-trigger>
    </>;
}