
const VALID_STATES = ["IDLE", "LOADING", "SUCCESS", "ERROR"];

export function createStateMachine(onChange) {
  let state = { status: "IDLE" };
  let requestId = 0;

  function transition(nextState) {
    if (!VALID_STATES.includes(nextState.status)) {
      throw new Error(`Invalid state: ${nextState.status}`);
    }

    state = nextState;
    onChange(state);
  }

  async function load(fetchData) {
    const currentRequestId = ++requestId;

    transition({ status: "LOADING" });

    try {
      const data = await fetchData();

      // Ignore results from outdated requests.
      if (currentRequestId !== requestId) return;

      transition({ status: "SUCCESS", data });
    } catch (error) {
      if (currentRequestId !== requestId) return;

      transition({
        status: "ERROR",
        error: error instanceof Error
          ? error.message
          : "An unexpected error occurred."
      });
    }
  }

  return {
    getState: () => state,
    load,
    retry: load
  };
}
