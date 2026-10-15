const DEFAULT_TARGET = "2027-01-01T00:00:00Z";

function parseTargetTimestamp(timestamp) {
    if (typeof timestamp !== "string") {
        return null;
    }

    const isUtcIso8601 =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(timestamp);

    if (!isUtcIso8601) {
        return null;
    }

    const targetTime = Date.parse(timestamp);

    if (!Number.isFinite(targetTime)) {
        return null;
    }

    // Reject impossible dates instead of accepting normalized dates.
    const parsed = new Date(targetTime);

    if (parsed.toISOString().slice(0, 19) !== timestamp.slice(0, 19)) {
        return null;
    }

    return targetTime;
}

function normalizeTimestamp(timestamp) {
    const date = new Date(Date.parse(timestamp));
    const canonical = date.toISOString();

    // ISO timestamps may omit milliseconds or contain fractional seconds.
    // Compare their represented instant rather than their original spelling.
    return canonical;
}

function calculateRemainingTime(targetTime, now = Date.now()) {
    if (!Number.isFinite(targetTime) || !Number.isFinite(now)) {
        return null;
    }

    const remainingMs = Math.max(0, targetTime - now);
    const totalSeconds = Math.ceil(remainingMs / 1000);

    return {
        totalSeconds,
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        expired: remainingMs === 0
    };
}

function formatRemainingTime(remaining) {
    if (!remaining) {
        return "Invalid UTC timestamp.";
    }

    if (remaining.expired) {
        return "Countdown complete.";
    }

    return `${remaining.days}d ${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s`;
}

function createCountdown({
    targetTimestamp,
    onUpdate,
    intervalMs = 250
}) {
    const targetTime = parseTargetTimestamp(targetTimestamp);

    if (targetTime === null) {
        onUpdate("Invalid UTC timestamp.", null);
        return () => {};
    }

    if (typeof onUpdate !== "function") {
        throw new TypeError("onUpdate must be a function.");
    }

    let intervalId = null;
    let stopped = false;

    function update() {
        if (stopped) {
            return;
        }

        // Recalculate from the actual clock to avoid interval drift.
        const remaining = calculateRemainingTime(targetTime, Date.now());
        onUpdate(formatRemainingTime(remaining), remaining);

        if (remaining.expired) {
            stop();
        }
    }

    function stop() {
        if (stopped) {
            return;
        }

        stopped = true;

        if (intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    update();

    if (!stopped) {
        intervalId = setInterval(update, intervalMs);
    }

    return stop;
}

window.CountdownEngine = {
    parseTargetTimestamp,
    calculateRemainingTime,
    formatRemainingTime,
    createCountdown
};