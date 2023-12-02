/**
 * Adds a new row to the specified table.
 *
 * @param {HTMLTableElement} table - The table to which the row should be added.
 * @param {Array} rowData - An array containing the data for each cell in the row.
 */
const addRowToTable = (table, rowData) => {
  // Create a new row
  const newRow = document.createElement("sp-table-row");

  // For each cell data, create a cell and append it to the row
  let cell;
  rowData.forEach((cellData) => {
    cell = document.createElement("sp-table-cell");
    cell.textContent = cellData;
    newRow.appendChild(cell);
  });
  if (rowData.length === 1) {
    // Making the page row bold
    cell.className = "page-row";
  }
  // Append the row to the table body
  table.appendChild(newRow);
};

const rebuildTable = (table, documentData) => {
  // Removing all existing rows from the table
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  // The pageData comes as an array of objects, one for each page
  // Each pageData object contains the dimensions of the page and the nodes, e.g.
  // [{ dimensions: { width: 600, height: 800 }, nodes: { Text: 1, Rectangle: 4 } }, { ... }]
  documentData.forEach((pageData, index) => {
    addRowToTable(table, [
      `Page ${index + 1} (${pageData.dimensions.width} x ${
        pageData.dimensions.height
      })`,
    ]);
    // the for...in loop iterates over the keys of an object
    for (const node in pageData.nodes) {
      // for example,      ["Text", 1]
      addRowToTable(table, [node, pageData.nodes[node]]);
    }
  });
};

export { rebuildTable };
