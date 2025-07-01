import addOnSandboxSdk from "add-on-sdk-document-sandbox";

const { runtime } = addOnSandboxSdk.instance;

function start() {
  // APIs to be exposed to the UI runtime
  const sandboxApi = {
    sayHello: (message) => {
      console.log(`Hello ${message}, the sandbox is also running.`);
    },
  };

  runtime.exposeApi(sandboxApi);
}

start();
