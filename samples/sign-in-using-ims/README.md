## About

> **_NOTE:_** This sample is a work in progress. Check for the `ToDo` sections and do not use them as a guideline.

This project has been created with _@adobe/create-ccweb-add-on_. As an example, this Add-on demonstrates how authorize users through Adobe IMS. This add-on implements its own OAuth 2.0 PKCE workflow and does not use the `authorize()` API in `AddOnSdk`.

## Tools

-   HTML
-   CSS
-   React
-   JavaScript

## Wiring Up

### Development

1. Go to [Adobe Developer Console](https://developer.adobe.com/console) and sign in using your Adobe account.
2. Under **Quick start**, click on _Create new project_.
3. A new Project will be created and a unique name will be assigned to it. You may click on _Edit project_ and give it a friendly _Project Title_ and _Save_.
4. Under the **Get started with your new project** section, click on _Add API_ and choose _Adobe Stock_ and click _Next_. You may choose a different API too based on your need.
5. Choose _Single Page App_ and click _Next_.
6. Provide _Default redirect URI_ as:
    ```
    https://new.express.adobe.com/static/oauth-redirect.html
    ```
    IMS does not allow a `localhost` path in the _Default redirect URI_, hence we are providing the above path.
7. Provide _Redirect URI pattern_ as:
    ```
    https://new\\.express\\.adobe\\.com/static/oauth-redirect\\.html,https://localhost:5241/sign-in-using-ims/authorized\\.html
    ```
    This is a comma separated list of URI patterns where a `.` is escaped as `\\.`
8. Click _Next_ and ensure atleast the `openid` and `email` scopes are listed - as we will be using these 2 scopes in this add-on.
9. Click on _Save configured API_ and an `API Key (Client ID)` will be generated.
10. Copy this `Client ID` and set the `OAUTH_CLIENT_ID` with it, in `src/constants.js` file.

### Production

To be added ...

### Add Beta users

In the left side menu, click on _Beta users_ and add your email address and click on _Save list_. Note that you will only be able to use this email address for signing in from the add-on.

## Run the Add-on

After wiring up the add-on with the Adobe IMS app, run the following commands:

1. To install the dependencies: `npm install`.
2. To build the add-on: `npm run build`.
3. To start the add-on: `npm run start`.
