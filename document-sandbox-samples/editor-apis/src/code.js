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
import { editor, colorUtils } from "express-document-sdk";

const { runtime } = addOnSandboxSdk.instance;

async function start() {
    const sandboxApi = {
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
            text.textAlignment = 2;

            const rectFill = editor.makeColorFill(colorUtils.fromRGB(Math.random(), Math.random(), Math.random(), Math.random()));
            const ellipseFill = editor.makeColorFill(colorUtils.fromRGB(Math.random(), Math.random(), Math.random(), Math.random()));
            rectangle.fill = rectFill;
            ellipse.fill = ellipseFill;
            insertionParent.children.append(rectangle);
            insertionParent.children.append(ellipse);
            insertionParent.children.append(text);

            return "**** Shapes created successfully ****";
        }
    }

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);
}

start();
