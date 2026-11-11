## AI-01: Incorrect Drop Status After Expiration

### Feature

Zero-Drift Airdrop Timer

### AI-generated Issue

The original countdown considered a drop live whenever
remainingMs reached zero, without checking its expiration time.

### Steps to Reproduce

1. Set dropEpochMs to a past timestamp.
2. Set expiresEpochMs to a past timestamp.
3. Open the arena.

### Expected Behavior

The drop should display EXPIRED and disable claiming.

### Actual Behavior

The original countdown displayed AIRDROP LIVE.

### Root Cause

The UI used remainingMs === 0 as the only live condition.

### Fix

Introduced getDropPhase() with explicit expiration
and stock checks. Passed phase into AirdropCountdown.

### Verification

Tested EXPIRED state and confirmed the claim button
was disabled.

### Evidence

Add screenshots of the incorrect and corrected states.
