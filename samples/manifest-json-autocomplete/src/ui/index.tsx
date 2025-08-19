import React from "react";
import { createRoot } from "react-dom/client";
import { DocumentSandboxApi } from "../models/DocumentSandboxApi";
import App from "./components/App";

import addOnUISdk, { RuntimeType } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
    console.log("addOnUISdk is ready for use.");

    // Get the UI runtime.
    const { runtime } = addOnUISdk.instance;

    // Get the proxy object, which is required
    // to call the APIs defined in the Document Sandbox runtime
    // i.e., in the `code.ts` file of this add-on.
    const sandboxProxy: DocumentSandboxApi = await runtime.apiProxy(RuntimeType.documentSandbox);

    const root = createRoot(document.getElementById("root"));
    root.render(<App addOnUISdk={addOnUISdk} sandboxProxy={sandboxProxy} />);
});
