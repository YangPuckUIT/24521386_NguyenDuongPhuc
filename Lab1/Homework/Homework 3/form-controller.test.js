const results = document.querySelector("#test-results");
const summary = document.querySelector("#test-summary");

let passed = 0;
let failed = 0;

function assertEqual(actual, expected) {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, received ${actual}`);
    }
}

function recordResult(name, error = null) {
    const item = document.createElement("li");

    if (error) {
        item.textContent = `FAIL: ${name} - ${error.message}`;
        console.error(name, error);
        failed++;
    } else {
        item.textContent = `PASS: ${name}`;
        passed++;
    }

    results.appendChild(item);
}

function createFixture(onSubmit) {
    const form = document.createElement("form");
    const input = document.createElement("input");
    const button = document.createElement("button");
    const status = document.createElement("p");

    input.required = true;
    input.name = "message";
    button.type = "submit";
    button.textContent = "Submit";

    form.append(input, button, status);
    document.body.appendChild(form);

    const controller = FormController.createFormController({
        form,
        input,
        submitButton: button,
        statusElement: status,
        onSubmit
    });

    return { form, input, button, status, controller };
}

async function runTest(name, callback) {
    try {
        await callback();
        recordResult(name);
    } catch (error) {
        recordResult(name, error);
    }
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTests() {
    await runTest("Initial state is idle", () => {
        const fixture = createFixture(async () => {});
        assertEqual(fixture.controller.getState(), "idle");
        fixture.controller.destroy();
        fixture.form.remove();
    });

    await runTest("Successful submission reaches success", async () => {
        const fixture = createFixture(async () => {});
        fixture.input.value = "Hello";

        fixture.form.requestSubmit();

        assertEqual(fixture.controller.getState(), "submitting");
        await wait(0);

        assertEqual(fixture.controller.getState(), "success");
        assertEqual(
            fixture.status.textContent,
            "Form submitted successfully."
        );

        fixture.controller.destroy();
        fixture.form.remove();
    });

    await runTest("Failed submission reaches error", async () => {
        const fixture = createFixture(async () => {
            throw new Error("Expected test failure");
        });
        fixture.input.value = "Hello";

        fixture.form.requestSubmit();
        await wait(0);

        assertEqual(fixture.controller.getState(), "error");
        assertEqual(
            fixture.status.textContent,
            "Submission failed. Please try again."
        );

        fixture.controller.destroy();
        fixture.form.remove();
    });

    await runTest("Submit button is disabled while submitting", async () => {
        let finishSubmission;

        const fixture = createFixture(() => new Promise((resolve) => {
            finishSubmission = resolve;
        }));
        fixture.input.value = "Hello";

        fixture.form.requestSubmit();

        assertEqual(fixture.button.disabled, true);
        assertEqual(fixture.input.disabled, true);

        finishSubmission();
        await wait(0);

        assertEqual(fixture.controller.getState(), "success");

        fixture.controller.destroy();
        fixture.form.remove();
    });

    await runTest("Duplicate submissions are ignored while submitting", async () => {
        let finishSubmission;
        let calls = 0;

        const fixture = createFixture(() => {
            calls++;
            return new Promise((resolve) => {
                finishSubmission = resolve;
            });
        });
        fixture.input.value = "Hello";

        fixture.form.requestSubmit();
        fixture.form.requestSubmit();

        assertEqual(calls, 1);

        finishSubmission();
        await wait(0);

        fixture.controller.destroy();
        fixture.form.remove();
    });

    summary.textContent = `Results: ${passed} passed, ${failed} failed.`;
    console.log(`Form controller tests: ${passed} passed, ${failed} failed.`);
}

runTests();