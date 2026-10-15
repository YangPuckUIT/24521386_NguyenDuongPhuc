
const audioEngine = new AudioEngine();

const beatList = document.querySelector("#beat-list");
const recorder = new BeatRecorder(beatList);

const keyboardController = new KeyboardController(
    audioEngine,
    (event) => {
        recorder.record(event);
        console.log("Drum event:", event);
    }
);

keyboardController.init();
