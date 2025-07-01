import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, fonts, constants } from "express-document-sdk";
import { MD_CONSTANTS } from "./constants.js";

const { runtime } = addOnSandboxSdk.instance;
const DEBUG_STYLES = MD_CONSTANTS.DEBUG;

// Returns the font size for a specific markdown heading level
function getFontSizeForHeadingLevel(level) {
  return (
    MD_CONSTANTS.HEADING_SIZES[level] || MD_CONSTANTS.HEADING_SIZES.DEFAULT
  );
}

// Initializes the document sandbox functionality
function start() {
  // Cache loaded fonts to avoid reloading them
  const fontCache = new Map();

  // Preloads and caches fonts by their postscript names
  async function preloadFonts(postscriptNames) {
    await Promise.all(
      postscriptNames.map(async (psName) => {
        const font = await fonts.fromPostscriptName(psName);
        if (font) {
          fontCache.set(psName, font);
        } else {
          console.warn(`Font ${psName} couldn't be loaded.`);
        }
      })
    );
  }

  // APIs to be exposed to the UI runtime
  const docApi = {
    // Creates a text node in the current document
    createTextNode: (text) => {
      try {
        // Find the current page
        let currentNode = editor.context.insertionParent;
        let page = null;
        while (currentNode) {
          if (currentNode.type === "Page") {
            page = currentNode;
            break;
          }
          currentNode = currentNode.parent;
        }

        // Create a new text node
        const textNode = editor.createText(text);
        console.log("textNode created", text);

        // Set the text content
        textNode.textAlignment = constants.TextAlignment.left;
        const artboard = page.artboards.first;
        console.log(
          "constants.TextLayout.autoHeight",
          constants.TextLayout.autoHeight
        );
        textNode.layout = {
          type: constants.TextLayout.autoHeight,
          width: artboard.width - MD_CONSTANTS.LAYOUT.MARGIN_WIDTH,
        };
        console.log("textNode layout", textNode.layout);

        // Position the text at the top-left corner and fill the page width
        textNode.setPositionInParent(
          { x: MD_CONSTANTS.LAYOUT.MARGIN, y: MD_CONSTANTS.LAYOUT.MARGIN },
          { x: 0, y: 0 }
        );

        console.log("textNode setPositionInParent");

        // Apply default character styles
        textNode.fullContent.applyCharacterStyles({
          fontSize: MD_CONSTANTS.LAYOUT.DEFAULT_FONT_SIZE,
        });
        console.log("textNode applyCharacterStyles");

        // Add to document
        artboard.children.append(textNode);
        console.log("textNode added to the artboard", textNode);
        return textNode;
      } catch (error) {
        console.error("Error creating text node:", error);
        throw error;
      }
    },

    // Creates a styled text node from markdown content
    createStyledTextFromMarkdown: async (markdownText, styleRanges) => {
      try {
        // Create text node first (this is allowed synchronously)
        const textNode = docApi.createTextNode(markdownText);

        // Preload fonts we'll need for styling
        await preloadFonts([
          MD_CONSTANTS.FONTS.HEADING,
          MD_CONSTANTS.FONTS.EMPHASIS,
          MD_CONSTANTS.FONTS.REGULAR,
          MD_CONSTANTS.FONTS.CODE,
        ]);

        // Get cached fonts
        const headingFont = fontCache.get(MD_CONSTANTS.FONTS.HEADING);
        const italicFont = fontCache.get(MD_CONSTANTS.FONTS.EMPHASIS);
        const boldFont = fontCache.get(MD_CONSTANTS.FONTS.STRONG);
        const monospaceFont = fontCache.get(MD_CONSTANTS.FONTS.CODE);

        // Now queue all style edits together for better performance
        await editor.queueAsyncEdit(async () => {
          for (const range of styleRanges) {
            if (DEBUG_STYLES) {
              console.log(`Applying ${range.style.type} style:`, range);
            }
            // Apply different styles based on the type
            if (range.style.type === "list") {
              docApi.applyListStyle(
                textNode,
                range.start,
                range.end,
                range.style.ordered
              );
            } else if (range.style.type === "heading") {
              if (DEBUG_STYLES) {
                console.log(
                  "Applying heading style for level:",
                  range.style.level
                );
              }
              // Apply heading styles
              textNode.fullContent.applyCharacterStyles(
                {
                  font: headingFont,
                  fontSize: getFontSizeForHeadingLevel(range.style.level),
                },
                { start: range.start, length: range.end - range.start }
              );
              if (DEBUG_STYLES) {
                console.log("Applied heading style:", range.style.level);
              }
            } else if (range.style.type === "emphasis") {
              if (DEBUG_STYLES) {
                console.log("Applying emphasis style");
              }
              // Apply italic style
              textNode.fullContent.applyCharacterStyles(
                { font: italicFont },
                { start: range.start, length: range.end - range.start }
              );
              if (DEBUG_STYLES) {
                console.log("Applied emphasis style");
              }
            } else if (range.style.type === "strong") {
              if (DEBUG_STYLES) {
                console.log("Applying strong style");
              }
              // Apply bold style
              textNode.fullContent.applyCharacterStyles(
                { font: boldFont },
                { start: range.start, length: range.end - range.start }
              );
              if (DEBUG_STYLES) {
                console.log("Applied strong style");
              }
            } else if (range.style.type === "code") {
              if (DEBUG_STYLES) {
                console.log("Applying code style");
              }
              // Apply monospace font for code
              textNode.fullContent.applyCharacterStyles(
                { font: monospaceFont },
                { start: range.start, length: range.end - range.start }
              );
              if (DEBUG_STYLES) {
                console.log("Applied code style");
              }
            }
            // Add any additional styles here...
          }
          console.log("All styles applied");
        });
      } catch (error) {
        console.error("Error creating styled text from markdown:", error);
        throw error;
      }
    },

    // Applies ordered or unordered list styles to a text range
    applyListStyle: (textNode, start, end, ordered) => {
      try {
        const listType = ordered
          ? constants.ParagraphListType.ordered
          : constants.ParagraphListType.unordered;

        textNode.fullContent.applyParagraphStyles(
          {
            list: {
              type: listType,
              numbering: ordered
                ? constants.OrderedListNumbering.numeric
                : undefined,
              prefix: ordered
                ? MD_CONSTANTS.LIST.ORDERED_PREFIX
                : MD_CONSTANTS.LIST.UNORDERED_PREFIX,
              postfix: ordered
                ? MD_CONSTANTS.LIST.ORDERED_POSTFIX
                : MD_CONSTANTS.LIST.UNORDERED_POSTFIX,
              indentLevel: MD_CONSTANTS.LIST.DEFAULT_INDENT,
            },
            spaceBefore: MD_CONSTANTS.LAYOUT.PARAGRAPH_SPACE_BEFORE,
            spaceAfter: MD_CONSTANTS.LAYOUT.PARAGRAPH_SPACE_AFTER,
            lineSpacing: MD_CONSTANTS.LAYOUT.LINE_SPACING,
          },
          { start, length: end - start }
        );
      } catch (error) {
        console.error("Error applying list style:", error);
        throw error;
      }
    },
  };
  runtime.exposeApi(docApi);
}
start();
