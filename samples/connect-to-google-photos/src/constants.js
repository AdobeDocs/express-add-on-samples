/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

export const OAUTH_HASH_ALGORITHM = "SHA-256";

export const AUTHORIZATION_URL = "https://accounts.google.com/o/oauth2/auth";
export const TOKEN_URL = "https://oauth2.googleapis.com/token";
export const CLIENT_ID = "";
export const CLIENT_SECRET = "";
export const SCOPE = "https://www.googleapis.com/auth/photoslibrary.readonly";
export const ACCESS_TYPE = "offline";
export const PROMPT = "select_account consent";

export const LIST_MEDIA_ITEMS_API_URL = "https://photoslibrary.googleapis.com/v1/mediaItems";
export const DEFAULT_PAGE_SIZE = 25;
