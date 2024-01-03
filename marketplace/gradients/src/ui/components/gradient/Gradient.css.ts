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
    .container {
        margin: 0 24px 16px 24px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    heading {
        width: 100%;
        font-size: 16px;
        font-weight: 600;
    }

    .row {
        display: flex;
        flex-direction: row;
        margin-bottom: 8px;
    }

    .text-label {
        font-weight: 600;
    }

    .text-input {
        width: 80%;
    }

    .color-slider {
        width: 256px;
        height: 16px;
        margin-bottom: 16px;
    }

    .color-preview {
        width: 36px;
        height: 36px;
        margin: 0 0 8px 8px;
        border-radius: 4px;
        border: 2px solid #b1b1b1;
    }

    #preview-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 8px;
    }

    #preview-container img {
        -webkit-box-shadow: 0 0 5px 4px #b1b1b1;
        -moz-box-shadow: 0 0 5px 4px #b1b1b1;
        box-shadow: 0 0 5px 4px #b1b1b1;
    }

    .divider {
        margin-bottom: 24px;
        align-self: stretch;
    }

    .button {
        width: 100%;
        margin: 8px 0;
    }

    .action-button {
        bottom: 4px;
    }

    .gradient-control-container {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }

    .preview-container {
        display: flex;
        flex-direction: row;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .image-group {
        display: flex;
        flex-direction: column;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .image-group img {
        width: 64px;
        height: 64px;
        border-radius: 8px;
        cursor: pointer;
    }
`;
