# HW 2 — 88-Key Polyphonic Piano & Concurrent FIFO Sequencer

## 1. Project Overview

Build an interactive 88-key piano using React 19, Vite,
and the Web Audio API.

The application combines:

- Algorithmic 88-key generation
- React.memo render isolation
- 8-voice polyphonic synthesis
- FIFO voice stealing
- FIFO recording and asynchronous replay
- AbortController cancellation
- Audio resource cleanup

## 2. Technology Stack

- React 19
- Vite
- JavaScript (ES6+)
- Web Audio API
- CSS
- React DevTools Profiler

## 3. Component Decomposition

### 3.1 App.jsx

Responsibilities:

- Application entry component
- Integrate piano and audio engine
- Manage active voice state
- Connect UI events to audio operations

### 3.2 Piano.jsx

Responsibilities:

- Render all 88 piano keys
- Map note data to PianoKey components
- Pass stable event callbacks

### 3.3 PianoKey.jsx

Responsibilities:

- Represent one piano key
- Handle pointer and keyboard interactions
- Display pressed state
- Use React.memo to avoid unnecessary renders

### 3.4 SequencerControls.jsx

Responsibilities:

- Start and stop recording
- Select replay speed
- Start and stop sequence playback
- Display recording and playback status

Status: Not implemented

## 4. Audio Engine Decomposition

### 4.1 pianoNotes.js

Responsibilities:

- Generate MIDI notes 21–108
- Calculate note names and octaves
- Calculate frequencies
- Identify white and black keys

Status: Completed

### 4.2 PolyphonicSynth.js

Responsibilities:

- Initialize AudioContext
- Generate oscillator-based sound
- Track active voices using Map
- Limit polyphony to 8 voices
- Apply FIFO voice stealing
- Apply click-free gain envelopes
- Release oscillators and audio resources

Status: Implemented — pending detailed testing

### 4.3 AudioTaskQueue.js

Responsibilities:

- Store recorded note events in FIFO order
- Preserve note timing and duration
- Replay sequences asynchronously
- Support 0.5x, 1.0x, and 2.0x speed
- Support AbortController cancellation
- Clean up pending timers

Status: Not implemented

### 4.4 usePiano.js

Responsibilities:

- Encapsulate piano state and audio operations
- Manage recording lifecycle
- Manage replay lifecycle
- Coordinate React state with the synth
- Handle cleanup on unmount

Status: Not implemented

## 5. Implementation Progress

| Step | Task                              | Status      |
| ---- | --------------------------------- | ----------- |
| 1    | Initialize React + Vite           | Completed   |
| 2    | Create project structure          | Completed   |
| 3    | Generate 88 MIDI notes            | Completed   |
| 4    | Implement memoized PianoKey       | Completed   |
| 5    | Render piano keyboard             | Completed   |
| 6    | Implement PolyphonicSynth         | Implemented |
| 7    | Implement FIFO AudioTaskQueue     | Implemented |
| 7.1  | Redesign UI with KEYCLUB theme    | Implemented |
| 8    | Implement recording and replay UI | Pending     |
| 9    | Integrate AbortController with UI | Pending     |
| 10   | Extract usePiano hook             | Pending     |
| 11   | Verify React.memo isolation       | Pending     |
| 12   | Test concurrency and cleanup      | Pending     |
| 13   | Production build verification     | Pending     |

## 6. Functional Requirements

### Piano

- [x] Generate 88 notes from A0 to C8
- [x] Generate 52 white and 36 black keys
- [x] Calculate frequencies mathematically
- [x] Render keys using Array.map()
- [x] Implement React.memo for PianoKey
- [x] Support pointer interaction
- [x] Add basic keyboard interaction

### Polyphonic Audio

- [x] Use Web Audio API
- [x] Use ES6 Map for voice tracking
- [x] Limit active voices to 8
- [x] Implement FIFO voice stealing
- [x] Implement smooth attack and release
- [ ] Verify all voice-stealing edge cases

### FIFO Sequencer

- [ ] Record MIDI and frequency
- [ ] Record durationMs and deltaMs
- [ ] Store events in FIFO order
- [ ] Replay asynchronously
- [ ] Support 0.5x speed
- [ ] Support 1.0x speed
- [ ] Support 2.0x speed
- [ ] Cancel replay with AbortController
- [ ] Stop active oscillators on cancellation

### Performance and Cleanup

- [ ] Verify render isolation with React Profiler
- [ ] Verify no more than 8 active voices
- [ ] Verify cleanup on unmount
- [ ] Verify no stuck notes
- [ ] Verify production build

## 7. Architecture

App
|
+-- Piano
| |
| +-- PianoKey (React.memo) × 88
|
+-- PolyphonicSynth
| |
| +-- AudioContext
| +-- Map<MIDI, Voice>
| +-- OscillatorNode
| +-- GainNode
|
+-- SequencerControls (planned)
|
+-- usePiano (planned)
|
+-- AudioTaskQueue
+-- AbortController

## 8. Current Limitations

- Recording and replay are not implemented.
- FIFO AudioTaskQueue is not integrated.
- AbortController replay cancellation is not implemented.
- React.memo performance has not been verified in Profiler.
- Keyboard interaction needs further edge-case testing.
- Audio cleanup requires additional concurrency testing.

## 9. Next Step

Step 7: Implement AudioTaskQueue.js.

Expected features:

- FIFO recording of note events
- Accurate note durations and timing
- Asynchronous replay
- Variable playback speed
- Abortable playback

## 10. Change Log

### 2026-11-11

- Initialized React 19 + Vite project.
- Created 88-key note generation algorithm.
- Implemented Piano and memoized PianoKey.
- Added responsive, horizontally scrollable keyboard.
- Implemented PolyphonicSynth with 8-voice limit.
- Added FIFO voice stealing using Map.
- Added smooth oscillator attack and release.
- Integrated audio engine with App.jsx.
- Created decomposition.md.

### 2026-11-11 - Step 7

Implemented:

- Created AudioTaskQueue using FIFO event ordering.
- Added task validation and immutable replay snapshots.
- Implemented asynchronous sequence replay.
- Added 0.5x, 1.0x and 2.0x playback speeds.
- Supported overlapping note durations.
- Added AbortSignal cancellation and timer cleanup.
- Redesigned the interface as KEYCLUB.
- Replaced the previous dark dashboard styling.
- Introduced a retro arcade color palette.
- Added responsive instrument status panels.

Pending verification:

- Automated queue tests.
- Cancellation during active playback.
- Overlapping repeated-note edge cases.
- Full recording and replay integration.

### Next Step

Step 8: Recording and Replay Integration.

Tasks:

- Implement recording lifecycle.
- Capture MIDI, frequency, duration and delta time.
- Connect AudioTaskQueue to PolyphonicSynth.
- Build interactive sequencer controls.
- Add playback speed selection.
- Implement Stop Sequence.
