## About

This add-on project has been created with _@adobe/create-ccweb-add-on_. As an example, this add-on demonstrates how to use the Add-on SDK's OAuth API to allow users to connect to their Google account and fetch images from Google Photos.

> **Google Photos** does not allow requests originating from `localhost` to download its images. Therefore this add-on does not support imports in to Express. In order to download the images from Google Photos, you need to have a proxy service in between that can download the images from Google Photos and send them back to your add-on.

## Technology Used

-   HTML
-   JavaScript
-   CSS
-   React
-   Spectrum Web Components
-   Webpack

## Wiring Up

1. Go to the [Google API Console](https://console.cloud.google.com).
2. Create a new project or select an existing one.
3. Open **APIs and Services**, then navigate to **+ Enable APIs and Services** and enable **Photos Library API**.
4. Configure the **OAuth consent screen**.
5. Manually add this scope: `https://www.googleapis.com/auth/photoslibrary.readonly`
6. Add **Test users**.
7. **Create credentials** (Client ID and Client Secret).
8. In **Authorized redirect URIs**, add `https://new.express.adobe.com/static/oauth-redirect.html`
9. In `src/constants.js`, update the `CLIENT_ID` and `CLIENT_SECRET` values with the ones you obtained from the [Google API Console](https://console.cloud.google.com).

> **IMPORTANT NOTE:** Do not keep the `CLIENT_SECRET` in your add-on code. Please treat this add-on as an example and not a guideline on how you should build your own to integrate with the Google OAuth workflow. You may build the system to generate the `access_token` from the authorization `code` in the same proxy service. This service having access to your `CLIENT_SECRET` can generate the user's `access_token` on behalf of the add-on.

## Setup

1. To install the dependencies, run `npm install`.
2. To build the add-on, run `npm run build`.
3. To start the add-on, run `npm run start`.
4. To package the add-on for distribution or submission, run `npm run package`.
