import { createInventoryMachine } from '../inventory-machine';

function assert(
  condition: boolean,
  message: string
): void {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }

  console.log(`PASS: ${message}`);
}

export function runInventoryTests(): void {
  console.log('--- M3 Inventory Machine Tests ---');

  const inventory = createInventoryMachine(5);

  // Test 1: Initial stock
  assert(
    inventory.getSnapshot().available === 5,
    'Initial stock is 5'
  );

  // Test 2: Reserve stock
  const orderA = inventory.reserve(2);

  assert(
    orderA !== null &&
      inventory.getSnapshot().available === 3,
    'Reserve 2 units successfully'
  );

  // Test 3: Prevent overselling
  const orderB = inventory.reserve(4);

  assert(
    orderB === null,
    'Reject reservation exceeding available stock'
  );

  // Test 4: Release stock
  if (!orderA) {
    throw new Error('Reservation A missing');
  }

  assert(
    inventory.release(orderA.id) &&
      inventory.getSnapshot().available === 5,
    'Release reservation restores stock'
  );

  // Test 5: Prevent duplicate release
  assert(
    inventory.release(orderA.id) === false,
    'Duplicate release is rejected'
  );

  // Test 6: Purchase stock
  const orderC = inventory.reserve(3);

  if (!orderC) {
    throw new Error('Reservation C missing');
  }

  assert(
    inventory.purchase(orderC.id) &&
      inventory.getSnapshot().purchased === 3,
    'Purchase moves reserved units to purchased'
  );

  // Test 7: Prevent duplicate purchase
  assert(
    inventory.purchase(orderC.id) === false,
    'Duplicate purchase is rejected'
  );

  // Test 8: Inventory invariant
  const snapshot = inventory.getSnapshot();

  assert(
    snapshot.available +
      snapshot.reserved +
      snapshot.purchased ===
      snapshot.totalStock,
    'Inventory invariant is maintained'
  );

  console.log('--- All M3 tests passed ---');
}