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
