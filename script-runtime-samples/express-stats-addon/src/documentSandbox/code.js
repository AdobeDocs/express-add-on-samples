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

import addOnSandboxSdk from "AddOnScriptSdk";
const { runtime } = addOnSandboxSdk.instance;

import { editor } from "express";
import { getNodeData } from "./utils";

async function start() {
  const panelUIProxy = await runtime.apiProxy("panel");

  runtime.exposeApi({
    async getDocumentData() {
      const doc = editor.documentRoot;
      let documentData = [];
      for (const page of doc.pages) {
        console.log("Page", page);
        let pageData = {};
        pageData.dimensions = {
          width: page.width,
          height: page.height,
        };
        pageData.nodes = getNodeData(page);
        documentData.push(pageData);
      }
      console.log("documentData", documentData);
      await panelUIProxy.createTable(documentData);
    },
  });

  panelUIProxy.toggleStatus("document");
}

start();
