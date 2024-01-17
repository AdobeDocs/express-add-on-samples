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
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";

import { addColumns, addRows } from "./shapeUtils";

// Get the Authoring Sandbox.
const { runtime } = addOnSandboxSdk.instance;

let gridRef = null;

function start() {
  // APIs to be exposed to the UI runtime
  runtime.exposeApi({
    /**
     * Add a grid to the document.
     *
     * @param {Object} options - The options for the grid.
     * @param {number} options.columns - The number of columns in the grid.
     * @param {number} options.rows - The number of rows in the grid.
     * @param {number} options.gutter - The size of the gutter between columns and rows.
     * @param {string} options.columnColor - The color of the columns.
     * @param {string} options.rowColor - The color of the rows.
     * @returns {Group} The group containing the grid.
     */
    addGrid({ columns, rows, gutter, columnColor, rowColor }) {
      let currentNode = editor.context.insertionParent;
      let page = null;

      while (currentNode) {
        if (currentNode.type === "Page") {
          page = currentNode;
          break;
        }
        currentNode = currentNode.parent;
      }

      // Create the grid.
      const rowGroup = addRows(rows, gutter, rowColor);
      console.log("Group ready", rowGroup);
      const columnGroup = addColumns(columns, gutter, columnColor);

      // Create the grid's group.
      const gridGroup = editor.createGroup();
      page.artboards.first.children.append(gridGroup);
      gridGroup.children.append(rowGroup, columnGroup);
      gridGroup.locked = true;

      // Save the grid reference.
      gridRef = gridGroup;
    },

    /**
     * Delete the grid from the document.
     * @returns {void}
     */
    deleteGrid() {
      if (gridRef) {
        try {
          gridRef.removeFromParent();
          gridRef = null;
        } catch (error) {
          console.error(error);
          return "Error: the Grid could not be deleted.";
        }
      }
    },
  });
}

start();
