/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { toString } from "mdast-util-to-string";

/**
 * Parse markdown content into an abstract syntax tree (AST)
 * @param {string} markdownContent - The markdown content to parse
 * @returns {object} The AST representing the markdown content
 */
export async function parseMarkdown(markdownContent) {
  try {
    // Create a unified processor with remark-parse
    const processor = unified().use(remarkParse);

    // Parse the markdown content into an AST
    const ast = processor.parse(markdownContent);

    // Run any transformations needed
    const result = await processor.run(ast);

    return result;
  } catch (error) {
    console.error("Error parsing markdown in markdown-parser.js:", error);
    throw error;
  }
}

/**
 * Clean a text string for better text flow
 * @param {string} text - The text to clean
 * @returns {string} The cleaned text
 */
function cleanText(text) {
  // Replace multiple consecutive spaces, tabs, and newlines with a single space
  return text.replace(/\s+/g, " ").trim();
}

/**
 * Get properly formatted text from the AST
 * @param {object} ast - The AST to extract text from
 * @returns {string} The formatted text
 */
export function getFormattedText(ast) {
  let text = "";

  // Process nodes to create proper paragraph breaks
  const processNode = (node) => {
    if (!node) return "";

    if (node.type === "root") {
      // Process each child node
      node.children.forEach((child, index) => {
        const childText = processNode(child);
        text += childText;

        // Add paragraph breaks between block elements
        if (
          index < node.children.length - 1 &&
          ["paragraph", "heading", "list"].includes(child.type)
        ) {
          text += "\n\n";
        }
      });
      return text;
    }

    // Handle specific node types
    switch (node.type) {
      case "paragraph":
        return cleanText(toString(node));

      case "heading":
        return cleanText(toString(node));

      case "list":
        let listText = "";
        node.children.forEach((item, index) => {
          // const marker = node.ordered ? `${index + 1}. ` : "• ";
          const itemText = cleanText(toString(item));
          // listText += marker + itemText;
          listText += itemText;
          if (index < node.children.length - 1) {
            listText += "\n";
          }
        });
        return listText;

      default:
        // For other node types, just return the text
        return cleanText(toString(node));
    }
  };

  return processNode(ast);
}

/**
 * Convert AST back to markdown string (for testing/debugging)
 * @param {object} ast - The AST to convert
 * @returns {string} The markdown string
 */
export async function astToMarkdown(ast) {
  try {
    const processor = unified().use(remarkStringify);

    const result = processor.stringify(ast);
    return result;
  } catch (error) {
    console.error("Error converting AST to markdown:", error);
    throw error;
  }
}

/**
 * Extract plain text from the AST
 * @param {object} ast - The AST to extract text from
 * @returns {string} The plain text content
 */
export function extractTextFromAst(ast) {
  return toString(ast);
}

/**
 * Process markdown by parsing to AST and transforming for Adobe Express
 * @param {string} markdownContent - The markdown content to process
 * @returns {object} An object with both the AST and helpful metadata
 */
export async function processMarkdown(markdownContent) {
  const ast = await parseMarkdown(markdownContent);

  // Extract all headings for potential TOC
  const headings = [];
  const processNode = (node) => {
    if (node.type === "heading") {
      headings.push({
        depth: node.depth,
        text: toString(node),
        children: node.children,
      });
    }

    if (node.children) {
      node.children.forEach(processNode);
    }
  };

  processNode(ast);

  // Get both formatted text (with proper paragraphs) and raw text
  const formattedText = getFormattedText(ast);

  return {
    ast,
    headings,
    plainText: formattedText,
    // plainText: extractTextFromAst(ast),
    formattedText,
  };
}
