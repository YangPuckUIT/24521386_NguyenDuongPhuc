const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');

async function main() {
  const port = 3103;
  const server = spawn(process.execPath, ['server.js'], {
    cwd: path.join(__dirname, '../backend'), env: { ...process.env, PORT: String(port) }, stdio: 'pipe',
  });
  const base = `http://localhost:${port}/api`;
  try {
    await new Promise((resolve, reject) => {
      server.stdout.once('data', resolve);
      server.once('error', reject);
      server.once('exit', (code) => reject(new Error(`Server exited: ${code}`)));
    });
    assert.equal((await (await fetch(`${base}/health`)).json()).status, 'ok');
    for (const channel of ['nasa', 'esports-tribunal', 'notNasa']) {
      const response = await fetch(`${base}/messages/${channel}`, { headers: { Origin: 'http://localhost:5173' } });
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:5173');
      const data = await response.json();
      assert.equal(data.channel, channel);
      assert.ok(data.messages.length);
    }
    const post = (body, channel = 'nasa') => fetch(`${base}/messages/${channel}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    for (const body of [null, {}, { author: 'a', content: 'hello' }, { author: 'a'.repeat(41), content: 'hello' }, { author: 'OK', content: ' ' }, { author: 'OK', content: 'x'.repeat(501) }, { author: 123, content: 'text' }]) {
      assert.equal((await post(body)).status, 400);
    }
    for (const body of [{ author: ' A B ', content: ' hello ' }, { author: 'x'.repeat(40), content: 'y'.repeat(500) }]) {
      const response = await post(body);
      assert.equal(response.status, 201);
      const { message } = await response.json();
      assert.equal(message.author, body.author.trim());
      assert.equal(message.content, body.content.trim());
      const { messages } = await (await fetch(`${base}/messages/nasa`)).json();
      assert.ok(messages.some((item) => item.id === message.id));
    }
    assert.equal((await fetch(`${base}/messages/unknown`)).status, 404);
    assert.equal((await post({ author: 'OK', content: 'test' }, 'unknown')).status, 404);
    assert.equal((await fetch(`${base}/messages/nasa`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' })).status, 400);
    const preflight = await fetch(`${base}/messages/nasa`, { method: 'OPTIONS', headers: { Origin: 'http://localhost:5173', 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type' } });
    assert.equal(preflight.status, 204);
    console.log('PASS: backend startup, health, three channels, CORS/preflight, validation boundaries/types, trimmed POST, refresh, unknown channels, invalid JSON');
  } finally { server.kill(); }
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
