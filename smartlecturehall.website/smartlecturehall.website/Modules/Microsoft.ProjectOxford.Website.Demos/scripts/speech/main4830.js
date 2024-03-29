window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = null;
if (AudioContext) {
    audioContext = new AudioContext();
}
var audioRecorder = null;
var isRecording = false;
var audioSource = null;

function gotAudioStream(stream) {
    this.audioSource = stream;
    var inputPoint = this.audioContext.createGain();
    this.audioContext.createMediaStreamSource(this.audioSource).connect(inputPoint);
    this.audioRecorder = new Recorder(inputPoint);
    startWebSocketForMic();
    this.isRecording = true;

    //call telemetry for speech demo.
    // window.telemetry.trackDemo("Speech", "Speech to Text", "Microphone");
}

function startRecording() {
    if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    }

    navigator.getUserMedia({
        "audio": true,
    }, gotAudioStream.bind(this), function (e) {
        window.alert('Microphone access was rejected.');
    });
}

function stopSounds() {
    var sample1 = $('.sample1').get(0);
    sample1.pause();
    sample1.currentTime = 0;
    var sample2 = $('.sample2').get(0);   
    if ($('#speech_sample_2').css("display") !== "none") {
        sample2.pause();
        sample2.currentTime = 0;
    } 
}

function playSound(sample) {
    stopSounds();
    sample.play();
}

function stopRecording() {
    if (this.isRecording) {
        this.isRecording = false;
        if (audioSource.stop) {
            audioSource.stop();
        }
        audioRecorder.stop();
        stopWebSocket();
        $('.mic.demo_btn').removeClass("listening");
        $('#microphoneText').text("Click on the microphone to start speaking.");
    }
}

function stopWebSocket() {
    if (websocket) {
        websocket.onmessage = function() {};
        websocket.onerror = function() {};
        websocket.onclose = function() {};
        websocket.close();
    }
}

function micOnClick() {
    if (this.isRecording) {
        this.stopRecording();
    }
    else {
        this.startRecording();
    }
}
