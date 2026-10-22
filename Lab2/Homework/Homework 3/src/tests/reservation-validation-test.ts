import { createInventoryMachine } from '../inventory-machine';

export function runReservationValidationTest(): void {
  console.log('--- Failure 3 Validation Test ---');

  const inventory = createInventoryMachine(5);

  const reservation = inventory.reserve(1, Number.MAX_SAFE_INTEGER);

  if (reservation === null) {
    console.log('PASS: Unsafe expiration timestamp rejected');
  } else {
    console.error('FAIL: Unsafe expiration timestamp accepted');
  }

  console.log('Available stock:', inventory.getSnapshot().available);
}