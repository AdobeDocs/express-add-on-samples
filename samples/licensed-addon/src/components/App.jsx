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

    async function handleRefresh(licenseKey) {
        await licenseUtils.updateLicenseInfo(licenseKey);
    }

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
        }
    }

    return (
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
    );
};

export default App;
