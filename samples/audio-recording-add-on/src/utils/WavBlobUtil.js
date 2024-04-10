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
/**
 * A utility function to convert the raw blob coming from the media Recorder
 * web API
 *  from browser to a wav blob that we connect into wav blob with an
 * HPC codec. 
 */
export class WavBlobUtil {
    //Takes the rawBlob of media Recorder as input and convert it into hpc codec wav blob.
    static async getHpcBlob(audioBlob) {
        const url = URL.createObjectURL(audioBlob);
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        return this.getWavBlob(audioBuffer); // Changed to use "this" to refer to the static method
    }

    // Returns Uint8Array of WAV bytes
    static getWavBlob(audioBuffer, as32BitFloat = false) {
        // Changed to static method
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

        this.writeStringToArray("RIFF", waveFileData, 0); // Changed to use "this" to refer to the static method
        this.writeInt32ToArray(chunkSize, waveFileData, 4); // Changed to use "this" to refer to the static method
        this.writeStringToArray("WAVE", waveFileData, 8); // Changed to use "this" to refer to the static method
        this.writeStringToArray("fmt ", waveFileData, 12); // Changed to use "this" to refer to the static method

        // SubChunk1Size (4)
        this.writeInt32ToArray(subChunk1Size, waveFileData, 16); // Changed to use "this" to refer to the static method
        // AudioFormat (2): 3 means 32-bit float, 1 means integer PCM.
        this.writeInt16ToArray(as32BitFloat ? 3 : 1, waveFileData, 20); // Changed to use "this" to refer to the static method
        // NumChannels (2)
        this.writeInt16ToArray(numberOfChannels, waveFileData, 22); // Changed to use "this" to refer to the static method
        // SampleRate (4)
        this.writeInt32ToArray(sampleRate, waveFileData, 24); // Changed to use "this" to refer to the static method
        // ByteRate (4)
        this.writeInt32ToArray(byteRate, waveFileData, 28); // Changed to use "this" to refer to the static method
        // BlockAlign (2)
        this.writeInt16ToArray(blockAlign, waveFileData, 32); // Changed to use "this" to refer to the static method
        // BitsPerSample (4)
        this.writeInt32ToArray(bitsPerSample, waveFileData, 34); // Changed to use "this" to refer to the static method
        this.writeStringToArray("data", waveFileData, 36); // Changed to use "this" to refer to the static method
        // SubChunk2Size (4)
        this.writeInt32ToArray(subChunk2Size, waveFileData, 40); // Changed to use "this" to refer to the static method

        // Write actual audio data starting at offset 44.
        this.writeAudioBufferToArray(audioBuffer, waveFileData, 44, bitsPerSample); // Changed to use "this" to refer to the static method

        return new Blob([waveFileData], {
            type: "audio/wav"
        });
    }

    static writeStringToArray(aString, targetArray, offset) {
        // Changed to static method
        for (let i = 0; i < aString.length; ++i) targetArray[offset + i] = aString.charCodeAt(i);
    }

    static writeInt16ToArray(aNumber, targetArray, offset) {
        // Changed to static method
        const num = Math.floor(aNumber);
        targetArray[offset] = num & 255; // byte 1
        targetArray[offset + 1] = (num >> 8) & 255; // byte 2
    }

    static writeInt32ToArray(aNumber, targetArray, offset) {
        // Changed to static method
        const num = Math.floor(aNumber);
        targetArray[offset] = num & 255; // byte 1
        targetArray[offset + 1] = (num >> 8) & 255; // byte 2
        targetArray[offset + 2] = (num >> 16) & 255; // byte 3
        targetArray[offset + 3] = (num >> 24) & 255; // byte 4
    }

    // Returns the number of bits for a float as a 32-bit integer value.
    static getFloatBits(f) {
        const buf = new ArrayBuffer(4);
        new Float32Array(buf)[0] = f;
        const bits = new Uint32Array(buf)[0];
        // Return as a signed integer.
        return bits | 0;
    }

    static writeAudioBufferToArray(audioBuffer, targetArray, offset, bitDepth) {
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
                    this.writeInt16ToArray(sample, targetArray, position); // Changed to use "this" to refer to the static method
                    position += 2;
                } else if (bitDepth === 32) {
                    // This assumes we're going to output 32-float, not 32-bit linear.
                    sample = this.getFloatBits(channelData[index]); // Changed to use "this" to refer to the static method
                    this.writeInt32ToArray(sample, targetArray, position); // Changed to use "this" to refer to the static method
                    position += 4;
                } else {
                    Logger.error("Invalid bit depth for PCM encoding.");
                    return;
                }
            }
        }
    }
}
