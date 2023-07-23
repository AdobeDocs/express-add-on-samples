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
import { AddOnSdkApi } from "AddOnSdkApi";
import { editor } from "express";
const { runtime } = AddOnSdkApi.instance;

async function start() {
    const scriptApi = {
        addPage: function (size = { width: 400, height: 600 }) {
            const { artboard } = editor.addTemporalArtboardContainerWithArtboard(size);
            editor.documentRoot.selection = [artboard];
        },
        clearArtboard: function () {
            const artboardNode = editor.documentRoot.currentContext;
            if (artboardNode.children.length > 0) {
                artboardNode.children.clear();
            }
            return "**** Artboard cleared successfully ****";
        },
        createShapes: function() {
            const artboardNode = editor.documentRoot.currentContext;

            const rectangle = editor.createRectangle();
            rectangle.width = 200;
            rectangle.height = 150;
            rectangle.translateX = 100;
            rectangle.translateY = 20;

            const ellipse = editor.createEllipse();
            ellipse.rx = 150;
            ellipse.ry = 70;
            ellipse.translateX = 10;
            ellipse.translateY = 200;

            const text = editor.createText();
            text.text = "A Text Node";
            text.translateX = 20;
            text.translateY = 400;
            text.textAlignment = 3;
            text.characterStyleRanges.setStyleRanges([
                {
                    length: 2,
                    style: {
                        color: { red: Math.random(), green: Math.random(), blue: Math.random(), alpha: 1 }
                    }
                },
                {
                    length: 5,
                    style: {
                        color: { red: Math.random(), green: Math.random(), blue: Math.random(), alpha: 1 }
                    }
                },
                {
                    length: 4,
                    style: {
                        color: { red: Math.random(), green: Math.random(), blue: Math.random(), alpha: 1 }
                    }
                }
            ]);

            const rectFill = editor.createColorFill({ red: Math.random(), green: Math.random(), blue: Math.random(), alpha: Math.random() });
            const ellipseFill = editor.createColorFill({ red: Math.random(), green: Math.random(), blue: Math.random(), alpha: Math.random() });
            rectangle.fills.append(rectFill);
            ellipse.fills.append(ellipseFill);
            artboardNode.children.append(rectangle);
            artboardNode.children.append(ellipse);
            artboardNode.children.append(text);

            return "**** Shapes created successfully ****";
        },
        createImage: async function(blob, size = {}) {
            const artboardNode = editor.documentRoot.currentContext;
            const bitmapImage = await editor.loadBitmapImage(blob);
            let { width, height } = size;
            if (!width || !height) {
                width = bitmapImage.width;
                height = bitmapImage.height;
            }
            const mediaContainerNode = editor.createImageContainer(bitmapImage, { initialSize: { width, height } });
            artboardNode.children.append(mediaContainerNode);
            return "**** Image created successfully ****"
        }
    }

    // expose the script apis 
    runtime.exposeApi(scriptApi);
}

start();
