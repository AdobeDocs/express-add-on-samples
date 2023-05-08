import AddOnStore from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

export function add_image(url) {
    AddOnStore.ready.then(() => {
        async function callWhenReady() {
            const blob = await fetch(url).then((r) => r.blob());
            AddOnStore.app.document.addImage(blob);
        }
        callWhenReady();
    });
}

async function previewCallback(element) {
    const response = await fetch(element.src);
    return await response.blob();
}

AddOnStore.ready.then(() => {
    AddOnStore.app.on("dragend", async (eventData) => {
        const blob = await fetch(eventData.element.src).then((r) => r.blob());
        AddOnStore.app.document.addImage(blob, {
            position: eventData.position,
        });
    });
});

export function enableDragOnImage(element) {
    AddOnStore.ready.then(() => {
        AddOnStore.app.enableDragToDocument(element, previewCallback);
    });
}
