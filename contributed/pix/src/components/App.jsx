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
import React, { useState, useRef } from "react";
import '@spectrum-web-components/button/sp-button.js';

import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-save-floppy.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-save-as-floppy.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-delete.js';

import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';

import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/overlay/sync/overlay-trigger.js';
import '@spectrum-web-components/popover/sp-popover.js';

import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/number-field/sp-number-field.js';

import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/action-button/sp-action-button.js';

import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tab-panel.js';

import {WC} from "./WC.jsx";
import { ColorPicker } from "./ColorPicker.jsx";
import { PixelEditor } from "./PixelEditor.jsx";
import { PixImage } from "./PixImage.jsx";

const App = ({ addOnSdk, store }) => {

    const [fgColor, setFgColor] = useState(store.fgColor);
    const [bgColor, setBgColor] = useState(store.bgColor);
    const [currentFile, setCurrentFile] = useState(store.currentFile);
    const [pixels, setPixels] = useState(store.currentPixels);
    const [imageSize, setImageSize] = useState(64);

    const txtNewName = useRef(null);
    const filePicker = useRef(null);
    const saveAsPopover = useRef(null);
    const imageSizeRef = useRef(null);

    function fgColorChanged(color) {
        setFgColor(color);
        store.fgColor = color;
    }

    function bgColorChanged(color) {
        setBgColor(color);
        store.bgColor = color;
    }

    function pixelChanged(which, color) {
        const pixels = store.currentPixels;
        pixels[which] = color;
        setPixels(pixels);
        store.saveFile(currentFile, pixels);
    }

    function saveAs() {
        const newName = txtNewName.current.value.trim();
        if (newName === "") return; // TODO: do better error handling

        store.saveFile(newName, pixels);
        store.currentFile = newName;
        setCurrentFile(newName);
        setPixels(store.currentPixels);

        saveAsPopover.current.dispatchEvent(new Event("close", {bubbles: true, composed: true}));
    }

    function selectFile() {
        const newFile = filePicker.current.value;
        store.currentFile = newFile;
        setCurrentFile(newFile);
        setPixels(store.currentPixels);
    }

    function clearPixels() {
        const pixels = Array.from({length: 256});
        setPixels(pixels);
        store.saveFile(currentFile, pixels);
    }

    function sizeChanged() {
        const newSize = imageSizeRef.current.value;
        setImageSize(Number(newSize) || 64);
    }

    function deleteFile(target, event) {
        console.log(target, event);
        if (currentFile === "Default") {
            clearPixels(); /* clear the pixels, but we shoudn't delete the default file */
            return;
        }
        store.removeFile(currentFile); /* remove the file */
        store.currentFile = "Default"; /* and move to the default file */
        setCurrentFile(store.currentFile);
        setPixels(store.currentPixels);
    }

    async function importPixels() {
        const Range = {
            currentPage: "currentPage",
            entireDocument: "entireDocument"
        };
        const RenditionFormat = {
            png: "image/png",
            jpg: "image/jpg",
            mp4: "video/mp4",
            pdf: "application/pdf"
        };
        try {
            const renditionOptions = {range: Range.currentPage, format: RenditionFormat.png, backgroundColor: 0x00000000};
            const renditions = await addOnSdk.app.document.createRenditions(renditionOptions);
            renditions.forEach(rendition => {
                const image = document.createElement("img");
                const url = URL.createObjectURL(rendition.blob);
                image.src = url;

                image.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = 16;
                    canvas.height = 16;
                    canvas.style="width: 16px; height: 16px";

                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(image, 0, 0, 16, 16);
                    const pixelData = ctx.getImageData(0,0,16,16, {colorSpace: "srgb"});

                    const pixels = Array.from({length: 256}, (_, i) => {
                        const a = pixelData.data[i*4+3] / 255;
                        const r = pixelData.data[i*4];
                        const g = pixelData.data[i*4+1];
                        const b = pixelData.data[i*4+2];
                        if (a === 0) return "transparent";
                        return `rgba(${r},${g},${b},${a})`;
                    });
                    setPixels(pixels);
                    store.saveFile(currentFile, pixels);
                    URL.revokeObjectURL(url);
                }

            });
          }
          catch(error) {
            console.log("Failed to create renditions:", error);
          }
    }

    return <>
        <sp-icons-medium></sp-icons-medium>
        <sp-action-group quiet class="file-manager">
            <WC onChange={selectFile}>
                <sp-picker ref={filePicker} value={currentFile} size="m" label="Select file" style={{maxWidth: "150px"}}>
                    {store.filenames.map(name =>  <sp-menu-item key={name} value={name}>{name}</sp-menu-item> )}
                </sp-picker>
            </WC>
            <overlay-trigger placement="bottom-start">
                <sp-action-button slot="trigger"><sp-icon-save-as-floppy slot="icon"></sp-icon-save-as-floppy></sp-action-button>
                <sp-popover slot="click-content" dialog tip style={{minWidth: "200px"}} ref={saveAsPopover}>
                    <sp-field-label for="txtNewName">New name:</sp-field-label>
                    <sp-textfield id="txtNewName" ref={txtNewName} value={`${currentFile} Copy`}></sp-textfield>
                    <WC onClick={saveAs} className="saveAsButton">
                        <sp-button><sp-icon-save-floppy slot="icon"></sp-icon-save-floppy>Save</sp-button>
                    </WC>
                </sp-popover>
            </overlay-trigger>
            <WC onClick={deleteFile}>
                <sp-action-button><sp-icon-delete slot="icon"></sp-icon-delete></sp-action-button>
            </WC>
        </sp-action-group>
        <sp-tabs selected="editor" class="panel-tabs">
            <sp-tab value="editor">Editor</sp-tab>
            <sp-tab value="preview">Preview &amp; Export</sp-tab>
            <sp-tab-panel value="editor">
                <div className="editorPanel">
                    <div className="editorToolbar">
                        <div className="stackedColorPickers">
                            <ColorPicker currentColor={fgColor} onChange={fgColorChanged}/>
                            <ColorPicker currentColor={bgColor} onChange={bgColorChanged}/>
                        </div>
                        <sp-action-group>
                            <WC onClick={importPixels}><sp-action-button>Import</sp-action-button></WC>
                            <WC onClick={clearPixels}><sp-action-button>Clear</sp-action-button></WC>
                        </sp-action-group>
                    </div>
                    <PixelEditor pixels={pixels} onChange={pixelChanged} currentColor={fgColor} bgColor={bgColor}/>
                </div>
            </sp-tab-panel>
            <sp-tab-panel value="preview">
                <div className="previewPanel">
                    <WC onChange={sizeChanged}>
                        <sp-field-label for="txtWidth">Export size (px)</sp-field-label>
                        <sp-number-field type="number" id="txtWidth" value={imageSize} ref={imageSizeRef}></sp-number-field>
                    </WC>
                    <div className="preview">
                        <PixImage pixels={pixels} bgColor={bgColor} addOnSdk={addOnSdk} enableDrag={addOnSdk.app.enableDragToDocument} canvasWidth={imageSize} canvasHeight={imageSize} styleHeight={128} styleWidth={128}/>
                    </div>
                </div>
            </sp-tab-panel>
        </sp-tabs>

    </>;
};

export default App;
