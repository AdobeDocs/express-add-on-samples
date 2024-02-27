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
    .grid-container {
        margin: 12px 0;
    }

    .column {
        float: left;
        width: 30%;
        margin: 4px;
    }

    .row:after {
        content: "";
        display: table;
        clear: both;
    }

    .card {
        text-align: center;
        cursor: pointer;
    }

    .card img {
        width: 72px;
        height: 72px;
        border-radius: 4px;
    }

    .inactive {
        border: 3px solid #b1b1b1;
    }

    .active {
        border: 3px solid #555be7;
    }

    .card-heading {
        font-size: 0.95em;
        font-weight: 400;
    }

    .card-heading-active {
        font-weight: 600;
    }
`;
