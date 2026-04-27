# Tul Analyzer

**Primary purpose: VAR (Video Assistant Referee) for ITF Taekwondo competition.**
The app is used by judges and referees during or after a tul (pattern)
performance to get an objective, ML-assisted score. It is not an education or
training tool — the target user is someone officiating a match, not a student
practitioner.

The app receives recorded or live video of a contestant performing a tul, runs
it through an ML/CV pipeline, and returns a per-criterion score plus actionable
pointers that support the panel's decision.

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
  components/       # reusable UI pieces (TulSelector, AnalyzePanel, AnalysisResult, …)
  stores/           # Pinia stores
  services/         # external integrations (analyzer API + mock fallback)
  data/             # static reference data (tul catalog, scoring criteria)
  i18n.js           # vue-i18n setup (composes src/i18n/{es,en}.js)
  i18n/             # per-locale message files (es, en)
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

The app is a single page (`HomeView`) with a two-column layout:

- **Left** (`TulSelector`): bordered card with the gup + dan tul list, each
  card showing a belt-color strip. Rail-collapsible — `~320px` expanded,
  `~48px` collapsed (chevron toggle in its header). State is in-memory only.
- **Right column** (`d-flex flex-column flex-grow-1`, `position: relative`):
  - `AnalyzePanel` (`flex-grow-1`): tabbed card filling the full column height.
    Tab 1 holds the source radios, Run button, and video preview; tab 2
    (`TulInfoTab`) shows the tul's meaning + step list.
  - `AnalysisResult` (absolute overlay, `position: absolute; bottom: 12px; right: 12px; z-index: 10`):
    always rendered on top of the video area, not in flex flow. Collapsed: a
    compact square showing only the score ring + chevron. Expanded: widens to
    50% with a two-column detail panel (breakdown table left, pointers right).
    Internal scroll (`max-height: 50vh; overflow-y: auto`) keeps the page from
    ever scrolling.

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

Scores are 0–9 per criterion; overall is 0–9 (independent from breakdown in the mock; the real backend computes it server-side).

## Conventions

- Composition API with `<script setup>`, no Options API.
- One Pinia store per domain (currently just `analysis`).
- Keep `services/` the only layer that talks to the network.
- Components stay thin: data lives in stores or `data/`.
- All user-facing strings go through `vue-i18n` (`t('key')`); never hardcode.

## Layout constraint

**The app must never produce a page-level scrollbar.** All content must fit
within the viewport height at all times. Enforce this through the flex height
chain:

- `v-main` has `style="height: 100%"` (App.vue).
- The `v-container` in `HomeView` uses `fill-height`.
- Inside it, a horizontal `d-flex flex-row fill-height` row holds the
  `TulSelector` (fixed-width, flex-shrink: 0) and a `d-flex flex-column
  flex-grow-1` content column.
- The content column contains `AnalyzePanel` (`flex-grow-1`) filling the full
  height. `AnalysisResult` is `position: absolute` inside a `position: relative`
  wrapper and floats over the video — it is not in the flex flow.
- `AnalyzePanel` fills its card with `height: 100%; overflow: hidden`.
- Tab windows use `flex: 1 1 0; overflow: hidden`; tab content uses
  `height: 100%; overflow-y: auto` for internal scrolling when needed.
- `TulSelector` keeps the list scrollable internally
  (`flex: 1 1 0; min-height: 0; overflow-y: auto`) so its outer width can
  shrink to a rail without breaking the chain.

Never add content outside this chain without verifying it doesn't break the
no-scroll invariant.

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
