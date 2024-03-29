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
import { editor, colorUtils, constants } from "express-document-sdk";

const { runtime } = addOnSandboxSdk.instance;

async function start() {
    const sandboxApi = {
        addPage: function (size = { width: 400, height: 600 }) {
            editor.documentRoot.pages.addPage(size);
        },
        clearArtboard: function () {
            const insertionParent = editor.context.insertionParent;
            if (insertionParent.children.length > 0) {
                insertionParent.children.clear();
            }
            return "**** Artboard cleared successfully ****";
        },
        createShapes: function() {
            const insertionParent = editor.context.insertionParent;

            const rectangle = editor.createRectangle();
            rectangle.width = 200;
            rectangle.height = 150;
            rectangle.translation = { x: 100, y: 20 };

            const ellipse = editor.createEllipse();
            ellipse.rx = 150;
            ellipse.ry = 70;
            ellipse.translation = { x: 10, y: 200 };

            const text = editor.createText();
            text.text = "A Text Node";
            text.translation = { x: 20, y: 400 };
            text.textAlignment = constants.TextAlignment.right;

            const rectFill = editor.makeColorFill(colorUtils.fromRGB(Math.random(), Math.random(), Math.random(), Math.random()));
            const ellipseFill = editor.makeColorFill(colorUtils.fromRGB(Math.random(), Math.random(), Math.random(), Math.random()));
            rectangle.fill = rectFill;
            ellipse.fill = ellipseFill;
            insertionParent.children.append(rectangle);
            insertionParent.children.append(ellipse);
            insertionParent.children.append(text);

            return "**** Shapes created successfully ****";
        },
        createImage: async function(blob, size = {}) {
            const insertionParent = editor.context.insertionParent;
            const bitmapImage = await editor.loadBitmapImage(blob);
            // Edits following an asynchronous wait need to be queued to run at a safe time
            await editor.queueAsyncEdit(() => {
                let { width, height } = size;
                if (!width || !height) {
                    width = bitmapImage.width;
                    height = bitmapImage.height;
                }
                const mediaContainerNode = editor.createImageContainer(bitmapImage, { initialSize: { width, height } });
                insertionParent.children.append(mediaContainerNode);
            });
            return "**** Image created successfully ****"
        }
    }

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);
}

start();
