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
export function formatChange(event) {
  const input = document.getElementById("files-input");
  input.accept = event.target.value;
}

export function inputChange(event, AddOnSdk) {
  //Removing previous preview image or video
  if (
    document.getElementById("square-2").lastChild.localName === "img" ||
    document.getElementById("square-2").lastChild.localName === "video"
  ) {
    document
      .getElementById("square-2")
      .removeChild(document.getElementById("square-2").lastChild);
  }
  document.getElementById("prev-2").style.display = "none";
  if (document.getElementById("format").value === "video/mp4") {
    return addImportedVideo(event, AddOnSdk);
  }
  return addImportedImage(event, AddOnSdk);
}

function addImportedImage(event, AddOnSdk) {
  //Adding image to the preview box
  const image = document.createElement("img");
  const file = event.target.files[0];
  image.src = URL.createObjectURL(file);
  image.style.height = "100%";
  image.style.width = "100%";
  image.style.objectFit = "contain";
  document.getElementById("square-2").appendChild(image);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  let preview;
  reader.addEventListener("load", () => {
    // Get the data URL string
    preview = reader.result;
  });

  var blob = new Blob([file], { type: file.type });
  image.addEventListener("click", function () {
    AddOnSdk.app.document.addImage(blob);
  });

  const dragCallbacks = {
    previewCallback: (image) => {
      return new URL(preview);
    },
    completionCallback: async (image) => {
      const imageBlob = await fetch(preview).then((response) =>
        response.blob()
      );
      return [{ blob: imageBlob }];
    },
  };
  try {
    AddOnSdk.app.enableDragToDocument(image, dragCallbacks);
  } catch (error) {
    console.log("Failed to enable DragToDocument:", error);
  }
}

function addImportedVideo(event, AddOnSdk) {
  //Adding video to preview box
  const file = event.target.files[0];
  //const result = event.target.result;
  const video = document.createElement("video");
  video.style.height = "100%";
  video.style.width = "100%";
  video.style.position = "relative";
  video.style.align = "center";
  video.style.justifyItems = "center";
  video.style.objectFit = "contain";
  video.src = URL.createObjectURL(file);
  video.load();
  document.getElementById("square-2").appendChild(video);
  video.play();

  var blob = new Blob([file], { type: file.type });
  video.addEventListener("click", function () {
    AddOnSdk.app.document.addVideo(blob);
  });
}
