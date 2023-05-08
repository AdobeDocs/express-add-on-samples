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