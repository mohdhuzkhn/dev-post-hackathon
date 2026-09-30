# How does VentureStress AI check an idea?

VentureStress AI identifies what must be true for an idea to work and proposes ways to test it. It does **not** establish that a business is viable. The current app uses your description and Gemini's learned patterns to generate unverified hypotheses; it does not browse the web, interview customers or run experiments.

## Where the four domains get their answers

All four domains are generated together in **one server-side Gemini request**, using the official Google GenAI SDK. They are four analytical perspectives, not four independent research agents or databases.

| Domain | What Gemini examines | Evidence a real pilot would need |
| --- | --- | --- |
| Customer Demand | Who has the problem, how painful it is, and whether people would adopt the proposed solution. | Interviews about past behavior, observed use, repeat engagement and actual commitments. |
| Competition & Differentiation | Alternatives customers might use and why they might choose this idea instead. Suggested differences remain unverified. | Research into actual alternatives and customer comparisons or switching behavior. |
| Pricing & Economics | Who pays, willingness to pay, recurring costs and assumptions behind sustainable delivery. | Price tests, paid commitments where appropriate, and measured costs per customer or session. |
| Operations & Delivery | Whether the service can be delivered reliably, with sufficient quality, capacity and trust. | Small supervised trials measuring quality, failure rates, human effort and delivery costs. |

The prompt currently asks for exactly two assumptions per domain (eight total). The response validator permits two or three per domain, matching the approved product scope. Each assumption includes qualitative impact and uncertainty, plus an experiment with participants, steps, a metric, a proposed decision rule, resources, duration and next actions.

Gemini also selects three priorities across the domains and explains its selection. This is model judgment, not a calculated success score, a statistical probability or an independently verified ranking. Different runs can produce different hypotheses and priorities.

## Request and validation flow

1. The user enters an idea. The server accepts a trimmed description of 20–4,000 characters and bounds the request size.
2. The server sends the idea as JSON data alongside a separate system instruction. The instruction tells Gemini to treat the idea as untrusted input, avoid fabricated research and label missing information as uncertainty.
3. Gemini produces structured JSON containing the four domains, assumptions, experiments and priority references. There is no retrieval or external market-data source in this version.
4. The server checks completion, parses JSON and validates it with Zod. Checks include all four domains, assumption counts, required fields, allowed labels and exactly three distinct references to existing assumptions.
5. Invalid or incomplete output becomes a readable error. The app does not substitute invented fallback results. The browser validates the returned analysis again before rendering it.

**Passing these checks means the response has the required structure. It does not mean its claims are true, its proposed experiment is sufficient, or its priorities are correct.** Prompt instructions reduce errors but cannot guarantee factual accuracy or resistance to every malicious input.

## Example: the AI teacher-clone pilot

Pilot idea: online teachers create an authorized AI clone that can conduct classes. The following are illustrative hypotheses and evidence plans, not completed findings:

- **Demand:** Teachers want help delivering lessons, and learners will use it. Interview teachers about their current workload, then observe voluntary learner use of a small supervised demonstration.
- **Differentiation:** A teacher-specific teaching approach offers value beyond generic tutoring tools. Compare the same lesson task against real alternatives and collect preference reasons and observed learning results.
- **Economics:** Teachers would pay enough to cover delivery. Test a concrete offer and measure model usage, support time and cost per lesson; expressions of interest alone do not establish willingness to pay.
- **Delivery:** The authorized clone can teach accurately and escalate uncertainty. With teacher permission, trial a limited lesson, have the teacher grade the answers, and record errors and required interventions.

Set decision rules before collecting evidence. Numeric thresholds suggested by the app are proposed test criteria, not established industry benchmarks. Record the sample, observations, contradictory evidence and limitations; then support, revise or reject each assumption. Small pilot results do not establish general market demand.

This pilot remains manual and separate from VentureStress AI. No customer recruitment, outreach, payments or autonomous teaching sessions are executed by the app, and no real pilot evidence has been collected yet.

## Code and data boundaries

- [Prompt](../lib/ai/prompts.ts): analytical instructions and evidence rules.
- [Gemini integration](../lib/ai/analyzeIdea.ts): server-only SDK call, timeout and parsing.
- [Provider schema](../lib/ai/providerSchema.ts): structural schema sent to Gemini.
- [Full response validator](../lib/ai/schema.ts): local contract and reference checks.
- [API route](../app/api/analyze/route.ts): request limits and safe errors.
- [Interface](../app/page.tsx): form, priorities, domains and experiment rendering.

The API key stays on the server. Reports live in browser memory and clear on refresh; the app has no report database. The idea is sent to Google for processing, so provider data handling still applies. Do not enter confidential information when using the approved Gemini free tier.
