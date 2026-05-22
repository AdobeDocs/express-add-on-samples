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

const { GoogleGenAI } = require("@google/genai");

const REWRITE_PROMPT =
    "Rewrite the following text for clarity and brevity. Return only the rewritten text, with no quotes or explanation.\n\n";

/**
 * Rewrite text using Google Gemini. Requires GEMINI_API_KEY in the environment.
 * @param {string} inputText - Text from the add-on panel.
 * @returns {Promise<string>} Rewritten text.
 */
async function rewriteText(inputText) {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

    if (!apiKey || apiKey.trim() === "" || apiKey === "your_key_here") {
        return null;
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
        const response = await ai.models.generateContent({
            model,
            contents: REWRITE_PROMPT + inputText
        });

        const text = response?.text;
        if (!text || typeof text !== "string") {
            throw new Error("Empty response from Gemini");
        }

        return text.trim();
    } catch (err) {
        const message = err?.message || "Gemini request failed";
        const error = new Error(message);
        error.statusCode = 502;
        throw error;
    }
}

/**
 * Dev fallback when no API key is configured (test UI + CORS without Gemini).
 * @param {string} inputText
 * @returns {string}
 */
function mockRewriteText(inputText) {
    return `[Mock rewrite — set GEMINI_API_KEY in backend/.env]\n\n${inputText}`;
}

module.exports = { rewriteText, mockRewriteText };
