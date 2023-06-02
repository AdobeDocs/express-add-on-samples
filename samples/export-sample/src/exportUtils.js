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
export function mimeTypeChange(event, initialState) {
  initialState.valueMimeType = event.target.value;

  document.getElementById("download-button").style.display = "none";
  document.getElementById("preview-button").style.display = "";

  const background = document.getElementById("backgroundColor");
  const quality = document.getElementById("quality");
  const config = document.getElementById("config");
  const line = document.getElementById("line");
  const back = document.getElementById("background");
  const qual = document.getElementById("quality-text");

  //Showing certain fields only when the mime type is image/png or image/jpeg

  if (event.target.value === "image/jpeg") {
    background.style.display = "block";
    quality.style.display = "block";
    config.style.display = "block";
    line.style.display = "block";
    back.style.display = "block";
    qual.style.display = "block";

    return;
  }

  if (event.target.value === "image/png") {
    background.style.display = "block";
    quality.style.display = "none";
    quality.value = "NaN";
    config.style.display = "block";
    line.style.display = "block";
    back.style.display = "block";
    qual.style.display = "none";

    return;
  }

  background.style.display = "none";
  background.value = "NaN";
  quality.style.display = "none";
  quality.value = "NaN";
  config.style.display = "none";
  line.style.display = "none";
  back.style.display = "none";
  qual.style.display = "none";
}

export function rangeChange(event, initialState) {
  initialState.rangeValue = event.target.value;
  document.getElementById("download-button").style.display = "none";
  document.getElementById("preview-button").style.display = "";
}

export function backgroundColorChange() {
  document.getElementById("download-button").style.display = "none";
  document.getElementById("preview-button").style.display = "";
}

export function qualityChange() {
  document.getElementById("download-button").style.display = "none";
  document.getElementById("preview-button").style.display = "";
}

export function downloadButtonClick(initialState) {
  //Checking if we need to zip the files or not
  if (
    initialState.urls.length > 0 &&
    (document.getElementById("mimeType").value === "application/pdf" ||
      initialState.urls.length === 1)
  ) {
    //Single files are not zipped
    document.getElementById("anchor").href = initialState.urls[0];
  } else {
    document.getElementById("anchor").href = "#";
    //Zipping multiple files
    saveZip("my_file.zip", initialState.urls, initialState.mimeTypeValue);
  }
}

export function setMimeTypeValue(initialState) {
  switch (initialState.valueMimeType) {
    case "image/jpeg":
      initialState.mimeTypeValue = "jpg";
      break;
    case "image/png":
      initialState.mimeTypeValue = "png";
      break;
    case "video/mp4":
      initialState.mimeTypeValue = "mp4";
      break;
  }
}

function saveZip(filename, urls, mimeTypeValue) {
  if (!urls || urls.length === 0) return;

  const zip = new JSZip();
  const folder = zip.folder("files"); // folder name where all files will be placed in

  urls.forEach((url) => {
    const blobPromise = fetch(url).then((r) => {
      if (r.status === 200) return r.blob();
      return Promise.reject(new Error(r.statusText));
    });
    const name = url.substring(url.lastIndexOf("/") + 1);
    folder.file(name + "." + mimeTypeValue, blobPromise);
  });

  zip.generateAsync({ type: "blob" }).then((blob) => saveAs(blob, filename));
}

export function getValue(name) {
  return document.getElementById(name).value;
}

export function addImg(renditions) {
  var pageNumber = 1;
  renditions.forEach((rendition) => {
    const image = document.createElement("img");
    image.src = URL.createObjectURL(rendition.blob);
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "contain";
    image.style.marginBottom = "20px";
    document.getElementById("square").appendChild(image);

    var page = document.createElement("sp-field-label");
    page.textContent = "Page " + pageNumber.toString();
    page.size = "m";
    page.style.display = "block";
    document.getElementById("square").appendChild(page);
    document.getElementById("square").appendChild(document.createElement("hr"));
    pageNumber++;
  });

  document.getElementById("download-button").style.display = "";
  document.getElementById("preview-button").style.display = "none";
}

export function addVid(renditions) {
  var pageNumber = 1;
  renditions.forEach((rendition) => {
    const video = document.createElement("video");
    video.style.height = "100%";
    video.style.width = "100%";
    video.style.objectFit = "contain";
    video.style.position = "relative";
    video.style.align = "center";
    video.style.justifyItems = "center";
    video.style.marginBottom = "20px";
    video.src = URL.createObjectURL(rendition.blob);
    video.load();

    document.getElementById("square").appendChild(video);
    video.play();

    var page = document.createElement("sp-field-label");
    page.textContent = "Page " + pageNumber.toString();
    page.size = "m";
    page.style.display = "block";
    document.getElementById("square").appendChild(page);
    document.getElementById("square").appendChild(document.createElement("hr"));
    pageNumber++;
  });

  document.getElementById("download-button").style.display = "";

  document.getElementById("preview-button").style.display = "none";
}
