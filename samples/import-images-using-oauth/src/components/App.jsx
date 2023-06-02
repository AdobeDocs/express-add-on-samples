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
import { Flex, lightTheme, Provider } from "@adobe/react-spectrum";
import React, { createContext, useState } from "react";
import "./App.css";
import Assets from "./Assets";
import Connection from "./Connection";

export const AddOnSdkContext = createContext();

const App = ({ addOnSdk }) => {
    const [accessToken, setAccessToken] = useState("");
    const [assets, setAssets] = useState([]);

    function updateAccessToken(newAccessToken) {
        setAccessToken(newAccessToken);
    }

    function updateAssets(newAssets) {
        setAssets(newAssets);
    }

    return (
        <AddOnSdkContext.Provider value={addOnSdk}>
            <Provider theme={lightTheme} colorScheme="light">
                <Flex direction="column" gap="size-200">
                    <Connection
                        accessToken={accessToken}
                        updateAccessToken={updateAccessToken}
                    ></Connection>
                    <Assets
                        accessToken={accessToken}
                        assets={assets}
                        updateAssets={updateAssets}
                    ></Assets>
                </Flex>
            </Provider>
        </AddOnSdkContext.Provider>
    );
};

export default App;
