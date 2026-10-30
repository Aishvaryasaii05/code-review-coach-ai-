require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
let Database;
try { Database = require('better-sqlite3'); } catch (error) { Database = null; }

const app = express();
const port = Number(process.env.PORT || 3001);
const dataDir = path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });
const jsonPath = path.join(dataDir, 'reviews.json');
let fallbackRows = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf8')) : [];
let db = null;
if (Database) {
  try { db = new Database(path.join(dataDir, 'coach.db')); } catch (error) { db = null; }
}
if (db) {
  db.pragma('journal_mode = WAL');
  db.exec(`CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, title TEXT NOT NULL, language TEXT, risk TEXT, score INTEGER, payload TEXT NOT NULL, created_at TEXT NOT NULL)`);
} else {
  console.warn('better-sqlite3 is unavailable; using data/reviews.json for this preview.');
  db = {
    prepare(query) {
      return {
        run(...values) {
          const [type, title, language, risk, score, payload, createdAt] = values;
          const row = { id: fallbackRows.length + 1, type, title, language, risk, score, payload, created_at: createdAt };
          fallbackRows.unshift(row); fs.writeFileSync(jsonPath, JSON.stringify(fallbackRows, null, 2)); return { lastInsertRowid: row.id };
        },
        all() { return fallbackRows.slice(0, 100).map(({ id, type, title, language, risk, score, created_at: createdAt }) => ({ id, type, title, language, risk, score, createdAt })); },
        get(type, id) { return fallbackRows.find((row) => row.type === type && String(row.id) === String(id)); }
      };
    }
  };
}

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || true }));
app.use(express.json({ limit: '2mb' }));
app.use(rateLimit({ windowMs: 60 * 1000, limit: 60, standardHeaders: true, legacyHeaders: false }));

function reviewCode(code, language) {
  const source = String(code || '');
  const issues = [];
  if (!source.trim()) return { risk: 'LOW', score: 0, issues: [], summary: 'Add code to begin an analysis.', explanation: explainCode(source, language) };
  if (/eval\s*\(|child_process|innerHTML\s*=/.test(source)) issues.push({ severity: 'HIGH', title: 'Potential unsafe execution', line: 1, detail: 'Review dynamic execution or untrusted HTML before merging.', fix: 'Prefer allow-listed operations and escaped rendering.' });
  if (/SELECT.+\+|SELECT.+\$\{|query\s*\(.*\+/.test(source)) issues.push({ severity: 'HIGH', title: 'Possible injection boundary', line: 1, detail: 'Query construction appears to mix code and user input.', fix: 'Use parameterized queries for every external value.' });
  if (/TODO|FIXME/.test(source)) issues.push({ severity: 'MEDIUM', title: 'Unresolved implementation marker', line: 1, detail: 'A TODO/FIXME remains in the changed code.', fix: 'Resolve the marker or create a tracked follow-up issue.' });
  if (source.split('\n').some((line) => line.length > 120)) issues.push({ severity: 'LOW', title: 'Long line detected', line: 1, detail: 'Long lines reduce scanability in review.', fix: 'Break the expression into named intermediate values.' });
  const score = Math.min(100, issues.reduce((sum, item) => sum + ({ HIGH: 42, MEDIUM: 22, LOW: 8 }[item.severity] || 0), 8));
  const risk = score >= 60 ? 'HIGH' : score >= 25 ? 'MEDIUM' : 'LOW';
  return { risk, score, issues, language, summary: issues.length ? `Found ${issues.length} actionable concern${issues.length > 1 ? 's' : ''}.` : 'No blocking issues found. This change looks ready for review.', explanation: explainCode(source, language) };
}

function explainCode(source, language) {
  const code = String(source || '').trim();
  if (!code) return { what: 'No code has been provided yet.', why: 'Paste or upload a file so the Coach can identify its purpose.', where: 'The explanation will appear here after analysis.' };
  const lower = code.toLowerCase();
  const isApi = /express|router|fetch\(|axios|http|request|response|endpoint/.test(lower);
  const isData = /select |insert |update |delete |query\(|database|sqlite|sql/.test(lower);
  const isUi = /document\.|queryselector|addEventListener|react|component|render\(/.test(lower);
  const isAuth = /auth|token|password|permission|role|login|session/.test(lower);
  const lineCount = code.split('\n').length;
  const functionNames = [...code.matchAll(/(?:function\s+|(?:const|let|var)\s+)([A-Za-z_$][\w$]*)/g)].map((match) => match[1]);
  const hasAsync = /async\s+|await\s+|promise/i.test(code);
  const hasBranches = /\b(if|else|switch|case|try|catch)\b/.test(code);
  const hasLoops = /\b(for|while|forEach|map|filter|reduce)\b/.test(code);
  const what = isApi ? `This ${language} code handles an API or network interaction, shaping requests and responses between services.` : isData ? `This ${language} code reads or changes application data through a database or query layer.` : isUi ? `This ${language} code controls user-interface behavior, connecting events or state to what users see.` : isAuth ? `This ${language} code participates in authentication or authorization, deciding who can access a protected operation.` : `This ${language} code implements a focused application routine with ${code.split('\n').length} lines of logic.`;
  const why = isApi ? 'It exists to move validated information across an application boundary and keep clients and services coordinated.' : isData ? 'It exists to persist, retrieve, or transform information that the application needs beyond one request.' : isUi ? 'It exists to make the interface respond to user actions and keep the visible state in sync.' : isAuth ? 'It exists to protect behavior or data by checking identity, permissions, or session state before continuing.' : 'It exists to turn inputs into a predictable result that another part of the application can call or reuse.';
  const where = isApi ? 'Typically used in backend route handlers, service clients, webhooks, or integration modules.' : isData ? 'Typically used in repositories, data-access services, migrations, and backend persistence code.' : isUi ? 'Typically used in browser modules, components, page controllers, and interaction handlers.' : isAuth ? 'Typically used at login boundaries, middleware, route guards, and service authorization checks.' : 'Typically used by a route, command, scheduled job, event handler, or another helper in the same feature.';
  const details = {
    overview: `${what} The review covers ${lineCount} lines and looks at the code as a connected execution path rather than isolated statements.`,
    flow: `Execution starts when a caller, event, route, or scheduled task invokes ${functionNames.length ? functionNames.join(', ') : 'the surrounding routine'}. The code receives its input, evaluates the statements in order, ${hasBranches ? 'chooses paths based on conditions and error handling, ' : ''}${hasLoops ? 'may iterate over a collection or repeat work, ' : ''}and produces a result for the next layer. ${hasAsync ? 'Because asynchronous syntax is present, the caller should wait for the returned promise and handle rejection or timeout paths.' : 'The visible flow is synchronous unless a called dependency performs asynchronous work internally.'}`,
    inputs: `Inputs come from the values passed into the function or module. Review the expected type, required fields, empty values, malformed data, and untrusted values before they reach sensitive operations. ${isApi ? 'For network-facing code, validate request parameters and do not assume that headers, body fields, or upstream responses are safe.' : 'For internal code, document the expected shape and keep validation close to the boundary where data first enters the routine.'}`,
    outputs: `The output is the value returned by the routine or the side effect it performs. Trace that output to its caller to confirm whether errors, empty results, status codes, and partial failures are handled consistently. ${isData ? 'Database writes should also be checked for transaction boundaries and confirmed persistence.' : isUi ? 'UI updates should be checked for stale state, missing elements, and repeated event listeners.' : 'Callers should not need to guess whether the result is a value, promise, exception, or mutated object.'}`,
    dependencies: `The code may depend on ${isApi ? 'an HTTP client, server framework, route contract, or remote service' : isData ? 'a database driver, schema, query contract, or persistence layer' : isUi ? 'the DOM, browser events, component state, or rendering lifecycle' : 'the functions, values, and modules that provide its inputs and helpers'}. Verify those contracts together with this change because a locally correct function can still fail when a dependency returns an unexpected value.`,
    risks: `${isAuth ? 'Authentication and authorization boundaries require explicit denial behavior and careful handling of secrets. ' : ''}${isApi ? 'Network calls need timeouts, response validation, retries only when safe, and clear handling of non-success status codes. ' : ''}${isData ? 'Data access needs parameterized queries, validation, and safe migration or rollback behavior. ' : ''}${hasAsync ? 'Async paths need rejection handling so failures do not become unhandled promises. ' : ''}Also check naming, duplicated logic, long expressions, and boundary cases that are not visible in the happy path.`,
    testing: `Test the normal path, invalid input, empty input, dependency failure, and the most important boundary case. For this code, add an assertion for the returned value or visible side effect, then verify the relevant caller or route so the behavior is correct across the full path.`,
  };
  return { what, why, where, details };
}

function explainLines(source, language) {
  return String(source || '').split('\n').map((raw, index) => {
    const line = raw.trim();
    if (!line) return { line: index + 1, code: '', explanation: 'Blank line used to separate logical sections.' };
    let explanation = `This ${language} line contributes to the surrounding program logic.`;
    if (/^\/\//.test(line) || /^#/.test(line)) explanation = 'Comment: documents intent for the next developer; it does not execute.';
    else if (/^(import|from |require\(|using )/.test(line)) explanation = 'Import: brings a dependency or module into this file so its functionality can be reused.';
    else if (/^(export )?(async )?function |^(export )?class /.test(line)) explanation = 'Declaration: defines a reusable function or class that other code can call or instantiate.';
    else if (/^(if|else if|else|switch|case|while|for)\b/.test(line)) explanation = 'Control flow: decides which code should run based on a condition or repetition.';
    else if (/\b(return|throw)\b/.test(line)) explanation = 'Outcome: returns a value to the caller or stops execution with an error.';
    else if (/\b(SELECT|INSERT|UPDATE|DELETE)\b|query\s*\(/i.test(line)) explanation = 'Data access: reads or changes persistent data; validate inputs and prefer parameters.';
    else if (/\b(fetch|axios|request|\.get\(|\.post\(|http)\b/i.test(line)) explanation = 'Integration: communicates with another service or API and handles a network boundary.';
    else if (/=>|\w+\s*=\s*function/.test(line)) explanation = 'Callback: creates a function value that can be passed to an event, collection method, or async operation.';
    else if (/\b(const|let|var)\b/.test(line)) explanation = 'State: creates a local value used by later lines in this scope.';
    else if (/\.(map|filter|reduce|forEach)\(/.test(line)) explanation = 'Collection transform: iterates over data to filter, convert, aggregate, or process each item.';
    else if (/\b(console|logger|log)\b/.test(line)) explanation = 'Diagnostic output: records information useful for debugging or operational visibility.';
    return { line: index + 1, code: raw, explanation };
  }).filter((item) => item.code || item.line === 1);
}

app.post('/api/review', (req, res) => {
  const result = reviewCode(req.body.code, req.body.language || 'JavaScript');
  const title = req.body.title || `${req.body.language || 'Code'} review`;
  const created = new Date().toISOString();
  const info = db.prepare('INSERT INTO reviews (type,title,language,risk,score,payload,created_at) VALUES (?,?,?,?,?,?,?)').run('review', title, result.language, result.risk, result.score, JSON.stringify({ ...result, code: req.body.code }), created);
  res.json({ id: info.lastInsertRowid, ...result, createdAt: created });
});

app.post('/api/explain', (req, res) => {
  res.json(explainCode(req.body.code, req.body.language || 'JavaScript'));
});

app.post('/api/line-explain', (req, res) => {
  res.json({ lines: explainLines(req.body.code, req.body.language || 'JavaScript') });
});

app.post('/api/release-notes', (req, res) => {
  const version = req.body.version || 'v1.0.0';
  const audience = req.body.audience || 'engineering teams';
  const changes = String(req.body.changes || '').trim();
  const notes = `# Release notes ${version}\n\nFor ${audience}.\n\n## What changed\n${changes || '- Improvements and maintenance updates.'}\n\n## Review status\nGenerated by Code Review Coach.`;
  const created = new Date().toISOString();
  const info = db.prepare('INSERT INTO reviews (type,title,language,risk,score,payload,created_at) VALUES (?,?,?,?,?,?,?)').run('release-notes', `Release notes ${version}`, 'Markdown', 'LOW', 0, JSON.stringify({ version, audience, notes }), created);
  res.json({ id: info.lastInsertRowid, version, audience, notes, createdAt: created });
});

app.get('/api/history', (req, res) => {
  const rows = db.prepare('SELECT id,type,title,language,risk,score,created_at AS createdAt FROM reviews ORDER BY id DESC LIMIT 100').all();
  res.json(rows);
});
app.get('/api/history/:type/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM reviews WHERE type = ? AND id = ?').get(req.params.type, req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json({ ...row, payload: JSON.parse(row.payload) });
});
app.get('/health', (req, res) => res.json({ ok: true, service: 'code-review-coach' }));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`Code Review Coach backend listening on http://localhost:${port}`));
