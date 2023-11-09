## About

This project has been created with _@adobe/create-ccweb-add-on_. As an example, this add-on demonstrates the use of the [SWC-React](https://opensource.adobe.com/spectrum-web-components/using-swc-react/), (React wrapper components for the Spectrum Web Components (SWC) library), as well as how to set the various theme properties provided with Spectrum (ie: main theme, scale, color and style). 

## Important Notes
### SWC-React Implementation
For the [SWC-React](https://opensource.adobe.com/spectrum-web-components/using-swc-react/) implementation, please note that you only need to include the `swc-react` package for the component you want to use in your `package.json`, as the corresponding Spectrum Web Component module is automatically brought in when you specify it's related `swc-react` component.  For instance, to use the Button component, in `package.json` you would include:

`"@swc-react/button": "^0.34.0",`

and in your `*.jsx` file, you can import and use it like in the following:

```jsx
import { Button } from "@swc-react/button";

...

<Button variant="primary">
    Primary Button
</Button>
```

Refer to the related Spectrum Web Component for the details on the specific properties such as `variant` values, events and other usage (ie: [Button Reference](https://opensource.adobe.com/spectrum-web-components/components/button/)).

**IMPORTANT!** To ensure the Spectrum Web Components render correctly in your add-on, all component usages must be wrapped inside the `@swc-react/theme` component with wrapper component name of `Theme`. The `Theme` component acts like a React Context component. Refer to the `App.jsx` in this sample add-on for reference and visit this [official documentation](https://opensource.adobe.com/spectrum-web-components/using-swc-react/) for more details.

### Theme Notes
Currently Express only supports the light theme, but a dark theme will be coming in the future so you should be considering that when designing your add-on.

#### Light theme - medium scale screenshot
![light theme screenshot](./light-theme.png)

#### Dark theme - large scale screenshot
![dark theme screenshot](./dark-theme-large.png)

## Tools

-   HTML
-   CSS
-   React
-   [SWC-React](https://opensource.adobe.com/spectrum-web-components/using-swc-react/) 

## Setup

1. To install the dependencies, run `npm install`.
2. To build the application, run `npm run build`.
3. To start the application, run `npm run start`.
