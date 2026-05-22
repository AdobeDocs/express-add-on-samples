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

const express = require("express");
const { rewriteText, mockRewriteText } = require("../services/gemini");

const router = express.Router();

router.post("/rewrite", async (req, res) => {
    const text = req.body?.text;

    if (text === undefined || text === null) {
        return res.status(400).json({
            error: "Missing required field: text",
            code: "MISSING_TEXT"
        });
    }

    if (typeof text !== "string" || text.trim() === "") {
        return res.status(400).json({
            error: "text must be a non-empty string",
            code: "INVALID_TEXT"
        });
    }

    try {
        let rewrittenText = await rewriteText(text);

        if (rewrittenText === null) {
            console.warn(
                "[add-on-with-backend] GEMINI_API_KEY not set — returning mock rewrite. See backend/.env.example"
            );
            rewrittenText = mockRewriteText(text);
        }

        return res.json({ rewrittenText });
    } catch (err) {
        const status = err.statusCode || 502;
        return res.status(status).json({
            error: err.message || "Failed to rewrite text",
            code: "REWRITE_FAILED"
        });
    }
});

module.exports = router;
