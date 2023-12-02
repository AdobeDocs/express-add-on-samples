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

import { editor, colorUtils, constants } from "express-document-sdk";

/**
 * Create a rectangle with the specified width, height, and color.
 * Private utility of the shapeUtils module.
 *
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @param {string} color - The color of the rectangle in hex format.
 * @returns {RectangleNode} The created rectangle.
 */
const createRect = (width, height, color) => {
  const rect = editor.createRectangle();
  rect.width = width;
  rect.height = height;
  const rectangleFill = editor.createColorFill(colorUtils.fromHex(color));
  rect.fill = rectangleFill;
  return rect;
};

/**
 * Add rows of rectangles to the document.
 *
 * @param {number} rowsNumber - The number of rows to add.
 * @param {number} gutter - The size of the gutter between rows.
 * @param {string} color - The color of the rows in hex format.
 * @returns {GroupNode} A group containing the created rows.
 */
const addRows = (rowsNumber, gutter, color) => {
  const doc = editor.documentRoot;
  const page = doc.pages.first;

  var rows = [];
  const rowHeight = (page.height - (rowsNumber + 1) * gutter) / rowsNumber;
  // Create the rectangles
  for (let i = 0; i < rowsNumber; i++) {
    let r = createRect(page.width, rowHeight, color);
    r.translation = { x: 0, y: gutter + (gutter + rowHeight) * i };
    rows.push(r);
  }
  // Append the rectangles to the document
  rows.forEach((row) => page.artboards.first.children.append(row));
  // Create the group
  const rowsGroup = editor.createGroup();
  // Append the group to the document
  page.artboards.first.children.append(rowsGroup);
  // Populate the group with the rectangles
  rowsGroup.children.append(...rows);
  // Edit the group's properties
  rowsGroup.blendMode = constants.BlendMode.multiply;
  rowsGroup.locked = true;
  return rowsGroup;
};

/**
 * Add columns of rectangles to the document.
 *
 * @param {number} columsNumber - The number of columns to add.
 * @param {number} gutter - The size of the gutter between columns.
 * @param {string} color - The color of the columns in hex format.
 * @returns {GroupNode} A group containing the created columns.
 */
const addColumns = (columsNumber, gutter, color) => {
  const doc = editor.documentRoot;
  const page = doc.pages.first;
  var cols = [];
  const colWidth = (page.width - (columsNumber + 1) * gutter) / columsNumber;
  // Create the rectangles
  for (let i = 0; i < columsNumber; i++) {
    let r = createRect(colWidth, page.height, color);
    r.translation = { x: gutter + (gutter + colWidth) * i, y: 0 };
    cols.push(r);
  }
  // Append the rectangles to the document
  cols.forEach((col) => page.artboards.first.children.append(col));
  // Create the group
  const columnsGroup = editor.createGroup();
  // Append the group to the document
  page.artboards.first.children.append(columnsGroup);
  // Populate the group with the rectangles
  columnsGroup.children.append(...cols);
  // Edit the group's properties
  columnsGroup.blendMode = constants.BlendMode.multiply;
  columnsGroup.locked = true;
  return columnsGroup;
};

export { addColumns, addRows };
