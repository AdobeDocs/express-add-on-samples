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

import { config } from "../config";
import { LicenseHttpClient } from "./LicenseHttpClient";
import { convertMilliseconds } from "./index";

/**
 * This class manages license related workflows.
 */
export class LicenseManager {
    _setUsageLimit;
    _setUsageRemaining;
    _setExpiryDuration;
    _setLicenseInfo;
    addOnSdk;
    _httpClient;

    constructor(setLicenseInfo, setUsageLimit, setUsageRemaining, setExpiryDuration, addOnSDKAPI) {
        this._setLicenseInfo = setLicenseInfo;
        this._setUsageLimit = setUsageLimit;
        this._setUsageRemaining = setUsageRemaining;
        this._setExpiryDuration = setExpiryDuration;
        this.addOnSdk = addOnSDKAPI;
        this._httpClient = new LicenseHttpClient();
    }

    /**
     * Opens payment popup with the configured payment link
     * @param userID - unique user identifier used as license key
     */
    async openLicensePaymentPopup(url, width, height, userID) {
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        const popup = window.open(url, "", `width=${width},height=${height},left=${left},top=${top}`);
        var intervalId = setInterval(() => {
            if (popup.closed) {
                clearInterval(intervalId);
                this.updateLicenseInfo(userID);
                console.log("Popup window closed.");
            }
        }, 500);
    }

    /**
     * Handles license purchase by opening a payment popup. Create license purchase payment link on stripe and add it in the config file.
     * @param userID - unique user identifier used as license key
     */
    async handlePurchase(userID) {
        if (!userID) {
            userID = await this.addOnSdk.app.currentUser.userId();
        }

        if (config.keygenAccount === "") {
            await this.addOnSdk.app.showModalDialog({
                variant: "information",
                title: "Add keygen account ID",
                description: "Add keygen account ID in the config file to proceed."
            });
            console.error("Add keygen account ID in the config file to proceed");
            return;
        }

        if (config.licenseCreationPaymentLink === "") {
            await this.addOnSdk.app.showModalDialog({
                variant: "information",
                title: "Add License Creation Payment Link",
                description: "Add License Creation Payment Link in the config file to proceed."
            });
            console.error("Add License Creation Payment Link in the config file to proceed");
            return;
        }

        this.openLicensePaymentPopup(
            `${config.licenseCreationPaymentLink}?client_reference_id=${userID}`,
            600,
            500,
            userID
        );
    }

    /**
     * Handles license usage reset by opening a payment popup. Create license uasge reset payment link on stripe and add it in the config file.
     * @param userID - unique user identifier used as license key
     */
    async handleReset(userID) {
        if (!userID) {
            userID = await this.addOnSdk.app.currentUser.userId();
        }

        if (config.keygenAccount === "") {
            await this.addOnSdk.app.showModalDialog({
                variant: "information",
                title: "Add keygen account ID",
                description: "Add keygen account ID in the config file to proceed."
            });
            console.error("Add keygen account ID in the config file to proceed");
            return;
        }

        if (config.usageResetPaymentLink === "") {
            await this.addOnSdk.app.showModalDialog({
                variant: "information",
                title: "Add Reset Usage Payment Link",
                description: "Add Reset Usage Payment Link in the config file to proceed."
            });
            console.error("Add Reset Usage Payment Link in the config file to proceed");
            return;
        }

        this.openLicensePaymentPopup(`${config.usageResetPaymentLink}?client_reference_id=${userID}`, 600, 500, userID);
    }

    /**
     * Handles license renewal when license duration expires by opening a payment popup. Create license renewal payment link on stripe and add it in the config file.
     * @param userID - unique user identifier used as license key
     */
    async handleRenew(userID) {
        if (!userID) {
            userID = await this.addOnSdk.app.currentUser.userId();
        }

        if (config.keygenAccount === "") {
            await this.addOnSdk.app.showModalDialog({
                variant: "information",
                title: "Add keygen account ID",
                description: "Add keygen account ID in the config file to proceed."
            });
            console.error("Add keygen account ID in the config file to proceed");
            return;
        }

        if (config.licenseRenewalPaymentLink === "") {
            await this.addOnSdk.app.showModalDialog({
                variant: "information",
                title: "Add Renew License Payment Link",
                description: "Add Renew License Payment Link in the config file to proceed."
            });
            console.error("Add Renew License Payment Link in the config file to proceed");
            return;
        }

        this.openLicensePaymentPopup(
            `${config.licenseRenewalPaymentLink}?client_reference_id=${userID}`,
            600,
            500,
            userID
        );
    }

    /**
     * Upates the license details related to add-on uasge, expiry and validity in the add-on UI.
     * @param license - The license key which is the userId
     */
    async updateLicenseInfo(license) {
        if (config.keygenAccount === "") {
            await this.addOnSdk.app.showModalDialog({
                variant: "information",
                title: "Add keygen account ID",
                description: "Add keygen account ID in the config file to proceed."
            });
            console.error("Add keygen account ID in the config file to proceed");
            return "config missing";
        }

        const getResponse = await this._httpClient.get(
            `https://api.keygen.sh/v1/accounts/${config.keygenAccount}/licenses/${license}`,
            license
        );

        let response;
        if (getResponse.ok) {
            response = await getResponse.json();
            const remaining = response.data.attributes.maxUses - response.data.attributes.uses;
            this._setLicenseInfo("License is valid.");
            this._setUsageRemaining(remaining);
            this._setUsageLimit(response.data.attributes.maxUses);
        } else {
            this._setLicenseInfo("License is not valid");
            this._setUsageLimit(0);
            this._setUsageRemaining(0);
            this._setExpiryDuration("Failed to get usage details.");

            return "invalid";
        }

        const now = new Date();
        const gmtTime = now.toISOString();
        const currentTime = new Date(gmtTime);

        const expiryDate = response.data.attributes.expiry;
        const expiry = new Date(expiryDate);
        const expiryDurationInMs = expiry.getTime() - currentTime.getTime();
        const expirytime = convertMilliseconds(expiryDurationInMs);

        if (expiryDurationInMs > 0) {
            this._setExpiryDuration(expirytime);
            return "valid";
        } else {
            this._setExpiryDuration("Expired");
            this._setLicenseInfo("License expired");
            this._setUsageRemaining();

            return "expired";
        }
    }

    /**
     * Updates the uasge count of the api.
     * @param license - license key
     */
    async updateUsage(license) {
        let returnVal = false;
        const reqData = {
            meta: {
                increment: 1
            }
        };

        try {
            const url = `https://api.keygen.sh/v1/accounts/${config.keygenAccount}/licenses/${license}/actions/increment-usage`;
            const postResponse = await this._httpClient.post(url, license, reqData);
            if (!postResponse.ok) {
                const err = await postResponse.json();
                if (err.errors[0].code === "USES_LIMIT_EXCEEDED") {
                    await this.addOnSdk.app.showModalDialog({
                        variant: "information",
                        title: "Usages limit exhausted",
                        description: "Purchage limit to use it."
                    });
                }
            } else {
                const rsp = await postResponse.json();
                const remaining = rsp.data.attributes.maxUses - rsp.data.attributes.uses;
                this._setUsageRemaining(remaining);
                returnVal = true;
            }
        } catch (error) {
            return false;
        }

        return returnVal;
    }
}
