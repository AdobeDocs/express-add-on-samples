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

    .row {
        display: flex;
        flex-direction: row;
    }

    heading {
        width: 100%;
        font-size: 1.2em;
        font-weight: 600;
    }

    .refresh-button {
        margin-left: auto;
        margin-right: 0;
    }

    #preview-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 8px 0 20px 0;
    }

    #preview-container img {
        -webkit-box-shadow: 0 0 5px 4px #b1b1b1;
        -moz-box-shadow: 0 0 5px 4px #b1b1b1;
        box-shadow: 0 0 5px 4px #b1b1b1;
    }

    .button {
        width: 100%;
        margin: 8px 0;
    }

    .fill-directions {
        margin: 16px 0;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }
`;
