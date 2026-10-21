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

export function runReservationExpiryTests(): void {
  console.log('--- M4 Reservation Expiry Tests ---');

  const inventory = createInventoryMachine(5);

  // Test 1: Reserve 2 units
  const reservation = inventory.reserve(2, 30_000);

  assert(
    reservation !== null &&
      inventory.getSnapshot().available === 3,
    'Reservation locks 2 units'
  );

  if (!reservation) {
    throw new Error('Reservation missing');
  }

  // Test 2: Expiration timestamp
  assert(
    reservation.expiresAt > reservation.createdAt,
    'Reservation has valid expiration timestamp'
  );

  // Test 3: Cancel reservation
  assert(
    inventory.release(reservation.id),
    'Reservation can be released'
  );

  // Test 4: Stock restored
  assert(
    inventory.getSnapshot().available === 5,
    'Released stock is restored'
  );

  // Test 5: Prevent duplicate release
  assert(
    inventory.release(reservation.id) === false,
    'Duplicate release is rejected'
  );

  // Test 6: Expiry behavior
  const shortReservation = inventory.reserve(3, 50);

  if (!shortReservation) {
    throw new Error('Short reservation missing');
  }

  setTimeout(() => {
    const expiredCount = inventory.expireReservations();

    assert(
      expiredCount === 1,
      'Expired reservation is detected'
    );

    assert(
      inventory.getReservation(shortReservation.id)?.status ===
        'EXPIRED',
      'Reservation transitions to EXPIRED'
    );

    assert(
      inventory.getSnapshot().available === 5,
      'Expired stock is restored'
    );

    assert(
      inventory.purchase(shortReservation.id) === false,
      'Expired reservation cannot be purchased'
    );

    assert(
      inventory.expireReservations() === 0,
      'Expired reservation cannot be released twice'
    );

    console.log('--- All M4 tests passed ---');
  }, 100);
}