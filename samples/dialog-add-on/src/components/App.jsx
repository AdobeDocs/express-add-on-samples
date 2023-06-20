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
import React, { createContext, useState } from "react";
import { Button, Flex, lightTheme, NumberField, Provider } from "@adobe/react-spectrum";
import { TextField } from "@adobe/react-spectrum";
import { Checkbox } from "@adobe/react-spectrum";
import { Picker, Item, Section } from "@adobe/react-spectrum";
import { TextArea } from "@adobe/react-spectrum";

export const AddOnSdkContext = createContext();
const App = ({ addOnSdk }) => {
  //Setting Initial States
  const [buttons, setButtons] = useState({
    sec: true,
    can: true,
  });
  const [variantValue, setVariantValue] = useState("confirmation");

  const [titleValue, setTitleValue] = useState("Sample Title");

  const [descValue, setDescValue] = useState("Sample Description");

  const [primaryButtonTextValue, setPrimaryButtonTextValue] = useState("Ok");

  const [secondaryButtonTextValue, setSecondaryButtonTextValue] = useState("");

  const [cancelButtonTextValue, setCancelButtonTextValue] = useState("");

  const [labelValue, setLabelValue] = useState("Sample Label");

  const [placeholderValue, setPlaceholderValue] =
    useState("Sample Placeholder");


  const [widthValue, setWidthValue] = useState("100");

  const [heightValue, setHeightValue] = useState("100");

  //Showing Secondary Button Text only on selection
  function showSecondaryButton() {
    setButtons({ sec: !buttons.sec, can: buttons.can });
    setSecondaryButtonTextValue("");
  }

  //Showing Cancel Button Text only on selection
  function showCancelButton() {
    setButtons({ sec: buttons.sec, can: !buttons.can });
    setCancelButtonTextValue("");
  }

  //Setting state values on change event
  function setVariant(e) {
    setVariantValue(e);
    setLabelValue("Sample Label");
    setPlaceholderValue("Sample Placeholder");
  }

  function setTitle(e) {
    setTitleValue(e);
  }

  function setDesc(e) {
    setDescValue(e);
  }

  function setPrimaryButton(e) {
    setPrimaryButtonTextValue(e);
  }

  function setSecondaryButton(e) {
    setSecondaryButtonTextValue(e);
  }

  function setCancelButton(e) {
    setCancelButtonTextValue(e);
  }

  function setLabel(e) {
    setLabelValue(e);
  }

  function setPlaceholder(e) {
    setPlaceholderValue(e);
  }

  function setWidth(e) {
    setWidthValue(e);
  }

  function setHeight(e) {
    setHeightValue(e);
  }

  //Function to show dialog
  async function showDialog() {
    var data;
    //Generating dialog for input field with label and placeholder
    if (variantValue === "input") {
      data = {
        title: titleValue,
        description: [descValue],
        buttonLabels: {
          primary:
            primaryButtonTextValue != "" ? primaryButtonTextValue : undefined,
          secondary:
            secondaryButtonTextValue != ""
              ? secondaryButtonTextValue
              : undefined,
          cancel:
            cancelButtonTextValue != "" ? cancelButtonTextValue : undefined,
        },
        variant: variantValue,
        field: {
          label: labelValue,
          placeholder: placeholderValue,
          fieldType: "text",
        },
      };
    } if (variantValue === "custom") {
      data = {
        variant: variantValue,
        title: titleValue,
        src: "dialog.html",
        size: { width: widthValue, height: heightValue }
      }
    }
    else {
      data = {
        title: titleValue,
        description: [descValue],
        buttonLabels: {
          primary:
            primaryButtonTextValue != "" ? primaryButtonTextValue : undefined,
          secondary:
            secondaryButtonTextValue != ""
              ? secondaryButtonTextValue
              : undefined,
          cancel:
            cancelButtonTextValue != "" ? cancelButtonTextValue : undefined,
        },
        variant: variantValue,
      };
    }

    try {
      const response = await addOnSdk.app.showModalDialog(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <AddOnSdkContext.Provider value={addOnSdk}>
      <Provider theme={lightTheme} colorScheme="light">
        <Flex direction="column" height="size-100">
          <TextField
            label="Title"
            id="title"
            description="Enter Title"
            defaultValue="Sample Title"
            onChange={setTitle}
            marginBottom="7%"
            flexGrow="1"
          />
          <TextArea
            label="Description"
            defaultValue="Sample Description"
            id="desc"
            description="Enter Description"
            onChange={setDesc}
            marginBottom="7%"
            isDisabled={variantValue === "custom"}
          />
          <TextField
            label="Primary Button Text"
            defaultValue="Ok"
            id="primary"
            description="Enter Primary Button Text"
            onChange={setPrimaryButton}
            marginBottom="7%"
            isDisabled={variantValue === "custom"}
          />
          <Flex direction="row" marginBottom="7%">
            <Checkbox id="sec" onChange={showSecondaryButton} isDisabled={variantValue === "custom"}>
              Add Secondary Button
            </Checkbox>
            <Checkbox id="can" onChange={showCancelButton} isDisabled={variantValue === "custom"}>
              Add Cancel Button
            </Checkbox>
          </Flex>
          <TextField
            label="Secondary Button Text"
            id="secondary"
            isHidden={buttons.sec}
            description="Enter Secondary Button Text"
            onChange={setSecondaryButton}
            value={secondaryButtonTextValue}
            marginBottom="7%"
          />
          <TextField
            label="Cancel Button Text"
            id="cancel"
            isHidden={buttons.can}
            description="Enter Cancel Button Text"
            onChange={setCancelButton}
            value={cancelButtonTextValue}
            marginBottom="7%"
          />
          <Picker
            label="Variant"
            defaultSelectedKey="confirmation"
            onSelectionChange={setVariant}
            marginBottom="7%"
          >
            <Item key="confirmation">Confirm</Item>
            <Item key="information">Informative</Item>
            <Item key="warning">Warning</Item>
            <Item key="destructive">Destructive</Item>
            <Item key="error">Error</Item>
            <Item key="input">Input</Item>
            <Item key="custom">Custom</Item>
          </Picker>
          <TextField
            label="Label"
            id="label"
            defaultValue="Sample Label"
            isHidden={variantValue != "input"}
            description="Enter Label"
            onChange={setLabel}
            value={labelValue}
            marginBottom="7%"
          />
          <TextField
            label="Placeholder"
            id="placeholder"
            defaultValue="Sample Placeholder"
            isHidden={variantValue != "input"}
            description="Enter Placeholder"
            onChange={setPlaceholder}
            value={placeholderValue}
            marginBottom="7%"
          />
          <NumberField
            label="Width"
            id="width"
            defaultValue="100"
            isHidden={variantValue != "custom"}
            description="Enter Width"
            onChange={setWidth}
            value={widthValue}
            marginBottom="7%"
            minValue={0}
          />
          <NumberField
            label="Height"
            id="height"
            defaultValue="100"
            isHidden={variantValue != "custom"}
            description="Enter Height"
            onChange={setHeight}
            value={heightValue}
            marginBottom="7%"
            minValue={0}
          />
          <Button
            variant="accent"
            style="fill"
            onPress={showDialog}
            width="50%"
          >
            Generate Dialog
          </Button>
        </Flex>
      </Provider>
    </AddOnSdkContext.Provider>
  );
};

export default App;
