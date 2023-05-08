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
