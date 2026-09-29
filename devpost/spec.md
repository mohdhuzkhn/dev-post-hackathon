---
doc: spec
status: approved
---

# VentureStress AI — Technical Blueprint

## How This Works, In Plain Language

The browser sends a business idea to our server. The server validates it, asks Gemini for structured analysis, checks the response, and returns it to the browser. The page displays four domains, 8–12 assumptions, and practical experiments. The API key stays on the server. Reports are kept only in browser memory.

## The Core Journey Through the System

IdeaInput → POST /api/analyze → input validation → analysis service → Gemini → JSON validation → AnalysisView → priority list, matrix and four domain sections.

Implements `prd.md > The Core Journey`.

## Stack

Recommended implementation of the original proposed stack: Next.js App Router, TypeScript, Tailwind CSS and Zod. Gemini and Netlify have already been accepted. Resolve compatible stable package versions at installation, commit the lockfile, and record actual versions in the README. Use Node.js 22 LTS locally and in Netlify if available; verify the selected Next.js version supports it.

- https://nextjs.org/docs — UI and server API in one project.
- https://www.typescriptlang.org/docs/ — compile-time data contracts.
- https://tailwindcss.com/docs — responsive styling.
- https://zod.dev/ — validate untrusted input and AI output at runtime.
- https://ai.google.dev/gemini-api/docs/structured-output — schema-constrained JSON generation.
- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/ — framework deployment support.

## Where It Runs and How Someone Tries It

Install with `npm ci`, copy `.env.example` to `.env.local`, set the server-only Gemini key and selected model, and run `npm run dev`. Open http://localhost:3000. Build with `npm run build`; run production locally with `npm start`.

Deploy using Netlify's supported Next.js adapter, not a static export. Configure the key through Netlify's secret environment configuration. Use a free Netlify subdomain. Confirm the account's Free plan before deployment; no paid upgrade is authorized. GitHub source: https://github.com/mohdhuzkhn/dev-post-hackathon.

Commit and push every completed step, as explicitly requested. Never include credentials or the learner profile. The short demo video remains a separate submission artifact.

## Look and Feel

Off-white surfaces, navy typography, teal accents, readable cards and restrained animation. A bespoke geometric brand mark, domain icons and qualitative priority matrix provide meaningful visuals without fabricated metrics. Use semantic HTML, visible focus, text equivalents for visuals and reduced-motion support. Implements `prd.md > Look and Feel`.

## Components

### IdeaInput
Required idea field, 20–4,000 trimmed characters, example-fill button and submit control. Show limits, reject invalid input, preserve text on failure. The example uses the learner's AI tutor clone idea. Implements `prd.md > Business Idea Input`.

### AnalysisService
Server-only prompt construction and Gemini call. Treat the idea as untrusted data, never instructions overriding the analyst role. Request all four domains in one call, with two or three assumptions per domain. No tools, browsing or external actions. Implements `prd.md > Domain Analysis` and `prd.md > Critical Assumptions`.

### AnalysisSchema
One Zod schema shared for TypeScript inference and response validation. Require exactly the four domain keys; 2–3 assumptions per domain; valid qualitative labels; nonempty experiment fields; and exactly three distinct priority references that resolve to actual assumptions. Reject incomplete or truncated model output.

### AnalysisView
Summary, three priority assumptions, four domain sections and expandable experiment detail. Render model text as plain React text, never HTML. Implements `prd.md > Results and Priority Visuals`.

### PriorityMatrix
Place assumptions in labeled low/medium/high impact and uncertainty cells. Group items within cells without overlap. Provide a matching textual list; these are qualitative judgments, not probability estimates.

### ExperimentCard
Participants, steps, metric, proposed decision rule, duration, resources, and next actions for positive/negative evidence. Label all plans as not conducted. Implements `prd.md > Validation Experiments`.

### RequestState
Idle/loading/success/error states, abort and timeout handling, disabled duplicate submission and accessible status announcements. No invented completed progress steps. Implements `prd.md > Failure and Retry`.

## Data Model

Input: `{ idea: string }`.

Analysis: `{ summary, domains: { customer, competition, economics, operations }, priorities }`.

Domain: `{ opportunity, concerns, unknowns, assumptions }`.

Assumption: `{ statement, whyItMatters, impact, uncertainty, priorityReason, evidenceNeeded, experiment }`.

Experiment: `{ participants, steps, metric, decisionRule, duration, resources, ifSupported, ifContradicted }`.

Priority reference: `{ domain, assumptionIndex, rationale }`. Derive stable display IDs from domain and index. Browser memory owns input/results; refresh clears results. No database, cookies for report storage or analytics. Do not log full ideas or provider responses. Gemini's data policy remains separate from application storage.

## File Structure

```text
app/
  layout.tsx                 # Metadata and global layout
  page.tsx                   # Main workspace
  globals.css                # Theme and responsive styling
  api/analyze/route.ts        # Validated server endpoint
components/
  IdeaInput.tsx
  AnalysisView.tsx
  PriorityMatrix.tsx
  ExperimentCard.tsx
  RequestState.tsx
lib/
  ai/analyzeIdea.ts           # Server-only provider integration
  ai/prompts.ts              # Analyst instructions
  ai/schema.ts               # Output schema and reference validation
  validation/idea.ts          # Input bounds
  examples.ts                # Example input, no fake live output
tests/
  analysis.test.ts            # Meaningful schema/error-path checks
public/favicon.svg
devpost/                     # Approved plans, checklist and app map
.env.example                 # Placeholder configuration
netlify.toml                 # Build/runtime configuration
package.json
package-lock.json
README.md                    # Setup, verification and deployment
```

## External Services and Dependencies

Gemini: use the documented `generateContent` REST endpoint `POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`, server-side `x-goog-api-key`, systemInstruction, contents and JSON response configuration. Extract the response text, parse JSON and validate it. Verify current field names against the API documentation when implementing.

Use `GEMINI_API_KEY` and `GEMINI_MODEL`, never public-prefixed environment variables. Select an available free-tier Flash model through an actual account check; no real API key or account access has been verified yet. Do not promise a specific quota. Keep paid billing disabled. Sources: https://ai.google.dev/api/generate-content and https://ai.google.dev/gemini-api/docs/pricing.

Netlify: build `npm run build` using Next.js support. Verify deployed function duration and set the upstream timeout below it. Avoid assuming development-server behavior proves hosting compatibility. Configure request size limits and supported platform rate limiting before public release; an in-memory counter is not global protection in serverless hosting.

## Important Failure Modes

- Invalid or oversized body → reject before calling Gemini.
- Missing key or unavailable model → clear configuration error, no sample fallback.
- Quota exhaustion → retry-later message; no automatic retry loop consuming quota.
- Timeout or upstream failure → preserved input and retry control.
- Invalid JSON, truncation, invalid references or wrong domain counts → safe formatting error.

## Verification and Deployment

Verify typed compilation and production build. Test domain counts, assumption cardinality, priority references, invalid input and provider failures using controlled fixtures explicitly restricted to tests. Then run a real Gemini analysis of the AI tutor clone idea. Check keyboard operation and mobile/desktop rendering. After deployment, submit a real idea on the live URL and verify privacy text, output and error handling. Report any missing credentials as unverified integration, never as success.

## What Was Simplified and Why

One provider request and no report database keep the kernel demonstrable. The manual pilot is outside the app: it needs real participants, not a campaign subsystem. No generated results count as measured market evidence.

## Decisions and Open Issues

Accepted: four domains, 2–3 assumptions each, Gemini, Netlify, professional styling, separate manual pilot and push after every completed step.

Approved by the learner: Next.js/TypeScript/Tailwind/Zod implementation described here, consistent with the original concept. Learning focus: tracing a typed contract across browser, server and untrusted model output, then checking behavior in production. The learner requested hands-on checks at important AI engineering steps.

Investigate during build: real account access, free-tier model quota, structured-output compatibility and deployed timeout limits. The learner's uncertainty about free platforms was addressed through platform research; the real account checks will validate availability.

Before conducting the manual pilot: establish access to online teacher volunteers. The selected business idea is an AI tutor clone platform where teachers create AI clones that conduct classes independently. No second app, synthetic customer feedback or unsupervised classes will be created as part of VentureStress development.
