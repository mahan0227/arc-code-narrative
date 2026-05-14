# Arc Code Narrative

Explain a **code excerpt** as a **systems story**: logline, cast of modules/functions as “characters,” acts, data journeys, failure-mode “villains,” glossary, and an **onboarding reading order**—still anchored in the real code.

## What it is

A BYOK Next.js app for **onboarding and docs** when READMEs are stale but you have code. It uses metaphor for memory, not to replace line-by-line reading.

## Why it’s useful

- Helps new hires **see the forest** before the trees.
- Gives **narrative hooks** for internal tech talks and blog posts.
- Surfaces **failure modes** as memorable “plot points” with fix hints.
- Produces a **reading order** so self-directed learning has a path.

## Where you can use it

- **Engineering onboarding** — day-one walkthrough of a service or package.
- **Open source** — contributor-friendly overview from a core file.
- **Due diligence** — quick mental model of an unfamiliar codebase.
- **Teaching** — algorithms or systems courses with story-shaped explanations.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · OpenAI Chat Completions (JSON mode)

## Run locally

```bash
npm install
npm run dev
```

## Production check

```bash
npm run build
npm run start
```

## API

`POST /api/narrative` · Header `Authorization: Bearer <key>`

Body: `code` (required), optional `language`, `audience`, `model`.

## Suite brochure

[`docs/neuron-suite-brochure.html`](docs/neuron-suite-brochure.html) · [`docs/neuron-suite-ig-square.svg`](docs/neuron-suite-ig-square.svg)

## License

MIT
