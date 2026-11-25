# Homework 1 – Task Decomposition

## Project: Full-Stack Interactive Card-Swipe Deck

**Edition:** Hen Ho Nhung Khong Yeu

## 1. Project Overview

Build a full-stack interactive card-swiping application where users can view profiles and make decisions through swipe actions.

The application supports keyboard and pointer interactions, undo functionality, score calculation, and database persistence.

## 2. Technology Stack

- Frontend: React 19, Vite, CSS
- Backend: Node.js, Express
- Database: MongoDB
- ODM: Mongoose 8
- API: REST API

## 3. Task Breakdown

### Phase 1: Project Setup

- [x] Create frontend and backend structure.
- [x] Initialize React 19 with Vite.
- [x] Initialize Express backend.
- [x] Configure environment variables.
- [x] Set up Git and dependencies.

### Phase 2: Frontend Interface

- [x] Build the main application layout.
- [x] Create profile cards.
- [x] Implement swipe controls.
- [x] Display remaining cards and game statistics.
- [x] Add responsive styling.

### Phase 3: Swipe Interactions

- [x] Implement keyboard event handling.
- [x] Implement pointer-based swipe gestures.
- [x] Support Like, Reject, and Super Like actions.
- [x] Implement LIFO Undo Stack.
- [x] Handle empty deck and reset states.

### Phase 4: Score System

- [x] Define asymmetric scoring rules.
- [x] Calculate scores using derived state.
- [x] Display updated scores and statistics.

### Phase 5: Backend Development

- [x] Configure Express server.
- [x] Connect MongoDB using Mongoose 8.
- [x] Create Profile and Swipe models.
- [x] Implement REST API endpoints.
- [x] Validate incoming requests.

### Phase 6: Full-Stack Integration

- [x] Connect frontend with backend APIs.
- [x] Load profiles from MongoDB.
- [x] Persist swipe actions.
- [x] Retrieve swipe history.
- [x] Verify data persistence after reload.

### Phase 7: Testing and Documentation

- [x] Test keyboard and pointer interactions.
- [x] Test undo order and score calculation.
- [x] Test REST API endpoints.
- [x] Verify MongoDB persistence.
- [x] Capture screenshots and evidence.
- [x] Complete README documentation.

## 4. Completion Criteria

- Keyboard and pointer swipe interactions work correctly.
- Undo restores the latest swipe action using LIFO order.
- Scores are calculated through derived state.
- Express and Mongoose 8 APIs work correctly.
- Swipe data is persisted in MongoDB.
- Application works without critical console or server errors.
