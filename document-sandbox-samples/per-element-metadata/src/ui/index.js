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

function initializeUI(sandboxProxy) {
    resetFieldsOnClick();
	setupOptionChange(sandboxProxy);
    setupAddButton(sandboxProxy);
    setupRemoveButton(sandboxProxy);
    setupGetAllButton(sandboxProxy);
    setupGetButton(sandboxProxy);
    setupClearButton(sandboxProxy);
    setupRemainingQuota(sandboxProxy);
}

function resetFieldsOnClick() {
    // Clear text fields when button is clicked
    let buttons = document.querySelectorAll('button');
    const key = document.getElementById("key");
    const value = document.getElementById("value");
    const text = document.getElementById("text");

    for (const button of buttons) {
        button.addEventListener('click', function() {
            key.value = '';
            value.value = '';
            text.value = '';
            text.style.border = "0px";
        })
    }
}

function setupOptionChange(sandboxProxy) {
	const nodeOptions = document.querySelectorAll('input[name="nodeOption"]');

	nodeOptions.forEach(option => {
		option.addEventListener('change', async () => {
			const selectedOption = document.querySelector('input[name="nodeOption"]:checked').value;
			await sandboxProxy.selectedOption(selectedOption);
		});
	});
}

function setupAddButton(sandboxProxy) {
    const addBtn = document.getElementById("add");
    addBtn.addEventListener("click", async (event) => {
        const key = document.getElementById("key");
        const value = document.getElementById("value");

        try {
            await sandboxProxy.setItem(key.value, value.value);

            // Display success message for 2 seconds
            const addedToast = document.getElementById("addSuccess");
            addedToast.style.display = "block";
            setTimeout(function() {
                addedToast.style.display = "none";
            }, 2000);

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
        const key = document.getElementById("key");
        
        await sandboxProxy.removeItem(key.value);

        // Display success message for 2 seconds
        const removedToast = document.getElementById("removeSuccess");
        removedToast.style.display = "block";
        setTimeout(function() {
            removedToast.style.display = "none";
        }, 2000);
    });
    removeBtn.disabled = false;
}

function setupGetAllButton(sandboxProxy) {
    const getAllBtn = document.getElementById("getall");
    getAllBtn.addEventListener("click", async (event) => {
        const text = document.getElementById("text");
        text.rows = 1;

        const metadata = await sandboxProxy.getAll();
        let value = "";
        metadata.forEach((element) => {
            value += `${element.key}\t${element.value}\n`;
        });
        text.rows = metadata.length;
        text.value = value;
    });
    getAllBtn.disabled = false;
}

function setupGetButton(sandboxProxy) {
    const getBtn = document.getElementById("get");
    getBtn.addEventListener("click", async (event) => {
        const key = document.getElementById("key");
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
    });
    clearBtn.disabled = false;
}

function setupRemainingQuota(sandboxProxy) {
    const remainingQuotaBtn = document.getElementById("remainingQuota");
    remainingQuotaBtn.addEventListener("click", async (event) => {
        const remainingQuota = await sandboxProxy.remainingQuota();
        text.value = `Remaining quota\nsizeInBytes:${remainingQuota.sizeInBytes}\nnumKeys:${remainingQuota.numKeys}`;
    });
    remainingQuotaBtn.disabled = false;
}
