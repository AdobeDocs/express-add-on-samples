/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { Button } from "@swc-react/button";
import React, { useContext, useEffect, useState } from "react";
import { AUTHORIZATION_URL, CLIENT_ID, SCOPE, TOKEN_URL } from "../constants";
import { isNullOrWhiteSpace } from "../extensions.js";
import { OAuthUtils } from "../utils/OAuthUtils.js";
import { AddOnSdkContext } from "./App";
import "./Connection.css";
import Loading from "./Loading";

/**
 * React component for user sign-in.
 */
const Connection = ({ accessToken, updateAccessToken }) => {
    const addOnSdk = useContext(AddOnSdkContext);
    const [oauthUtils, setOAuthUtils] = useState(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setOAuthUtils(new OAuthUtils(addOnSdk.instance.clientStorage));
    }, []);

    async function handleConnect() {
        if (!isNullOrWhiteSpace(accessToken)) {
            updateAccessToken("");
            return;
        }

        setLoading(true);

        // Generate the cryptographic challenge parameters
        // required in the OAuth 2.0 authorization workflow.
        const challenge = await oauthUtils.generateChallenge();

        // Trigger the OAuth 2.0 based authorization
        // which opens up a sign-in window for the user
        // and returns an authorization code
        // which can be used to obtain an access_token.
        const { id, code, redirectUri, result } = await addOnSdk.app.oauth.authorize({
            authorizationUrl: AUTHORIZATION_URL,
            clientId: CLIENT_ID,
            scope: SCOPE,
            codeChallenge: challenge.codeChallenge
        });

        const { status, description } = result;
        if (status !== "SUCCESS") {
            setLoading(false);
            console.error(`Failed to authorize. Status: ${status} | Description: ${description}`);
            return;
        }

        // Generate the access_token which can be used
        // to verify the identity of the user and
        // grant him/her access to the requested resource.
        await oauthUtils.generateAccessToken({
            id,
            clientId: CLIENT_ID,
            codeVerifier: challenge.codeVerifier,
            code,
            tokenUrl: TOKEN_URL,
            redirectUri
        });

        // Get the generated access_token.
        const newAccessToken = await oauthUtils.getAccessToken(id);
        updateAccessToken(newAccessToken);

        setLoading(false);
    }

    return (
        <>
            {loading ? (
                <Loading text="Connecting ..." />
            ) : isNullOrWhiteSpace(accessToken) ? (
                <div className="connection-container">
                    <h3>Import Images from Dropbox</h3>
                    <div style={{ marginBottom: "1.5em" }}>
                        Dropbox is a cloud storage service that lets you save files online and sync them to your
                        devices.
                    </div>
                    <Button size="m" onClick={handleConnect}>
                        Connect to Dropbox
                    </Button>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Connection;
