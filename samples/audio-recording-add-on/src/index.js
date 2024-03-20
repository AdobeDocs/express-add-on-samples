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
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { WavBlobUtil } from "./utils/WavBlobUtil.js";

// Wait for the SDK to be ready before rendering elements in the DOM.
AddOnSdk.ready.then(async () => {
    
    let audioChunks = [];
    let mediaRecorder;
    let blob = undefined;

    const startRecordButton = document.getElementById('startRecord');
    const stopRecordButton = document.getElementById('stopRecord');
    const recordedAudio = document.getElementById('recordedAudio');
    const addToDocButton = document.getElementById('addToDoc');

    startRecordButton.addEventListener('click', startRecording);
    stopRecordButton.addEventListener('click', stopRecording);
    addToDocButton.addEventListener('click', addToDoc);

    async function startRecording() {
        audioChunks = [];
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', async () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                recordedAudio.src = URL.createObjectURL(audioBlob);
                // Convert raw blob to wav blob with hpc codec
                const hpcBlob = await WavBlobUtil.getHpcBlob(audioBlob);
                blob = hpcBlob;
            });

            mediaRecorder.start();
            startRecordButton.disabled = true;
            stopRecordButton.disabled = false;
            addToDocButton.disabled = true;
        } catch (err) {
            console.error('Error starting recording:', err);
        }
    }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      startRecordButton.disabled = false;
      stopRecordButton.disabled = true;
      addToDocButton.disabled = false;
    }
  }
    
  function addToDoc() {
    AddOnSdk.app.document.addAudio(blob, { title : 'test.wav'});
  }
});
