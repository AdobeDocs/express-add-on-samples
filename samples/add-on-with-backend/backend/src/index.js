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

require("dotenv").config();

const express = require("express");
const { createCorsMiddleware } = require("./cors");
const rewriteRouter = require("./routes/rewrite");

const app = express();
const port = process.env.PORT || 3001;

app.use(createCorsMiddleware());
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.use("/api", rewriteRouter);

app.listen(port, () => {
    console.log(`[add-on-with-backend] API listening on http://localhost:${port}`);
    console.log(`[add-on-with-backend] Health check: http://localhost:${port}/health`);
});
