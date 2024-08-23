// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/scale-medium.js";
import "@spectrum-web-components/theme/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import React, { useEffect, useState } from "react";
import { getSignInUrl, getWindowOptions } from "../../utils/index";
import "./App.css";

const App = ({ addOnUISdk }) => {
    const [authorizationCode, setAuthorizationCode] = useState("");

    useEffect(() => {
        listenOnWindow();
    }, []);

    function handleSignIn() {
        const signInUrl = getSignInUrl();
        const signInWindow = window.open(signInUrl, "mozillaWindow", getWindowOptions({ width: 520, height: 520 }));
        if (!signInWindow) {
            // ToDo: Handle pop-up blocked.
            return;
        }
    }

    function listenOnWindow() {
        // Only possible with the allow-same-origin sandboxed iframe.
        window.addEventListener("message", (event) => {
            if (window.location.origin === event.origin) {
                const { state, code } = event.data;
                // ToDo: Check here for success/failure.
                // Also check whether the above `state` value matches
                // the `state` query parameter in the sign in URL.

                setAuthorizationCode(code);

                // Exchange the `code` to get the `access_token` from IMS
                // by sending a POST request to `OAUTH_TOKEN_URL`.
            }
        });
    }

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <Button size="m" onClick={handleSignIn}>
                    Sign In with Adobe
                </Button>
                {authorizationCode ? (
                    <>
                        <h4>Authorization Code:</h4>
                        {authorizationCode}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </Theme>
    );
};

export default App;
