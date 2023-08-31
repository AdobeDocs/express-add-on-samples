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
import React, {useState, useEffect} from "react";

// Import the Spectrum typography and theme components to apply styles and theme appearance
import "@spectrum-web-components/styles/typography.css";
import "@spectrum-web-components/theme/theme-light.js";
import '@spectrum-web-components/theme/express/theme-light.js';
import "@spectrum-web-components/theme/theme-dark.js";
import '@spectrum-web-components/theme/express/theme-dark.js';
import "@spectrum-web-components/theme/scale-medium.js";
import '@spectrum-web-components/theme/express/scale-medium.js';
import "@spectrum-web-components/theme/scale-large.js";
import '@spectrum-web-components/theme/express/scale-large.js';
import { Theme } from "@swc-react/theme";

// UI component imports. NOTE: Each requires both the base spectrum-web-component import
// and the swc-react wrapper component import.
import '@spectrum-web-components/button/sp-button.js';
import { Button } from "@swc-react/button";
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import { Checkbox } from "@swc-react/checkbox";
import '@spectrum-web-components/switch/sp-switch.js';
import { Switch } from "@swc-react/switch";
import '@spectrum-web-components/split-button/sp-split-button.js';
import { SplitButton } from '@swc-react/split-button';
import '@spectrum-web-components/menu/sp-menu.js';
import { Menu, MenuItem } from '@swc-react/menu';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
import { Radio, RadioGroup } from '@swc-react/radio';
import '@spectrum-web-components/textfield/sp-textfield.js';
import { Textfield } from '@swc-react/textfield';
import '@spectrum-web-components/field-label/sp-field-label.js';
import { FieldLabel } from '@swc-react/field-label';
import { ProgressBar } from '@swc-react/progress-bar';
import '@spectrum-web-components/progress-bar/sp-progress-bar.js';

const App = ({ addOnSdk}) => {
    const [scale, setScale] = useState("medium");
    const currentTheme = addOnSdk.app.ui.theme;    
    const [theme, setTheme] = useState(currentTheme);
    const [mainTheme, setMainTheme] = useState("express");
        
    useEffect(() => {
        addOnSdk.app.on("themechange", (data) => { setTheme(data.theme); });
    }, []);
   
    function changeTheme(e) {         
        if (e.target.value==="Spectrum Theme" || e.target.selected==="Spectrum Theme") {
            setMainTheme("spectrum");              
        }
        else {            
            setMainTheme("express");             
        }
    }

    function changeColor(e) {         
        if (e.target.selected==="dark") {            
            setTheme("dark");                
        }
        else {                         
            setTheme("light");             
        }
    }

    function changeScale(e) {    
        if (!e.target.checked && e.target.innerText==="Large Scale" || scale=="medium") {
            setScale("large");             
        }
        else setScale("medium");                     
    }    
    
    return <div className="vertical-form">                
        <Theme theme={mainTheme} color={theme} scale={scale} style={{backgroundColor: "var(--spectrum-global-color-gray-50)"}}>        
            <div className="vertical-form">   
                <h3 className="spectrum-Heading spectrum-Heading--sizeM">Theme Sampler</h3>                     
                <SplitButton onchange={changeTheme}>
                    <MenuItem>Express Theme</MenuItem>
                    <MenuItem>Spectrum Theme</MenuItem>
                </SplitButton>
                <Checkbox emphasized onclick={changeScale} checked={scale=="medium"}>Medium Scale</Checkbox>
                <Checkbox emphasized onclick={changeScale} checked={scale=="large"}>Large Scale</Checkbox>
                <Switch emphasized onclick={changeScale}>Toggle Scale</Switch>    
                <RadioGroup onchange={changeColor} selected={theme}>                    
                    <Radio emphasized value="light">Light Theme</Radio>
                    <Radio emphasized value="dark">Dark Theme</Radio>                
                </RadioGroup>                                
                <FieldLabel for="txt" side-aligned="start" size="l" style={{width: "100px"}}>Textfield Label</FieldLabel>
                <Textfield id="txt" placeholder="Textfield placeholder"></Textfield>                                                            
                <ProgressBar label="% Complete" progress="70"></ProgressBar>
                
                <h3 className="spectrum-Heading spectrum-Heading--sizeM">Buttons</h3>
                <Button variant="primary">
                    Primary Button
                </Button>
                <Button variant="accent">
                    Accent Button
                </Button>
                <Button variant="secondary">
                    Secondary Button
                </Button>
                <Button variant="negative">
                    Negative Button
                </Button>                          
            </div>        
        </Theme>
    </div>
};

export default App;
