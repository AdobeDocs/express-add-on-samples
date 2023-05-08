import AddOnSdk, {
    ClientStorage
    // @ts-ignore Import module
} from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

let todoList: HTMLUListElement;
let todoItemInput: HTMLInputElement;
let clearAllButton: HTMLButtonElement;

let store: ClientStorage;

// Wait for the SDK to be ready before rendering elements in the DOM.
AddOnSdk.ready.then(async () => {
    store = AddOnSdk.instance.clientStorage;

    // Create elements in the DOM.
    todoItemInput = document.createElement("input");
    todoItemInput.setAttribute("type", "text");
    todoItemInput.maxLength = 50;
    todoItemInput.placeholder = "ToDo Item";
    todoItemInput.focus();
    todoItemInput.addEventListener("keypress", handleAdd);

    todoList = document.createElement("ul");

    clearAllButton = document.createElement("button");
    clearAllButton.innerHTML = "Clear All";
    clearAllButton.addEventListener("click", clearAllItems);

    document.body.appendChild(todoItemInput);
    document.body.appendChild(clearAllButton);
    document.body.appendChild(todoList);

    // Get all previously saved items.
    await displayAllItems();
});

/**
 * Handle add of a new ToDo item.
 */
async function handleAdd(event: KeyboardEvent) {
    // Assign 'Enter' key press = 'Click'.
    if (event.key === "Enter") {
        event.preventDefault();

        const item = todoItemInput.value.trim();
        if (item.length === 0) {
            return;
        }

        await setItem(item, false);
        addItemToList(item, false);
    }
}

/**
 * Set item on the ToDo list.
 */
async function setItem(item: string, isComplete: boolean) {
    await store.setItem(item, isComplete);
    todoItemInput.value = "";
}

/**
 * Add a new ToDo item to the list.
 */
function addItemToList(item: string, isComplete: boolean) {
    const todoCheckbox = document.createElement("input");
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.name = item;
    todoCheckbox.checked = isComplete;
    todoCheckbox.addEventListener("click", handleChange);

    const todoItem = document.createElement("li");
    todoItem.append(todoCheckbox);
    todoItem.append(item);
    todoList.appendChild(todoItem);
}

/**
 * Handle change in the completion status of a ToDo item.
 */
async function handleChange(event: InputEvent) {
    const todoItem = event.target as HTMLInputElement;
    const isComplete = todoItem!.checked;
    await store.setItem(todoItem!.name, isComplete);
}

/**
 * Display the Todo List items.
 */
async function displayAllItems() {
    const todoItems = await store.keys();
    todoItems.forEach(async (item: string) => {
        const isComplete = await store.getItem(item);
        addItemToList(item, isComplete);
    });
}

/**
 * Clear all items from the ToDo list.
 */
async function clearAllItems() {
    const todoItems = await store.keys();
    todoItems.forEach(async (item: string) => {
        await store.removeItem(item);
    });

    todoList.innerHTML = "";
}
