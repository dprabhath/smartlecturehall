

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var Worker = Worker || {};

var audioContext = null;
if (AudioContext) {
    audioContext = new AudioContext();
}
var audioRecorder = null;
var isRecording = false;
var audioSource = null;

function gotAudioStream(stream) {
    "use strict";
    audioSource = stream;
    var inputPoint = audioContext.createGain();
    audioContext.createMediaStreamSource(audioSource).connect(inputPoint);
    audioRecorder = new Recorder(inputPoint);
    startMic();
    isRecording = true;
}

function micOnClick() {
    "use strict";
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

function startRecording() {
    "use strict";
    if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    }
    navigator.getUserMedia(
        { audio: true }, gotAudioStream.bind(this), function (e) {
            alert("Microphone access was rejcted.");
            Debug.write("Microphone access was rejcted.");
        });
}

function stopRecording() {
    "use strict";
    if (isRecording) {
        isRecording = false;
        if (audioSource.stop) {
            audioSource.stop();
        }
        audioRecorder.stop();

        $("div[data-name='micBtn']").removeClass("miclistening");
        $("div[data-name='micBtn']").addClass("micBtn");
        $("div[data-name='guidingText']").html("Click on the microphone to start speaking");
        uploadVoice();
    }
}

function uploadVoice() {
    "use strict";
    audioRecorder && audioRecorder.exportWAV(function (blob) {

        DataSet.stepNum = $("input[data-name='stepNum']").val();
        var reader = new window.FileReader();
        reader.onload = function (e) {
            DataSet.Data = reader.result;
            if (DataSet.Data.length > 7000000) {
                $("pre[data-name='code']", $("div[id='verification']")).html("The demo does not support more than 5MB file, please upload again.");
                DataSet.Data = "";
                $(this).val("");
                return;
            };
            getTheResult(DataSet);
        };
        reader.readAsDataURL(blob);

    });
}

(function (window) {
    "use strict";
    //var worker_path = "../Scripts/spid/recorderWorker.js";
    var worker_path = window.applicationRoot + "/Modules/Microsoft.ProjectOxford.Website.Demos/Scripts/spid/recorderWorker.js";
    var Recorder = function (source) {
        var bufferLen = 4096;
        var numChannels = 1;
        this.context = source.context;
        this.node = (this.context.createScriptProcessor ||
                     this.context.createJavaScriptNode).call(this.context,
                     bufferLen, numChannels, numChannels);

        var worker = new Worker(worker_path);

        var recording = false;

        var currentCallback;

        this.node.onaudioprocess = function (e) {
            if (!recording) { return; }
            var buffer = e.inputBuffer.getChannelData(0);

            worker.postMessage({
                command: "record",
                buffer: buffer,
                sampleRate: e.inputBuffer.sampleRate
            });
        };

        this.record = function () {
            recording = true;
        };

        this.stop = function () {
            recording = false;
        };

        this.clear = function () {
            worker.postMessage({ command: "clear" });
        };

        this.exportWAV = function (cb) {
            currentCallback = cb;
            var type = "audio/wav";
            if (!currentCallback) { throw new Error("Callback not set"); }
            worker.postMessage({
                command: "exportWAV",
                type: type
            });
        };

        worker.onmessage = function (e) {
            var blob = e.data;
            if (!!currentCallback) { currentCallback(blob); }
        };

        source.connect(this.node);
        this.node.connect(this.context.destination);   // If the script node is not connected to an output the "on audio process" event is not triggered in chrome.
    };

    window.Recorder = Recorder;

})(window);

function startMic() {
    "use strict";
    audioRecorder.record();
    $("div[data-name='micBtn']").removeClass("micBtn");
    $("div[data-name='micBtn']").addClass("miclistening");
    $("div[data-name='guidingText']").html("Please speak. Click on the microphone again to stop listening");
}

function getTheResult(formData) {
    "use strict";
    $("pre[data-name='code']", $("div[id='verification']")).html("");
    $("div[data-name='dealing']", $("div[id='verification']")).show();
    if (DealStatus !== 0) {
        $("pre[data-name='code']", $("div[id='verification']")).html("Please wait a moment...");
        DataSet.Data = "";
        return;
    }
    DealStatus = 1;
    $.ajaxAntiForgery({
        type: "POST",
        data: formData,
        dataType: "json",
        url: window.applicationRoot + "/Demo/SPIDDemo/VerificateSpeakerByFile",
        success: function (result) {
            reCaptchaSdk.RemoveReCaptcha();
            DealStatus = 0;
            $("input[type='file']", $("div[id='verification']")).val("");
            var obj = JSON.parse(result);
            if (obj !== null && obj.response !== null && obj.response !== undefined) {
                $("pre[data-name='code']", $("div[id='verification']")).html(JSON.stringify(obj.response, null, 2));
                if (obj.response.enrollmentStatus === "Enrolled") {
                    DataSet.enrollmentStatus = "Enrolled";
                    $("div[data-name='NotificationText']").text("Congratulations! Your voice is successfully enrolled.  You can verify your voice now!");
                }
                if (SuccessNum === 1) {
                    $("div[data-name='NotificationText']").text("Your first enrollment is successful! We need two more samples of your voice saying the same phrase.");
                    SuccessNum++;
                } else if (SuccessNum > 1 && DataSet.enrollmentStatus !== "Enrolled") {
                    $("div[data-name='NotificationText']").text("Cool. Just give me one more sample. Almost there!");
                }
            } else {
                $("pre[data-name='code']", $("div[id='verification']")).html(JSON.stringify(obj, null, 2));
                if (obj.error && DataSet.enrollmentStatus !== "Enrolled") {
                    if (FailNum === 1) {
                        $("div[data-name='NotificationText']").text("Sorry that your enrollment is not successful. We need another clearer sample of your voice reading the above phrase.");
                        FailNum++;
                    } else if (FailNum > 1) {
                        $("div[data-name='NotificationText']").text("Ooops, failed again. Please try another sample.");
                    }
                } else if (obj.error && DataSet.enrollmentStatus === "Enrolled") {
                    $("div[data-name='NotificationText']").text("Verification error!");
                } else if (obj.result) {
                    if (DataSet.enrollmentStatus === "Enrolled" && obj.result === "Accept") {
                        $("div[data-name='NotificationText']").text("Verification accepted!");
                    } else if (DataSet.enrollmentStatus === "Enrolled" && obj.result === "Reject") {
                        $("div[data-name='NotificationText']").text("Verification rejected!");
                    }
                }
            }

            if (obj !== null && !obj.error) {
                if (!!obj.verificationId) {
                    DataSet.VerificationProfileId = obj.verificationId;
                }
            }

            $("div[data-name='dealing']", $("div[id='verification']")).hide();
        },
        error: function (e) {
            reCaptchaSdk.ProcessReCaptchaStateCode(e, 'reCaptcha-SpeakerVerification-demo');
            DealStatus = 0;
            $("input[type='file']", $("div[id='verification']")).val("");
            $("pre[data-name='code']", $("div[id='verification']")).html("");
            $("div[data-name='dealing']", $("div[id='verification']")).hide();
            if (e.status == 403 && e.responseText!="") {
                $("div[data-name='NotificationText']").text(e.responseText);
                return;
            }
            if (FailNum === 1) {
                $("div[data-name='NotificationText']").text("Sorry that your enrollment is not successful. We need another clearer sample of your voice reading the above phrase.");
                FailNum++;
            } else if (FailNum > 1) {
                $("div[data-name='NotificationText']").text("Ooops, failed again. Please try another sample.");
            }
        }
    });

    DataSet.Data = "";
}