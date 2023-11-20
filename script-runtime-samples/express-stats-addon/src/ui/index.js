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

import "@spectrum-web-components/styles/typography.css";
import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";

import "@spectrum-web-components/status-light/sp-status-light.js";
import "@spectrum-web-components/table/elements.js";
import "@spectrum-web-components/button/sp-button.js";

import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { rebuildTable } from "./table-utils";

addOnUISdk.ready.then(async () => {
  const iframeApi = {
    /**
     * Toggles the status light.
     * @param {string} sdk - The type of SDK that is ready, either "document" or "iframe"
     */
    toggleStatus(sdk) {
      if (["document", "iframe"].indexOf(sdk) === -1) {
        throw new Error("Invalid SDK type");
      }
      const el =
        sdk === "document"
          ? document.getElementById("document-status")
          : document.getElementById("iframe-status");
      el.setAttribute("variant", "positive");
    },

    createTable(documentData) {
      const table = document.getElementById("stats-table-body");
      rebuildTable(table, documentData);
    },
  };

  // the addOnUISdk is ready, so we can now toggle the status light
  iframeApi.toggleStatus("iframe");

  // Get the Authoring Sandbox.
  const { runtime } = addOnUISdk.instance;
  // Importing the Authoring Sandbox API.
  const authoringApi = await runtime.apiProxy("script");
  // Exposing the iframe API to the Authoring Sandbox.
  runtime.exposeApi(iframeApi);

  const statsButton = document.getElementById("stats");

  statsButton.addEventListener("click", async () => {
    await authoringApi.getDocumentData();
  });
  // Enabling the button only when the addOnUISdk is ready
  statsButton.disabled = false;
});

/**
 * Adds a new row to the specified table.
 *
 * @param {HTMLTableElement} table - The table to which the row should be added.
 * @param {Array} rowData - An array containing the data for each cell in the row.
 */
function addRowToTable(table, rowData) {
  // Create a new row
  const newRow = document.createElement("sp-table-row");

  // For each cell data, create a cell and append it to the row
  let cell;
  rowData.forEach((cellData) => {
    cell = document.createElement("sp-table-cell");
    cell.textContent = cellData;
    newRow.appendChild(cell);
  });
  if (rowData.length === 1) {
    // Making the page row bold
    cell.className = "page-row";
  }
  // Append the row to the table body
  table.appendChild(newRow);
}
