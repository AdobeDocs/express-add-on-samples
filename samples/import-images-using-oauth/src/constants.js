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

export const OAUTH_HASH_ALGORITHM = "SHA-256";

export const AUTHORIZATION_URL = "https://www.dropbox.com/oauth2/authorize";
export const TOKEN_URL = "https://api.dropboxapi.com/oauth2/token";
export const CLIENT_ID = "";
export const SCOPE = "files.metadata.read files.content.read";
export const LIST_FOLDER_API_URL = "https://api.dropboxapi.com/2/files/list_folder";
export const FILE_API_URL = "https://api.dropboxapi.com/2/files/get_temporary_link";
