export function isNullOrWhiteSpace(value) {
    return !value || value.trim().length === 0;
}

export function isImage(fileName) {
    return (
        fileName.endsWith(".jpeg") ||
        fileName.endsWith(".jpg") ||
        fileName.endsWith(".png") ||
        fileName.endsWith(".bmp") ||
        fileName.endsWith(".webp")
    );
}
