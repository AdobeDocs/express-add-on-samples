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
