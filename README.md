# Aegis Coach

A Next.js App Router starter for designing safer security AI chat experiences.

## Included

- Figma-inspired `/studio` hero shell translated into a working page
- Custom Aegis components layered on top of simple shadcn-style primitives
- Coach schema, rubric, prompts, and mock output generation
- API route stubs for `coach`, `build`, `ingest`, and `search`

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000/studio`.

## Deploy To Vercel

1. Push this folder to a Git repo.
2. Import the repo into Vercel.
3. Keep the default framework preset as `Next.js`.
4. No environment variables are required for the current mock-backed version.

The app will deploy as-is because the current `coach` and `build` routes use local mock logic instead of external APIs.

## Notes

- The current `POST /api/coach` route returns schema-validated mock output.
- `POST /api/build` returns an in-memory file bundle derived from the approved spec.
- Replace the mock path with an OpenAI-backed implementation once your API key and retrieval flow are ready.
