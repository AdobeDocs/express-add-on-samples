## Backend (Express + Gemini)

Runs on **HTTP** locally (e.g. `http://localhost:3001`). The add-on panel uses **HTTPS**, so developers must expose this server through an **HTTPS tunnel** and set that URL in `add-on/src/config.js`. See [../README.md#local-development-https-tunnel](../README.md#local-development-https-tunnel).

In **production**, deploy this app behind HTTPS and use the deployed URL in the add-on config.

### Setup

```bash
npm install
cp .env.example .env
# Set GEMINI_API_KEY (optional — mock mode works without it)
# Set PORT if not using 3001
npm run dev
```

Health check: `http://localhost:PORT/health`

### After the server starts

Forward `PORT` to an HTTPS URL (Cursor/VS Code Ports, ngrok, or cloudflared), then paste that URL into `add-on/src/config.js`.

### Key files

| File | Role |
|------|------|
| `src/cors.js` | Allows add-on origin `https://localhost:5241` (+ wxp subdomains) |
| `src/routes/rewrite.js` | `POST /api/rewrite` |
| `src/services/gemini.js` | Google Gemini via `@google/genai` |

Full guide: [../README.md](../README.md)
