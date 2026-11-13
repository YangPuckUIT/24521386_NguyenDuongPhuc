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

## Issue 02 - Forum Response Validation

**Exercise:** 1.7.1 (Exercise 3)

**Problem:** The existing AI-generated API client trusted successful JSON payloads without checking the channel, message array or individual message fields. Malformed responses could reach rendering and break the feed.

**Resolution:** Validate channel, collection, unique IDs, author/content types and parseable timestamps before returning data. Convert malformed and non-JSON payloads into readable retryable errors.

**Verification:** Mounted Chromium checks injected malformed messages, an incorrect channel and HTML responses; each produced an error state and recovered on retry.

**Status:** Fixed and verified on 2026-11-13.

## Issue 03 - Forum Request Identity

**Exercise:** 1.7.1 (Exercise 3)

**Problem:** The original hook identified visible results only by channel and mixed refresh generation into result state. Revisiting a previously loaded channel could expose its old cached success while a new GET was pending, without a loading transition.

**Resolution:** Track channel transitions and refresh generations independently from settled results; only expose results matching both. Keep abort guards on success and failure.

**Verification:** Mounted StrictMode checks exercised delayed GETs, rapid switching, refresh, revisits, observed cancellation and no stale final results.

**Status:** Fixed and verified on 2026-11-13.

## Issue 04 - Browser Test Matched Composer Text

**Exercise:** 1.7.1 (Exercise 3)

**Problem:** The first browser test waited for posted content anywhere on the page. The textarea already contained that text, so the test checked draft clearing before the POST completed and failed.

**Resolution:** Scope the wait to the message feed before asserting successful draft clearing. This was a test synchronization bug; the application did not require a change.

**Verification:** The corrected full browser suite passed, including actual POST persistence and cleared content.

**Status:** Fixed and verified on 2026-11-13.
