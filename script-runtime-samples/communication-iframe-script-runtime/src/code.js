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
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
const { runtime } = addOnSandboxSdk.instance;

async function callUIApis() {
    // Get the proxy object, which is required
    // to call the APIs defined in the UI runtime code
    // i.e., in the `index.html` file of this add-on.
    const panelUIProxy = await runtime.apiProxy("panel");
    await panelUIProxy.performWorkOnUI({
        buttonTextFont: 20,
        buttonColor: "Green"
    }, true);

    const result = await panelUIProxy.getDataFromUI();
    console.log("Data from UI: " + result);
}

async function start() {
    // APIs to be exposed to the UI runtime
    const sandboxApi = {
        performWorkOnDocument: function (data, someFlag) {
            // call the Document APIs
        },
        getDataFromDocument: async function() {
            let resolver = undefined;
            const promise = new Promise(resolve => {
                resolver = resolve;
            });
            await callUIApis();
            setTimeout(() => {
                resolver("Page Title: XYZ");
            }, 100);
            return await promise;
        }
    }

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);
}

start();
