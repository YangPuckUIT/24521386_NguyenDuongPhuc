
import {
  createInventoryMachine,
  type InventoryMachine,
  type InventorySnapshot,
  type Reservation,
} from './inventory-machine';

export type CheckoutResult = {
  success: boolean;
  message: string;
};

export type CheckoutController = {
  reserve: (quantity?: number) => Reservation | null;
  checkout: (reservationId: string) => CheckoutResult;
  cancel: (reservationId: string) => CheckoutResult;
  getSnapshot: () => InventorySnapshot;
  getReservation: InventoryMachine['getReservation'];
  expireReservations: InventoryMachine['expireReservations'];
};

export function createCheckoutController(
  initialStock: number,
  lockDurationMs = 30_000
): CheckoutController {
  const inventory = createInventoryMachine(initialStock);

  function reserve(quantity = 1): Reservation | null {
    return inventory.reserve(quantity, lockDurationMs);
  }

  function checkout(reservationId: string): CheckoutResult {
    const reservation = inventory.getReservation(reservationId);

    if (!reservation) {
      return { success: false, message: 'Không tìm thấy đơn hàng.' };
    }

    if (reservation.status === 'EXPIRED') {
      return { success: false, message: 'Đơn hàng đã hết hạn giữ.' };
    }

    if (reservation.status !== 'RESERVED') {
      return { success: false, message: 'Đơn hàng không còn hợp lệ.' };
    }

    if (!inventory.purchase(reservationId)) {
      return { success: false, message: 'Thanh toán không thành công.' };
    }

    return { success: true, message: 'Thanh toán thành công!' };
  }

  function cancel(reservationId: string): CheckoutResult {
    const reservation = inventory.getReservation(reservationId);

    if (!reservation || reservation.status !== 'RESERVED') {
      return { success: false, message: 'Không thể hủy đơn hàng.' };
    }

    if (!inventory.release(reservationId)) {
      return { success: false, message: 'Hủy đơn thất bại.' };
    }

    return { success: true, message: 'Đã hủy và hoàn trả sản phẩm.' };
  }

  return {
    reserve,
    checkout,
    cancel,
    getSnapshot: inventory.getSnapshot,
    getReservation: inventory.getReservation,
    expireReservations: inventory.expireReservations,
  };
}
