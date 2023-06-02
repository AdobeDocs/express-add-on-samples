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
var default_url = "https://new.express.adobe.com/home";
var qrcode;
import { enableDragOnElement } from "./sdkUtils.js";
$(document).ready(function () {
    qrcode = new QRCode(document.getElementById("qrcodediv"), {
        width: 100,
        height: 100
    });
    qrcode.makeCode(default_url);
    document.getElementById("qrcodediv").style.opacity = "50%";
    document.getElementById("addbutton").style.opacity = "50%";
    document.getElementById("addbutton").disabled = true;

    document.getElementById("qrcodetext").onkeydown = function () { updateCode() };
    //document.getElementById("qrcodetext").onkeypress = function() {updateCode()}; 
    document.getElementById("qrcodetext").onkeyup = function () { updateCode() };
});

function updateCode() {
    var elText = document.getElementById("qrcodetext").value;
    if (!elText || elText == null) {
        qrcode.makeCode(default_url);
        document.getElementById("qrcodediv").style.opacity = "50%";
        document.getElementById("addbutton").style.opacity = "50%";
        document.getElementById("addbutton").disabled = true;
        return;
    }

    qrcode.makeCode(elText);
    document.getElementById("qrcodediv").style.opacity = "100%";
    document.getElementById("addbutton").style.opacity = "100%";
    document.getElementById("addbutton").disabled = false;
    enableDragOnElement();
    return;
}  