## Issue 01 - Dark Mode Contrast

**Exercise:** 1.2

**Problem:** The People Directory heading became difficult to
read when the operating system used dark mode.

**Cause:** The default Vite CSS contained color-scheme
rules that conflicted with the custom light editorial theme.

**Resolution:**

- Explicitly set color-scheme: light.
- Removed conflicting Vite default CSS.
- Defined explicit heading and background colors.

**Verification:** Check both light and dark system preferences.

**Status:** Fixed, pending final verification.
