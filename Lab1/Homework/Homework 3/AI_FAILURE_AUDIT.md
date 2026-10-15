# AI Failure Audit

## 1. UTC Timestamp Validation Rejected Valid Input

**Defect description**

The initial `parseTargetTimestamp()` implementation compared the parsed timestamp's `toISOString()` output against the original timestamp. Valid UTC timestamps without fractional milliseconds could be rejected because `toISOString()` includes `.000` milliseconds.

**Diagnostic method**

Reviewed the timestamp validation logic and compared the original implementation with the corrected function using Git diff. Ran the countdown unit tests with timestamps both with and without milliseconds.

**Refactored solution**

Changed validation to compare the parsed date's year, month, day, hour, minute, and second representation against the corresponding timestamp components. Added tests for valid timestamps, missing milliseconds, missing UTC markers, and impossible calendar dates.

## 2. Duplicate Countdown Test Coverage

**Defect description**

Two countdown tests initially used the same timestamp without milliseconds. The test names suggested different coverage, but the inputs were identical.

**Diagnostic method**

Reviewed `countdown.test.js` and compared the test inputs and assertions.

**Refactored solution**

Changed the general valid-timestamp test to use a UTC timestamp with fractional milliseconds. Kept the separate test for a timestamp without milliseconds. This makes the two tests cover distinct input formats.

## 3. Asynchronous Test Runner Could Report Results Too Early

**Defect description**

The form test runner originally started `testInputSanitization()` independently of `runTests()`. Because both functions were asynchronous, the final summary could be displayed before all tests completed.

**Diagnostic method**

Reviewed the test execution order in `form-controller.test.js` and inspected the calls to `runTests()` and `testInputSanitization()`.

**Refactored solution**

Moved the `await testInputSanitization()` call inside `runTests()` before updating the summary. Removed the independent call at the end of the file, ensuring the final count is displayed only after all tests finish.

## Verification Notes

- Countdown tests: 9 passed, 0 failed.
- Form controller tests: 9 passed, 0 failed after validation and submission tests were added.
- Manual browser verification confirmed that the countdown runs and the landing page loads without JavaScript errors.
- The HTML-like input test checks that the controller does not interpret the submitted string as markup. It does not, by itself, prove the entire application is free of XSS.
- No claim is made that the application has undergone a comprehensive security audit.