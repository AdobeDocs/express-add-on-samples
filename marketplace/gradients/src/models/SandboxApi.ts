import { PageSize } from "./index.js";

export interface SandboxApi {
    /**
     * Get current page size.
     */
    getPageSize(): Promise<PageSize>;

    /**
     * Draw image on page.
     * @param image - Image blob.
     */
    drawImage(image: Blob): Promise<void>;
}
