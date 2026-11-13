# FREQUENCY – Community Network

Lab 4 Exercise 1.7.1: a React 19 / Vite frontend connected to the existing Express 5 forum API. Requires Node.js 24 and npm.

## Run locally

From this exercise directory, open two terminals:

```powershell
cd backend
npm.cmd ci
npm.cmd start
```

```powershell
cd frontend
npm.cmd ci
npm.cmd run dev -- --host localhost
```

Open <http://localhost:5173>. The API runs at <http://localhost:3000>. CORS permits the localhost:5173 origin; use that hostname and port. The backend supports a `PORT` environment override, but the frontend intentionally uses the existing port 3000 contract. No secrets or environment file are needed.

## Features and API

- NASA (`nasa`), Esports Tribunal (`esports-tribunal`), and Not NASA (`notNasa`).
- Responsive editorial layout, semantic navigation, keyboard focus, skip link, loading skeletons, empty state, retry and refresh.
- Message author, plain-text content and locally formatted timestamp.
- Validated composer with trimmed values, duplicate submission guard, failed-draft retention and successful refresh.
- Request identities and AbortController protect against stale GET results. Keyed composers cancel their pending POST on channel changes, keeping late completions out of another channel's UI.
- Switching channels resets the composer. Canceling a POST cannot undo a message already accepted by the server; refresh the original channel before resending an uncertain delivery.
- Optional Google Fonts have system sans-serif fallbacks. The application does not depend on font delivery.

| Method | Endpoint | Response |
| --- | --- | --- |
| GET | `/api/health` | Health status |
| GET | `/api/messages/:channel` | `{ channel, messages }` |
| POST | `/api/messages/:channel` | HTTP 201, `{ channel, message }` |

POST JSON: `{ "author": "Reader", "content": "Hello" }`. Trimmed author length must be 2–40; trimmed content length 1–500 (JavaScript string length). Invalid input returns 400, unknown channels return 404. Messages contain `id`, `author`, `content`, and ISO `createdAt`. Storage is in memory and resets on restart. The existing backend contract is unchanged.

## Verification

Executed successfully on 2026-11-13 using Node 24.21.0 and headless Chromium through Playwright. React StrictMode remains enabled.

```powershell
# Exercise directory; isolated API server starts on port 3103 and stops automatically
node tests/api.cjs

cd frontend
npm.cmd run lint
npm.cmd run build
```

The API script checks startup/health, all three channels, trimmed POST persistence and refresh, invalid input/types/length boundaries, unknown-channel GET/POST, invalid JSON, and CORS including preflight.

The browser script requires both normal development servers running. Playwright is an optional external verification tool, not a project dependency. To reproduce without changing project manifests:

```powershell
# Run from the Exercise 3 directory
$browserTools = Join-Path $env:TEMP 'frequency-browser-tests'
npm.cmd install --prefix $browserTools playwright
& "$browserTools/node_modules/.bin/playwright.cmd" install chromium
node tests/browser.cjs "$browserTools/node_modules/playwright"
```

Browser checks passed:

- Real API: all channels, client validation, trimmed POST, automatic refresh, successful draft clearing, no unexpected console errors.
- Routed fixtures: empty feed; unavailable API and successful retry; malformed, incorrect-channel and non-JSON responses.
- Delayed GETs: skeleton visible, rapid switching, no stale responses, request cancellation observed, channel revisits show loading.
- Delayed POSTs: duplicate form events produce one request; server failure preserves the draft; switching channels prevents late completion from clearing a new draft or showing a false success.
- All three channels at 375, 768 and 1440px: no horizontal overflow. Keyboard channel activation works, and the explicit light theme remains under dark system preference.
- No unhandled browser exceptions. Two expected console network errors occurred during injected failure tests.

Screenshots: [desktop](verification/desktop.png), [375px mobile](verification/mobile-375.png), [768px tablet](verification/tablet-768.png). Desktop and mobile screenshots were visually reviewed.

Slow network and unavailable API checks used Playwright request interception, not manual DevTools throttling or a physical network outage. Manual DevTools reproduction: select Slow 3G, refresh and switch channels before completion; confirm skeletons and canceled obsolete GETs. Stop the API, refresh to see the error, restart it and select Try again. Screen-reader testing, other browser engines and real mobile hardware were not tested; these are optional follow-up checks.
