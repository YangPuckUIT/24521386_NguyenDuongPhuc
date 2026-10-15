const FormController = (() => {
    const STATES = Object.freeze({
        IDLE: "idle",
        SUBMITTING: "submitting",
        SUCCESS: "success",
        ERROR: "error"
    });

    const ALLOWED_TRANSITIONS = Object.freeze({
        idle: ["submitting"],
        submitting: ["success", "error"],
        success: ["submitting", "idle"],
        error: ["submitting", "idle"]
    });

    function createFormController({
        form,
        input,
        submitButton,
        statusElement,
        onSubmit
    }) {
        if (!form || !input || !submitButton || !statusElement) {
            throw new Error("Form controller requires all form elements.");
        }

        if (typeof onSubmit !== "function") {
            throw new TypeError("onSubmit must be a function.");
        }

        let state = STATES.IDLE;

        function transition(nextState) {
            if (!ALLOWED_TRANSITIONS[state].includes(nextState)) {
                throw new Error(
                    `Invalid form transition: ${state} -> ${nextState}`
                );
            }

            state = nextState;
            render();
        }

        function render() {
            const isSubmitting = state === STATES.SUBMITTING;

            submitButton.disabled = isSubmitting;
            input.disabled = isSubmitting;
            form.setAttribute("aria-busy", String(isSubmitting));

            switch (state) {
                case STATES.IDLE:
                    statusElement.textContent = "";
                    break;
                case STATES.SUBMITTING:
                    statusElement.textContent = "Submitting...";
                    break;
                case STATES.SUCCESS:
                    statusElement.textContent = "Form submitted successfully.";
                    break;
                case STATES.ERROR:
                    statusElement.textContent =
                        "Submission failed. Please try again.";
                    break;
            }
        }

        async function handleSubmit(event) {
    event.preventDefault();

    if (state === STATES.SUBMITTING) {
        return;
    }

    if (!form.reportValidity()) {
        return;
    }

    const sanitizedMessage = input.value.trim();

    if (!sanitizedMessage) {
        input.setCustomValidity("Please enter a non-empty message.");
        input.reportValidity();
        input.setCustomValidity("");
        return;
    }

    if (sanitizedMessage.length > 200) {
        input.setCustomValidity("Message must be 200 characters or fewer.");
        input.reportValidity();
        input.setCustomValidity("");
        return;
    }

    transition(STATES.SUBMITTING);

    try {
        await onSubmit(sanitizedMessage);
        transition(STATES.SUCCESS);
    } catch (error) {
        console.error("Form submission failed:", error);
        transition(STATES.ERROR);
    }
}

        form.addEventListener("submit", handleSubmit);

        render();

        return {
            getState: () => state,
            destroy() {
                form.removeEventListener("submit", handleSubmit);
            }
        };
    }

    return Object.freeze({
        STATES,
        createFormController
    });
})();