/**
 * Keyboard controller.
 * Reads key bindings from the HTML data contract.
 * Does not implement audio playback itself.
 */

class KeyboardController {
    constructor(audioEngine, onTrigger = () => {}) {
        this.audioEngine = audioEngine;
        this.onTrigger = onTrigger;
        this.keyMap = new Map();
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    init() {
        this.keyMap.clear();

        const drumPads = document.querySelectorAll(".drum-pad[data-key][data-sound]");

        for (const pad of drumPads) {
            const key = pad.dataset.key.toLowerCase();
            const sound = pad.dataset.sound;

            if (this.keyMap.has(key)) {
                throw new Error(`Duplicate key binding: ${key}`);
            }

            this.keyMap.set(key, sound);
        }

        document.addEventListener("keydown", this.handleKeyDown);
    }

    async handleKeyDown(event) {
        if (event.repeat) {
            return;
        }

        if (event.ctrlKey || event.altKey || event.metaKey) {
            return;
        }

        const key = event.key.toLowerCase();
        const sound = this.keyMap.get(key);

        if (!sound) {
            return;
        }

        try {
            await this.audioEngine.init();
            this.audioEngine.play(sound);
            this.onTrigger({
                key,
                sound,
                timestamp: performance.now()
            });
        } catch (error) {
            console.error("Failed to play drum sound:", error);
        }
    }

    destroy() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = KeyboardController;
}