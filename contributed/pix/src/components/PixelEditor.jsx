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
