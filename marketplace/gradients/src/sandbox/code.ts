/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import addOnScriptSdk from "add-on-sdk-document-sandbox";
import { BaseNode, ContainerNode, Node, PageNode, editor } from "express-document-sdk";
import { SandboxApi } from "../models";

const { runtime } = addOnScriptSdk.instance;

function start(): void {
    const sandboxApi: SandboxApi = {
        getPageSize: async () => {
            const insertionParent = getInsertionParent();
            const currentPage = getCurrentPage(insertionParent) as PageNode;

            return {
                width: currentPage.width,
                height: currentPage.height
            };
        },
        drawImage: async (image: Blob) => {
            const insertionParent = getInsertionParent();
            const currentPage = getCurrentPage(insertionParent) as PageNode;

            const bitmapImage = await editor.loadBitmapImage(image);

            await editor.queueAsyncEdit(() => {
                const width = currentPage.width;
                const height = currentPage.height;

                const mediaContainerNode = editor.createImageContainer(bitmapImage, { initialSize: { width, height } });
                mediaContainerNode.translation = { x: 0, y: 0 };

                insertionParent.children.append(mediaContainerNode);
            });
        }
    };

    runtime.exposeApi(sandboxApi);
}

function getInsertionParent(): ContainerNode {
    return editor.context.insertionParent;
}

function getCurrentPage(node: BaseNode) {
    while (node && node.type !== "Page") {
        node = node.parent;
    }

    return node;
}

start();
