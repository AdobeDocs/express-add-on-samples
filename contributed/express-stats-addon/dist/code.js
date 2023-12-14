import * as __WEBPACK_EXTERNAL_MODULE_add_on_sdk_document_sandbox_502f5cda__ from "add-on-sdk-document-sandbox";
import * as __WEBPACK_EXTERNAL_MODULE_express_document_sdk_a5d09708__ from "express-document-sdk";
/******/ var __webpack_modules__ = ({

/***/ "./src/documentSandbox/utils.js":
/*!**************************************!*\
  !*** ./src/documentSandbox/utils.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getNodeData: () => (/* binding */ getNodeData)
/* harmony export */ });
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

const increaseCount = (obj, type) => {
  // If the type is already in the object, increase its count, otherwise set it to 1
  if (obj.hasOwnProperty(type)) {
    obj[type] += 1;
  } else {
    obj[type] = 1;
  }
};
const getNodeData = (node, nodeData = {}) => {
  if (node.type === "MediaContainer") {
    return nodeData;
  }

  // Check if the current node has children and if they are not an empty array
  if (node.allChildren && node.allChildren.length > 0) {
    // Iterate over all children using for..of
    for (const child of node.allChildren) {
      // Increase the count for the current type
      increaseCount(nodeData, child.type);

      // Recursively call getNodeData for each child that has its own children
      // ... unless it's a MediaContainer
      if (child.type !== "MediaContainer" && child.allChildren && child.allChildren.length > 0) {
        getNodeData(child, nodeData);
      }
    }
  }
  return nodeData;
};


/***/ }),

/***/ "add-on-sdk-document-sandbox":
/*!**********************************************!*\
  !*** external "add-on-sdk-document-sandbox" ***!
  \**********************************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_add_on_sdk_document_sandbox_502f5cda__;

/***/ }),

/***/ "express-document-sdk":
/*!***************************************!*\
  !*** external "express-document-sdk" ***!
  \***************************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_express_document_sdk_a5d09708__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************!*\
  !*** ./src/documentSandbox/code.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var add_on_sdk_document_sandbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! add-on-sdk-document-sandbox */ "add-on-sdk-document-sandbox");
/* harmony import */ var express_document_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-document-sdk */ "express-document-sdk");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/documentSandbox/utils.js");
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

const {
  runtime
} = add_on_sdk_document_sandbox__WEBPACK_IMPORTED_MODULE_0__["default"].instance;


async function start() {
  const panelUIProxy = await runtime.apiProxy("panel");
  runtime.exposeApi({
    async getDocumentData() {
      const doc = express_document_sdk__WEBPACK_IMPORTED_MODULE_1__.editor.documentRoot;
      let documentData = [];
      for (const page of doc.pages) {
        console.log("Page", page);
        let pageData = {};
        pageData.dimensions = {
          width: page.width,
          height: page.height
        };
        pageData.nodes = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getNodeData)(page);
        documentData.push(pageData);
      }
      console.log("documentData", documentData);
      await panelUIProxy.createTable(documentData);
    }
  });
  panelUIProxy.toggleStatus("document");
}
start();
})();


//# sourceMappingURL=code.js.map