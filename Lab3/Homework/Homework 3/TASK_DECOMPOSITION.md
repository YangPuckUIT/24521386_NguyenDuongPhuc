# HW 3: KRAFTON x PUBG Vietnam Championship & Airdrop Arena

## Project Overview

Build a React 19 esports platform featuring a zero-drift countdown, optimistic ticket/crate claims, and a PUBG Vietnam leaderboard.

**Tech stack:** React 19, Vite, JavaScript, CSS

## Phase 1: Project Setup

- [x] Initialize React 19 + Vite project
- [x] Install dependencies
- [x] Verify development server
- [x] Create TASK_DECOMPOSITION.md
- [x] Create AI_FAILURE_AUDIT.md
- [x] Verify production build
- [x] Commit project setup

Commit: `chore(hw3): initialize PUBG arena project`

## Phase 2: Esports Arena UI

- [x] Create reusable React components
- [x] Build PUBG-themed header and navigation
- [x] Build VIP Ticket and G-Coin Crate cards
- [x] Build leaderboard layout
- [x] Implement responsive layout at 375px
- [x] Update TASK_DECOMPOSITION.md
- [x] Commit UI feature

Commit: `feat(hw3): build esports arena interface`

## Phase 3: Zero-Drift Airdrop Timer

- [x] Implement usePubgAirdropTimer hook
- [x] Calculate countdown using Date.now()
- [x] Support serverOffsetMs
- [x] Handle visibilitychange resynchronization
- [x] Clean up interval and event listeners
- [x] Handle drop phase transitions
- [x] Test background tab behavior
- [x] Update TASK_DECOMPOSITION.md
- [x] Commit timer feature

Commit: `feat(hw3): implement zero-drift airdrop timer`

## Phase 4: Optimistic Claim System

- [x] Implement optimistic stock deduction
- [x] Prevent duplicate claims using an in-flight lock
- [x] Handle successful claim responses
- [x] Roll back inventory on HTTP 409 Conflict
- [x] Handle network failures
- [x] Format ticket prices in VND
- [x] Update TASK_DECOMPOSITION.md
- [x] Commit claim feature

Commit: `feat(hw3): implement optimistic loot claims`

## Phase 5: PUBG Vietnam Leaderboard

- [x] Add Vietnamese PUBG squads
- [x] Display WWCD, placement points, and kill points
- [x] Implement sorting
- [x] Implement squad filtering
- [x] Implement kill-feed filtering
- [x] Update TASK_DECOMPOSITION.md
- [x] Commit leaderboard feature

Commit: `feat(hw3): add PVS leaderboard and kill feed`

## Phase 6: Testing and AI Audit

- [x] Test timer accuracy
- [x] Test visibilitychange behavior
- [x] Test duplicate claim prevention
- [x] Test HTTP 409 rollback
- [x] Test leaderboard sorting and filtering
- [x] Check accessibility and responsiveness
- [x] Document at least 3 actual AI failures
- [x] Run production build
- [x] Update TASK_DECOMPOSITION.md
- [x] Commit testing and audit

Commit: `test(hw3): verify arena and document AI failures`

## Development Rules

1. Complete one feature at a time.
2. Update this document after completing each feature.
3. Verify functionality before committing.
4. Use descriptive feature-based Git commits.
5. Record actual AI-generated bugs and their fixes in AI_FAILURE_AUDIT.md.
6. Do not mark incomplete or untested tasks as complete.
