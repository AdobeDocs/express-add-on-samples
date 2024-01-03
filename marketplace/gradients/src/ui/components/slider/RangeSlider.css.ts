import { css } from "lit";

export const style = css`
    .range-container {
        display: flex;
        flex-direction: column;
        margin: 0 0 32px 0;
    }

    .sliders-control {
        position: relative;
    }

    #initialSlider::-webkit-slider-thumb {
        -webkit-appearance: none;
        pointer-events: all;
        width: 24px;
        height: 24px;
        background-color: var(--thumb-color);
        border: var(--thumb-border);
        border-radius: 4px;
        cursor: move;
    }

    #initialSlider::-moz-range-thumb {
        -webkit-appearance: none;
        pointer-events: all;
        width: 24px;
        height: 24px;
        background-color: var(--thumb-color);
        border: var(--thumb-border);
        border-radius: 4px;
        cursor: move;
    }

    #finalSlider::-webkit-slider-thumb {
        -webkit-appearance: none;
        pointer-events: all;
        width: 24px;
        height: 24px;
        background-color: var(--thumb-color);
        border: var(--thumb-border);
        border-radius: 4px;
        cursor: move;
    }

    #finalSlider::-moz-range-thumb {
        -webkit-appearance: none;
        pointer-events: all;
        width: 24px;
        height: 24px;
        background-color: var(--thumb-color);
        border: var(--thumb-border);
        border-radius: 4px;
        cursor: move;
    }

    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        height: 16px;
        width: 100%;
        position: absolute;
        pointer-events: none;
    }

    #initialSlider {
        height: 0;
        z-index: 1;
        top: 8px;
    }
`;
