// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/scale-medium.js";
import "@spectrum-web-components/theme/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Theme } from "@swc-react/theme";
import React, { useEffect, useState } from "react";
import "./Redirect.css";

const Redirect = () => {
    const [queryParameters, setQueryParameters] = useState(undefined);

    useEffect(() => {
        const parameters = getQueryParameters();
        postMessage(parameters);

        setTimeout(() => window.close(), 2000);
    }, []);

    function getQueryParameters() {
        const urlParameters = new URLSearchParams(window.location.search);

        const parameters = {};
        for (const key of urlParameters.keys()) {
            parameters[key] = urlParameters.get(key);
        }

        setQueryParameters(parameters);

        return parameters;
    }

    function postMessage(parameters) {
        window.opener.postMessage(parameters);
    }

    function getStatusMessage() {
        if (!queryParameters) {
            return <></>;
        }

        if (queryParameters.hasOwnProperty("state") && queryParameters.hasOwnProperty("code")) {
            return <h4>Authorization successful.</h4>;
        }

        return <h4>Authorization failed.</h4>;
    }

    return (
        <Theme theme="express" scale="medium" color="light">
            <div className="container">{getStatusMessage()}</div>
        </Theme>
    );
};

export default Redirect;
