# HW3 — High-Concurrency Flash-Sale E-Commerce Engine

## Project Overview

Develop a Vietnam 11.11 Flash Sale simulation using Vite and TypeScript.

The project focuses on accurate countdown timing, inventory reservation, lock expiration, checkout processing, and concurrent purchase simulation.

## Task Decomposition

### M0 — Project Initialization
- [x] Initialize Vite + TypeScript
- [x] Clean default Vite files
- [x] Create initial application interface
- [x] Configure project structure
- [ ] Verify production build
- [ ] Complete initial documentation

**Commit:** `chore(hw3): initialize Vite TypeScript project`

### M1 — Flash Sale Interface
- [ ] Create responsive product layout
- [ ] Display product prices and discounts
- [ ] Display available stock
- [ ] Add countdown and purchase controls

**Commit:** `feat(hw3): build flash sale interface`

### M2 — Anti-Drift Timer
- [ ] Implement Date.now()-based countdown
- [ ] Use requestAnimationFrame
- [ ] Support timer cancellation
- [ ] Test countdown accuracy

**Commit:** `feat(hw3): implement anti-drift countdown timer`

### M3 — Inventory State Machine
- [ ] Define reservation states
- [ ] Implement valid transitions
- [ ] Reject invalid transitions
- [ ] Prevent negative inventory

**Commit:** `feat(hw3): implement inventory state machine`

### M4 — Inventory Reservation
- [ ] Implement temporary inventory locks
- [ ] Track reservation expiration
- [ ] Release expired reservations
- [ ] Prevent duplicate releases

**Commit:** `feat(hw3): implement reservation lock expiry`

### M5 — Checkout Controller
- [ ] Implement successful checkout
- [ ] Handle checkout failure
- [ ] Reject expired reservations
- [ ] Synchronize inventory state

**Commit:** `feat(hw3): implement checkout lifecycle`

### M6 — Concurrency Testing
- [ ] Simulate concurrent purchase attempts
- [ ] Verify overselling prevention
- [ ] Test reservation expiry
- [ ] Test checkout race conditions

**Commit:** `test(hw3): verify concurrent inventory operations`

### M7 — AI Failure Mode Audit
- [ ] Document at least three verified AI flaws
- [ ] Explain impact and corrections
- [ ] Provide verification evidence
- [ ] Complete final documentation

**Commit:** `docs(hw3): complete AI failure audit and documentation`

## Acceptance Criteria

- Countdown uses actual elapsed time
- Inventory never becomes negative
- Expired reservations cannot complete checkout
- Reservations are released exactly once
- Concurrent purchase simulation prevents overselling
- AI_FAILURE_AUDIT.md documents at least three genuine AI flaws
- At least eight atomic Conventional Commits

## Evidence Checklist

- [ ] M0 project initialization
- [ ] M1 flash sale interface
- [ ] M2 anti-drift timer
- [ ] M3 inventory state machine
- [ ] M4 reservation expiry
- [ ] M5 checkout lifecycle
- [ ] M6 concurrency tests
- [ ] M7 AI failure audit
- [ ] Git commit history
