const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.argv[2] || process.env.PLAYWRIGHT_PATH || 'playwright');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  const errors = [];
  const consoleErrors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  const choose = (name) => page.getByRole('navigation').getByRole('button', { name }).click();
  const visible = async (text) => page.getByText(text, { exact: true }).waitFor();
  const screenshotDir = path.join(__dirname, '../verification');
  try {
    await page.goto('http://localhost:5173');
    await visible('Welcome to the NASA discussion channel.');
    await choose('02 Esports Tribunal');
    await visible('Welcome to the esports tribunal.');
    await choose('03 Not NASA');
    await visible('This is the off-topic discussion channel.');
    await choose('01 NASA');
    await visible('Welcome to the NASA discussion channel.');
    await page.getByRole('button', { name: 'Post message' }).click();
    await visible('Use 2–40 characters for your name.');
    await visible('Write a message of 1–500 characters.');
    const content = `Browser verification ${Date.now()}`;
    await page.getByLabel('Your name').fill(' Browser Reader ');
    await page.getByLabel('Your message').fill(` ${content} `);
    await page.getByRole('button', { name: 'Post message' }).click();
    await page.locator('.messages').getByText(content, { exact: true }).waitFor();
    assert.equal(await page.getByLabel('Your message').inputValue(), '');
    assert.equal(await page.locator('.messages').getByText(content, { exact: true }).count(), 1);
    await fs.mkdir(screenshotDir, { recursive: true });
    await page.screenshot({ path: path.join(screenshotDir, 'desktop.png'), fullPage: true });
    console.log('PASS: three real API channels, client validation, trimmed POST, refresh and cleared successful draft');
    assert.deepEqual(consoleErrors, [], 'Unexpected console errors with the live API');

    let mode = 'empty';
    let posts = 0;
    const aborted = [];
    page.on('requestfailed', (request) => { if (request.url().includes('/api/messages/')) aborted.push(request.failure()?.errorText); });
    await page.route('**/api/messages/*', async (route) => {
      const request = route.request();
      const channel = decodeURIComponent(new URL(request.url()).pathname.split('/').pop());
      if (request.method() === 'POST') {
        posts += 1;
        await delay(700);
        if (mode === 'post-fail') return route.fulfill({ status: 500, json: { message: 'Temporary server error' } });
        return route.fulfill({ status: 201, json: { channel, message: { id: 100, author: 'Reader', content: 'Sent', createdAt: new Date().toISOString() } } }).catch(() => {});
      }
      if (mode === 'offline') return route.abort('connectionrefused');
      if (mode === 'malformed') return route.fulfill({ json: { channel, messages: [{ id: 1 }] } });
      if (mode === 'wrong-channel') return route.fulfill({ json: { channel: 'wrong', messages: [] } });
      if (mode === 'html') return route.fulfill({ contentType: 'text/html', body: '<html>Error</html>' });
      if (mode === 'slow') await delay(channel === 'nasa' ? 900 : 400);
      return route.fulfill({ json: { channel, messages: mode === 'empty' ? [] : [{ id: 99, author: channel, content: `Only ${channel}`, createdAt: '2026-11-13T08:00:00.000Z' }] } }).catch(() => {});
    });
    const refresh = () => page.getByRole('button', { name: 'Refresh' }).click();
    await refresh();
    await visible('A fresh frequency.');
    mode = 'offline';
    await refresh();
    await visible('Cannot reach the forum. Check your connection and try again.');
    mode = 'success';
    await page.getByRole('button', { name: 'Try again' }).click();
    await visible('Only nasa');
    for (const bad of ['malformed', 'wrong-channel', 'html']) {
      mode = bad;
      await refresh();
      await page.getByRole('alert').waitFor();
      assert.equal(await page.locator('.messages').count(), 0);
      mode = 'success';
      await page.getByRole('button', { name: 'Try again' }).click();
      await visible('Only nasa');
    }
    console.log('PASS: empty feed, simulated unavailable backend, retry recovery, malformed/wrong-channel/non-JSON responses');
    mode = 'slow';
    await refresh();
    await page.locator('.skeletons').waitFor();
    await choose('02 Esports Tribunal');
    await choose('03 Not NASA');
    await page.locator('.skeletons').waitFor();
    assert.equal(await page.locator('.messages').count(), 0);
    await visible('Only notNasa');
    await delay(1000);
    assert.equal(await page.locator('.messages li').count(), 1);
    assert.equal(await page.locator('.messages').innerText().then((text) => text.includes('Only nasa')), false);
    assert.ok(aborted.some((error) => /ABORTED/.test(error)), 'Obsolete GET was not aborted');
    await choose('01 NASA');
    await page.locator('.skeletons').waitFor();
    await visible('Only nasa');
    console.log('PASS: delayed network skeleton, rapid switching, cancellation, no stale responses, revisit loading');

    mode = 'post-fail';
    await page.getByLabel('Your name').fill('Reader');
    await page.getByLabel('Your message').fill('Keep this failed draft');
    await page.locator('form').evaluate((form) => { form.requestSubmit(); form.requestSubmit(); });
    await page.getByRole('alert').filter({ hasText: 'Temporary server error' }).waitFor();
    assert.equal(posts, 1);
    assert.equal(await page.getByLabel('Your message').inputValue(), 'Keep this failed draft');
    mode = 'success';
    await page.getByRole('button', { name: 'Post message' }).click();
    await choose('02 Esports Tribunal');
    await visible('Only esports-tribunal');
    await page.getByLabel('Your message').fill('New channel draft');
    await delay(900);
    assert.equal(await page.getByLabel('Your message').inputValue(), 'New channel draft');
    assert.equal(await page.getByText('Message posted. Thanks for joining in.').count(), 0);
    console.log('PASS: duplicate submission guard, failed draft retention, in-flight POST channel isolation');

    await page.unroute('**/api/messages/*');
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const name of ['01 NASA', '02 Esports Tribunal', '03 Not NASA']) {
        await choose(name);
        await page.waitForFunction(() => document.querySelector('.messages li'));
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `Overflow at ${width} on ${name}`);
      }
      if (width === 375) await page.screenshot({ path: path.join(screenshotDir, 'mobile-375.png'), fullPage: true });
      if (width === 768) await page.screenshot({ path: path.join(screenshotDir, 'tablet-768.png'), fullPage: true });
    }
    await page.getByRole('navigation').getByRole('button', { name: '01 NASA' }).focus();
    await page.keyboard.press('Enter');
    await visible('Welcome to the NASA discussion channel.');
    assert.equal(await page.getByRole('navigation').getByRole('button', { name: '01 NASA' }).getAttribute('aria-current'), 'page');
    await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme), 'light');
    assert.deepEqual(errors, [], 'Unhandled browser exceptions');
    console.log('PASS: 375/768/1440px all channels without overflow, keyboard channel selection, explicit light theme, no unhandled exceptions');
    console.log(`Captured screenshots: ${screenshotDir}`);
    console.log(`Expected console errors during injected failure scenarios: ${consoleErrors.length}`);
  } finally { await browser.close(); }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
