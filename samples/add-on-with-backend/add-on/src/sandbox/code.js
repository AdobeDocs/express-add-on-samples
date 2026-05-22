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

const { runtime } = addOnSandboxSdk.instance;

function start() {
    const sandboxApi = {
        /**
         * Add rewritten text to the current document.
         * Network requests must run in the UI runtime; only document APIs run here.
         * @param {string} text - Text to place on the canvas.
         */
        addTextToDocument: text => {
            const insertionParent = editor.context.insertionParent;
            const textNode = editor.createText();
            textNode.text = text;
            textNode.translation = { x: 500, y: 600 };
            textNode.fullContent.applyCharacterStyles({ fontSize: 28 });
            insertionParent.children.append(textNode);
        }
    };

    runtime.exposeApi(sandboxApi);
}

start();
