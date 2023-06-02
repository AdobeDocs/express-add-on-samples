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
export class Store {
    #currentFile;
    #files = {};
    #fgColor = "#000000";
    #bgColor = "#FFFFFF";
    #clientStorage;

    async ready(clientStorage) {
        this.#clientStorage = clientStorage;
        await this.init();
    }

    async init() {
        const files = await this.#clientStorage.getItem("files");
        this.#files = files || {
            Default: Array.from({length: 256})
        };

        const currentFile = await this.#clientStorage.getItem("currentFile");
        this.#currentFile = currentFile || "Default";

        const fgColor = await this.#clientStorage.getItem("fgColor");
        this.#fgColor = fgColor || "#000000";

        const bgColor = await this.#clientStorage.getItem("bgColor");
        this.#bgColor = bgColor || "#FFFFFF";
    }

    async persist() {
        await this.#clientStorage.setItem("files", this.#files);
        await this.#clientStorage.setItem("currentFile", this.#currentFile);
        await this.#clientStorage.setItem("fgColor", this.#fgColor);
        await this.#clientStorage.setItem("bgColor", this.#bgColor);
    }

    newFile(filename) {
        this.#files[filename] = Array.from({length:256});
        this.persist();
    }

    saveFile(filename, data) {
        this.#files[filename] = data;
        this.persist();
    }

    removeFile(filename) {
        if (filename === "Default") return; /* don't remove the default! */
        delete this.#files[filename];
        this.persist();
    }

    get filenames() {
        return Object.keys(this.#files);
    }

    getPixelsForFile(file) {
        return Array.from(this.#files[file] || Array.from({length: 256}));
    }

    get currentFile() {
        return this.#currentFile;
    }
    set currentFile(file) {
        this.#currentFile = file;
        this.persist();
    }

    get currentPixels() {
        return Array.from(this.#files[this.currentFile]);
    }

    get files() {
        return this.#files;
    }

    get fgColor() {
        return this.#fgColor;
    }
    set fgColor(color) {
        this.#fgColor = color;
        this.persist();
    }

    get bgColor() {
        return this.#bgColor;
    }
    set bgColor(color) {
        this.#bgColor = color;
        this.persist();
    }

}

let store;
export default store = new Store();