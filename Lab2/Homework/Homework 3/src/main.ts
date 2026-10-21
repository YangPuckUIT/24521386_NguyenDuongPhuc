import './style.css';

const app = document.querySelector<HTMLElement>('#app');

if (!app) {
  throw new Error('Application root not found');
}

app.innerHTML = `
  <section class="welcome">
    <p class="eyebrow">VIETNAM MEGA SALE</p>
    <h1>Flash Sale 11.11</h1>
    <p>High-Concurrency E-Commerce Engine</p>
    <p class="status">M0 — Project initialized successfully</p>
  </section>
`;