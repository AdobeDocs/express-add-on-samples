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