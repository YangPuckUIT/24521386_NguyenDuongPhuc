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
const form = document.querySelector("#test-form");

if (form) {
    const input = form.querySelector("#message");
    const submitButton = form.querySelector("#submit-button");
    const statusElement = form.querySelector("#form-status");

    FormController.createFormController({
        form,
        input,
        submitButton,
        statusElement,
        onSubmit: async (message) => {
            // Simulate an asynchronous operation for state-machine testing.
            await new Promise((resolve) => setTimeout(resolve, 800));

            if (!message.trim()) {
                throw new Error("Message cannot be empty.");
            }
        }
    });
}