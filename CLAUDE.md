# Tul Analyzer

VAR for ITF Taekwondo tul (patterns). The app receives recorded or live video
of a contestant performing a tul, runs it through an ML/CV pipeline, and
returns a per-criterion score plus actionable pointers.

## Stack

- Vite + Vue 3 (plain JS, Composition API + `<script setup>`)
- Pinia (state)
- Vue Router (routing)
- Vuetify (UI, light theme)
- vue-i18n (es default, en fallback; `legacy: false`)
- Vitest + @vue/test-utils + jsdom (tests)
- ESLint flat config (`eslint.config.js`)

## Structure

```
src/
  main.js           # bootstraps Vue, Pinia, Router, Vuetify
  App.vue           # shell: app bar + <router-view/>
  router/           # route table
  views/            # page-level components (HomeView)
  components/       # reusable UI pieces (TulCard, AnalyzePanel)
  stores/           # Pinia stores
  services/         # external integrations (analyzer API + mock fallback)
  data/             # static reference data (tul catalog, scoring criteria)
  i18n.js           # vue-i18n setup (es default, en fallback)
  style.css         # minimal global resets; Vuetify owns the rest
```

Path alias `@/` → `src/`.

## ML/CV integration

The analyzer is treated as an external service. `src/services/analyzer.js`
exposes `analyzeRecording({ tulId, source })`:

- If `VITE_ANALYZER_API_URL` is set, it `POST`s to `${API_URL}/analyze` and
  returns the parsed JSON response.
- Otherwise it returns a deterministic mock so the UI is fully usable
  without a backend.

The expected response shape is:

```js
{
  tulId: string,
  sourceType: 'upload' | 'webcam' | 'url',
  overall: number,        // 0–9
  breakdown: [{ key, label, score, note }],
  pointers: string[],
}
```

When the real backend lands, only `analyzer.js` should change — views and
stores already speak this shape.

## Layout

The app is a single page (`HomeView`) with two columns:

- Left (`AnalyzePanel`): always rendered; input card is disabled until a tul
  is selected, results appear after a successful run.
- Right (`TulCard` list): scrollable box, capped at viewport height, lets the
  user pick from gup + dan tuls. Each card shows a belt-color strip.

## Input sources

`AnalyzePanel.vue` lets the user choose between three sources, all funneled
through the same store action:

- File upload (recorded video)
- Live webcam (real-time)
- URL / stream (remote source)

The current scaffold passes `{ type, url }` to the service; wiring actual
`File`/`MediaStream` handles is the next step.

## Scoring model

Standard ITF criteria (`src/data/tuls.js`):

1. Technical content
2. Power
3. Balance
4. Rhythm
5. Breathing

Scores are 0–9 per criterion; overall is the mean.

## Conventions

- Composition API with `<script setup>`, no Options API.
- One Pinia store per domain (currently just `analysis`).
- Keep `services/` the only layer that talks to the network.
- Components stay thin: data lives in stores or `data/`.
- All user-facing strings go through `vue-i18n` (`t('key')`); never hardcode.

## Coding practices

- **KISS**: simplest thing that works. No clever indirection, no abstractions
  before they pay rent.
- **YAGNI**: don't build for hypothetical future needs. Add the option, prop,
  or layer when a real caller asks for it — not before.
- **Prefer new components over inline markup.** If a chunk of template has a
  clear identity (a card, a panel, a list item), extract it. Especially if
  it repeats more than twice — at that point inlining is no longer a
  judgment call, extract it.
- Keep components focused on one job; lift shared state to the parent or a
  store rather than duplicating it.

## Git practices

- Commit messages MUST follow [Conventional Commits](https://www.conventionalcommits.org/)
  (`type(scope): subject`). Common types: `feat`, `fix`, `chore`, `refactor`,
  `docs`, `style`, `test`, `build`, `ci`, `perf`. Scope is optional.
- The subject is a **one-liner**: imperative mood, lowercase, concise
  (e.g. `feat(home): extract analyze panel into its own component`).
- Always include a `Co-Authored-By` trailer for the AI tool that helped
  produce the commit. Example for Claude:

  ```
  Co-Authored-By: Claude <noreply@anthropic.com>
  ```

  Use the matching identity when a different AI tool is used.
