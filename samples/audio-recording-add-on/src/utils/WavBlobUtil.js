export class WavBlobUtil {

    static async getHpcBlob(audioBlob) {
        const url = URL.createObjectURL(audioBlob);
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        return getWavBlob(audioBuffer);    
    }

}

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
