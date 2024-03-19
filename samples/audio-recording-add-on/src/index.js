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
                console.log(audioChunks);
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                recordedAudio.src = URL.createObjectURL(audioBlob);
                const url = URL.createObjectURL(audioBlob);
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                const audioContext = new AudioContext();
                const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                const wav = getWavBlob(audioBuffer);
                blob = wav;
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

// Returns Uint8Array of WAV bytes
function getWavBlob(audioBuffer, as32BitFloat = false){
    // Encoding setup.
    const frameLength = audioBuffer.length;
    const numberOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const bitsPerSample = as32BitFloat ? 32 : 16;
    const bytesPerSample = bitsPerSample / 8;
    const byteRate = (sampleRate * numberOfChannels * bitsPerSample) / 8;
    const blockAlign = (numberOfChannels * bitsPerSample) / 8;
    const wavDataByteLength = frameLength * numberOfChannels * bytesPerSample;
    const headerByteLength = 44;
    const totalLength = headerByteLength + wavDataByteLength;
    const waveFileData = new Uint8Array(totalLength);
    const subChunk1Size = 16;
    const subChunk2Size = wavDataByteLength;
    const chunkSize = 4 + (8 + subChunk1Size) + (8 + subChunk2Size);

    writeStringToArray("RIFF", waveFileData, 0);
    writeInt32ToArray(chunkSize, waveFileData, 4);
    writeStringToArray("WAVE", waveFileData, 8);
    writeStringToArray("fmt ", waveFileData, 12);

    // SubChunk1Size (4)
    writeInt32ToArray(subChunk1Size, waveFileData, 16);
    // AudioFormat (2): 3 means 32-bit float, 1 means integer PCM.
    writeInt16ToArray(as32BitFloat ? 3 : 1, waveFileData, 20);
    // NumChannels (2)
    writeInt16ToArray(numberOfChannels, waveFileData, 22);
    // SampleRate (4)
    writeInt32ToArray(sampleRate, waveFileData, 24);
    // ByteRate (4)
    writeInt32ToArray(byteRate, waveFileData, 28);
    // BlockAlign (2)
    writeInt16ToArray(blockAlign, waveFileData, 32);
    // BitsPerSample (4)
    writeInt32ToArray(bitsPerSample, waveFileData, 34);
    writeStringToArray("data", waveFileData, 36);
    // SubChunk2Size (4)
    writeInt32ToArray(subChunk2Size, waveFileData, 40);

    // Write actual audio data starting at offset 44.
    writeAudioBufferToArray(audioBuffer, waveFileData, 44, bitsPerSample);

    return new Blob([waveFileData], {
        type: "audio/wav"
    });
}

function writeStringToArray(aString, targetArray, offset) {
    for (let i = 0; i < aString.length; ++i) targetArray[offset + i] = aString.charCodeAt(i);
}

function writeInt16ToArray(aNumber, targetArray, offset) {
    const num = Math.floor(aNumber);
    targetArray[offset] = num & 255; // byte 1
    targetArray[offset + 1] = (num >> 8) & 255; // byte 2
}

function writeInt32ToArray(aNumber, targetArray, offset) {
    const num = Math.floor(aNumber);
    targetArray[offset] = num & 255; // byte 1
    targetArray[offset + 1] = (num >> 8) & 255; // byte 2
    targetArray[offset + 2] = (num >> 16) & 255; // byte 3
    targetArray[offset + 3] = (num >> 24) & 255; // byte 4
}

// Returns the number of bits for a float as a 32-bit integer value.
function getFloatBits(f) {
    const buf = new ArrayBuffer(4);
    new Float32Array(buf)[0] = f;
    const bits = new Uint32Array(buf)[0];
    // Return as a signed integer.
    return bits | 0;
}

function writeAudioBufferToArray(
    audioBuffer,
    targetArray,
    offset,
    bitDepth
) {
    let channel = 0;
    const length = audioBuffer.length;
    const channels = audioBuffer.numberOfChannels;
    let channelData, sample;
    let position = offset;

    // Clamping samples onto the 16-bit resolution.
    for (let index = 0; index < length; ++index) {
        for (channel = 0; channel < channels; ++channel) {
            channelData = audioBuffer.getChannelData(channel);

            // Branches upon the requested bit depth
            if (bitDepth === 16) {
                sample = channelData[index] * 32768.0;
                if (sample < -32768) sample = -32768;
                else if (sample > 32767) sample = 32767;
                writeInt16ToArray(sample, targetArray, position);
                position += 2;
            } else if (bitDepth === 32) {
                // This assumes we're going to out 32-float, not 32-bit linear.
                sample = getFloatBits(channelData[index]);
                writeInt32ToArray(sample, targetArray, position);
                position += 4;
            } else {
                Logger.error("Invalid bit depth for PCM encoding.");
                return;
            }
        }
    }
}

