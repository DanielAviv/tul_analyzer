# Tul Analyzer

VAR (Video Assistant Referee) for ITF Taekwondo competition. Submit a recorded
or live video of a tul performance and get a per-criterion score plus actionable
pointers to support the judges' panel decision.

## Stack

Vue 3 · Vite · Pinia · Vuetify · vue-i18n (es/en) · Vitest

## Getting started

```bash
bun install
bun run dev
```

No backend required — the app runs fully with a mock analyzer when
`VITE_ANALYZER_API_URL` is not set.

## Connecting the real analyzer

Set `VITE_ANALYZER_API_URL` in `.env.local` to point at your ML/CV backend:

```
VITE_ANALYZER_API_URL=https://your-analyzer-api
```

The backend must accept `POST /analyze` with `{ tulId, source }` and return:

```json
{
  "tulId": "...",
  "sourceType": "upload | webcam | url",
  "overall": 7.4,
  "breakdown": [{ "key": "...", "label": "...", "score": 8.1, "note": "..." }],
  "pointers": ["..."]
}
```

## Running tests

```bash
bun run test
```
