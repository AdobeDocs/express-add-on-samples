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
import { Divider, Flex, Heading, Item, Picker } from "@adobe/react-spectrum";
import React, { useContext, useEffect, useState } from "react";
import { FILE_API_URL, LIST_FOLDER_API_URL } from "../constants.js";
import { isImage, isNullOrWhiteSpace } from "../extensions.js";
import { AddOnSdkContext } from "./App";
import "./Assets.css";
import Loading from "./Loading";

const Assets = ({ accessToken, assets, updateAssets }) => {
    const addOnSdk = useContext(AddOnSdkContext);
    const [loading, setLoading] = useState(false);
    const [path, setPath] = useState("");

    useEffect(() => {
        if (!isNullOrWhiteSpace(accessToken)) {
            navigateTo(path);
        }
    }, [accessToken]);

    /**
     * Enable dragging of an image to a document.
     */
    function handleImageDrag(event) {
        addOnSdk.app.enableDragToDocument(event.currentTarget, {
            previewCallback: element => {
                return new URL(element.src);
            },
            completionCallback: async element => {
                const blob = await fetch(element.src).then(response => response.blob());
                return [{ blob }];
            }
        });
    }

    /**
     * Navigate to a certain directory.
     */
    function navigateTo(newPath) {
        setLoading(true);
        setPath(newPath);
        discoverAssets(newPath).then(discoveredAssets => {
            getImages(discoveredAssets).then(() => setLoading(false));
        });
    }

    /**
     * Discover all folders and images in a certain path.
     */
    async function discoverAssets(path) {
        const discoveredAssets = { images: [], folders: [] };

        const newAssets = await getAssets(path);

        // Add a link for the user to go back to the home page.
        discoveredAssets.folders.push({
            id: "home",
            name: "... Go back to Home",
            path: "",
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
            const error = assets.error
                ? assets.error.message
                : "Unexpected error occurred while fetching assets.";

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
                const error = file.error
                    ? file.error.message
                    : "Unexpected error occurred while fetching file.";

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
            <Flex direction="row" gap="size-200" wrap>
                <Picker onSelectionChange={navigateTo} marginTop={10} aria-label="Folder">
                    {assets.folders
                        .filter(folder => path !== folder.path)
                        .map(folder => {
                            return <Item key={folder.path}>{folder.name}</Item>;
                        })}
                </Picker>
            </Flex>
        );
    }

    /**
     * Render all the images that are present in a certain path.
     */
    function renderImages() {
        return (
            <div className="gallery">
                <div className="row">
                    <div className="column">
                        {assets.images.map(({ id, name, link }) => {
                            return <img key={id} src={link} alt={name} onLoad={handleImageDrag} />;
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {loading ? (
                <Loading text="Discovering ..." />
            ) : (
                <>
                    <>
                        {assets?.folders?.length > 0 ? (
                            <Flex direction="column" gap="size-100">
                                <Heading level={3} margin={5}>
                                    Folders
                                </Heading>
                                <Divider size="S" />
                                {renderFolders()}
                            </Flex>
                        ) : (
                            <></>
                        )}
                    </>
                    <>
                        {assets?.images?.length > 0 ? (
                            <Flex direction="column" gap="size-100">
                                <Heading level={3} margin={5}>
                                    Images
                                </Heading>
                                <Divider size="S" />
                                {renderImages()}
                            </Flex>
                        ) : (
                            <></>
                        )}
                    </>
                </>
            )}
        </>
    );
};

export default Assets;
