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

import { Button } from "@swc-react/button";
import { Checkbox } from "@swc-react/checkbox";
import { Radio, RadioGroup } from "@swc-react/radio";
import { Theme } from "@swc-react/theme";
import React, { useState } from "react";
import "./App.css";
import TextInputGroup from "./text-input-group/TextInputGroup";

const App = ({ addOnSdk }) => {
    const [variant, setVariant] = useState("confirmation");

    const [title, setTitle] = useState("Example");
    const [description, setDescription] = useState("This is an example demonstrating the usage of Dialog API.");

    // Input section of the form is hidden by default
    // It is made visible when the user chooses the "Input" variant.
    const [inputVisibility, setInputVisibility] = useState("hidden");
    const [inputLabel, setInputLabel] = useState("Name");
    const [inputPlaceholder, setInputPlaceholder] = useState("Enter your name");

    const [primaryButtonLabel, setPrimaryButtonLabel] = useState("Ok");

    // Secondary button label input is disabled by default.
    // It is enabled when the user chooses to "Add Secondary Button".
    const [secondaryButtonDisabled, setSecondaryButtonDisabled] = useState(true);
    const [secondaryButtonLabel, setSecondaryButtonLabel] = useState("Maybe");

    // Cancel button label input is disabled by default.
    // It is enabled when the user chooses to "Add Cancel Button".
    const [cancelButtonDisabled, setCancelButtonDisabled] = useState(true);
    const [cancelButtonTextValue, setCancelButtonLabel] = useState("Cancel");

    /**
     * Handle variant selection change.
     */
    function handleVariantChange(event) {
        const selectedVariant = event.target.selected;
        setVariant(selectedVariant);

        // If the selected variant is "input",
        // Show the Input section in UI.
        if (selectedVariant === "input") {
            setInputVisibility("visible");
        } else {
            setInputVisibility("hidden");
        }
    }

    /**
     * Show dialog in Express.
     */
    async function showDialog() {
        // Dialog API payload.
        let payload = {
            title: title,
            description: [description],
            buttonLabels: {
                primary: primaryButtonLabel != "" ? primaryButtonLabel : undefined,
                secondary: !secondaryButtonDisabled && secondaryButtonLabel != "" ? secondaryButtonLabel : undefined,
                cancel: !cancelButtonDisabled && cancelButtonTextValue != "" ? cancelButtonTextValue : undefined
            },
            variant: variant
        };

        // If the user chooses the "Input" variant,
        // include the input "field" in the payload.
        if (variant === "input") {
            payload = {
                ...payload,
                field: {
                    label: inputLabel,
                    placeholder: inputPlaceholder,
                    fieldType: "text"
                }
            };
        }

        try {
            const result = await addOnSdk.app.showModalDialog(payload);

            // Log the "result" on console.
            // "result" represents the action that was taken by the user on the opened dialog.
            console.log("Dialog result", result);
        } catch (error) {
            console.log("An error occurred while showing the dialog.", error);
        }
    }

    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="container">
                <h3>Variant</h3>
                <RadioGroup selected={variant} change={event => handleVariantChange(event)}>
                    <Radio size="m" value="confirmation">
                        Confirm
                    </Radio>
                    <Radio size="m" value="information">
                        Informative
                    </Radio>
                    <Radio size="m" value="warning">
                        Warning
                    </Radio>
                    <Radio size="m" value="destructive">
                        Destructive
                    </Radio>
                    <Radio size="m" value="error">
                        Error
                    </Radio>
                    <Radio size="m" value="input">
                        Input
                    </Radio>
                </RadioGroup>
                <h3>Labels</h3>
                <TextInputGroup
                    id="title"
                    value={title}
                    placeholder="Enter a title"
                    label="Title"
                    onChange={event => setTitle(event.target.value)}
                />
                <TextInputGroup
                    multiline
                    id="description"
                    value={description}
                    placeholder="Enter a description"
                    label="Description"
                    onChange={event => setDescription(event.target.value)}
                />
                <div className={inputVisibility}>
                    <h3>Input</h3>
                    <TextInputGroup
                        id="inputLabel"
                        value={inputLabel}
                        placeholder="Enter the input label"
                        label="Label"
                        onChange={event => setInputLabel(event.target.value)}
                    />
                    <TextInputGroup
                        id="inputPlaceholder"
                        value={inputPlaceholder}
                        placeholder="Enter the input placeholder"
                        label="Placeholder"
                        onChange={event => setInputPlaceholder(event.target.value)}
                    />
                </div>
                <h3>Buttons</h3>
                <TextInputGroup
                    id="primary"
                    value={primaryButtonLabel}
                    placeholder="Enter primary button label"
                    label="Primary button label"
                    onChange={event => setPrimaryButtonLabel(event.target.value)}
                />
                <Checkbox size="m" change={() => setSecondaryButtonDisabled(!secondaryButtonDisabled)}>
                    Add Secondary Button
                </Checkbox>
                <TextInputGroup
                    id="secondary"
                    value={secondaryButtonLabel}
                    placeholder="Enter secondary button label"
                    label="Secondary button label"
                    disabled={secondaryButtonDisabled}
                    onChange={event => setSecondaryButtonLabel(event.target.value)}
                />
                <Checkbox size="m" change={() => setCancelButtonDisabled(!cancelButtonDisabled)}>
                    Add Cancel Button
                </Checkbox>
                <TextInputGroup
                    id="cancel"
                    value={cancelButtonTextValue}
                    placeholder="Enter cancel button label"
                    label="Cancel button label"
                    disabled={cancelButtonDisabled}
                    onChange={event => setCancelButtonLabel(event.target.value)}
                />
                <Button size="m" style={{ marginTop: "16px" }} onClick={showDialog}>
                    Create
                </Button>
            </div>
        </Theme>
    );
};

export default App;
