/** @jsx jsx */

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

import "mocha";

import { jsx } from "@emotion/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "chai";
import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import App from "./App";

import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

describe("App", () => {
    let sandbox: sinon.SinonSandbox;
    let addOnSDKAPI: AddOnSDKAPI;

    beforeEach(async () => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it(`should render a button having label - "Get Theme".`, () => {
        addOnSDKAPI = stubInterface();

        render(<App addOnUISdk={addOnSDKAPI} />);

        const button = screen.getByText("Get Theme");
        expect(button).to.be.not.undefined;
    });

    it(`should get theme from "AddOnSDKAPI" and update the button label to - "Theme: <THEME>".`, async () => {
        const theme = "dark";
        addOnSDKAPI = getSDKWithMockedTheme(theme);

        render(<App addOnUISdk={addOnSDKAPI} />);

        const button = screen.getByText("Get Theme");
        await userEvent.click(button);

        const buttonWithTheme = screen.getByText(`Theme: ${theme.toUpperCase()}`);
        expect(buttonWithTheme).to.be.not.undefined;
    });
});

function getSDKWithMockedTheme(theme: string): AddOnSDKAPI {
    return {
        apiVersion: "1.0.0",
        ready: Promise.resolve(),
        instance: stubInterface(),
        app: {
            ui: { theme, locale: "en-US", locales: ["en-US"] },
            document: stubInterface(),
            oauth: stubInterface(),
            currentUser: stubInterface(),
            devFlags: stubInterface(),
            on: stubInterface(),
            off: stubInterface(),
            enableDragToDocument: stubInterface(),
            showModalDialog: stubInterface(),
            startPremiumUpgradeIfFreeUser: stubInterface(),
        },
        constants: stubInterface(),
    };
}
