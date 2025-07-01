import { parseMarkdown } from "./markdown-parser.js"; // Already there
import { createExpressStylingFromAST } from "./adobe-express-formatter.js";

// Sets up file handling functionality for the markdown parser add-on
export default function setupFileHandler(sandboxProxy) {
  customElements.whenDefined("sp-dropzone").then(() => {
    const dropzone = document.getElementById("dropzone");
    const parseButton = document.getElementById("parseButton");
    const message = document.getElementById("message");
    const fileInput = document.getElementById("file-input");
    const progressCircle = document.getElementById("progress-circle");
    let input;
    let beingDraggedOver = false;
    let markdownContent = null;

    // Hide progress initially
    if (progressCircle) {
      progressCircle.style.display = "none";
    }

    const isMarkdownFile = (file) => {
      return (
        file.name.toLowerCase().endsWith(".md") || file.type === "text/markdown"
      );
    };

    const updateMessage = () => {
      message.heading =
        input !== undefined
          ? beingDraggedOver
            ? "Drop here to replace!"
            : "Got it!"
          : "Drag and drop your file";
    };

    const handleDropOrChange = (event) => {
      let file;

      // Handle different event sources
      if (event.type === "drop") {
        file = event.dataTransfer.files[0];
      } else if (event.type === "change") {
        file = event.target.files[0];
      } else if (event.detail && event.detail.dropEvent) {
        // Handle sp-dropzone-drop event
        file = event.detail.dropEvent.dataTransfer.files[0];
      }
      if (!file) {
        console.error("No file found in the event");
        return;
      }
      if (!isMarkdownFile(file)) {
        message.heading = "Please drop a markdown (.md) file";
        return;
      }

      // Set input to a temporary value to show "Got it!" immediately
      input = "loading";
      dropzone.setAttribute("filled", true);
      beingDraggedOver = false;
      updateMessage();

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        input = content;
        markdownContent = content;
        console.log("Markdown content:", content);
        // Enable parse button now that we have content
        parseButton.disabled = false;
        // Ensure message is updated after content is loaded
        updateMessage();
      };
      reader.readAsText(file);
    };

    // Function to parse markdown and insert styled text into the document
    const parseMarkdownAndInsert = async () => {
      if (!markdownContent) {
        console.error("No markdown content to parse");
        return;
      }

      try {
        progressCircle.style.display = "block";
        message.heading = "Processing markdown...";
        parseButton.disabled = true;

        // 1. Parse the markdown to get the AST
        const ast = await parseMarkdown(markdownContent);

        // 2. Create styling instructions from the AST
        const { plainText, styleRanges } = createExpressStylingFromAST(ast);

        // 3. Send the text and styles to the sandbox
        message.heading = "Adding text to document...";
        await sandboxProxy.createStyledTextFromMarkdown(plainText, styleRanges);

        message.heading = "Markdown successfully added!";
      } catch (error) {
        console.error("Error during parsing and styling:", error);
        message.heading = "An error occurred";
      } finally {
        progressCircle.style.display = "none";
        parseButton.disabled = false;
      }
    };

    // Event listeners
    dropzone.addEventListener("dragover", (event) => {
      event.preventDefault();
      beingDraggedOver = true;
      updateMessage();
    });
    dropzone.addEventListener("dragleave", () => {
      beingDraggedOver = false;
      updateMessage();
    });
    dropzone.addEventListener("drop", (event) => {
      event.preventDefault();
      handleDropOrChange(event);
    });
    // Also listen for the Spectrum Web Component's native event
    dropzone.addEventListener("sp-dropzone-drop", (event) => {
      event.preventDefault();
      handleDropOrChange(event);
    });
    fileInput.addEventListener("change", (event) => {
      handleDropOrChange(event);
    });

    // Parse button click handler
    parseButton.addEventListener("click", parseMarkdownAndInsert);
    // Initially disable parse button until we have content
    parseButton.disabled = true;
  });
}
