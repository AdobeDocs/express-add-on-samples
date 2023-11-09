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

    async function handleRefresh(licenseKey) {
        await licenseUtils.updateLicenseInfo(licenseKey);
    }

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
        }
    }

    return (
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
    );
};

export default App;
