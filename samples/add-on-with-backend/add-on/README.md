## Add-on (panel + document sandbox)

React add-on scaffolded with `react-javascript-with-document-sandbox`.

### Before you start

The dev server runs at **[https://localhost:5241](https://localhost:5241)**. When you create private link or publish your Add-on, Adobe gives you an dedicated add-on origin which looks like `https://abc123.wxp.adobe-addons.com` this. You cannot set `API_BASE_URL` to `http://localhost:3001` — the browser blocks it.

1. Start the [backend](../backend/README.md).
2. Forward the backend port to an **HTTPS** URL (see [../README.md#local-development-https-tunnel](../README.md#local-development-https-tunnel)).
3. Set that URL in `[src/config.js](src/config.js)` (see `[src/config.example.js](src/config.example.js)`).
4. Run `npm run build` after changing config.

### Setup

```bash
npm install
# Edit src/config.js with your HTTPS tunnel or production API URL
npm run build
npm run start
```

### Key files


| File                        | Role                                      |
| --------------------------- | ----------------------------------------- |
| `src/config.js`             | `API_BASE_URL` (HTTPS only for local dev) |
| `src/ui/components/App.jsx` | UI: textarea, Rewrite, Add to design      |
| `src/api/backendClient.js`  | `fetch` to backend (UI runtime only)      |
| `src/sandbox/code.js`       | `addTextToDocument` via Document APIs     |


Full guide: [../README.md](../README.md)