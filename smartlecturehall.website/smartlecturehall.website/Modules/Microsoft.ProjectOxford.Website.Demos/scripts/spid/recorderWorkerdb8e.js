
var recLength = 0;
var recBuffers = [];

var Float32Array = Float32Array || {};

var ArrayBuffer = ArrayBuffer || {};

var DataView = DataView || {};

this.onmessage = function (e) {
    "use strict";
    switch (e.data.command) {
        case "record":
            record(e.data.buffer, e.data.sampleRate);
            break;
        case "exportWAV":
            exportWAV(e.data.type);
            break;
        case "clear":
            clear();
            break;
    }
};

function record(inputBuffer, sampleRate) {
    "use strict";
    /* downsampling */
    var ratio = sampleRate / 16000;
    var newLength = Math.round(inputBuffer.length / ratio);
    var result = new Float32Array(newLength);
    var offsetResult = 0;
    var offsetBuffer = 0;
    while (offsetResult < result.length) {
        var next = Math.round((offsetResult + 1) * ratio);
        var accumulator = 0, count = 0;
        for (var i = offsetBuffer; i < next && i < inputBuffer.length; i++) {
            accumulator += inputBuffer[i];
            count++;
        }
        result[offsetResult] = Math.min(1, accumulator / count);
        offsetResult++;
        offsetBuffer = next;
    }

    recBuffers.push(result);
    recLength += result.length;
}


function exportWAV(type) {
    "use strict";
    var buffer = mergeBuffers(recBuffers, recLength);
    var data_view = encodeWAV(buffer);
    var audioBlob = new Blob([data_view], { type: type });

    postMessage(audioBlob);

}

function clear() {
    "use strict";
    recLength = 0;
    recBuffers = [];
}

function mergeBuffers(_recBuffers, _recLength) {
    "use strict";
    var result = new Float32Array(_recLength);
    var offset = 0;
    for (var i = 0; i < _recBuffers.length; i++) {
        result.set(_recBuffers[i], offset);
        offset += _recBuffers[i].length;
    }
    return result;
}

function floatTo16BitPCM(output, offset, input) {
    "use strict";
    for (var i = 0; i < input.length; i++, offset += 2) {
        var s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
}

function writeString(view, offset, string) {
    "use strict";
    for (var i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

function encodeWAV(samples) {
    "use strict";
    var buffer = new ArrayBuffer(44 + samples.length * 2);
    var view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, "RIFF");
    /* RIFF chunk length */
    view.setUint32(4, 36 + samples.length * 2, true);
    /* RIFF type */
    writeString(view, 8, "WAVE");
    /* format chunk identifier */
    writeString(view, 12, "fmt ");
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, 1, true);
    /* sample rate */
    view.setUint32(24, 16000, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, 16000 * 2, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, 2, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, "data");
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    floatTo16BitPCM(view, 44, samples);

    return view;
}
