# VentureStress AI

A hackathon proof of concept for examining business assumptions across customer demand, competition, economics and operations. Uses the official Google GenAI SDK on the server and validates responses with Zod.

## Run locally

1. Use Node.js 22 or newer (development verified with Node.js 24.7.0).
2. Run `npm ci`.
3. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY` and `GEMINI_MODEL` to an available Gemini Flash model. Never commit this file.
4. Run `npm run dev` and open http://127.0.0.1:3000.
5. Fill the AI tutor clone example and submit it.

## Checks

- `npm run typecheck`
- `npm test` — output contract, reference integrity, input bounds and error sanitization.
- `npm run build` — production compilation.
- `node --env-file=.env.local --import tsx scripts/verify-gemini.ts` — real provider verification using the tutor clone example. Uses your account quota. Prints only validation status and counts, not the key.

Test fixtures are synthetic and exist only in tests; they never substitute for live results.

## AI engineering boundaries

Read [How ideas are checked](devpost/how-ideas-are-checked.md) for the source of the four-domain answers, validation limits and the teacher-clone pilot example.

- `lib/ai/prompts.ts`: analyst role, uncertainty/evidence rules and experiment instructions.
- `lib/ai/schema.ts`: shared output contract; checks four domains, 2–3 assumptions each and three unique priority references.
- `lib/ai/analyzeIdea.ts`: server-only SDK call and runtime parsing.
- `app/api/analyze/route.ts`: bounded input and safe HTTP errors.
- `app/page.tsx`: initial input and result rendering; component extraction and matrix belong to the next slice.

The SDK performs the request; it does not eliminate the need for an API key, provider quota or application-level validation. Free-tier Gemini content may be used by Google to improve products. Do not submit confidential ideas. Application results remain in browser memory and clear on refresh.

## Versions

The lockfile records exact versions. Initial build: Next.js 16.3.7, React 19.3.0, Google GenAI SDK 2.24.0, Zod 4.6.5, Tailwind 4.3.3 and TypeScript 7.0.2.

## Delivery status

Live app: https://venturestress-ai.netlify.app. Netlify production deployment is verified; the qualitative matrix remains incomplete. See `devpost/checklist.md` for verified milestones and pending learner checks. Every completed step is committed and pushed. The teacher-clone business experiment is a separate manual pilot requiring real volunteers; no market results have been collected.

