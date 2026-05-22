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

import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import React, { useState } from "react";
import { rewriteText } from "../../api/backendClient.js";
import "./App.css";

const App = ({ sandboxProxy }) => {
    const [inputText, setInputText] = useState("");
    const [rewrittenText, setRewrittenText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleRewrite() {
        setError("");
        setRewrittenText("");
        setLoading(true);

        try {
            const result = await rewriteText(inputText);
            setRewrittenText(result);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to rewrite text");
        } finally {
            setLoading(false);
        }
    }

    async function handleAddToDesign() {
        if (!rewrittenText) {
            return;
        }
        setError("");
        try {
            await sandboxProxy.addTextToDocument(rewrittenText);
        } catch (err) {
            setError(err.message || "Failed to add text to the document");
        }
    }

    const canRewrite = inputText.trim().length > 0 && !loading;

    return (
        <Theme system="express" scale="medium" color="light">
            <div className="container">
                <p className="description">
                    Type text below, then rewrite it via your backend API. Set{" "}
                    <code>API_BASE_URL</code> in <code>config.js</code> to your HTTPS tunnel URL
                    (local dev) or deployed API (production).
                </p>

                <label className="label" htmlFor="input-text">
                    Your text
                </label>
                <textarea
                    id="input-text"
                    className="textarea"
                    rows={4}
                    placeholder="Enter text to rewrite..."
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                />

                <Button size="m" onClick={handleRewrite} disabled={!canRewrite}>
                    {loading ? "Rewriting..." : "Rewrite"}
                </Button>

                {error ? <p className="error">{error}</p> : null}

                {rewrittenText ? (
                    <div className="result">
                        <label className="label">Rewritten text</label>
                        <p className="result-text">{rewrittenText}</p>
                        <Button size="m" onClick={handleAddToDesign}>
                            Add to design
                        </Button>
                    </div>
                ) : null}
            </div>
        </Theme>
    );
};

export default App;
