import { Flex, ProgressCircle, Text } from "@adobe/react-spectrum";
import React from "react";

/**
 * React component for displaying a loading animation.
 */
const Loading = ({ text }) => {
    return (
        <Flex direction="row" height="size-5000" gap="size-100" alignItems="center">
            <Flex direction="column" width="size-3000" gap="size-100" alignItems="center">
                <ProgressCircle aria-label={text} size="L" isIndeterminate />
                <Text>{text}</Text>
            </Flex>
        </Flex>
    );
};

export default Loading;
