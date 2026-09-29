---
doc: prd
status: approved
---

# VentureStress AI — Product Requirements

Help early-stage entrepreneurs identify uncertain assumptions and design practical tests before investing heavily. Source: `scope.md > The Unique Kernel`.

## The Core Journey

1. Open the app and describe a business idea in a prominent text field.
2. Read a concise disclosure that the idea is sent to Gemini, whose free-tier content may be used for product improvement; avoid confidential information.
3. Submit the idea and see an honest loading state.
4. Receive an executive summary and a short list of what to test first.
5. Inspect four domains, each containing two or three critical assumptions.
6. Review a concrete experiment for each assumption and select the first action to take.
7. Edit the idea and run a new analysis if desired.

Source: `scope.md > The Core Loop` and `scope.md > The POC Boundary`.

## Screens and Layout

One focused input-and-results workspace. The input is immediately visible; results replace the empty introductory area after analysis. Results lead with priorities, followed by four navigable domain sections. Details can expand to keep 8–12 assumptions readable. Preserve the entered idea after errors. Include an example idea that fills the input without silently submitting it.

## Look and Feel

The learner requested professional design with visuals for entrepreneurs and delegated specific styling. Use an off-white background, dark navy headings, teal accents, crisp borders, generous spacing, and restrained motion. Use domain icons and a labeled qualitative impact/uncertainty matrix; do not imply numerical precision. Every visual conveys information available in text. Desktop and mobile layouts must both remain readable; keyboard focus and reduced-motion preferences are respected.

## Features and Behavior

### Business Idea Input

One required text field. Reject empty or whitespace-only input with an inline message. Provide a visible length limit, preserve input on failure, and disable duplicate submissions while generating. Context such as customer and location can be included in the same field.

### Domain Analysis

Exactly four domains: Customer Demand; Competition & Differentiation; Pricing & Economics; Operations & Delivery. Each contains a concise analysis of opportunity, concerns, unknowns and two or three critical assumptions. Risks appear in the relevant domain. All four domains must render on success. Source: `scope.md > The Unique Kernel`.

### Critical Assumptions

Each assumption has a specific statement, why it matters, qualitative impact and uncertainty, an explanation of priority, and evidence needed. Identify user-provided claims as unverified where appropriate. Never invent verified market data, named competitors or customer feedback.

### Validation Experiments

Each assumption has an experiment with the intended participants, steps, measurement, suggested duration/resource needs, proposed decision rule, and next actions for supportive or contradictory results. Any numeric target is explicitly a proposed test criterion, not an established industry benchmark. The three highest-priority assumptions across all domains lead the result, with explanations.

Generated plans are marked as proposed and not conducted. The learner selected a separate manual pilot. The app does not launch campaigns, contact customers, collect payments, or track experiment results.

### Results and Priority Visuals

Show the submitted idea, summary, cross-domain priorities, qualitative priority matrix and domain details. The matrix and labels must agree with the actual assumptions. Do not show viability percentages, fabricated market statistics, fake testimonials or simulated measured outcomes.

### Failure and Retry

Handle invalid input, unavailable AI service, quota exhaustion, timeout, and malformed output with clear messages. Offer retry without deleting the input. Never silently replace failed live analysis with sample results. Loading text must not claim completed analysis steps without real evidence.

## States and Boundaries

- First use: show input, brief explanation and example idea.
- Loading: show a busy state and prevent duplicate requests.
- Success: render all four domains and 8–12 assumptions with their experiments.
- Error: preserve input and expose retry when useful.
- Refresh: analysis is session-only and is not saved by the application.
- Privacy: application persistence is separate from Gemini's data handling; do not promise that the provider stores nothing.

## Product Decisions

- Entrepreneurs are the initial audience.
- Expand from three assumptions overall to 3–4 domains with 2–3 assumptions each; four domains chosen within that requested range.
- Professional styling and meaningful visuals are delegated to the implementer.
- Gemini + Netlify are accepted; free limits and data policy have been discussed.
- Real business experiments will be conducted as a separate manual pilot, as selected by the learner.

## What We're Building

A responsive idea-to-analysis-to-experiment-plan app with the accepted four-domain structure, real AI generation, clear evidence boundaries and practical error handling.

## Deferred From the POC

Accounts, payments, saved reports, collaboration, web research and experiment tracking remain excluded. The manual pilot requires no added application infrastructure.

## Non-Goals

No guaranteed business predictions, arbitrary business scores, invented research, business-plan generation or investor pitch generation.

## Open Questions

1. The experiment execution boundary is resolved: separate manual pilot.
2. Pilot idea selected by the learner: an AI tutor clone platform where online teachers create AI clones that conduct classes independently. Access to volunteer online teachers remains to be established before a real pilot.

The learner explicitly approved this product plan. The AI tutor clone platform is the pilot subject, not an additional application to build.
