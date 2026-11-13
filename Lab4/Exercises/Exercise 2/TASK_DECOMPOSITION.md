# Exercise 2 - Task Decomposition

## Overview

**Lab:** Lab 4  
**Exercise:** 1.6 - Context-Driven Form Validation  
**Sprint:** 2 - Multi-Field Form Engine  
**Status:** Verification In Progress

## Phase 1 - Project Setup

- [x] Initialize React 19 + Vite
- [x] Create component architecture
- [x] Verify development server

## Phase 2 - Form Context

- [x] Implement FormContext using createContext
- [x] Implement FormProvider
- [x] Implement synchronous evaluateErrors
- [x] Derive isValid without useEffect
- [x] Commit: feat(lab4-ex2): implement form validation context

## Phase 3 - Accessible Input Fields

- [x] Implement reusable InputField
- [x] Use useId for stable input IDs
- [x] Implement aria-invalid
- [x] Implement aria-describedby
- [x] Display field-level validation messages
- [ ] Commit: feat(lab4-ex2): implement accessible input validation

## Phase 4 - Form Inspector

- [x] Implement SimpleForm
- [x] Implement ShowData
- [x] Display JSON after valid submission
- [x] Prevent invalid submissions
- [ ] Commit: feat(lab4-ex2): add live form data inspector

## Phase 5 - Verification

- [ ] Test empty fields
- [ ] Test invalid email
- [ ] Test valid submission
- [x] Verify no validation useEffect chains
- [ ] Verify accessible error messages
- [x] Run npm run build
- [x] Run npm run lint
- [ ] Capture screenshots

## Progress Log

| Step | Description             | Status                   |
| ---- | ----------------------- | ------------------------ |
| 1    | Project initialization  | Completed                |
| 2    | Form Context            | Completed                |
| 3    | Accessible InputField   | Implementation Completed |
| 4    | SimpleForm and ShowData | Implementation Completed |
| 5    | Testing and screenshots | In Progress              |
