
import { createCheckoutController } from '../checkout-controller';

function assert(
  condition: boolean,
  message: string
): void {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }

  console.log(`PASS: ${message}`);
}

function checkInvariant(
  available: number,
  reserved: number,
  purchased: number,
  totalStock: number
): boolean {
  return (
    available >= 0 &&
    reserved >= 0 &&
    purchased >= 0 &&
    available + reserved + purchased === totalStock
  );
}

export async function runConcurrencyTests(): Promise<void> {
  console.log('--- M6 Concurrency Tests ---');

  // Test 1: 100 customers compete for 5 units
  const controller = createCheckoutController(5, 30_000);

  const attempts = Array.from({ length: 100 }, async () => {
    await Promise.resolve();
    return controller.reserve(1);
  });

  const reservations = await Promise.all(attempts);
  const successful = reservations.filter(
    (reservation) => reservation !== null
  );

  assert(
    successful.length === 5,
    'Only 5 of 100 reservation attempts succeed'
  );

  const snapshot = controller.getSnapshot();

  assert(
    snapshot.available === 0,
    'Available stock reaches zero'
  );

  assert(
    snapshot.reserved === 5,
    'Exactly 5 units are reserved'
  );

  assert(
    checkInvariant(
      snapshot.available,
      snapshot.reserved,
      snapshot.purchased,
      snapshot.totalStock
    ),
    'Inventory invariant holds after concurrent attempts'
  );

  // Test 2: Concurrent checkout attempts
  const checkoutAttempts = successful.map(async (reservation) => {
    await Promise.resolve();
    return controller.checkout(reservation!.id);
  });

  const checkoutResults = await Promise.all(checkoutAttempts);

  assert(
    checkoutResults.filter((result) => result.success).length === 5,
    'All 5 valid reservations checkout successfully'
  );

  assert(
    controller.getSnapshot().purchased === 5,
    'Purchased stock equals initial stock'
  );

  // Test 3: Duplicate checkout
  const firstReservation = successful[0]!;

  const duplicateAttempts = await Promise.all(
    Array.from({ length: 20 }, async () => {
      await Promise.resolve();
      return controller.checkout(firstReservation.id);
    })
  );

  assert(
    duplicateAttempts.every((result) => !result.success),
    '20 duplicate checkout attempts are rejected'
  );

  // Test 4: Concurrent release and checkout
  const raceController = createCheckoutController(1);
  const raceReservation = raceController.reserve();

  if (!raceReservation) {
    throw new Error('Missing race reservation');
  }

  const raceResults = await Promise.all([
    Promise.resolve().then(() =>
      raceController.checkout(raceReservation.id)
    ),
    Promise.resolve().then(() =>
      raceController.cancel(raceReservation.id)
    ),
  ]);

  const successfulTransitions = raceResults.filter(
    (result) => result.success
  );

  assert(
    successfulTransitions.length === 1,
    'Only one terminal transition succeeds'
  );

  const raceSnapshot = raceController.getSnapshot();

  assert(
    checkInvariant(
      raceSnapshot.available,
      raceSnapshot.reserved,
      raceSnapshot.purchased,
      raceSnapshot.totalStock
    ),
    'Inventory invariant holds after checkout/cancel race'
  );

  // Test 5: Invalid quantities
  const invalidController = createCheckoutController(10);

  assert(
    invalidController.reserve(0) === null,
    'Zero quantity is rejected'
  );

  assert(
    invalidController.reserve(-1) === null,
    'Negative quantity is rejected'
  );

  assert(
    invalidController.reserve(1.5) === null,
    'Fractional quantity is rejected'
  );

  assert(
    invalidController.reserve(11) === null,
    'Quantity exceeding stock is rejected'
  );

  assert(
    invalidController.getSnapshot().available === 10,
    'Invalid requests do not modify stock'
  );

  console.log('--- All M6 tests passed ---');
}
