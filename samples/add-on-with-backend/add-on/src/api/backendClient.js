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

import { API_BASE_URL } from "../config.js";

/**
 * Ask the backend to rewrite text using Gemini (API key stays on the server).
 * @param {string} text - User input from the panel.
 * @returns {Promise<string>} Rewritten text.
 */
export async function rewriteText(text) {
    const url = `${API_BASE_URL}/api/rewrite`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    let data;
    try {
        data = await response.json();
    } catch {
        data = {};
    }

    if (!response.ok) {
        const message = data.error || `Request failed (${response.status})`;
        throw new Error(message);
    }

    if (!data.rewrittenText) {
        throw new Error("Invalid response from backend");
    }

    return data.rewrittenText;
}
