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
import { AddOnSdkApi } from "AddOnSdkApi";
const { runtime } = AddOnSdkApi.instance;

async function callUIApis() {
    const uiApis = await runtime.apiProxy("panel");
    await uiApis.performWorkOnUI({
        buttonTextFont: 20,
        buttonColor: "Green"
    }, true);

    const result = await uiApis.getDataFromUI();
    console.log("Data from UI: " + result);
}

async function start() {
    const scriptApi = {
        performWorkOnDocument: function (data, someFlag) {
            // call content authoring APIs
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

    // expose the script apis 
    runtime.exposeApi(scriptApi);
}

start();
