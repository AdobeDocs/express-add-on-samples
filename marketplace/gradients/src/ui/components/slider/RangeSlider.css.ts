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
