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

import { ProgressCircle } from "@swc-react/progress-circle";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Masonry from "react-masonry-css";
import { DEFAULT_PAGE_SIZE, LIST_MEDIA_ITEMS_API_URL } from "../constants.js";
import { isNullOrWhiteSpace } from "../extensions.js";
import "./Assets.css";

const Assets = ({ accessToken, photos, addPhotos, nextPageToken, updateNextPageToken }) => {
    useEffect(() => {
        if (!isNullOrWhiteSpace(accessToken)) {
            getPhotos();
        }
    }, [accessToken]);

    /**
     * Get all photos.
     */
    async function getPhotos() {
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        };

        const apiUrl = !isNullOrWhiteSpace(nextPageToken)
            ? `${LIST_MEDIA_ITEMS_API_URL}?pageSize=${DEFAULT_PAGE_SIZE}&pageToken=${nextPageToken}`
            : `${LIST_MEDIA_ITEMS_API_URL}?pageSize=${DEFAULT_PAGE_SIZE}`;

        const response = await fetch(apiUrl, options);
        const responseJson = await response.json();
        if (!response.ok) {
            const error = responseJson.error
                ? responseJson.error.message
                : "Unexpected error occurred while fetching list of media.";
            throw new Error(error);
        }

        const newPhotos = responseJson.mediaItems
            .filter(item => item.mimeType === "image/jpeg")
            .map(item => {
                return { id: item.id, name: item.filename, link: item.baseUrl };
            });

        addPhotos(newPhotos);

        const newNextPageToken = responseJson.nextPageToken;
        updateNextPageToken(newNextPageToken);
    }

    return (
        <InfiniteScroll
            loadMore={getPhotos}
            hasMore={!isNullOrWhiteSpace(nextPageToken)}
            loader={
                <div className="loading-container">
                    <ProgressCircle size="m" indeterminate />
                </div>
            }
        >
            <Masonry breakpointCols={2} className="gallery" columnClassName="gallery-column">
                {photos.map(({ id, name, link }) => {
                    return <img key={id} src={link} alt={name} />;
                })}
            </Masonry>
        </InfiniteScroll>
    );
};

export default Assets;
