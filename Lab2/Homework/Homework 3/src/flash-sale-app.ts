
import {
  createCheckoutController,
  type CheckoutController,
} from './checkout-controller';

type ProductConfig = {
  id: number;
  stock: number;
};

type ActiveOrder = {
  productId: number;
  reservationId: string;
};

export function initializeFlashSale(
  products: ProductConfig[]
): () => void {
  const controllers = new Map<number, CheckoutController>();

  for (const product of products) {
    controllers.set(
      product.id,
      createCheckoutController(product.stock)
    );
  }


  let activeOrder: ActiveOrder | null = null;
  let expiryTimer: number | null = null;
  let previousFocus: HTMLElement | null = null;

  const modal = document.createElement('section');
  modal.className = 'checkout-modal';
  modal.hidden = true;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Xác nhận đơn hàng');

  modal.innerHTML = `
    <div class="checkout-panel">
      <h2>Xác nhận đơn hàng</h2>
      <p id="checkout-message"></p>
      <p id="checkout-time"></p>
      <div class="checkout-actions">
        <button id="confirm-checkout" type="button">
          Thanh toán
        </button>
        <button id="cancel-checkout" type="button">
          Hủy đơn
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  function handleModalKeydown(event: KeyboardEvent): void {
  if (modal.hidden) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    handleCancel();
    return;
  }

  if (event.key !== 'Tab') return;

  const focusableElements = Array.from(
    modal.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );

  if (focusableElements.length === 0) {
    event.preventDefault();
    return;
  }

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  } else if (!modal.contains(document.activeElement)) {
    event.preventDefault();
    first.focus();
  }
}

  const message = modal.querySelector<HTMLElement>('#checkout-message')!;
  const time = modal.querySelector<HTMLElement>('#checkout-time')!;
  const confirmButton =
    modal.querySelector<HTMLButtonElement>('#confirm-checkout')!;
  const cancelButton =
    modal.querySelector<HTMLButtonElement>('#cancel-checkout')!;

  function refreshStock(): void {
    for (const [productId, controller] of controllers) {
      const snapshot = controller.getSnapshot();
      const card = document.querySelector<HTMLElement>(
        `[data-product-id="${productId}"]`
      );

      if (!card) continue;

      const stockLabel = card.querySelector<HTMLElement>('.stock-remaining');
      const buyButton = card.querySelector<HTMLButtonElement>('.buy-button');
      const progress = card.querySelector<HTMLElement>('.stock-progress');
      const progressFill = progress?.querySelector<HTMLElement>('div');

      const soldPercent = snapshot.totalStock === 0
        ? 100
        : Math.round(
            (snapshot.purchased / snapshot.totalStock) * 100
          );

      if (stockLabel) {
        stockLabel.textContent =
          `Còn ${snapshot.available} sản phẩm`;
      }

      if (buyButton) {
        buyButton.disabled =
          snapshot.available === 0 || activeOrder !== null;
      }

      if (progress) {
        progress.setAttribute('aria-valuenow', String(soldPercent));
      }

      if (progressFill) {
        progressFill.style.width = `${soldPercent}%`;
      }

      const soldLabel = card.querySelector<HTMLElement>('.stock-sold');
      if (soldLabel) {
        soldLabel.textContent = `Đã bán ${soldPercent}%`;
      }
    }
  }

  function closeOrder(): void {
    activeOrder = null;
    modal.hidden = true;
    previousFocus?.focus();
    previousFocus = null;

    if (expiryTimer !== null) {
      clearInterval(expiryTimer);
      expiryTimer = null;
    }

    refreshStock();
  }

  function showResult(result: string): void {
    closeOrder();
    window.alert(result);
  }

  function checkExpiry(): void {
    if (!activeOrder) return;

    const controller = controllers.get(activeOrder.productId)!;
    const reservation = controller.getReservation(
      activeOrder.reservationId
    );

    if (!reservation || reservation.status !== 'RESERVED') {
      showResult('Đơn hàng đã hết hạn. Sản phẩm được trả lại kho.');
      return;
    }

    const remaining = Math.max(
      0,
      reservation.expiresAt - Date.now()
    );

    time.textContent =
      `Thời gian giữ hàng: ${Math.ceil(remaining / 1000)} giây`;
  }

  function handleBuy(productId: number): void {
    if (activeOrder) return;

    const controller = controllers.get(productId);
    if (!controller) return;

    const reservation = controller.reserve(1);

    if (!reservation) {
      window.alert('Sản phẩm đã hết hàng.');
      refreshStock();
      return;
    }

    activeOrder = {
      productId,
      reservationId: reservation.id,
    };

    message.textContent =
      `Đã giữ 1 sản phẩm. Vui lòng thanh toán trong 30 giây.`;

    modal.hidden = false;
    confirmButton.focus();

    checkExpiry();
    expiryTimer = window.setInterval(checkExpiry, 100);
    refreshStock();
  }

  function handleCheckout(): void {
    if (!activeOrder) return;

    const controller = controllers.get(activeOrder.productId)!;
    const result = controller.checkout(activeOrder.reservationId);

    showResult(result.message);
  }

  function handleCancel(): void {
    if (!activeOrder) return;

    const controller = controllers.get(activeOrder.productId)!;
    const result = controller.cancel(activeOrder.reservationId);

    showResult(result.message);
  }

  function handleProductClick(event: MouseEvent): void {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const button = target.closest<HTMLButtonElement>('.buy-button');
    if (!button || button.disabled) return;

    const card = button.closest<HTMLElement>('[data-product-id]');
    if (!card) return;

    const productId = Number(card.dataset.productId);

    previousFocus = button;
    handleBuy(productId);
  }

document.addEventListener('click', handleProductClick);
modal.addEventListener('keydown', handleModalKeydown);
confirmButton.addEventListener('click', handleCheckout);
cancelButton.addEventListener('click', handleCancel);

refreshStock();

return () => {
  document.removeEventListener('click', handleProductClick);
  modal.removeEventListener('keydown', handleModalKeydown);

  if (activeOrder) {
    const controller = controllers.get(activeOrder.productId);
    controller?.cancel(activeOrder.reservationId);
  }

  if (expiryTimer !== null) {
    clearInterval(expiryTimer);
  }

  modal.remove();
};
}
