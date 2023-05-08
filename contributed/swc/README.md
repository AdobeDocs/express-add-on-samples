## About

This is a basic demo that illustrates how to use Spectrum Web Components without React or any other framework. It _does_ illustrate how to use Webpack, since Spectrum Web Components does generally rely on bundlers like webpack in order to function correctly.

This add-on illustrates how to:

* Incorporate webpack
* Import several Spectrum Web Components
* Hide the add-on's UI until the SDK is ready (to prevent any flash of unstyled content).

The structure of this add-on is as follows:

* `package.json` has been modified to support `webpack` (see the `scripts` and `devDependencies` section). You'll also manage the Spectrum Web Components that your add-on will use by adding them to the `dependencies` section. You should _remove_ components that your add-on doesn't use to reduce add-on bundle size.
* `webpack.config.js` has been added to support bundling Spectrum Web Components and your JavaScript into a bundle. If you find that some files aren't being moved to `dist`, you'll want to edit this file (line 31,32) to add more file types to copy.
* `index.js` was added. This file _imports_ all the Spectrum Web Components so that they can be rendered correctly in your `index.html` file. If you add more components, you'll need to import them here. If you remove any components from the `package.json` dependency section, remove their imports here as well. This file will also set up theme handling (for `sp-theme`).
* `index.html` has a couple of styles applied to `sp-theme` to hide it until `index.js` is loaded.

## Adding a Spectrum Web Component that's not included

This sample does not include every possible Spectrum Web Component. Let's imagine you wanted to add a new one, say the "Meter" component.

* Browse the docs for the component you want to add. In this case, `sp-meter`'s docs are here: https://opensource.adobe.com/spectrum-web-components/components/meter/
* Where the documentation says to use `yarn add @spectrum-web-components/sp-meter`, do one of the following:
    * `npm install --save @spectrum-web-components/sp-meter`
    * Or add an entry to your `package.json` in the `dependencies` section that references the component
* Where the documentation says to "import the side-effectful registration", copy the code block (it'll start with `import`) to the `index.js` file. In this case, you'd add this to `index.js`:
    * `import '@spectrum-web-components/meter/sp-meter.js';`
* When you make these changes, you'll need to _stop_ any existing `npm run start` session, run `npm install`, and then restart your `npm run start` session.
* Start using the component in your HTML code.

## Tools

- HTML
- CSS
- JavaScript
- Webpack
- Spectrum Web Components

## Setup

1. To install the dependencies, run `npm install`.
2. To build the application, run `npm run build`.
3. To start the application, run `npm run start`.
