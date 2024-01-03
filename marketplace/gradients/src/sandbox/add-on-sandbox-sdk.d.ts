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

// DO NOT modify this file.

declare module "add-on-sdk-document-sandbox" {
    import { AddOnDocumentSandboxSdkTypes } from "@adobe/ccweb-add-on-sdk-types";
    export default AddOnDocumentSandboxSdkTypes.default;
    export * from "@adobe/ccweb-add-on-sdk-types/sandbox/add-on-sdk-document-sandbox";
}

declare module "express-document-sdk" {
    export * from "@adobe/ccweb-add-on-sdk-types/sandbox/express-document-sdk";
}
