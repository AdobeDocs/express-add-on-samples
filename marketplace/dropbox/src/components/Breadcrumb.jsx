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
import { Divider, Flex, Heading } from "@adobe/react-spectrum";
import React from "react";
import { isNullOrWhiteSpace } from "../extensions";

const Breadcrumb = ({ path, navigateTo }) => {
    function getBreadcrumb() {
        if (isNullOrWhiteSpace(path)) {
            return <></>;
        }

        const pathComponents = path.split("/");
        const modifiedPath = `${path}/`;

        const navigation = [];
        for (let i = 1; i < pathComponents.length - 1; i++) {
            navigation.push({
                name: pathComponents[i],
                location: modifiedPath.substring(
                    0,
                    modifiedPath.indexOf(`/${pathComponents[i + 1]}/`)
                )
            });
        }

        navigation.push({ name: pathComponents[pathComponents.length - 1], location: "" });

        return (
            <Flex direction="row" alignContent="center" wrap>
                <span className="breadcrumb" onClick={() => navigateTo("")}>
                    <Heading level={3} margin={5}>
                        Home
                    </Heading>
                </span>
                {navigation.map(({ name, location }, i) => {
                    return (
                        <Flex direction="row" key={`path-${name}-${i}`} wrap>
                            <>
                                <Divider orientation="vertical" size="S" />
                                {!isNullOrWhiteSpace(location) ? (
                                    <span
                                        className="breadcrumb"
                                        onClick={() => navigateTo(location)}
                                    >
                                        <Heading level={3} margin={5}>
                                            {name}
                                        </Heading>
                                    </span>
                                ) : (
                                    <Heading level={3} margin={5}>
                                        {name}
                                    </Heading>
                                )}
                            </>
                        </Flex>
                    );
                })}
            </Flex>
        );
    }

    return getBreadcrumb();
};

export default Breadcrumb;
