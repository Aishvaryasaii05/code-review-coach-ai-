# Code Review Coach

> A focused AI-assisted workspace for safer code changes, clearer explanations, and release-ready handoffs.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/API-Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Frontend-Vanilla JS](https://img.shields.io/badge/Frontend-Vanilla%20JavaScript-f7df1e?logo=javascript&logoColor=111111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Database-SQLite](https://img.shields.io/badge/Database-SQLite-003b57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)

Code Review Coach helps developers turn pasted code or uploaded files into practical review feedback. It highlights risk, explains what code does and where it belongs, gives line-by-line guidance, suggests fixes, stores review history, and turns changelog fragments into release notes.

## Why this project

I built Code Review Coach to make code review easier to understand and more actionable, especially when a change needs more context than a simple pass/fail result.

The project gave me hands-on experience with:

- AI-assisted developer tooling
- Frontend-to-backend communication
- REST API design
- Server-side environment configuration
- SQLite persistence and fallback storage
- File upload and drag-and-drop workflows
- Responsive UI design for desktop and mobile
- Accessibility, keyboard shortcuts, loading states, and error recovery
- Deployment-ready Node.js application structure

## Core features

### Code review

- Paste code or upload a source file
- Select the programming language
- Detect common security, reliability, and readability risks
- Show risk level and score
- Expand issue details and suggested fixes
- Copy suggested fixes
- Explain what the code does, why it exists, and where it is typically used
- Generate line-by-line explanations

### Release notes

- Enter a version and target audience
- Paste a diff or changelog
- Generate Markdown release notes
- Copy the generated notes for a handoff or release description

### Workspace tools

- Review history backed by the backend
- Dashboard metrics
- Theme toggle
- Sample code loader
- Clear and drag-and-drop editor actions
- Keyboard shortcut: `Cmd/Ctrl + Enter` to review
- Responsive mobile analysis controls
- Accessible labels, focus states, and reduced-motion-friendly layouts

## Tech stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend | HTML5, CSS3, Vanilla JavaScript | Single-page workspace UI without React, Vue, or Angular |
| Backend | Node.js, Express | REST API, validation flow, persistence, and static hosting |
| Database | SQLite through `better-sqlite3` | Stores review and release-note history locally |
| Preview fallback | `data/reviews.json` | Keeps the local preview usable when native SQLite cannot load |
| AI configuration | IBM watsonx.ai environment variables | Keeps provider credentials server-side and deployment-ready |
| Security middleware | CORS and `express-rate-limit` | Controls browser access and limits API request bursts |
| Configuration | `dotenv` | Loads backend-only values from `.env` |
| Deployment target | Render-compatible Node.js service | Supports hosting the Express backend and frontend |
| Design source | Stitch Kinetic Syntax export | Visual reference for the workspace UI |

### AI provider note

The frontend never calls IBM directly and never contains an API key. Provider configuration is read only by the backend through environment variables. The local preview also includes a deterministic fallback analyzer so the UI can be explored without credentials.

The current configuration keys are:

```env
IBM_API_KEY=
IBM_PROJECT_ID=
IBM_REGION=us-south
IBM_MODEL=ibm/granite-3-8b-instruct
IBM_API_VERSION=2024-03-31
```

Use [`.env.example`](./.env.example) as the template. Never commit a real `.env` file.

## Architecture

```text
Browser
  │
  │  Vanilla JS fetch requests
  ▼
Express API (Node.js)
  ├── Review and explanation services
  ├── Release-note generation
  ├── CORS and rate limiting
  └── SQLite persistence
        │
        └── JSON fallback for local preview environments
```

## API routes

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/review` | Reviews submitted code and stores the result |
| `POST` | `/api/explain` | Explains what code does, why it exists, and where it is used |
| `POST` | `/api/line-explain` | Returns line-by-line explanations |
| `POST` | `/api/release-notes` | Generates Markdown release notes |
| `GET` | `/api/history` | Lists stored review and release-note records |
| `GET` | `/api/history/:type/:id` | Returns one saved record and its payload |
| `GET` | `/health` | Returns service health status |

## Run locally

### Requirements

- Node.js 18 or newer
- npm

### Install and configure

```bash
npm install
cp .env.example .env
```

Add provider credentials to `.env` only when connecting to a configured IBM watsonx.ai deployment. The local fallback works without them.

### Start the application

In one terminal, start the backend:

```bash
npm start
```

In another terminal, start the frontend preview:

```bash
npm run preview
```

Open:

- Frontend: <http://localhost:5500>
- Backend health check: <http://localhost:3001/health>

### Validate the project

```bash
npm run check
```

This checks the syntax of the backend and frontend JavaScript.

## Project structure

```text
.
├── public/
│   ├── index.html       # Application shell
│   ├── app.js           # Vanilla JS state, navigation, and API interactions
│   ├── styles.css       # Shared responsive design system
│   └── logo.svg         # Code Review Coach brand mark
├── server.js            # Express API and persistence layer
├── preview-server.js    # Static frontend preview server
├── data/                # Runtime review history, ignored by Git
├── stitch-reference/    # Original Stitch screens and design documentation
├── .env.example         # Safe environment variable template
├── package.json         # Scripts and dependencies
└── README.md
```

## Security notes

- API keys stay on the backend.
- `.env` is ignored and must not be committed.
- The browser communicates with the Express API instead of calling the AI provider directly.
- CORS and rate limiting are enabled on the API.
- Generated runtime history and local archives are excluded from Git.

## Design direction

The interface follows the Kinetic Syntax direction from the Stitch reference export:

- Pitch-black workspace background
- Violet panels and electric-violet primary actions
- Monospace code and technical metadata
- Structural borders and modular cards
- Risk colors for low, medium, and high findings
- Desktop two-panel review workflow
- Mobile-first wrapping analysis controls

Reference material is available in [`stitch-reference/`](./stitch-reference/), while the production UI is implemented in [`public/`](./public/).

## Roadmap

- Connect the review service to a production IBM watsonx.ai request flow
- Add repository and pull-request context imports
- Add configurable review rules per workspace
- Add export options for PDF and GitHub review comments
- Expand automated tests for API responses and keyboard navigation

## Learning achievement

This project was developed as part of my continued learning in AI application development, secure API integration, and full-stack product design. It reflects my interest in building practical tools that help developers learn from their own code.

## Links

- GitHub: [Aishvaryasaii05/code-review-coach-ai-](https://github.com/Aishvaryasaii05/code-review-coach-ai-)
- Live demo: Add the deployed Render URL here when available

## Tags

`#ArtificialIntelligence` `#IBM` `#watsonx` `#SkillsBuild` `#WebDevelopment` `#NodeJS` `#ExpressJS` `#SQLite` `#CodeReview` `#DeveloperTools` `#ContinuousLearning` `#BuildInPublic`
