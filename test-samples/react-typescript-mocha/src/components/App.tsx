/** @jsx jsx */

/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { jsx } from "@emotion/react";
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import { useState } from "react";
import { container } from "./App.css";

import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const App = ({ addOnUISdk }: { addOnUISdk: AddOnSDKAPI }) => {
    const [buttonLabel, setButtonLabel] = useState("Get Theme");

    function getTheme() {
        setButtonLabel(`Theme: ${addOnUISdk.app.ui.theme.toUpperCase()}`);
    }

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div css={container}>
                <Button size="m" onClick={getTheme}>
                    {buttonLabel}
                </Button>
            </div>
        </Theme>
    );
};

export default App;
