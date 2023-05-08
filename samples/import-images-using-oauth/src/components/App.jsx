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
