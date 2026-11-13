# Exercise 3 - Task Decomposition

## Overview

**Lab:** Lab 4
**Exercise:** 1.7.1 - Full-stack Forum
**Sprint:** 3 - Forum API Integration
**Status:** In Progress

## Phase 1 - Project Setup

- [x] Initialize React 19 + Vite frontend
- [x] Initialize Express backend
- [x] Install Express and CORS
- [x] Create project architecture
- [x] Verify frontend development server
- [x] Verify backend development server
- [x] Commit project setup

## Phase 2 - Express Forum API

- [x] Implement GET messages endpoint
- [x] Implement POST messages endpoint
- [x] Validate POST request body
- [x] Configure CORS
- [x] Implement channel support
- [x] Test API responses
- [x] Commit backend API

## Phase 3 - useForumMessages Hook

- [x] Implement custom React hook
- [x] Implement loading state
- [x] Implement success state
- [x] Implement error state
- [x] Use AbortController
- [x] Prevent stale responses
- [x] Commit data fetching hook

## Phase 4 - Forum Interface

- [x] Implement channel switcher
- [x] Support nasa channel
- [x] Support esports-tribunal channel
- [x] Support notNasa channel
- [x] Render forum messages
- [x] Implement message submission
- [x] Implement loading and error UI
- [x] Commit forum interface

## Phase 5 - Verification

- [x] Test all three channels
- [x] Test POST validation
- [x] Test rapid channel switching
- [x] Test slow network
- [x] Verify AbortController cleanup
- [x] Verify CORS configuration
- [x] Run frontend lint
- [x] Run frontend build
- [x] Capture screenshots
- [ ] Final documentation commit

## Progress Log

| Step | Description       | Status      |
| ---- | ----------------- | ----------- |
| 1    | Project setup     | Complete    |
| 2    | Express Forum API | Complete    |
| 3    | useForumMessages  | Complete    |
| 4    | Forum interface   | Complete    |
| 5    | Verification      | In Progress |

## Implementation Notes

- Phase 1: aae6976. Phase 2: daf97a2. Phase 3: 712960c (existing commit preserved).
- Phase 4: FREQUENCY interface, accessible channel buttons, stateful feed, validated composer, responsive CSS, abortable POST cleanup and validated API responses.
- Phase 4 commit: 8825629. Lint and build passed.
- Phase 5: Node API checks and Chromium mounted-browser checks passed on 2026-11-13. Slow network and unavailable API were simulated with browser routing.
- Screenshots captured at desktop, tablet and 375px mobile; desktop/mobile visually reviewed. No horizontal overflow at 375/768/1440px across all channels.
- No live-API console errors or unhandled browser exceptions. Two expected network console errors occurred during injected failures.
- Verification scripts live in tests/; reproduction and coverage are documented in README.md.
