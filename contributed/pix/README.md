## PIX

This is a React-based add-on that illustrates a very simple 16x16 pixel editor add-on. Users can drag the resulting pixel art on to the canvas, but they can also import the current page as pixel art (downsampled to 16x16).

Contributed by: Kerri Shotts

### Usage Notes

Click a pixel to change its color. You can change the current foreground and background color by clicking the top (foreground) or bottom (background) swatch above the 16x16 grid.

You can import the current page as a downsampled 16x16 image by clicking "Import".

You can clear the current pixels by clicking "clear".

You can create a new artwork based on the current one by clicking the "save w/ plus" icon. You'll need to provide a new name, and then click "Save".

You can delete the current artwork by clicking the trashcan icon. You can't remove the "Default" artwork, but deleting it will clear the pixels.

### Tech Notes

* Forces the width to 280px due to upcoming changes in add-on panel location and size. Generally, though, ensure your add-on is designed responsively so it can adapt to any size.

* Pixel art creations are stored in client storage. This means they are not "safe", since users can clear this storage. This also means that pixel art creations don't follow the user around to other devices.

### Capabilities Exercised

* Add image via drag and drop
* Generate renditions
* Client Storage

### Technologies

* HTML Canvas
* React
* Spectrum Web Components

