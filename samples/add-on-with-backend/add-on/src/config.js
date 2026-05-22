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
 * Backend API base URL (must be HTTPS when developing locally).
 *
 * LOCAL DEV:
 *   The add-on runs at https://localhost:5241. Calling http://localhost:3001
 *   is blocked by the browser (mixed content). Forward your backend port to an
 *   HTTPS URL, then paste that URL here. See ../README.md#local-development-https-tunnel
 *
 * PRODUCTION:
 *   Deploy the backend to a cloud host with HTTPS and set that URL here.
 *
 * Do not add a trailing slash.
 */
export const API_BASE_URL = "https://YOUR_TUNNEL_OR_DEPLOYED_URL";
