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
      try {
        console.log("Sandbox: setItem called with option:", option);
        node = getNodeByOption(option);
        node.addOnData.setItem(key, value);
        console.log(`Sandbox: Successfully set metadata ${key} = ${value}`);
      } catch (error) {
        console.error("Sandbox: Error setting metadata:", error);
        throw error; // Re-throw to show error in UI
      }
    },
    removeItem: (key) => {
      try {
        node = getNodeByOption(option);
        const existingValue = node.addOnData.getItem(key);

        if (existingValue === undefined || existingValue === null) {
          console.log(`Sandbox: No metadata found to remove for key: ${key}`);
          return; // Don't throw error, just log it
        }

        node.addOnData.removeItem(key);
        console.log(`Sandbox: Successfully removed metadata for key: ${key}`);
      } catch (error) {
        console.error("Sandbox: Error removing metadata:", error);
        throw error; // Re-throw to show error in UI
      }
    },
    getAll: () => {
      try {
        node = getNodeByOption(option);
        let keys = node.addOnData.keys();
        let items = [];

        if (keys.length === 0) {
          console.log("Sandbox: No metadata found for current node");
          return [
            {
              key: "No metadata",
              value: "No metadata found for the current node",
            },
          ];
        }

        keys.forEach((key) => {
          // push the key and value to items
          items.push({ key: key, value: node.addOnData.getItem(key) });
        });
        return items;
      } catch (error) {
        console.error("Sandbox: Error getting all metadata:", error);
        return [{ key: "Error", value: error.message }];
      }
    },
    getItem: (key) => {
      try {
        node = getNodeByOption(option);
        const value = node.addOnData.getItem(key);

        if (value === undefined || value === null) {
          console.log(`Sandbox: No metadata found for key: ${key}`);
          return `No metadata found for key: ${key}`;
        }

        return value;
      } catch (error) {
        console.error("Sandbox: Error getting metadata:", error);
        return `Error: ${error.message}`;
      }
    },
    clearItems: () => {
      try {
        node = getNodeByOption(option);
        const keys = node.addOnData.keys();

        if (keys.length === 0) {
          console.log("Sandbox: No metadata to clear");
          return; // Don't throw error, just log it
        }

        node.addOnData.clear();
        console.log(
          `Sandbox: Successfully cleared ${keys.length} metadata items`
        );
      } catch (error) {
        console.error("Sandbox: Error clearing metadata:", error);
        throw error; // Re-throw to show error in UI
      }
    },

    remainingQuota: () => {
      try {
        node = getNodeByOption(option);
        return node.addOnData.remainingQuota;
      } catch (error) {
        console.error("Sandbox: Error getting remaining quota:", error);
        return { sizeInBytes: 0, numKeys: 0, error: error.message };
      }
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
