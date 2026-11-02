
# Exercise 3: PUBG Vietnam Series Live Telemetry

## 1. Problem Decomposition

The goal is to build a fault-tolerant PUBG live telemetry
dashboard using React.

The problem is divided into six smaller tasks.

### Task 1: Squad Data Management
- Create a dataset for three Vietnamese PUBG squads.
- Store squad information in a separate JavaScript file.
- Include name, map, phase, alive players, kills,
  WWCD probability, and status.

### Task 2: Simulated Telemetry API
- Create a function to simulate fetching telemetry.
- Simulate network latency of 1.5 to 3 seconds.
- Simulate a 35% satellite packet loss probability.
- Support AbortController to cancel pending requests.

### Task 3: Four-State Machine
- IDLE: Initial state before loading.
- LOADING: Telemetry is being fetched.
- SUCCESS: Telemetry data is available.
- ERROR: Telemetry request has failed.
- Manage state using React useState and useEffect.

### Task 4: Squad Selection and Request Cancellation
- Allow users to select CES, TE, or GE.
- Fetch new telemetry when the selected squad changes.
- Abort previous requests using effect cleanup.
- Ignore AbortError to prevent false error messages.
- Prevent stale requests from overwriting current data.

### Task 5: Skeleton Loading and Error Recovery
- Display a 220px Blue-Zone Skeleton while loading.
- Add a pulsing animation.
- Display errors using section role="alert".
- Provide a Reconnect Satellite (Retry) button.
- Retry failed requests using a retry counter.
- Do not use window.alert().

### Task 6: Testing and Version Control
- Test loading and error states.
- Test rapid switching between CES, TE, and GE.
- Verify request cancellation.
- Inspect layout shifts using DevTools.
- Create two atomic Git commits.
- Push the completed exercise to GitHub.

## 2. Component Structure

App
|
|-- Squad Selector
|
|-- PubgMatchTelemetry
    |
    |-- IDLE
    |-- LOADING: Skeleton Radar
    |-- SUCCESS: Squad Statistics
    |-- ERROR: Alert and Retry Button

## 3. Expected Results

- Users can switch between three PUBG squads.
- Telemetry updates after simulated loading.
- Failed requests display an accessible error message.
- Users can retry failed requests.
- Rapid switching does not display stale telemetry.
- Loading uses a 220px animated skeleton.
- The application handles cancellation safely.

## 4. Git Commit Plan

Commit 1:
feat(ex3): implement PUBG VN 4-state telemetry & AbortController

Commit 2:
feat(ex3): add skeleton UI & retry alert
