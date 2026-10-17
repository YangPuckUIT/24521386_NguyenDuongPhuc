/**
 * Exercise 2 - Reactive State Machine
 * Milestones 1 and 2: State Store and Reactive useState
 */

const stateStore = [];
let stateCursor = 0;
let rerenderApp = null;

export function resetCursor() {
  stateCursor = 0;
}

export function setRenderFunction(renderFunction) {
  rerenderApp = renderFunction;
}

export function useState(initialValue) {
  const currentIndex = stateCursor;

  if (stateStore.length === currentIndex) {
    stateStore.push(initialValue);
  }

  stateCursor++;

  function setState(newValue) {
    const previousValue = stateStore[currentIndex];

    stateStore[currentIndex] =
      typeof newValue === "function"
        ? newValue(previousValue)
        : newValue;

    if (rerenderApp) {
      rerenderApp();
    }
  }

  return [stateStore[currentIndex], setState];
}

/**
 * Milestone 3: Root Event Delegation
 */

let delegatedRoot = null;

export function attachRootEventDelegation(root) {
  if (!root) {
    throw new Error("A root DOM element is required.");
  }

  if (delegatedRoot === root) {
    return;
  }

  if (delegatedRoot) {
    delegatedRoot.removeEventListener("click", handleRootClick);
  }

  delegatedRoot = root;
  delegatedRoot.addEventListener("click", handleRootClick);
}

function handleRootClick(event) {
  const target =
    event.target instanceof Element
      ? event.target.closest("[data-action]")
      : null;

  if (!target || !delegatedRoot.contains(target)) {
    return;
  }

  const action = target.dataset.action;

  if (!action) {
    return;
  }

  delegatedRoot.dispatchEvent(
    new CustomEvent("task-action", {
      bubbles: true,
      detail: {
        action,
        taskId: target.dataset.taskId,
        filter: target.dataset.filter
      }
    })
  );
}
