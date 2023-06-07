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

// import our stylesheets
// import './styles.css';

// import the components we'll use in this page
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/tabs/sp-tab-panel.js";
import "@spectrum-web-components/picker/sp-picker.js";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/styles/all-medium-light.css";
import "@spectrum-web-components/textfield/sp-textfield.js";
import "@spectrum-web-components/divider/sp-divider.js";
import "@spectrum-web-components/number-field/sp-number-field.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import "@spectrum-web-components/toast/sp-toast.js";
import "@spectrum-web-components/styles/typography.css";
import * as exportUtils from "./exportUtils.js";
import * as importUtils from "./importUtils.js";

window.setupEventListeners = (AddOnSdk) => {
  //It denotes initial value of parameters
  let initialState = {
    urls: [],
    valueMimeType: "application/pdf",
    rangeValue: "currentPage",
    mimeTypeValue: "",
  };

  document
    .getElementById("mimeType")
    .addEventListener("change", function (event) {
      exportUtils.mimeTypeChange(event, initialState);
    });

  document.getElementById("range").addEventListener("change", function (event) {
    exportUtils.rangeChange(event, initialState);
  });

  document
    .getElementById("backgroundColor")
    .addEventListener("change", exportUtils.backgroundColorChange);

  document
    .getElementById("quality")
    .addEventListener("change", exportUtils.qualityChange);

  document
    .getElementById("format")
    .addEventListener("change", importUtils.formatChange);

  document
    .getElementById("files-input")
    .addEventListener("change", function (event) {
      importUtils.inputChange(event, AddOnSdk);
    });

  document.getElementById("tabs").addEventListener("change", tabsChange);

  document
    .getElementById("download-button")
    .addEventListener("click", function () {
      exportUtils.downloadButtonClick(initialState);
    });

  document
    .getElementById("add-button")
    .addEventListener("click", addButtonClick);

  document
    .getElementById("preview-button")
    .addEventListener("click", previewButtonClick);

  function tabsChange(event) {
    //Switching between import and export tabs
    if (event.target._$changedProperties.get("selected") === "2") {
      const exportDiv = document.getElementById("export");
      const importDiv = document.getElementById("import");
      exportDiv.style.display = "block";
      importDiv.style.display = "none";
    } else {
      const exportDiv = document.getElementById("export");
      const importDiv = document.getElementById("import");
      exportDiv.style.display = "none";
      importDiv.style.display = "block";
    }
  }

  async function addButtonClick() {
    let error = document.getElementById("error");
    error.style.display = "none";
    var file = document.getElementById("files-input").files[0];
    //Converting input file to blob in order to call import APIs
    var blob = new Blob([file], { type: file.type });
    if (file.type === "video/mp4") {
      await AddOnSdk.app.document.addVideo(blob);
    } else {
      try {
        await AddOnSdk.app.document.addImage(blob);
      } catch (e) {
        error.textContent = e.message;
        error.style.display = "";
        console.log(e);
      }
    }
  }

  async function previewButtonClick() {
    initialState.urls = [];
    document.getElementById("anchor").href = "#";
    document.getElementById("preview-button").disabled = true;
    //Removing previous preview
    while (
      document.getElementById("square").lastChild.localName === "img" ||
      document.getElementById("square").lastChild.localName === "video" ||
      document.getElementById("square").lastChild.localName ===
      "sp-field-label" ||
      document.getElementById("square").lastChild.localName === "hr"
    ) {
      document
        .getElementById("square")
        .removeChild(document.getElementById("square").lastChild);
    }
    document.getElementById("prev").style.display = "block";

    var response;
    if (
      !exportUtils.getValue("backgroundColor") &&
      !exportUtils.getValue("quality")
    ) {
      response = await AddOnSdk.app.document.createRenditions({
        range: initialState.rangeValue,
        format: initialState.valueMimeType,
      });
    } else if (!exportUtils.getValue("backgroundColor")) {
      response = await AddOnSdk.app.document.createRenditions({
        range: initialState.rangeValue,
        format: initialState.valueMimeType,
        quality: exportUtils.getValue("quality"),
      });
    } else if (!exportUtils.getValue("quality")) {
      /*Calling export APIs for images with export configurations
       * Background Color field is in decimal, convert RGB for JPEG and ARGB for PNG to decimal, for example - https://www.checkyourmath.com/convert/color/rgb_decimal.php
       */
      response = await AddOnSdk.app.document.createRenditions({
        range: initialState.rangeValue,
        format: initialState.valueMimeType,
        backgroundColor: exportUtils.getValue("backgroundColor"),
      });
    } else {
      /*Calling export APIs for images with export configurations
       * Background Color field is in decimal, convert RGB for JPEG and ARGB for PNG to decimal, for example - https://www.checkyourmath.com/convert/color/rgb_decimal.php
       */
      response = await AddOnSdk.app.document.createRenditions({
        range: initialState.rangeValue,
        format: initialState.valueMimeType,
        backgroundColor: exportUtils.getValue("backgroundColor"),
        quality: exportUtils.getValue("quality"),
      });
    }
    document.getElementById("preview-button").disabled = false;

    //Adding preview to preview box
    document.getElementById("prev").style.display = "none";
    if (
      initialState.valueMimeType === "image/jpeg" ||
      initialState.valueMimeType === "image/png"
    ) {
      exportUtils.addImg(response);
    }
    if (initialState.valueMimeType === "video/mp4") {
      exportUtils.addVid(response);
    }
    if (initialState.valueMimeType === "application/pdf") {
      const preview = await AddOnSdk.app.document.createRenditions({
        range: initialState.rangeValue,
        format: "image/jpeg",
      });
      exportUtils.addImg(preview);
    }

    //Pushing exportUtils.urls recieved from response in an array
    var tempUrls = [];
    response.forEach((res) => {
      tempUrls.push(URL.createObjectURL(res.blob));
    });
    initialState.urls = tempUrls;
    exportUtils.setMimeTypeValue(initialState);
  }
};
