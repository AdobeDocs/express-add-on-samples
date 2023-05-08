import React, { createContext, useState } from "react";
import { Button, Flex, lightTheme, Provider } from "@adobe/react-spectrum";
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
    } else {
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
          />
          <TextField
            label="Primary Button Text"
            defaultValue="Ok"
            id="primary"
            description="Enter Primary Button Text"
            onChange={setPrimaryButton}
            marginBottom="7%"
          />
          <Flex direction="row" marginBottom="7%">
            <Checkbox id="sec" onChange={showSecondaryButton}>
              Add Secondary Button
            </Checkbox>
            <Checkbox id="can" onChange={showCancelButton}>
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
