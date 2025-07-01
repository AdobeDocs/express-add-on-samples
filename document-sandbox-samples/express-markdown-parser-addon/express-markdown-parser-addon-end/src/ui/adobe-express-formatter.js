import { getFormattedText, extractTextFromAst } from "./markdown-parser.js";

// Creates a mapping of text ranges and their styling commands for Adobe Express
function processNodeForStyling(ast, styleRanges) {
  let offset = 0;

  const traverse = (node) => {
    if (!node) return;

    const startOffset = offset;
    // Helper function to process styled nodes with common pattern
    const processStyledNode = (node, styleType, styleProps = {}) => {
      const rangeStart = offset;
      node.children.forEach(traverse);
      const rangeEnd = offset;

      styleRanges.push({
        start: rangeStart,
        end: rangeEnd,
        style: { type: styleType, ...styleProps },
      });
    };

    switch (node.type) {
      case "root":
        node.children.forEach((child, index) => {
          traverse(child);
          if (
            index < node.children.length - 1 &&
            ["paragraph", "heading", "list"].includes(child.type)
          ) {
            offset += 2; // \n\n between blocks
          }
        });
        break;

      case "paragraph":
        node.children.forEach(traverse);
        break;

      case "heading":
        processStyledNode(node, "heading", { level: node.depth });
        break;

      case "text":
        offset += node.value.length;
        break;

      case "emphasis":
        processStyledNode(node, "emphasis", { italic: true });
        break;

      case "strong":
        processStyledNode(node, "strong", { bold: true });
        break;

      // example AST traversal logic for lists:
      case "list":
        const listStart = offset;
        node.children.forEach((item, index) => {
          item.children.forEach(traverse);
          if (index < node.children.length - 1) offset += 1; // newline between items
        });

        styleRanges.push({
          start: listStart,
          end: offset,
          style: { type: "list", ordered: node.ordered },
        });
        break;

      case "inlineCode":
        offset += node.value.length;
        styleRanges.push({
          start: startOffset,
          end: offset,
          style: { type: "code", isInline: true },
        });
        break;

      default:
        if (node.children) node.children.forEach(traverse);
        break;
    }
  };
  traverse(ast);
}

// Create Adobe Express text styling instructions from a markdown AST
export function createExpressStylingFromAST(ast) {
  // Extract the full text from the AST
  const plainText = getFormattedText(ast);
  const styleRanges = [];

  // Process the AST to generate style ranges
  processNodeForStyling(ast, styleRanges, plainText);

  return { plainText, styleRanges };
}

// Helper function to print out style ranges for debugging
export function debugStyleRanges(text, styleRanges) {
  console.log("---- Style Ranges Debug ----");
  styleRanges.forEach((range, index) => {
    const snippet = text.substring(range.start, range.end);
    console.log(
      `Range ${index}: ${range.start}-${range.end} (${range.style.type})`
    );
    console.log(`Text: "${snippet}"`);
    console.log("Style:", range.style);
    console.log("-----");
  });
}

// Helper function to apply Adobe Express text styling
export async function applyExpressTextStyling(sandboxProxy, text, styleRanges) {
  try {
    // First create a text node with the plain text
    const textNode = await sandboxProxy.createTextNode(text);

    // Then apply styling to the text node
    for (const range of styleRanges) {
      switch (range.style.type) {
        case "heading":
          await sandboxProxy.applyHeadingStyle(
            textNode,
            range.start,
            range.end,
            range.style.level
          );
          break;

        case "emphasis":
          await sandboxProxy.applyTextStyle(textNode, range.start, range.end, {
            italic: true,
          });
          break;

        case "strong":
          await sandboxProxy.applyTextStyle(textNode, range.start, range.end, {
            bold: true,
          });
          break;

        case "link":
          await sandboxProxy.applyLinkStyle(
            textNode,
            range.start,
            range.end,
            range.style.url
          );
          break;

        // You can add cases for other styles here...
      }
    }
    return textNode;
  } catch (error) {
    console.error("Error applying Express text styling:", error);
    throw error;
  }
}
