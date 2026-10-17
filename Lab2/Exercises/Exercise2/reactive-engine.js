/**
 * Exercise 2 - Reactive State Machine
 * Milestone 1: State Store and Reset Cursor
 */

const stateStore = [];
let stateCursor = 0;

/**
 * Reset the cursor before each application render.
 * This ensures each useState call accesses the correct slot.
 */
export function resetCursor() {
  stateCursor = 0;
}
