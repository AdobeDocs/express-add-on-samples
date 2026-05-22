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
 * CORS middleware for the add-on-with-backend sample.
 *
 * Adobe Express add-ons run on a unique origin (e.g. https://localhost:5241 during
 * development, or https://<id>.wxp.adobe-addons.com when distributed). The browser
 * sends that origin on cross-origin requests — even when the request URL is an
 * ngrok/tunnel address. Your server must allow that origin, not the tunnel hostname.
 *
 * Mixed content (HTTPS add-on calling http://localhost) is fixed by using an HTTPS
 * tunnel URL in add-on/src/config.js — see the sample README.
 */

const DEFAULT_ORIGINS = ["https://localhost:5241", "https://new.express.adobe.com"];

const ADD_ON_SUBDOMAIN_PATTERN = /^https:\/\/[a-z0-9]+\.wxp\.adobe-addons\.com$/i;

function parseAllowedOrigins() {
    const fromEnv = process.env.CORS_ORIGINS;
    if (!fromEnv || fromEnv.trim() === "") {
        return [...DEFAULT_ORIGINS];
    }
    return fromEnv.split(",").map(origin => origin.trim()).filter(Boolean);
}

function isOriginAllowed(origin, allowedOrigins) {
    if (!origin) {
        return false;
    }
    if (allowedOrigins.includes(origin)) {
        return true;
    }
    return ADD_ON_SUBDOMAIN_PATTERN.test(origin);
}

/**
 * Apply CORS headers to a response when the request origin is allowed.
 */
function applyCorsHeaders(req, res, allowedOrigins) {
    const origin = req.headers.origin;

    if (!isOriginAllowed(origin, allowedOrigins)) {
        return false;
    }

    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    res.setHeader("Vary", "Origin");
    return true;
}

/**
 * Express middleware: handles preflight (OPTIONS) and sets CORS headers on all responses.
 */
function createCorsMiddleware() {
    const allowedOrigins = parseAllowedOrigins();

    return function corsMiddleware(req, res, next) {
        const allowed = applyCorsHeaders(req, res, allowedOrigins);

        if (req.method === "OPTIONS") {
            if (allowed) {
                return res.sendStatus(204);
            }
            return res.status(403).json({
                error: "CORS origin not allowed",
                code: "CORS_ORIGIN_BLOCKED",
                hint: "Add your add-on origin to CORS_ORIGINS in backend/.env"
            });
        }

        if (!allowed && req.headers.origin) {
            return res.status(403).json({
                error: "CORS origin not allowed",
                code: "CORS_ORIGIN_BLOCKED",
                origin: req.headers.origin
            });
        }

        next();
    };
}

module.exports = { createCorsMiddleware, parseAllowedOrigins, isOriginAllowed };
