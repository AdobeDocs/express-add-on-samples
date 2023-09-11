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

const API_URL = "https://www.greetingsapi.com/random";

/**
 * This class handles requests to the paid API.
 */
export class PaidApi {
    /**
     * Get greeting.
     * @returns Greeting in a randomly chosen language.
     */
    static async greet() {
        const response = await fetch(API_URL, { method: "GET" });
        const responseJson = await response.json();

        return `${responseJson.greeting} [${responseJson.language}]`;
    }
}
