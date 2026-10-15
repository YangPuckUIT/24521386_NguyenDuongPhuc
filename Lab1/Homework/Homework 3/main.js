const countdownElement = document.querySelector("#countdown");
const countdownStatus = document.querySelector("#countdown-status");

if (countdownElement) {
    window.CountdownEngine.createCountdown({
        targetTimestamp: countdownElement.dataset.target,
        onUpdate: (text, remaining) => {
            countdownElement.textContent = text;

            if (countdownStatus) {
                countdownStatus.textContent =
                    remaining === null
                        ? "Please check the configured UTC deadline."
                        : "";
            }
        }
    });
}