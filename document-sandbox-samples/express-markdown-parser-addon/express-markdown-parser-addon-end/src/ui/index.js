import "@spectrum-web-components/styles/typography.css";

import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-light.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/sp-theme.js";

import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/link/sp-link.js";
import "@spectrum-web-components/illustrated-message/sp-illustrated-message.js";
import "@spectrum-web-components/dropzone/sp-dropzone.js";
import "@spectrum-web-components/progress-circle/sp-progress-circle.js";

import addOnUISdk from "https://express.adobe.com/static/add-on-sdk/sdk.js";
import setupFileHandler from "./file-handler.js";

addOnUISdk.ready.then(async () => {
  console.log("addOnUISdk is ready for use.");

  // Get the Authoring Sandbox
  const { runtime } = addOnUISdk.instance;
  const sandboxProxy = await runtime.apiProxy("documentSandbox");
  setupFileHandler(sandboxProxy);
});
