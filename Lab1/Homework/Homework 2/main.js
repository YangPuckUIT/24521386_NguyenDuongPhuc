const audioEngine = new AudioEngine();

const keyboardController = new KeyboardController(
    audioEngine,
    (event) => {
        console.log("Drum event:", event);
    }
);

keyboardController.init();