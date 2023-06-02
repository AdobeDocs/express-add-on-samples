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
import { Button, Flex, Heading, Text } from "@adobe/react-spectrum";
import LockClosed from "@spectrum-icons/workflow/LockClosed";
import React, { useContext, useState } from "react";
import { AUTHORIZATION_URL, CLIENT_ID, SCOPE, TOKEN_URL } from "../constants";
import { isNullOrWhiteSpace } from "../extensions.js";
import logo from "../logo.png";
import { OAuthUtils } from "../utils/OAuthUtils.js";
import { AddOnSdkContext } from "./App";
import Loading from "./Loading";

const Connection = ({ accessToken, updateAccessToken }) => {
    const addOnSdk = useContext(AddOnSdkContext);
    const [loading, setLoading] = useState(false);

    async function handleConnect() {
        if (!isNullOrWhiteSpace(accessToken)) {
            updateAccessToken("");
            return;
        }

        setLoading(true);

        const oauthUtils = new OAuthUtils();
        const challenge = await oauthUtils.generateChallenge();

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

        await oauthUtils.generateAccessToken({
            id,
            clientId: CLIENT_ID,
            codeVerifier: challenge.codeVerifier,
            code,
            tokenUrl: TOKEN_URL,
            redirectUri
        });

        const newAccessToken = await oauthUtils.getAccessToken(id);
        updateAccessToken(newAccessToken);
        setLoading(false);
    }

    return (
        <>
            {loading ? (
                <Loading text="Connecting ..." />
            ) : isNullOrWhiteSpace(accessToken) ? (
                <Flex
                    direction="row"
                    height="size-5000"
                    gap="size-100"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Flex
                        direction="column"
                        width="size-3000"
                        gap="size-100"
                        alignItems="center"
                        wrap
                    >
                        <Heading level={4} margin={0} wrap>
                            Get started by connecting your account.
                        </Heading>
                        <img src={logo} width={100} height={100} alt="Dropbox" />
                        <Text>
                            Dropbox is a cloud storage service that lets you save files online and
                            sync them to your devices.
                        </Text>
                        <Button
                            variant="primary"
                            isDisabled={loading}
                            onPress={async () => await handleConnect()}
                            style="fill"
                        >
                            <LockClosed aria-label="Connect" size="S" />
                            <Text>Connect</Text>
                        </Button>
                    </Flex>
                </Flex>
            ) : (
                <></>
            )}
        </>
    );
};

export default Connection;
