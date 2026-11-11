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

- [ ] Implement usePubgAirdropTimer hook
- [ ] Calculate countdown using Date.now()
- [ ] Support serverOffsetMs
- [ ] Handle visibilitychange resynchronization
- [ ] Clean up interval and event listeners
- [ ] Handle drop phase transitions
- [ ] Test background tab behavior
- [ ] Update TASK_DECOMPOSITION.md
- [ ] Commit timer feature

Commit: `feat(hw3): implement zero-drift airdrop timer`

## Phase 4: Optimistic Claim System

- [ ] Implement optimistic stock deduction
- [ ] Prevent duplicate claims using an in-flight lock
- [ ] Handle successful claim responses
- [ ] Roll back inventory on HTTP 409 Conflict
- [ ] Handle network failures
- [ ] Format ticket prices in VND
- [ ] Update TASK_DECOMPOSITION.md
- [ ] Commit claim feature

Commit: `feat(hw3): implement optimistic loot claims`

## Phase 5: PUBG Vietnam Leaderboard

- [ ] Add Vietnamese PUBG squads
- [ ] Display WWCD, placement points, and kill points
- [ ] Implement sorting
- [ ] Implement squad filtering
- [ ] Implement kill-feed filtering
- [ ] Update TASK_DECOMPOSITION.md
- [ ] Commit leaderboard feature

Commit: `feat(hw3): add PVS leaderboard and kill feed`

## Phase 6: Testing and AI Audit

- [ ] Test timer accuracy
- [ ] Test visibilitychange behavior
- [ ] Test duplicate claim prevention
- [ ] Test HTTP 409 rollback
- [ ] Test leaderboard sorting and filtering
- [ ] Check accessibility and responsiveness
- [ ] Document at least 3 actual AI failures
- [ ] Run production build
- [ ] Update TASK_DECOMPOSITION.md
- [ ] Commit testing and audit

Commit: `test(hw3): verify arena and document AI failures`

## Development Rules

1. Complete one feature at a time.
2. Update this document after completing each feature.
3. Verify functionality before committing.
4. Use descriptive feature-based Git commits.
5. Record actual AI-generated bugs and their fixes in AI_FAILURE_AUDIT.md.
6. Do not mark incomplete or untested tasks as complete.
