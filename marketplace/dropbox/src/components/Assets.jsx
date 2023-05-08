import { Divider, Flex, Heading, Text } from "@adobe/react-spectrum";
import DeselectCircular from "@spectrum-icons/workflow/DeselectCircular";
import React, { useContext, useEffect, useState } from "react";
import { FILE_API_URL, IMAGE_THUMBNAIL_URL, LIST_FOLDER_API_URL } from "../constants.js";
import { isImage, isNullOrWhiteSpace } from "../extensions.js";
import folderIcon from "../folder.png";
import { AddOnSdkContext } from "./App";
import "./Assets.css";
import Breadcrumb from "./Breadcrumb";
import Loading from "./Loading";

const Assets = ({ accessToken, assets, updateAssets }) => {
    const addOnSdk = useContext(AddOnSdkContext);
    const [loading, setLoading] = useState(false);
    const [path, setPath] = useState("");

    useEffect(() => {
        if (!isNullOrWhiteSpace(accessToken)) {
            navigateTo("");
        }
    }, [accessToken]);

    function navigateTo(newPath) {
        setLoading(true);
        setPath(newPath);
        discoverAssets(newPath).then(discoveredAssets => {
            getImages(discoveredAssets).then(() => setLoading(false));
        });
    }

    async function discoverAssets(path) {
        const discoveredAssets = { images: [], folders: [] };

        const newAssets = await getAssets(path);
        newAssets.entries.forEach(item => {
            if (item[".tag"] === "file") {
                if (isImage(item.name) || item.name.endsWith(".mp4")) {
                    discoveredAssets.images.push({
                        id: item.id,
                        name: item.name,
                        path: item.path_display,
                        link: "",
                        dataLink: ""
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
        const folders = await response.json();
        if (!response.ok) {
            const error = folders.error
                ? folders.error.message
                : "Unexpected error occurred while fetching folders.";

            throw new Error(error);
        }

        return folders;
    }

    async function getImages(discoveredAssets) {
        for (const image of discoveredAssets.images) {
            // const data = { path: image.path };
            const thumbnailData = JSON.stringify({
                format: "jpeg",
                mode: "bestfit",
                resource: { ".tag": "path", path: `${image.path}` },
                size: "w480h320"
            });
            const options = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Dropbox-API-Arg": `${thumbnailData}`,
                    "Content-type": "text/plain; charset=utf-8"
                }
            };

            const response = await fetch(IMAGE_THUMBNAIL_URL, options);
            const file = await response.blob();
            if (!response.ok) {
                const error = file.error
                    ? file.error.message
                    : "Unexpected error occurred while fetching file.";

                throw new Error(error);
            }

            image.link = await convertBlobToDataUrl(file);
        }

        updateAssets(discoveredAssets);
    }

    async function convertBlobToDataUrl(file) {
        const fileReader = new FileReader();
        return new Promise(resolve => {
            fileReader.onloadend = function (data) {
                resolve("data:image/jpeg;base64," + data.target.result.split(",")[1]);
            };
            fileReader.readAsDataURL(file);
        });
    }

    function renderFolders() {
        return (
            <Flex direction="row" gap="size-200" wrap>
                {assets.folders.map(folder => {
                    return (
                        <Flex key={folder.id} direction="column" gap="size-0" alignItems="center">
                            <span
                                style={{ cursor: "pointer" }}
                                onClick={() => navigateTo(folder.path)}
                            >
                                <img
                                    aria-label={folder.name}
                                    src={folderIcon}
                                    width={75}
                                    height={75}
                                    alt={folder.name}
                                />
                            </span>
                            <Text>{folder.name}</Text>
                        </Flex>
                    );
                })}
            </Flex>
        );
    }

    function renderImages() {
        return (
            <div className="gallery">
                <div className="row">
                    <div className="column">
                        {getImageColumn(assets.images, 0, Math.ceil(assets.images.length / 2))}
                    </div>
                    <div className="column">
                        {getImageColumn(
                            assets.images,
                            Math.ceil(assets.images.length / 2),
                            assets.images.length
                        )}
                    </div>
                </div>
            </div>
        );
    }

    function getImageColumn(images, start, end) {
        return images.slice(start, end).map(({ id, name, link, path }) => {
            return (
                <img
                    key={id}
                    src={link}
                    alt={name}
                    data-path={path}
                    onLoad={handleImageDrag}
                    onClick={handleAddImage}
                />
            );
        });
    }

    function handleImageDrag(event) {
        addOnSdk.app.enableDragToDocument(event.currentTarget, {
            previewCallback: image => {
                return new URL(image.src);
            },
            completionCallback: async image => {
                const data = { path: image.dataset.path };
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
                file.link;

                const blob = await fetch(file.link).then(response => response.blob());
                return [{ blob }];
            }
        });
    }

    async function handleAddImage(event) {
        const url = event.currentTarget.src;
        const blob = await getImageBlob(url);
        addOnSdk.app.document.addImage(blob);
    }

    async function getImageBlob(url) {
        return await fetch(url).then(response => response.blob());
    }

    return (
        <>
            {loading ? (
                <Loading text="Discovering ..." />
            ) : (
                <>
                    <>
                        <Breadcrumb path={path} navigateTo={navigateTo} />
                    </>
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
                                    Image Files
                                </Heading>
                                <Divider size="S" />
                                {renderImages()}
                            </Flex>
                        ) : (
                            <></>
                        )}
                    </>
                    <>
                        {assets?.folders?.length === 0 && assets?.images?.length === 0 ? (
                            <Flex
                                direction="column"
                                gap="size-100"
                                margin="size-800"
                                alignItems="center"
                            >
                                <DeselectCircular
                                    aria-label="No Folders or Image Files found"
                                    size="L"
                                />
                                <Text>No Folders or Image Files</Text>
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
