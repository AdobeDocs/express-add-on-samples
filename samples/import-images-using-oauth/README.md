## About

This Add-on project has been created with _@adobe-ccwebext/create-ccweb-add-on_. As an example, this Add-on demonstrates how to use the Add-on SDK's OAuth API to allow its users to connect their Dropbox account.

Besides the OAuth API, this Add-On also makes use of the other Add-on SDK APIs, such as the:

-   Import API: To add images from the Add-on to the document.
-   Drag and Drop API: To support dragging and dropping images to the document.
-   Client Storage API: To store the `access_token` in the IndexedDB store of the browser and reusing the same for the requests made to the Dropbox APIs.

## Technology Used

-   HTML
-   JavaScript
-   CSS
-   React
-   React-Spectrum
-   Webpack

## Wiring Up

1. Go to the [Dropbox](https://www.dropbox.com/login) website and create/sign-in to your account.
2. Once signed in, go to [Dropbox App Console](https://www.dropbox.com/developers/apps) and click on the [Create](https://www.dropbox.com/developers/apps/create) app button.
3. Once redirected to the app creation page, under:
    1. **Choose an API**: Select _Scoped access_
    2. **Choose the type of access you need**: Select _Full Dropbox– Access to all files and folders in a user's Dropbox._
    3. **Name your app**: Provide a user-friendly name to your app.
4. After creating, go inside the app's **Settings** tab and do the following:
    1. Note the _App key_.
    2. Add the _Adobe Express OAuth Redirect URL_ (https://new.express.adobe.com/static/oauth-redirect.html) to _OAuth 2 Redirect URIs_.
5. Now go to the **Permissions** tab and select the following **Individual Scopes** check-boxes:
    1. files.metadata.read
    2. files.content.read
6. Congrats! You now have your Dropbox OAuth app all set up.
7. Now, let's wire up this Add-on to the Dropbox app. In order to do so, open the **src/constants.js** file in your editor.
8. And update **CLIENT_ID** variable with the _App key_ you had noted down, in step # 4.1.
9. And that's it! Hop on to **[Setup](#Setup)** to get your Add-on running.

## Setup

1. To install the dependencies, run `npm install`.
2. To build the Add-on, run `npm run build`.
3. To start the Add-on, run `npm run start`.
