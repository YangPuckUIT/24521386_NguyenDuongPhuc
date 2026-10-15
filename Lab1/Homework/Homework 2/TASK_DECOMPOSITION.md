# HW2: Drum Kit Engine

## 1. Objective

Build a browser-based drum kit using HTML, CSS, and JavaScript.

The application allows users to play drum sounds using keyboard keys. It must support polyphonic audio playback, prevent repeated keyboard events, and record drum events in FIFO order with timestamps.

## 2. Architecture

### Component 1: HTML Data Contract

**Responsibilities**
- Define drum pads and keyboard mappings in HTML.
- Use `data-key` to identify keyboard bindings.
- Use `data-sound` to identify sounds.
- Provide accessible labels for drum pads.

**Acceptance Criteria**
- Every drum pad has a valid key and sound identifier.
- Key bindings are unique.
- JavaScript reads mappings from HTML instead of hardcoding them.

### Component 2: Polyphonic Audio Engine

**Responsibilities**
- Manage and play audio resources.
- Allow multiple sounds to overlap.
- Operate independently of keyboard mappings and DOM elements.

**Acceptance Criteria**
- Each trigger plays the correct sound.
- Playing a new sound does not stop sounds already playing.
- The engine can be tested independently.

### Component 3: Keyboard Controller

**Responsibilities**
- Listen for `keydown` events.
- Read mappings from the HTML contract.
- Ignore events where `event.repeat` is true.
- Send valid triggers to the audio engine and beat recorder.

**Acceptance Criteria**
- Supported keys trigger the correct sounds.
- Holding a key does not generate repeated triggers.
- Changing a key binding does not require editing the audio engine.
- Unmapped keys do not trigger sounds.

### Component 4: FIFO Beat Recorder

**Responsibilities**
- Record valid drum triggers.
- Store a timestamp and sound identifier for each event.
- Maintain events in first-in, first-out order.

**Acceptance Criteria**
- Each valid trigger creates one event.
- Each event contains a timestamp and sound identifier.
- Events are retrieved in recording order.
- The recorder does not depend on specific keyboard keys.

## 3. Implementation Milestones

### M0: Planning
- Define architecture and component responsibilities.
- Establish acceptance criteria.
- Confirm the project structure.

### M1: HTML Contract
- Create the HTML structure and drum pads.
- Define `data-key` and `data-sound`.
- Validate the contract.
- Commit HTML before implementing JavaScript.

### M2: Audio Engine
- Implement independent audio playback.
- Verify simultaneous sound playback.
- Commit the engine separately.

### M3: Keyboard Controller
- Read keyboard mappings from HTML.
- Handle `keydown` and `event.repeat`.
- Connect the controller to the audio engine.
- Commit separately.

### M4: FIFO Beat Recorder
- Implement a timestamped event queue.
- Verify FIFO ordering.
- Connect the recorder to valid triggers.
- Commit separately.

### M5: Integration and Testing
- Test the complete application.
- Verify keyboard remapping.
- Check the Git history.
- Practice the live defense.

## 4. Architectural Constraints

- The HTML contract must be committed before JavaScript implementation.
- The audio engine must remain independent of keyboard mappings.
- The keyboard controller must read mappings from HTML.
- The beat recorder must preserve FIFO order.
- Each milestone must have a separate, meaningful commit.

## 5. Live Defense

**Scenario:** The instructor changes a drum pad's key binding.

**Expected result:**
1. Update the `data-key` attribute in HTML.
2. Verify that the new key triggers the correct sound.
3. Verify that the old key no longer triggers that pad.
4. Confirm that polyphonic playback and event recording still work.

**Time limit:** Three minutes.

## 6. Final Verification

- [ ] HTML contract committed before JavaScript.
- [ ] Audio engine supports overlapping sounds.
- [ ] Keyboard controller reads mappings from HTML.
- [ ] Repeated keydown events are ignored.
- [ ] Beat recorder stores timestamped events in FIFO order.
- [ ] Key remapping does not require modifying the audio engine.
- [ ] All components work together.
- [ ] Git history shows separate milestones.
- [ ] Live defense completed within three minutes.
