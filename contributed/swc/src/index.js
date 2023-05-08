/* All add-ons should have these imports, so that you can support Spectrum appearance & typography */
import "@spectrum-web-components/styles/typography.css";

import "@spectrum-web-components/theme/src/themes.js";
import "@spectrum-web-components/theme/theme-dark.js";
import "@spectrum-web-components/theme/theme-light.js";
import '@spectrum-web-components/theme/express/theme-light.js';
import '@spectrum-web-components/theme/express/theme-dark.js';
import '@spectrum-web-components/theme/express/scale-medium.js';
import "@spectrum-web-components/theme/sp-theme.js";

/* Add-ons should import components that they use; if you don't import one, it won't render correctly */
import '@spectrum-web-components/button/sp-button.js';

import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/textfield/sp-textfield.js';

import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tab-panel.js';

/* Last but not least, add-ons should react to theme changes AND make their UI visible
   when this file is loaded. */
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

/**
 * Applies the specified theme to the first `sp-theme` element discovered in the
 * add-on's UI 
 * @param {string} theme     Theme to change to; the default is "light"
 */
function applyTheme(theme = "light") {
    document.querySelector("sp-theme").setAttribute("color", theme);
}

AddOnSdk.ready.then(async () => {

    // make the add-on's UI visible
    document.querySelector("sp-theme").style.opacity = "1";

    // set the initial theme and register for notifications
    applyTheme(AddOnSdk.app.ui.theme);
    AddOnSdk.app.on("themechange", (data) => { applyTheme(data.theme); });
});