import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

addOnUISdk.ready.then(async () => {
  console.log("addOnUISdk is ready for use.");

  // Get the UI runtime.
  const { runtime } = addOnUISdk.instance;

  // Get the proxy object, which is required
  // to call the APIs defined in the Document Sandbox runtime
  // i.e., in the `code.js` file of this add-on.
  const sandboxProxy = await runtime.apiProxy("documentSandbox");

  // Initialize UI elements and event listeners
  initializeUI(sandboxProxy);
});

async function initializeUI(sandboxProxy) {
  await setupOptionChange(sandboxProxy);
  setupAddButton(sandboxProxy);
  setupRemoveButton(sandboxProxy);
  setupGetAllButton(sandboxProxy);
  setupGetButton(sandboxProxy);
  setupClearButton(sandboxProxy);
  setupRemainingQuota(sandboxProxy);
}

// Helper function to show toast messages
function showToast(message, variant = "positive") {
  const toast = document.getElementById("notification-toast");
  toast.textContent = message;
  toast.variant = variant;
  toast.open = true;
}

async function setupOptionChange(sandboxProxy) {
  const nodeOptions = document.querySelectorAll('sp-radio[name="nodeOption"]');
  console.log("UI: Found radio buttons:", nodeOptions.length);

  // Set initial state - find the checked radio button
  const initialChecked = document.querySelector(
    'sp-radio[name="nodeOption"][checked]'
  );
  if (initialChecked) {
    console.log("UI: Setting initial option to:", initialChecked.value);
    try {
      await sandboxProxy.selectedOption(initialChecked.value);
    } catch (error) {
      console.error("UI: Error setting initial option:", error);
    }
  }

  nodeOptions.forEach((option) => {
    console.log("UI: Setting up event listener for option:", option.value);
    option.addEventListener("change", async (event) => {
      let selectedOption;

      // First try to get the value from the event target
      if (event.target && event.target.value) {
        selectedOption = event.target.value;
      } else {
        // Fallback: find the checked radio button
        const checkedRadio = document.querySelector(
          'sp-radio[name="nodeOption"][checked]'
        );
        if (checkedRadio) {
          selectedOption = checkedRadio.value;
        } else {
          // Last resort: check which radio button has the checked property
          const allRadios = document.querySelectorAll(
            'sp-radio[name="nodeOption"]'
          );
          for (const radio of allRadios) {
            if (radio.checked) {
              selectedOption = radio.value;
              break;
            }
          }
        }
      }

      if (selectedOption) {
        console.log("UI: Changing option to:", selectedOption);
        try {
          await sandboxProxy.selectedOption(selectedOption);
          console.log("UI: Option change completed");
        } catch (error) {
          console.error("UI: Error updating option:", error);
        }
      } else {
        console.error("UI: Could not determine selected option");
      }
    });
  });
}

function setupAddButton(sandboxProxy) {
  const addBtn = document.getElementById("add");
  addBtn.addEventListener("click", async (event) => {
    const key = document.getElementById("metadata-key");
    const value = document.getElementById("metadata-value");

    try {
      await sandboxProxy.setItem(key.value, value.value);

      // Show success toast
      showToast("Added metadata 🎉", "positive");
    } catch (error) {
      const text = document.getElementById("text");
      text.value = error;
      text.style.border = "2px solid red";
    }
  });
  addBtn.disabled = false;
}

function setupRemoveButton(sandboxProxy) {
  const removeBtn = document.getElementById("remove");
  removeBtn.addEventListener("click", async (event) => {
    const key = document.getElementById("metadata-key");

    await sandboxProxy.removeItem(key.value);

    // Clear inputs after removal
    const value = document.getElementById("metadata-value");
    const text = document.getElementById("text");
    key.value = "";
    value.value = "";
    text.value = "";
    text.style.border = "0px";

    // Show success toast
    showToast("Removed metadata", "info");
  });
  removeBtn.disabled = false;
}

function setupGetAllButton(sandboxProxy) {
  const getAllBtn = document.getElementById("getall");
  getAllBtn.addEventListener("click", async (event) => {
    const text = document.getElementById("text");

    const metadata = await sandboxProxy.getAll();
    let value = "";
    metadata.forEach((element) => {
      value += `${element.key}\t${element.value}\n`;
    });
    text.value = value;
  });
  getAllBtn.disabled = false;
}

function setupGetButton(sandboxProxy) {
  const getBtn = document.getElementById("get");
  getBtn.addEventListener("click", async (event) => {
    const key = document.getElementById("metadata-key");
    const value = await sandboxProxy.getItem(key.value);

    const text = document.getElementById("text");
    text.value = value;
  });
  getBtn.disabled = false;
}

function setupClearButton(sandboxProxy) {
  const clearBtn = document.getElementById("clear");
  clearBtn.addEventListener("click", async (event) => {
    await sandboxProxy.clearItems();

    // Clear inputs after metadata cleared
    const key = document.getElementById("metadata-key");
    const value = document.getElementById("metadata-value");
    const text = document.getElementById("text");
    key.value = "";
    value.value = "";
    text.value = "";
    text.style.border = "0px";

    // Show success toast
    showToast("Cleared all metadata", "info");
  });
  clearBtn.disabled = false;
}

function setupRemainingQuota(sandboxProxy) {
  const remainingQuotaBtn = document.getElementById("remainingQuota");
  remainingQuotaBtn.addEventListener("click", async (event) => {
    const remainingQuota = await sandboxProxy.remainingQuota();
    const text = document.getElementById("text");
    text.value = `Remaining quota\nsizeInBytes:${remainingQuota.sizeInBytes}\nnumKeys:${remainingQuota.numKeys}`;
  });
  remainingQuotaBtn.disabled = false;
}
