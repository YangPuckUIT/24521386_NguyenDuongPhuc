
/**
 * FIFO beat recorder.
 * Stores drum events in the order they are triggered.
 * Does not handle keyboard input or audio playback.
 */

class BeatRecorder {
    constructor(listElement) {
        this.listElement = listElement;
        this.events = [];
    }

    record(event) {
        const beatEvent = {
            key: event.key,
            sound: event.sound,
            timestamp: event.timestamp
        };

        this.events.push(beatEvent);
        this.renderEvent(beatEvent);
    }

    renderEvent(event) {
        const item = document.createElement("li");
        const time = (event.timestamp / 1000).toFixed(2);

        item.textContent = `${time}s - ${event.key.toUpperCase()} - ${event.sound}`;
        this.listElement.appendChild(item);
    }

    clear() {
        this.events.length = 0;
        this.listElement.replaceChildren();
    }

    getEvents() {
        return [...this.events];
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = BeatRecorder;
}
