const results = document.querySelector("#test-results");
let passed = 0;
let failed = 0;

function test(name, callback) {
    const item = document.createElement("li");

    try {
        callback();
        item.textContent = `PASS: ${name}`;
        passed++;
    } catch (error) {
        item.textContent = `FAIL: ${name} - ${error.message}`;
        failed++;
        console.error(name, error);
    }

    results.appendChild(item);
}

function assertEqual(actual, expected) {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, received ${actual}`);
    }
}

const engine = window.CountdownEngine;

test("Parses a valid UTC timestamp", () => {
    assertEqual(
        engine.parseTargetTimestamp("2027-01-01T00:00:00Z"),
        Date.parse("2027-01-01T00:00:00Z")
    );
});

test("Accepts UTC timestamps without milliseconds", () => {
    assertEqual(
        engine.parseTargetTimestamp("2027-01-01T00:00:00Z"),
        1798761600000
    );
});

test("Rejects timestamps without an explicit UTC marker", () => {
    assertEqual(
        engine.parseTargetTimestamp("2027-01-01T00:00:00"),
        null
    );
});

test("Rejects an impossible calendar date", () => {
    assertEqual(
        engine.parseTargetTimestamp("2027-02-30T12:00:00Z"),
        null
    );
});

test("Calculates remaining time from the current timestamp", () => {
    const target = Date.parse("2027-01-01T00:00:10Z");
    const now = Date.parse("2027-01-01T00:00:00Z");
    const remaining = engine.calculateRemainingTime(target, now);

    assertEqual(remaining.totalSeconds, 10);
    assertEqual(remaining.days, 0);
    assertEqual(remaining.hours, 0);
    assertEqual(remaining.minutes, 0);
    assertEqual(remaining.seconds, 10);
    assertEqual(remaining.expired, false);
});

test("Never returns negative time after expiration", () => {
    const target = 1000;
    const now = 5000;
    const remaining = engine.calculateRemainingTime(target, now);

    assertEqual(remaining.totalSeconds, 0);
    assertEqual(remaining.expired, true);
});

test("Rounds partial seconds up", () => {
    const remaining = engine.calculateRemainingTime(2000, 1501);

    assertEqual(remaining.totalSeconds, 1);
});

test("Formats an expired countdown", () => {
    const remaining = engine.calculateRemainingTime(1000, 2000);

    assertEqual(
        engine.formatRemainingTime(remaining),
        "Countdown complete."
    );
});

test("Stops immediately for an expired target", () => {
    let updates = 0;

    const stop = engine.createCountdown({
        targetTimestamp: "2020-01-01T00:00:00Z",
        onUpdate: (text, remaining) => {
            updates++;
            assertEqual(text, "Countdown complete.");
            assertEqual(remaining.expired, true);
        }
    });

    stop();
    assertEqual(updates, 1);
});

const summary = document.createElement("p");
summary.textContent = `Results: ${passed} passed, ${failed} failed.`;
summary.setAttribute("role", "status");
document.body.appendChild(summary);

console.log(`Countdown tests: ${passed} passed, ${failed} failed.`);