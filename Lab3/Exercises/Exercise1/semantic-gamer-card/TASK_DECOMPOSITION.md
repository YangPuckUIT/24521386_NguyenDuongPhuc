
# Exercise 1: Semantic Engineer & Pro-Gamer Profile Card

## 1. Objective

Build a Developer Profile Card using React 19 and Vite.

Requirements:
- Semantic HTML without div tags in DeveloperCard.jsx
- Reusable SkillBadge component
- CSS Modules and CSS Custom Properties
- Responsive design at 375px
- HTTPS avatar with fallback initials
- React Hooks and immutable derived state
- Two atomic Git commits

## 2. Task Decomposition

### Phase 1: Component Implementation

- [x] T1: Initialize React 19 + Vite project
- [x] T2: Create SkillBadge.jsx
- [x] T3: Create profile.js with developer data
- [x] T4: Create semantic DeveloperCard.jsx
- [x] T5: Implement avatar fallback initials
- [x] T6: Render metrics using dl, dt, dd and Fragment
- [x] T7: Render skills using stable keys
- [x] T8: Implement search and sort using useState
- [x] T9: Use filter() and toSorted() for derived state
- [x] T10: Connect DeveloperCard to App.jsx

Commit 1:
feat(ex1): implement semantic DeveloperCard and SkillBadge

### Phase 2: CSS Modules and Responsive Design

- [x] T11: Create DeveloperCard.module.css
- [x] T12: Add CSS Custom Properties
- [x] T13: Style profile card, avatar, metrics and skills
- [x] T14: Remove default list markers using CSS
- [x] T15: Implement responsive layout for 375px
- [x] T16: Prevent horizontal scrolling

Commit 2:
style(ex1): add responsive 375px CSS module

## 3. Verification Checklist

- [x] DeveloperCard.jsx contains zero div tags
- [x] DeveloperCard.jsx contains no insecure HTTP URLs
- [x] Search skills works
- [x] Sort skills works
- [x] CSS Modules applied successfully
- [ ] Accessibility Tree inspected
- [x] Responsive layout tested at 375px
- [x] Zero horizontal scrolling
- [x] npm run build passes
- [ ] Git history contains both required commits

## 4. Git Commit Plan

Commit 1: Semantic components and React functionality.

Commit 2: CSS Modules and responsive styling.

## 5. Expected Result

A responsive Developer and Pro-Gamer Profile Card
built with semantic React components, accessible
metadata, reusable skill badges and immutable
state management.
