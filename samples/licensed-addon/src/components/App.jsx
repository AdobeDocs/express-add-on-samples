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

<<<<<<< HEAD
import { Button } from "@swc-react/button";
import { FieldLabel } from "@swc-react/field-label";
import { Theme } from "@swc-react/theme";
import React, { useEffect, useState } from "react";
import { LicenseManager } from "../licensed/LicenseManager";
import { PaidApi } from "../licensed/PaidApi";
import "./App.css";

const App = ({ addOnSdk }) => {
    const [userId, setUserId] = useState("");

    const [licenseInfo, setLicenseInfo] = useState("Not available.");
    const [usageLimit, setUsageLimit] = useState(0);
    const [usageRemaining, setUsageRemaining] = useState(0);
    const [expiryDuration, setExpiryDuration] = useState("0 days");

    const [apiResult, setApiResult] = useState("Click above to be surprised!!");

    const licenseUtils = new LicenseManager(
        setLicenseInfo,
        setUsageLimit,
        setUsageRemaining,
        setExpiryDuration,
        addOnSdk
    );

    useEffect(() => {
        const fetchUserId = async () => {
            setUserId(await addOnSdk.app.currentUser.userId());
        };

        fetchUserId();
    }, [userId]);
=======
import { LicenseUtils } from "../utils/LicenseUtils";
import React, { useEffect, useState } from "react";
import { Button, Text, lightTheme, Provider } from "@adobe/react-spectrum";
const App = ({ AddOnSDKAPI }) => {
    let userID = undefined;

    const [licenseInfo, setLicenseInfo] = useState();
    const [usageLimit, setUsageLimit] = useState();
    const [currentUsage, setCurrentUsage] = useState();
    const [expiryDuration, setExpiryDuration] = useState();
    const licenseUtils = new LicenseUtils(
        setLicenseInfo,
        setUsageLimit,
        setCurrentUsage,
        setExpiryDuration,
        AddOnSDKAPI
    );

    const [apiResult, setApiResult] = useState();

    useEffect(async () => {
        const fetchUserId = async () => {
            userID = await AddOnSDKAPI.app.currentUser.userId();
        };
        fetchUserId();
    }, []);
>>>>>>> eaed1fedccbeab0a22cea0cb65eb918189c3e527

    async function handleRefresh(licenseKey) {
        await licenseUtils.updateLicenseInfo(licenseKey);
    }

<<<<<<< HEAD
    async function validateLicenseAndInvokePaidApi() {
        let currentUserId = userId;
        if (!currentUserId) {
            currentUserId = await addOnSdk.app.currentUser.userId();
            setUserId(currentUserId);
        }

        const status = await licenseUtils.updateLicenseInfo(currentUserId);
        switch (status) {
            case "config missing": {
                console.error("Failed to update license information.", status);
                return;
            }
            case "expired": {
                await addOnSdk.app.showModalDialog({
                    variant: "information",
                    title: "License expired",
                    description: "Renew license to use it as the license has expired."
                });

                return;
            }
            case "invalid": {
                await addOnSdk.app.showModalDialog({
                    variant: "information",
                    title: "License invalid",
                    description: "Purchase license to use this paid add-on."
                });

                return;
            }
            default: {
                // License is valid.
                break;
            }
        }

        if (await licenseUtils.updateUsage(currentUserId)) {
            await licenseUtils.updateLicenseInfo(currentUserId);

            // Invoke your paid API from here.
            // For demonstration, we are calling "https://www.greetingsapi.com/random"
            // to greet the user in a randomly chosen language.
            const greeting = await PaidApi.greet();
            setApiResult(greeting);
=======
    async function validateLicense() {
        if (!userID) {
            userID = await AddOnSDKAPI.app.currentUser.userId();
        }
        const status = await licenseUtils.updateLicenseInfo(userID);
        if ("config missing" === status) {
            return;
        }
        if ("expired" === status) {
            await AddOnSDKAPI.app.showModalDialog({
                variant: "information",
                title: "License expired",
                description: "Renew license to use it as the license has expired."
            });
            return;
        }
        if ("invalid" === status) {
            await AddOnSDKAPI.app.showModalDialog({
                variant: "information",
                title: "License invalid",
                description: "Purchase license to use this paid add-on."
            });
            return;
        }
        if (await licenseUtils.updateUsage(userID)) {
            await licenseUtils.updateLicenseInfo(userID);
            // Here call to the paid addon sdk api can be made
            setApiResult(Math.random());
>>>>>>> eaed1fedccbeab0a22cea0cb65eb918189c3e527
        }
    }

    return (
<<<<<<< HEAD
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <h3>Paid API</h3>
                <Button size="m" style={{ marginBottom: "16px" }} onClick={() => validateLicenseAndInvokePaidApi()}>
                    Surprise me!
                </Button>
                <div className="surprise">{apiResult}</div>

                <h3>Usage</h3>
                <FieldLabel>
                    <label>Limit</label>
                    {usageLimit}
                </FieldLabel>
                <FieldLabel>
                    <label>Remaining</label>
                    {usageRemaining}
                </FieldLabel>

                <h3>License</h3>
                <FieldLabel>
                    <label>Details</label>
                    {licenseInfo}
                </FieldLabel>
                <FieldLabel>
                    <label>Expires in</label>
                    {expiryDuration}
                </FieldLabel>

                <div className="license-button-group">
                    <Button size="m" style={{ margin: "8px", width: "40%" }} onClick={() => handleRefresh(userId)}>
                        Refresh
                    </Button>
                    <Button
                        size="m"
                        style={{ margin: "8px", width: "40%" }}
                        onClick={() => licenseUtils.handlePurchase(userId)}
                    >
                        Purchase
                    </Button>
                    <Button
                        size="m"
                        style={{ margin: "8px", width: "40%" }}
                        onClick={() => licenseUtils.handleReset(userId)}
                    >
                        Reset
                    </Button>
                    <Button
                        size="m"
                        style={{ margin: "8px", width: "40%" }}
                        onClick={() => licenseUtils.handleRenew(userId)}
                    >
                        Renew
                    </Button>
                </div>
            </div>
        </Theme>
=======
        <Provider theme={lightTheme} colorScheme="light">
            <div>
                <label>License Info: {licenseInfo}</label>
                <br></br>
                <label>Usage limit: {usageLimit}</label>
                <br></br>
                <label>Usage remaining: {currentUsage}</label>
            </div>
            <div>
                <Button
                    variant="primary"
                    isDisabled={false}
                    style="fill"
                    position="sticky"
                    onPress={() => handleRefresh(userID)}
                >
                    <Text>Refresh Quota</Text>
                </Button>
            </div>
            <div>
                <Button
                    variant="primary"
                    isDisabled={false}
                    style="fill"
                    position="relative"
                    margin={5}
                    onPress={() => licenseUtils.handlePurchase(userID)}
                >
                    <Text>Purchase License</Text>
                </Button>
                <Button
                    variant="primary"
                    isDisabled={false}
                    style="fill"
                    position="relative"
                    margin={5}
                    onPress={() => licenseUtils.handleReset(userID)}
                >
                    <Text>Reset Usage</Text>
                </Button>
                <Button
                    variant="primary"
                    isDisabled={false}
                    style="fill"
                    position="relative"
                    margin={5}
                    onPress={() => licenseUtils.handleRenew(userID)}
                >
                    <Text>Renew License</Text>
                </Button>
            </div>
            <div id="main">Expiring in : {expiryDuration}</div>
            <br></br>
            <Button
                variant="primary"
                isDisabled={false}
                style="fill"
                position="sticky"
                onPress={() => validateLicense()}
            >
                <Text>Surprise me</Text>
            </Button>
            <br></br>
            <label>Api result : {apiResult}</label>
        </Provider>
>>>>>>> eaed1fedccbeab0a22cea0cb65eb918189c3e527
    );
};

export default App;
