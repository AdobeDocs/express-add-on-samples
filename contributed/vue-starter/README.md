# Vue Starter - Adobe Express Add-on

A sample Adobe Express Add-on that demonstrates how to build an add-on using Vue.js and properly access the Adobe Express Add-on SDK.

## What This App Does

This starter template demonstrates a best practice approach for integrating Vue.js with the Adobe Express Add-on SDK:

1. **SDK Integration via Dependency Injection**: The app uses Vue's provide/inject pattern to make the Adobe Express SDK available throughout the component tree without relying on global variables.

2. **Asynchronous SDK Loading**: The Add-on UI SDK is loaded asynchronously and initialized before the Vue app is mounted, ensuring that the SDK is ready for use when components need it.

3. **Simple Interactive UI**: A single button demonstrates reactive UI updates when clicked, displaying information about the loaded SDK.

4. **Component Structure**: Follows Vue.js best practices with a clean separation of concerns between template, logic, and styling using Single-File Components.

## Key Implementation Details

The application implements the following pattern:

1. **index.js**: Loads the SDK asynchronously using dynamic imports, makes it available via Vue's provide/inject system, and mounts the app.

2. **App.vue**: Injects the SDK and uses it to display details in response to user interaction.

## Overview

This project showcases:
- Vue.js integration with Adobe Express Add-ons
- Single-file component (SFC) architecture
- Proper SDK injection pattern using Vue's dependency injection
- Asynchronous SDK initialization
- Webpack build configuration for Vue.js
- ES modules with proper import/export syntax

## Technologies Used

- HTML
- CSS
- JavaScript
- Vue.js 3.x (Composition API)
- Adobe Express Add-on SDK
- Webpack 5
- ES Modules

## Features

- Reactive UI components with Vue.js
- Adobe Express Add-on SDK integration via dependency injection
- Button component that displays SDK information when clicked
- Fully commented code for beginners to understand Vue.js concepts

## Project Structure

- `src/`: Source code
  - `App.vue`: Main Vue component with detailed comments explaining Vue concepts
  - `index.js`: Entry point that loads the SDK and mounts the Vue app
  - `index.html`: HTML template with the Vue mounting point
  - `manifest.json`: Add-on manifest defining the add-on properties

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Adobe Express account

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Development

Start the development server:
```
npm run start
```

This will launch a development server and open the add-on in your browser.

### Building

Build the add-on for production:
```
npm run build
```

### Packaging

Create a distributable package:
```
npm run package
```

## Working with the Add-on

1. After starting the development server, the add-on will appear in your browser
2. Click the "Click me" button to see information about the Adobe Express Add-on SDK
3. The button text will change to "Clicked" and the SDK details will be logged to the console

## Learning from this Example

This project is heavily commented to help beginners understand:

1. **Vue.js Fundamentals**: Component structure, reactive data, event handling
2. **Composition API**: Using `ref`, `onMounted`, and `inject`
3. **SDK Integration**: Proper patterns for initializing and using the Adobe Express Add-on SDK
4. **ES Module Usage**: Modern JavaScript import/export syntax

## Customization

You can use this sample as a starting point for your own Adobe Express Add-ons with Vue.js:

1. Modify `App.vue` to create your own components and UI
2. Add additional Vue components as needed
3. Update the manifest.json to change your add-on's metadata 

## Troubleshooting

- If you encounter module resolution issues, check that "type": "module" is correctly set in package.json
- For webpack configuration issues, review webpack.config.js
- If the SDK isn't available in your components, ensure you're using the inject pattern correctly

## Resources

- [Adobe Express Add-ons Documentation](https://developer.adobe.com/express/add-ons/)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
- [Vue Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Webpack Documentation](https://webpack.js.org/concepts/)
