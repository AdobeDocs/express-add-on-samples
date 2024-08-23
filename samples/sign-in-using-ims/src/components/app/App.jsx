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
import {
    CANNOT_GET_USER_FROM_LOCAL_ADD_ON,
    IS_ENV_PRODUCTION,
    OAUTH_AUTHORIZATION_STATE,
    OAUTH_CLIENT_ID,
    OAUTH_CODE_VERIFIER,
    OAUTH_REDIRECT_URI,
    OAUTH_TOKEN_URL,
    USER_PROFILE_API_URL,
} from "../../constants";
import { getSignInUrl, getWindowOptions } from "../../utils/index";
import "./App.css";

const App = ({ addOnUISdk }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userProfile, setUserProfile] = useState(undefined);

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
        window.addEventListener("message", async (event) => {
            if (window.location.origin === event.origin) {
                const { state, code } = event.data;

                // If the state from OAuth response does not match
                // with the state used for user sign in, exit.
                if (state !== OAUTH_AUTHORIZATION_STATE) {
                    console.error("OAuth state mismatch.");
                    return;
                }

                // ToDo: Check here for success/failure and set the below flag accordingly.
                setIsSignedIn(true);

                // [Bug] Adobe IMS does not allow registering domains with ports for getting `token`.
                // Therefore a request originating from `localhost:<any-custom-port>` gets a CORS error from `OAUTH_TOKEN_URL`.
                // However, for add-on domains of private links and published links, there are no ports in the URL (they use default ports).
                // So these domains can be registered with IMS and CORS error is not thrown by `OAUTH_TOKEN_URL`
                // for add-on private links and published add-ons.
                if (!IS_ENV_PRODUCTION) {
                    return;
                }

                // Exchange the `code` to get the `access_token` from IMS
                // by sending a POST request to `OAUTH_TOKEN_URL`.
                const tokenInfo = await exchangeCodeForToken(code);

                // Use this `access_token` to get user info.
                getUserProfile(tokenInfo);
            }
        });
    }

    async function exchangeCodeForToken(code) {
        const formData = new FormData();
        formData.append("client_id", OAUTH_CLIENT_ID);
        formData.append("grant_type", "authorization_code");
        formData.append("code", code);
        formData.append("redirect_uri", OAUTH_REDIRECT_URI);
        formData.append("code_verifier", OAUTH_CODE_VERIFIER);

        const options = {
            method: "POST",
            body: formData,
        };

        try {
            const response = await fetch(OAUTH_TOKEN_URL, options);
            const data = await response.json();
            if (!response.ok) {
                console.error("Failed to get the access_token", data);
                return;
            }

            const tokenInfo = {
                accessToken: data.access_token,
                refreshToken: data.refresh_token,
                // Keep a buffer of additional 60 seconds
                expiry: Date.now() + (data.expires_in - 60) * 1000,
            };

            // ToDo: Use client storage from `addOnUISdk` to set the token info.
            // So that the user need not log in again if the `access_token` has not expired
            // or a new `access_token` can be generated from the `refresh_token`.

            return tokenInfo;
        } catch (error) {
            console.error("Failed to send request to get user info", error);
            return undefined;
        }
    }

    async function getUserProfile(tokenInfo) {
        if (!tokenInfo || !tokenInfo.accessToken) {
            return;
        }

        const options = {
            method: "GET",
            headers: { Authorization: `Bearer ${tokenInfo.accessToken}` },
        };

        try {
            const response = await fetch(USER_PROFILE_API_URL, options);
            const data = await response.json();

            if (!response.ok) {
                console.error("Failed to get user info", data);
                return;
            }

            return setUserProfile(data);
        } catch (error) {
            console.error("Failed to send request to get user info", error);
        }
    }

    function greetUser() {
        if (!userProfile || !userProfile.email) {
            return <></>;
        }

        return (
            <div className="section center">
                Hi <b>{userProfile.email}</b> !!
            </div>
        );
    }

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <Button className="section" size="m" disabled={isSignedIn} onClick={handleSignIn}>
                    Sign In with Adobe
                </Button>

                <>{greetUser()}</>

                {!IS_ENV_PRODUCTION && isSignedIn ? (
                    <div className="section center">{CANNOT_GET_USER_FROM_LOCAL_ADD_ON}</div>
                ) : (
                    <></>
                )}
            </div>
        </Theme>
    );
};

export default App;
