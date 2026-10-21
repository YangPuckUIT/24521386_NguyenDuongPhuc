export type ReservationStatus =
  | 'RESERVED'
  | 'RELEASED'
  | 'PURCHASED';

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
};

export type InventoryMachine = {
  reserve: (quantity: number) => Reservation | null;
  release: (reservationId: string) => boolean;
  purchase: (reservationId: string) => boolean;
  getSnapshot: () => InventorySnapshot;
  getReservation: (reservationId: string) => Reservation | null;
};

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

  function getSnapshot(): InventorySnapshot {
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
    const reservation = reservations.get(reservationId);

    return reservation ? { ...reservation } : null;
  }

  function reserve(quantity: number): Reservation | null {
    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
      return null;
    }

    if (quantity > available) {
      return null;
    }

    const reservation: Reservation = {
      id: `reservation-${nextReservationId++}`,
      quantity,
      status: 'RESERVED',
    };

    available -= quantity;
    reserved += quantity;

    reservations.set(reservation.id, reservation);

    return { ...reservation };
  }

  function release(reservationId: string): boolean {
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
    getSnapshot,
    getReservation,
  };
}