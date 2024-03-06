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
    .color-picker-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .column {
        display: flex;
        flex-direction: column;
    }

    .text-input {
        width: 96%;
        margin: 0 8px 0 0;
    }

    .color-slider {
        width: 96%;
        height: 16px;
        margin: 12px 8px 0 0;
    }

    .color-area {
        align-self: center;
        width: 72px;
        height: 72px;
    }
`;
