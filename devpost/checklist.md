---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast, with learner-requested hands-on checks at AI engineering milestones and final review.

Commit and push each completed step to the specified GitHub repository. Do not mark live AI or deployed behavior verified without actually exercising it.

## Slices

- [ ] **1. Submit an idea and receive validated live AI analysis**
  Becomes usable: An entrepreneur enters an idea and receives four domains with 8–12 assumptions and experiment plans in a readable initial interface.
  Why now: Proves the actual AI kernel and provider compatibility before spending time polishing output.
  PRD ref: `prd.md > Business Idea Input`, `prd.md > Domain Analysis`, `prd.md > Critical Assumptions`, `prd.md > Failure and Retry`
  Spec ref: `spec.md > IdeaInput`, `spec.md > AnalysisService`, `spec.md > AnalysisSchema`, `spec.md > RequestState`
  Build: Scaffold the Next.js application, initial professional layout, bounded input, server-only Gemini call, prompt, output schema, basic results and explicit error states. Add a secret-free environment template and setup instructions.
  Verify (mechanical): Run type checking, production build and focused tests for input rejection, wrong domain counts, invalid priority references, malformed output and provider errors. Run a real Gemini request with the tutor clone idea and confirm 2–3 assumptions in each of four domains. Missing credentials leave the live check incomplete.
  Learner check: Submit the tutor clone idea, then vary the audience or pricing. Inspect whether the analysis changes appropriately. Follow one value from prompt to schema to screen; inspect an invalid-response test to see how untrusted model output is rejected.
  Commit: `Add validated AI business idea stress test`

- [ ] **2. Explore priorities and practical experiments visually**
  Becomes usable: Entrepreneurs can understand which assumptions matter first and inspect actionable experiments through the finished responsive interface.
  Why now: Builds useful presentation around a proven live result and allows AI-quality feedback before release.
  PRD ref: `prd.md > Validation Experiments`, `prd.md > Results and Priority Visuals`, `prd.md > Look and Feel`
  Spec ref: `spec.md > AnalysisView`, `spec.md > PriorityMatrix`, `spec.md > ExperimentCard`, `spec.md > Look and Feel`
  Build: Add priority cards, qualitative matrix, domain navigation, expandable experiment details, domain icons, responsive refinements and accessible status/focus behavior. Keep proposed experiments distinct from measured results.
  Verify (mechanical): Confirm every priority and matrix entry resolves to a real assumption. Check desktop/mobile layouts, keyboard navigation, empty input, retry, quota/error behavior and updated production build. Evaluate two contrasting ideas for specific rather than generic experiment plans.
  Learner check: Trace one priority to its assumption and experiment. Identify the proposed metric and decision rule, and flag unsupported claims or vague tests. Report whether the tutor clone result would help plan a real teacher interview or pilot.
  Commit: `Add visual assumption priorities and experiment plans`

- [ ] **3. Verify the complete app and deploy to Netlify**
  Becomes usable: A publicly accessible Netlify app runs the same real analysis flow as the locally verified version.
  Why now: Deployment is checked only after the core behavior and output quality are reviewed.
  PRD ref: `prd.md > The Core Journey`, `prd.md > States and Boundaries`
  Spec ref: `spec.md > Where It Runs and How Someone Tries It`, `spec.md > Verification and Deployment`, `spec.md > Important Failure Modes`
  Build: Finalize Netlify configuration, runtime secret setup, README, source license decision, deployment checks and the app map. Prepare the manual pilot protocol; do not claim participant results or launch outreach without actual participants and an agreed message.
  Verify (mechanical): Audit intended files and history for private material; build production; verify Netlify Free account and server-only secret configuration; deploy; run real analysis on the public URL; test mobile view, invalid input and retry; verify the pushed Git commit matches the deployed source. Missing credentials or account access leave deployment incomplete.
  Learner check: Try the live tutor clone analysis end to end. Confirm that proposed experiments are clearly labeled, report problems, and confirm readiness after fixes. Inspect why API credentials are absent from browser code and how deployment configuration differs from local setup.
  Commit: `Prepare and verify Netlify deployment`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after slice 1: structured AI output, validation boundary and changed-input behavior.
- [ ] AI evaluation checkpoint — after slice 2: priority traceability, uncertainty labeling and experiment quality.
- [ ] Final kick-the-tires exploration and feedback completed — slice 3: live deployment and production configuration.

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — connect the hands-on validation/evaluation work to one reusable AI engineering practice
- [ ] Optional edit and transfer reflection addressed
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown

Activity and evidence: Not completed.
Route and stops: To reference actual implemented prompt, schema, API and UI paths.
Edit outcome: Not completed.
Reflection: Not yet offered.
Activity mode: Hands-on AI engineering checks, followed by a concise wrap-up using prior practice.

## Revisions

- Slice 1 live verification passed with gemini-3.1-flash-lite: four domains with two assumptions each, valid priority references, and experiment details rendered in the browser. Nine automated tests passed. Learner hands-on feedback is pending; the slice remains unchecked.
- Gemini rejected the full Zod-derived provider schema. The wire schema now sends supported structural fields; Zod still enforces counts, lengths and references after generation. The prompt requests exactly two assumptions per domain, within the approved 2–3 range.
- Gemini 3.8/3.7 returned temporary capacity errors and 2.5 was unavailable to new accounts. The locally verified free-tier model is gemini-3.1-flash-lite. No automatic model fallback is used.
- The SDK integration replaces direct REST at the learner's request. Initial UI rendering is in app/page.tsx; planned component extraction belongs to slice 2.
- Netlify production deployment verified at https://venturestress-ai.netlify.app: homepage 200, invalid input 400, live tutor-clone analysis 200 in 12 seconds, full schema valid with 2 assumptions per domain and 3 priorities. Deployed application source: ed3828f; deploy ID: 6abc68696eba27150b62500e. User explicitly approved standard Netlify environment variables after Free-plan scope restrictions. Learner hands-on checks remain pending.
