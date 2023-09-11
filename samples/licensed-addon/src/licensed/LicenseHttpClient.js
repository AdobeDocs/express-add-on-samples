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

/**
 * This class manages HTTP requests to the License APIs.
 */
export class LicenseHttpClient {
    /**
     * [POST] HTTP request.
     * @param url - API URL.
     * @param token - License token.
     * @param data - API payload.
     * @returns HTTP response.
     */
    async post(url, token, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `License ${token}`,
                "Content-Type": "application/vnd.api+json",
                Accept: "application/vnd.api+json"
            },
            body: JSON.stringify(data)
        });

        return response;
    }

    /**
     * [GET] HTTP request.
     * @param url - API URL.
     * @param token - License token.
     * @returns HTTP response.
     */
    async get(url, token) {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `License ${token}`,
                "Content-Type": "application/vnd.api+json",
                Accept: "application/vnd.api+json"
            }
        });

        return response;
    }
}
