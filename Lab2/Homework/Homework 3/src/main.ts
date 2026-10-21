import './style.css';
import { createAntiDriftTimer } from './anti-drift-timer';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  stock: number;
  totalStock: number;
  emoji: string;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Tai nghe Bluetooth Pro',
    category: 'Electronics',
    price: 299000,
    originalPrice: 599000,
    stock: 12,
    totalStock: 50,
    emoji: '🎧',
  },
  {
    id: 2,
    name: 'Bàn phím cơ RGB',
    category: 'Gaming',
    price: 499000,
    originalPrice: 990000,
    stock: 8,
    totalStock: 40,
    emoji: '⌨️',
  },
  {
    id: 3,
    name: 'Chuột không dây',
    category: 'Accessories',
    price: 159000,
    originalPrice: 350000,
    stock: 25,
    totalStock: 100,
    emoji: '🖱️',
  },
  {
    id: 4,
    name: 'Đồng hồ thông minh',
    category: 'Wearables',
    price: 699000,
    originalPrice: 1490000,
    stock: 5,
    totalStock: 30,
    emoji: '⌚',
  },
];

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

const renderProduct = (product: Product): string => {
  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100
  );

  const soldPercent = Math.round(
    ((product.totalStock - product.stock) / product.totalStock) * 100
  );

  return `
    <article class="product-card">
      <div class="product-image" aria-hidden="true">
        <span>${product.emoji}</span>
        <span class="discount-badge">-${discount}%</span>
      </div>

      <div class="product-content">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>

        <div class="price-group">
          <strong class="sale-price">${formatPrice(product.price)}</strong>
          <del class="original-price">
            ${formatPrice(product.originalPrice)}
          </del>
        </div>

        <div class="stock-info">
          <span>Còn ${product.stock} sản phẩm</span>
          <span>Đã bán ${soldPercent}%</span>
        </div>

        <div
          class="stock-progress"
          role="progressbar"
          aria-label="Tỷ lệ sản phẩm đã bán"
          aria-valuenow="${soldPercent}"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div style="width: ${soldPercent}%"></div>
        </div>

        <button class="buy-button" type="button" disabled>
          Mua ngay
        </button>
      </div>
    </article>
  `;
};

const app = document.querySelector<HTMLElement>('#app');

if (!app) {
  throw new Error('Application root not found');
}

app.innerHTML = `
  <header class="site-header">
    <div class="container header-content">
      <a href="#" class="logo">VN<span>MEGA</span>SALE</a>
      <span class="header-event">11.11 SHOPPING FESTIVAL</span>
    </div>
  </header>

  <main>
    <section class="hero">
      <div class="container hero-content">
        <p class="hero-label">VIETNAM MEGA SALE 2026</p>
        <h1>FLASH SALE <span>11.11</span></h1>
        <p class="hero-description">
          Siêu ưu đãi giới hạn — Nhanh tay trước khi hết hàng!
        </p>

        <div class="countdown-wrapper">
          <p>ƯU ĐÃI KẾT THÚC SAU</p>

          <div class="countdown" aria-label="Thời gian còn lại">
            <div class="time-box">
              <strong id="hours">00</strong>
              <small>GIỜ</small>
            </div>
            <span class="time-separator">:</span>
            <div class="time-box">
              <strong id="minutes">15</strong>
              <small>PHÚT</small>
            </div>
            <span class="time-separator">:</span>
            <div class="time-box">
              <strong id="seconds">00</strong>
              <small>GIÂY</small>
            </div>
            <span class="time-separator">.</span>
            <div class="time-box">
              <strong id="milliseconds">000</strong>
              <small>MS</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="products-section" aria-labelledby="products-title">
      <div class="container">
        <div class="section-heading">
          <div>
            <p class="section-label">DEALS OF THE DAY</p>
            <h2 id="products-title">Săn Deal Cực Sốc</h2>
          </div>
          <span class="live-badge">FLASH SALE</span>
        </div>

        <div class="product-grid">
          ${products.map(renderProduct).join('')}
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>VN Mega Sale 11.11 — E-Commerce Engine Simulation</p>
  </footer>
`;

const hoursElement = document.querySelector<HTMLElement>('#hours');
const minutesElement = document.querySelector<HTMLElement>('#minutes');
const secondsElement = document.querySelector<HTMLElement>('#seconds');
const millisecondsElement =
  document.querySelector<HTMLElement>('#milliseconds');

if (
  !hoursElement ||
  !minutesElement ||
  !secondsElement ||
  !millisecondsElement
) {
  throw new Error('Countdown elements not found');
}

function formatTwoDigits(value: number): string {
  return String(value).padStart(2, '0');
}

function updateCountdown(remainingMs: number): void {
  const hours = Math.floor(remainingMs / 3_600_000);
  const minutes = Math.floor((remainingMs % 3_600_000) / 60_000);
  const seconds = Math.floor((remainingMs % 60_000) / 1_000);
  const milliseconds = remainingMs % 1_000;

  hoursElement!.textContent = formatTwoDigits(hours);
  minutesElement!.textContent = formatTwoDigits(minutes);
  secondsElement!.textContent = formatTwoDigits(seconds);
  millisecondsElement!.textContent =
    String(milliseconds).padStart(3, '0');
}

const FLASH_SALE_DURATION_MS = 15 * 60 * 1000;

const stopCountdown = createAntiDriftTimer(
  FLASH_SALE_DURATION_MS,
  updateCountdown
);

window.addEventListener('pagehide', stopCountdown, { once: true });