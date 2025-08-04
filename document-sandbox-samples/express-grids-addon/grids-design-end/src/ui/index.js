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

import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/button-group/sp-button-group.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/number-field/sp-number-field.js";
import "@spectrum-web-components/slider/sp-slider.js";
import "@spectrum-web-components/swatch/sp-swatch.js";

import addOnUISdk, {
  ColorPickerEvent,
  ColorPickerPlacement,
} from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  console.log("addOnUISdk is ready for use.");

  // Get the Authoring Sandbox.
  const { runtime } = addOnUISdk.instance;
  const sandboxProxy = await runtime.apiProxy("documentSandbox");

  // Input fields -------------------------------------------

  const rowsInput = document.getElementById("rows");
  const colsInput = document.getElementById("cols");
  const gutterInput = document.getElementById("gutter");

  rowsInput.value = 4;
  colsInput.value = 6;
  gutterInput.value = 10;

  // Color pickers ------------------------------------------

  const colsColorSwatch = document.getElementById("colsColorSwatch");
  const rowsColorSwatch = document.getElementById("rowsColorSwatch");

  // Initialize colors and store current values
  let colsColor = "#ffcccc";
  let rowsColor = "#ccccff";

  colsColorSwatch.color = colsColor;
  rowsColorSwatch.color = rowsColor;

  // Setup color picker for columns
  colsColorSwatch.addEventListener("click", function () {
    addOnUISdk.app.showColorPicker(colsColorSwatch, {
      title: "Column Grid Color",
      initialColor: colsColor,
      placement: ColorPickerPlacement.right,
    });
  });

  colsColorSwatch.addEventListener(
    ColorPickerEvent.colorChange,
    function (event) {
      colsColor = event.detail.color;
      colsColorSwatch.setAttribute("color", colsColor);
    }
  );

  colsColorSwatch.addEventListener(ColorPickerEvent.close, function (event) {
    console.log("Columns color picker closed");
  });

  // Setup color picker for rows
  rowsColorSwatch.addEventListener("click", function () {
    addOnUISdk.app.showColorPicker(rowsColorSwatch, {
      title: "Row Grid Color",
      initialColor: rowsColor,
      placement: ColorPickerPlacement.right,
    });
  });

  rowsColorSwatch.addEventListener(
    ColorPickerEvent.colorChange,
    function (event) {
      rowsColor = event.detail.color;
      rowsColorSwatch.setAttribute("color", rowsColor);
    }
  );

  rowsColorSwatch.addEventListener(ColorPickerEvent.close, function (event) {
    console.log("Rows color picker closed");
  });

  // CTA Buttons --------------------------------------------

  const createGridBtn = document.getElementById("createGrid");
  const deleteGridBtn = document.getElementById("deleteGrid");

  deleteGridBtn.onclick = async (event) => {
    const res = await sandboxProxy.deleteGrid();
    if (res) {
      // When there's been an error deleting the grid, you may want to handle it here
    }
    deleteGridBtn.disabled = true;
  };

  createGridBtn.onclick = async (event) => {
    await sandboxProxy.addGrid({
      columns: colsInput.value,
      rows: rowsInput.value,
      gutter: gutterInput.value,
      columnColor: colsColor,
      rowColor: rowsColor,
    });
    deleteGridBtn.disabled = false;
  };

  // Only now it is safe to enable the button
  createGridBtn.disabled = false;
});
