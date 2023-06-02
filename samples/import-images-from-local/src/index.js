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
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const IMAGES = new Map([
    ["andaman.jpg", "./images/andaman.jpg"],
    ["castle.jpeg", "./images/castle.jpeg"],
    ["iceland.jpg", "./images/iceland.jpg"],
    ["norway.jpg", "./images/norway.jpg"],
    ["paris.jpg", "./images/paris.jpg"],
    ["thar.jpg", "./images/thar.jpg"]
]);

let gallery;

// Wait for the SDK to be ready before rendering elements in the DOM.
AddOnSdk.ready.then(async () => {
    // Create elements in the DOM.
    gallery = document.createElement("div");
    gallery.className = "gallery";

    IMAGES.forEach((url, id) => {
        const image = document.createElement("img");
        image.id = id;
        image.src = url;
        image.addEventListener("click", addToDocument);

        // Enable drag to document for the image.
        AddOnSdk.app.enableDragToDocument(image, {
            previewCallback: element => {
                return new URL(element.src);
            },
            completionCallback: async (element) => {
                return [{ blob: await getBlob(element.src) }];
            }
        });

        gallery.appendChild(image);
    });

    // Register event handler for the 'dragend' event
    // so that the image gets added to the document once dragged.
    AddOnSdk.app.on("dragend", endDrag);

    document.body.appendChild(gallery);
});

/**
 * Add image to the document.
 */
async function addToDocument(event) {
    const url = event.currentTarget.src;
    const blob = await getBlob(url);
    AddOnSdk.app.document.addImage(blob);
}

/**
 * Add image to the document on drag end.
 */
function endDrag(eventData) {
    if (!eventData.dropCancelled) {
        console.log("The drag event has ended for", eventData.element);
    } else {
        console.log("The drag event was cancelled for", eventData.element);
    }
}

/**
 * Get the binary object for the image.
 */
async function getBlob(url) {
    return await fetch(url).then(response => response.blob());
}
