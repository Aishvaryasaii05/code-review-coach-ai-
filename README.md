# Code Review Coach

Kinetic Syntax-inspired Vanilla JS + Express workspace for code reviews and release notes.

## Run locally

```bash
npm install
cp .env.example .env
npm run check
npm start
```

Run `npm start` for the backend/API at `http://localhost:3001`, then `npm run preview` for the frontend at `http://localhost:5500`.

IBM watsonx.ai credentials are read only by the backend from `.env`. The local fallback analyzer keeps the preview usable without credentials.

## Project structure

```text
public/          Frontend HTML, CSS, JavaScript, and logo
server.js        Express API and persistence
preview-server.js Static frontend preview server
data/            Local review history created at runtime
stitch-reference/ Original Stitch screens and design guidance
```

The Stitch export is kept as a single reference folder; the running application uses the files in `public/` and does not load the exported HTML screens directly.
