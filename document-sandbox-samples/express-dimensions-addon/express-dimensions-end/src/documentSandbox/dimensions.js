/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import addOnSandboxSdk from "add-on-sdk-document-sandbox";
const { runtime } = addOnSandboxSdk.instance;
const panelUIProxy = await runtime.apiProxy("panel");

import { editor, constants } from "express-document-sdk";

const createDimensionLine = ({
  width,
  height,
  translation,
  orientation,
  margin,
}) => {
  const isVertical = orientation === "vertical";

  // Adjust line start and end points based on orientation and margin
  const lineStart = isVertical
    ? { x: translation.x - margin, y: translation.y }
    : { x: translation.x, y: translation.y - margin };
  const lineEnd = isVertical
    ? { x: translation.x - margin, y: translation.y + height }
    : { x: translation.x + width, y: translation.y - margin };

  const textValue = isVertical ? height : width;
  const textPos = isVertical
    ? { x: translation.x - margin - 10, y: translation.y + height / 2 }
    : { x: translation.x + width / 2, y: translation.y - margin - 10 };

  const line = editor.createLine();
  line.setEndPoints(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);
  line.startArrowHeadType = line.endArrowHeadType =
    constants.ArrowHeadType.openTriangular;
  editor.context.insertionParent.children.append(line);

  const text = editor.createText();
  text.text = `${Math.trunc(textValue).toString()}px`;
  editor.context.insertionParent.children.append(text);
  text.translation = textPos;

  if (isVertical) {
    text.setRotationInParent(-90, { x: 0, y: 0 });
  }

  const group = editor.createGroup();
  editor.context.insertionParent.children.append(group);
  group.children.append(line, text);

  // Create and append extra lines at the extremities
  for (let i = 0; i < 2; i++) {
    const extraLine = editor.createLine();
    const extraLineStart = isVertical
      ? {
          x: translation.x,
          y: i === 0 ? translation.y : translation.y + height,
        }
      : {
          x: i === 0 ? translation.x : translation.x + width,
          y: translation.y,
        };
    const extraLineEnd = isVertical
      ? {
          x: translation.x - margin - 10,
          y: i === 0 ? translation.y : translation.y + height,
        }
      : {
          x: i === 0 ? translation.x : translation.x + width,
          y: translation.y - margin - 10,
        };

    extraLine.setEndPoints(
      extraLineStart.x,
      extraLineStart.y,
      extraLineEnd.x,
      extraLineEnd.y
    );
    extraLine.stroke = editor.makeStroke({
      color: { red: 1, green: 0, blue: 0, alpha: 1 },
      dashPattern: [4, 2],
      width: 0.5,
    });
    group.children.append(extraLine);
    // editor.context.insertionParent.children.append(extraLine);
  }

  return group;
};

const drawDimensions = () => {
  if (
    editor.context.hasSelection &&
    editor.context.selection[0].type === constants.SceneNodeType.mediaContainer
  ) {
    const selectedNode = editor.context.selection[0];
    console.log(selectedNode);
    const { translation: nodeTranslation } = selectedNode;
    const { width: nodeWidth, height: nodeHeight } =
      selectedNode.mediaRectangle;

    const hLine = editor.createLine();
    hLine.setEndPoints(
      nodeTranslation.x,
      nodeTranslation.y - 20,
      nodeTranslation.x + nodeWidth,
      nodeTranslation.y - 20
    );

    // translation is relative to the parent!!
    editor.context.insertionParent.children.append(hLine);
    hLine.startArrowHeadType = hLine.endArrowHeadType =
      constants.ArrowHeadType.openTriangular;

    const hText = editor.createText();
    hText.text = `${Math.trunc(nodeWidth).toString()}px`;
    editor.context.insertionParent.children.append(hText);

    hText.translation = {
      x: nodeTranslation.x + nodeWidth / 2,
      y: nodeTranslation.y - 30,
    };

    const hGroup = editor.createGroup();
    editor.context.insertionParent.children.append(hGroup);
    hGroup.children.append(hLine, hText);

    // Same for the vertical line
    const vLine = editor.createLine();
    vLine.setEndPoints(
      nodeTranslation.x - 20,
      nodeTranslation.y,
      nodeTranslation.x - 20,
      nodeTranslation.y + nodeHeight
    );
    vLine.startArrowHeadType = vLine.endArrowHeadType =
      constants.ArrowHeadType.openTriangular;

    editor.context.insertionParent.children.append(vLine);

    const vText = editor.createText();
    vText.text = `${Math.trunc(nodeHeight).toString()}px`;
    editor.context.insertionParent.children.append(vText);

    vText.translation = {
      x: nodeTranslation.x - 30,
      y: nodeTranslation.y + nodeHeight / 2,
    };
    vText.setRotationInParent(-90, { x: 0, y: 0 });

    const vGroup = editor.createGroup();
    editor.context.insertionParent.children.append(vGroup);
    vGroup.children.append(vLine, vText);
  } else {
    panelUIProxy.flashWrongElement("drawDimensions");
  }
};

const drawDimensionsRefactored = () => {
  if (
    editor.context.hasSelection &&
    editor.context.selection[0].type === constants.SceneNodeType.mediaContainer
  ) {
    const selectedNode = editor.context.selection[0];
    const { translation: nodeTranslation } = selectedNode;
    const { width: nodeWidth, height: nodeHeight } =
      selectedNode.mediaRectangle;

    // Create horizontal dimension line
    createDimensionLine({
      width: nodeWidth,
      height: nodeHeight,
      translation: nodeTranslation,
      orientation: "horizontal",
      margin: 60,
    });

    // Create vertical dimension line
    createDimensionLine({
      width: nodeWidth,
      height: nodeHeight,
      translation: nodeTranslation,
      orientation: "vertical",
      margin: 20,
    });
  } else {
    panelUIProxy.flashWrongElement("drawDimensionsRefactored");
  }
};

export { drawDimensions, drawDimensionsRefactored };
