export type ReservationStatus =
  | 'RESERVED'
  | 'RELEASED'
  | 'PURCHASED'
  | 'EXPIRED';

export type InventorySnapshot = {
  totalStock: number;
  available: number;
  reserved: number;
  purchased: number;
};

export type Reservation = {
  id: string;
  quantity: number;
  status: ReservationStatus;
  createdAt: number;
  expiresAt: number;
};

export type InventoryMachine = {
  reserve: (quantity: number, lockDurationMs?: number) => Reservation | null;
  release: (reservationId: string) => boolean;
  purchase: (reservationId: string) => boolean;
  expireReservations: () => number;
  getSnapshot: () => InventorySnapshot;
  getReservation: (reservationId: string) => Reservation | null;
};

const DEFAULT_LOCK_DURATION_MS = 30_000;

export function createInventoryMachine(
  initialStock: number
): InventoryMachine {
  if (!Number.isSafeInteger(initialStock) || initialStock < 0) {
    throw new RangeError(
      'Initial stock must be a non-negative safe integer'
    );
  }

  let available = initialStock;
  let reserved = 0;
  let purchased = 0;
  let nextReservationId = 1;

  const reservations = new Map<string, Reservation>();

  function expireReservations(): number {
    const now = Date.now();
    let expiredCount = 0;

    for (const reservation of reservations.values()) {
      if (
        reservation.status === 'RESERVED' &&
        now >= reservation.expiresAt
      ) {
        reservation.status = 'EXPIRED';
        reserved -= reservation.quantity;
        available += reservation.quantity;
        expiredCount++;
      }
    }

    return expiredCount;
  }

  function getSnapshot(): InventorySnapshot {
    expireReservations();

    return {
      totalStock: initialStock,
      available,
      reserved,
      purchased,
    };
  }

  function getReservation(
    reservationId: string
  ): Reservation | null {
    expireReservations();

    const reservation = reservations.get(reservationId);

    return reservation ? { ...reservation } : null;
  }

  function reserve(
    quantity: number,
    lockDurationMs = DEFAULT_LOCK_DURATION_MS
  ): Reservation | null {
    expireReservations();

    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
      return null;
    }

    if (
      !Number.isFinite(lockDurationMs) ||
      lockDurationMs <= 0
    ) {
      return null;
    }

    const now = Date.now();
    const expiresAt = now + lockDurationMs;

    if (!Number.isSafeInteger(expiresAt)) {
      return null;
    }

    if (quantity > available) {
      return null;
    }

    const reservation: Reservation = {
      id: `reservation-${nextReservationId++}`,
      quantity,
      status: 'RESERVED',
      createdAt: now,
      expiresAt,
    };

    available -= quantity;
    reserved += quantity;

    reservations.set(reservation.id, reservation);

    return { ...reservation };
  }

  function release(reservationId: string): boolean {
    expireReservations();

    const reservation = reservations.get(reservationId);

    if (!reservation || reservation.status !== 'RESERVED') {
      return false;
    }

    reservation.status = 'RELEASED';
    reserved -= reservation.quantity;
    available += reservation.quantity;

    return true;
  }

  function purchase(reservationId: string): boolean {
    expireReservations();

    const reservation = reservations.get(reservationId);

    if (!reservation || reservation.status !== 'RESERVED') {
      return false;
    }

    reservation.status = 'PURCHASED';
    reserved -= reservation.quantity;
    purchased += reservation.quantity;

    return true;
  }

  return {
    reserve,
    release,
    purchase,
    expireReservations,
    getSnapshot,
    getReservation,
  };
}