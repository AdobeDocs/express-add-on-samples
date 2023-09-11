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

import { MenuItem } from "@swc-react/menu";
import { Picker } from "@swc-react/picker";
import React, { useContext, useEffect, useState } from "react";
import { FILE_API_URL, LIST_FOLDER_API_URL } from "../constants.js";
import { isImage, isNullOrWhiteSpace } from "../extensions.js";
import { AddOnSdkContext } from "./App";
import "./Assets.css";
import Loading from "./Loading";

const DELIMITER = "::";

const Assets = ({ accessToken, assets, updateAssets }) => {
    const addOnSdk = useContext(AddOnSdkContext);
    const [loading, setLoading] = useState(false);

    // "." represents the `Home` folder in Dropbox.
    // Although Dropbox recognizes the `Home` folder as "",
    // we are using "." since React has its own fallback logic for empty strings.
    const [currentFolder, setCurrentFolder] = useState({ name: "Home", path: "." });

    useEffect(() => {
        if (!isNullOrWhiteSpace(accessToken)) {
            navigateTo(currentFolder);
        }
    }, [accessToken]);

    /**
     * Navigate to a certain directory.
     */
    function navigateTo(folder) {
        setLoading(true);
        setCurrentFolder(folder);
        discoverAssets(folder.path).then(discoveredAssets => {
            getImages(discoveredAssets).then(() => setLoading(false));
        });
    }

    /**
     * Discover all folders and images in a certain path.
     */
    async function discoverAssets(path) {
        const discoveredAssets = { images: [], folders: [] };

        // Since Dropbox API recognizes "" as the `Home` folder,
        // we are converting "." to "" when invoking the Dropbox APIs.
        const newAssets = await getAssets(path === "." ? "" : path);

        // Add a link for the user to go back to the home page.
        discoveredAssets.folders.push({
            id: "home",
            name: "Home",
            path: ".",
            link: ""
        });

        newAssets.entries.forEach(item => {
            if (item[".tag"] === "file") {
                if (isImage(item.name)) {
                    discoveredAssets.images.push({
                        id: item.id,
                        name: item.name,
                        path: item.path_display,
                        link: ""
                    });
                }
            } else if (item[".tag"] === "folder") {
                discoveredAssets.folders.push({
                    id: item.id,
                    name: item.name,
                    path: item.path_display,
                    link: ""
                });
            }
        });

        return discoveredAssets;
    }

    /**
     * Get all folders and images in a certain path.
     */
    async function getAssets(path) {
        const data = { path };
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(LIST_FOLDER_API_URL, options);
        const assets = await response.json();
        if (!response.ok) {
            const error = assets.error ? assets.error.message : "Unexpected error occurred while fetching assets.";

            throw new Error(error);
        }

        return assets;
    }

    /**
     * Get images from the list of discovered assets in a certain path.
     */
    async function getImages(discoveredAssets) {
        for (const image of discoveredAssets.images) {
            const data = { path: image.path };
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };

            const response = await fetch(FILE_API_URL, options);
            const file = await response.json();
            if (!response.ok) {
                const error = file.error ? file.error.message : "Unexpected error occurred while fetching file.";

                throw new Error(error);
            }

            image.link = file.link;
        }

        updateAssets(discoveredAssets);
    }

    /**
     * Render all the folders that are navigatable from a certain path.
     */
    function renderFolders() {
        return (
            <div className="folders">
                <h2>Current Directory</h2>
                <Picker
                    className="picker"
                    size="m"
                    label={currentFolder.name}
                    change={event => {
                        const folderInformation = event.target.value.split(DELIMITER);
                        navigateTo({ name: folderInformation[0], path: folderInformation[1] });
                    }}
                >
                    {assets.folders
                        .filter(folder => currentFolder.path !== folder.path)
                        .map(folder => {
                            return (
                                <MenuItem key={folder.name} value={`${folder.name}${DELIMITER}${folder.path}`}>
                                    {folder.name}
                                </MenuItem>
                            );
                        })}
                </Picker>
            </div>
        );
    }

    /**
     * Render all the images that are present in a certain path.
     */
    function renderImages() {
        return (
            <div className="gallery">
                {assets.images.map(({ id, name, link }) => {
                    return <img key={id} src={link} alt={name} onClick={handleImageAdd} onLoad={handleImageDrag} />;
                })}
            </div>
        );
    }

    /**
     * Enable adding of an image to the document on click.
     */
    function handleImageAdd(event) {
        const url = event.currentTarget.src;
        getImageBlob(url).then(blob => addOnSdk.app.document.addImage(blob));
    }

    /**
     * Enable adding of an image to the document on drag.
     */
    function handleImageDrag(event) {
        addOnSdk.app.enableDragToDocument(event.currentTarget, {
            previewCallback: element => {
                return new URL(element.src);
            },
            completionCallback: async element => {
                const blob = await getImageBlob(element.src);
                return [{ blob }];
            }
        });
    }

    /**
     * Fetch the image blob from a URL.
     */
    async function getImageBlob(url) {
        return await fetch(url).then(response => response.blob());
    }

    return (
        <>
            {loading ? (
                <Loading text="Discovering ..." />
            ) : (
                <>
                    {assets?.folders?.length > 0 ? <>{renderFolders()}</> : <></>}
                    {assets?.images?.length > 0 ? <>{renderImages()}</> : <></>}
                </>
            )}
        </>
    );
};

export default Assets;
