import { createApp } from 'vue'
import App from './App.vue'

// Create the app instance
const app = createApp(App)

/**
 * Load the Adobe Express Add-on SDK and initialize the Vue app
 * 
 * This function:
 * 1. Imports the Add-on SDK 
 * 2. Waits for the SDK to be ready
 * 3. Makes the SDK available to all components via provide/inject
 * 4. Mounts the Vue app to the DOM
 */
const loadSdk = async () => {
  // Dynamically import the SDK
  // Using dynamic import (import()) allows loading the module at runtime
  const sdkModule = await import('https://new.express.adobe.com/static/add-on-sdk/sdk.js')
  
  // Extract the default export which is the SDK itself
  const addOnUISdk = sdkModule.default
  
  // Wait for the SDK to be ready before proceeding
  // This ensures that all SDK features are available
  await addOnUISdk.ready
  
  // Use Vue's dependency injection system to make the SDK available to all components
  // This is preferred over global variables as it's more maintainable and testable
  app.provide('addOnUISdk', addOnUISdk)
  
  // Mount the Vue app to the DOM element with id 'app'
  // This connects our Vue app to the HTML <div id="app"></div> in index.html
  app.mount('#app')
}

// Initialize the app
loadSdk()
