import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function start() {
  let option = "selected";
  let node;
  // APIs to be exposed to the UI runtime
  // i.e., to the `index.html` file of this add-on.
  const sandboxApi = {
    setItem: (key, value) => {
      console.log("Sandbox: setItem called with option:", option);
      node = getNodeByOption(option);
      node.addOnData.setItem(key, value);
    },
    removeItem: (key) => {
      node = getNodeByOption(option);
      node.addOnData.removeItem(key);
    },
    getAll: () => {
      node = getNodeByOption(option);
      let keys,
        items = [];
      keys = node.addOnData.keys();
      keys.forEach((key) => {
        // push the key and value to items
        items.push({ key: key, value: node.addOnData.getItem(key) });
      });
      return items;
    },
    getItem: (key) => {
      node = getNodeByOption(option);
      return node.addOnData.getItem(key);
    },
    clearItems: () => {
      node = getNodeByOption(option);
      node.addOnData.clear();
    },

    remainingQuota: () => {
      node = getNodeByOption(option);
      return node.addOnData.remainingQuota;
    },

    selectedOption: (selectedOption) => {
      option = selectedOption;
      console.log("Sandbox: Selected option updated to:", option);
    },
  };

  // Expose `sandboxApi` to the UI runtime.
  runtime.exposeApi(sandboxApi);
}

function getNodeByOption(option) {
  console.log("Sandbox: getNodeByOption called with option:", option);
  let node;
  if (option === "selected") {
    // Ensure there is exactly one node selected
    if (editor.context.selection.length === 1) {
      node = editor.context.selection[0];
    } else {
      throw new Error("Select exactly one node to perform this operation on.");
    }
  } else if (option === "currentPage") {
    node = editor.context.currentPage;
  } else if (option === "root") {
    node = editor.documentRoot;
  }
  console.log("Sandbox: getNodeByOption returning node:", node);
  return node;
}

start();
