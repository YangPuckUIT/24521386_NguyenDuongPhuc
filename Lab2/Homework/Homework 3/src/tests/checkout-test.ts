
import { createCheckoutController } from '../checkout-controller';

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(`FAIL: ${message}`);
  console.log(`PASS: ${message}`);
}

export function runCheckoutTests(): void {
  console.log('--- M5 Checkout Tests ---');

  const controller = createCheckoutController(3);

  const orderA = controller.reserve(1);
  assert(orderA !== null, 'Reserve product');

  if (!orderA) throw new Error('Missing reservation');

  assert(
    controller.getSnapshot().available === 2,
    'Available stock decreases'
  );

  assert(
    controller.checkout(orderA.id).success,
    'Checkout succeeds'
  );

  assert(
    controller.getSnapshot().purchased === 1,
    'Purchased stock increases'
  );

  assert(
    !controller.checkout(orderA.id).success,
    'Duplicate checkout rejected'
  );

  const orderB = controller.reserve(1);
  if (!orderB) throw new Error('Missing second reservation');

  assert(
    controller.cancel(orderB.id).success,
    'Cancel succeeds'
  );

  assert(
    controller.getSnapshot().available === 2,
    'Cancelled stock restored'
  );

  assert(
    !controller.checkout(orderB.id).success,
    'Cancelled order cannot checkout'
  );

  const expiredController = createCheckoutController(1, 1);
  const expiredOrder = expiredController.reserve();

  if (!expiredOrder) throw new Error('Missing expiring order');

  setTimeout(() => {
    assert(
      !expiredController.checkout(expiredOrder.id).success,
      'Expired order cannot checkout'
    );

    assert(
      expiredController.getSnapshot().available === 1,
      'Expired stock restored'
    );

    console.log('--- All M5 tests passed ---');
  }, 30);
}
