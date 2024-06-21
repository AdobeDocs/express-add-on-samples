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

import { Theme } from "@swc-react/theme";
import React, { createContext, useState } from "react";
import "./App.css";
import Assets from "./Assets";
import Connection from "./Connection";

export const AddOnSdkContext = createContext();

const App = ({ addOnSdk }) => {
    const [accessToken, setAccessToken] = useState("");
    const [photos, setPhotos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState("");

    function updateAccessToken(newAccessToken) {
        setAccessToken(newAccessToken);
    }

    function addPhotos(newPhotos) {
        setPhotos(previousPhotos => {
            return previousPhotos.concat(newPhotos);
        });
    }

    function updateNextPageToken(newNextPageToken) {
        setNextPageToken(newNextPageToken);
    }

    return (
        <AddOnSdkContext.Provider value={addOnSdk}>
            <Theme theme="express" scale="medium" color="light">
                <div className="container">
                    <Connection accessToken={accessToken} updateAccessToken={updateAccessToken}></Connection>
                    <Assets
                        accessToken={accessToken}
                        photos={photos}
                        addPhotos={addPhotos}
                        nextPageToken={nextPageToken}
                        updateNextPageToken={updateNextPageToken}
                    ></Assets>
                </div>
            </Theme>
        </AddOnSdkContext.Provider>
    );
};

export default App;
