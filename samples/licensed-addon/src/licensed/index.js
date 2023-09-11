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

/**
 * Convert milliseconds to user readable timespan.
 * @param milliseconds - Timespan in milliseconds.
 * @returns User readable timespan in days, hours and minutes.
 */
function convertMilliseconds(milliseconds) {
    const oneSecond = 1000; // 1,000 milliseconds
    const oneMinute = oneSecond * 60; // 60,000 milliseconds
    const oneHour = oneMinute * 60; // 3,600,000 milliseconds
    const oneDay = oneHour * 24; // 86,400,000 milliseconds

    const days = Math.floor(milliseconds / oneDay);
    const hours = Math.floor((milliseconds % oneDay) / oneHour);
    const minutes = Math.floor((milliseconds % oneHour) / oneMinute);

    return `${days} days ${hours} hours ${minutes} minutes`;
}
