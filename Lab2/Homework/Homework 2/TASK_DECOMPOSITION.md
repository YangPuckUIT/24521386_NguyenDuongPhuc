# Homework 2 — Task Decomposition

**Project:** FREQ / ROOM — Concurrent FIFO Audio Visualizer
**Student ID:** 24521386
**Technology:** TypeScript, Vite, Web Audio API, Canvas API

## 1. Project Objective

Build a browser-based audio player that processes audio files using a First-In, First-Out (FIFO) task queue, supports cancellation, and visualizes audio frequencies in real time.

## 2. Task Decomposition

| Milestone                    | Tasks                                                                                                | Deliverables                                              | Status                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------- |
| M0 — Project Setup           | Initialize Vite with TypeScript and configure the project                                            | `package.json`, `tsconfig.json`, `index.html`             | Completed                  |
| M1 — FIFO Queue              | Implement sequential fetch/decode operations, `AbortController`, and pending-task cancellation       | `audio-queue-controller.ts`, queue and cancellation tests | Completed                  |
| M2 — Audio Engine            | Implement `AudioContext`, `AnalyserNode`, audio playback, stop, and resource cleanup                 | `audio-engine.ts`, engine test                            | Completed                  |
| M3 — Audio Visualizer        | Implement Canvas rendering with `requestAnimationFrame`, frequency analysis, and responsive resizing | `audio-visualizer.ts`, visualizer test                    | Completed                  |
| M4 — Application Integration | Build the UI, connect the queue and audio engine, implement automatic track progression              | `audio-app.ts`, `main.ts`, `style.css`                    | Completed                  |
| M5 — Queue Controls          | Implement playback controls, clear queue, cancellation, and UI state updates                         | Updated `audio-app.ts`                                    | Completed                  |
| M6 — Verification            | Run TypeScript checks, verify FIFO behavior, cancellation, playback, and visualizer                  | Test results and screenshots                              | Pending final verification |

## 3. System Workflow

1. The user selects one or more local audio files.
2. Each file is added to the FIFO processing queue.
3. The queue fetches and decodes one audio file at a time.
4. Successfully decoded audio buffers are stored in playlist order.
5. The user presses Play to start playback.
6. The audio engine sends frequency data to the Canvas visualizer.
7. When a track finishes naturally, the next track starts automatically.
8. Stop interrupts playback without advancing the playlist.
9. Clear Queue cancels processing, stops playback, and resets the application.

## 4. Technical Components

| Component              | Responsibility                                                 |
| ---------------------- | -------------------------------------------------------------- |
| `AudioTaskQueue`       | Sequential processing, pending tasks, and cancellation         |
| `AudioEngine`          | Web Audio playback, analyser, and audio source cleanup         |
| `AudioVisualizer`      | Real-time Canvas frequency visualization                       |
| `initializeAudioApp()` | User interactions, playlist state, and application integration |

## 5. Testing Strategy

- **FIFO order:** Confirm tasks execute in the same order they were enqueued.
- **Cancellation:** Confirm active requests can be aborted and pending tasks can be rejected.
- **Audio playback:** Verify Play, Stop, and automatic track progression.
- **Visualizer:** Verify frequency bars respond to audio and animation can stop.
- **Queue reset:** Verify Clear Queue removes tracks and allows selecting the same files again.
- **TypeScript:** Run `tsc --noEmit` to check for type errors.

## 6. Completion Criteria

The homework is ready for submission when:

- [x] FIFO audio processing is implemented.
- [x] `AbortController` cancellation is implemented.
- [x] Web Audio playback and resource cleanup are implemented.
- [x] Real-time Canvas visualization is implemented.
- [x] Automatic playlist progression is implemented.
- [x] Clear Queue resets the application.
- [x] All final verification tests pass.
- [x] Required screenshots and report are prepared.
