# Arc Code Narrative

Explain code as a **systems story**: cast of modules/functions, acts, data journeys, failure-mode “villains,” and an onboarding reading order — still anchored in the real code. **BYO OpenAI API key.**

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

Body: `code`, optional `language`, optional `audience`, optional `model`.

## License

MIT
