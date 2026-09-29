# Free platform comparison

Checked September 29, 2026 against official documentation. These are recommendations, not approved architecture. Free operation is conditional on current allowances, account eligibility, and keeping paid billing disabled.

## Recommended candidate

Gemini Developer API free tier plus Netlify Free hosting, with Next.js, TypeScript and Zod as proposed in the original concept. Confirm the actual model's availability and account quota before implementation and run a real structured-output test before declaring the integration working.

### AI

- Gemini offers free input/output for selected models, subject to limits. Free-tier content may be used to improve Google products. This matters for unpublished business ideas; clearly disclose the provider and data treatment and discourage confidential input. Pakistan is listed as a supported region. Verify actual account access.
- Groq has model-specific free-plan limits and is an alternative, requiring model-specific structured-output and privacy review before selection.

Sources:
- https://ai.google.dev/gemini-api/docs/pricing
- https://ai.google.dev/gemini-api/docs/available-regions
- https://console.groq.com/docs/rate-limits

### Hosting

- Netlify Free: 300 credits/month shared across metered usage, with hard limits and no free-plan overage charges. Projects pause when limits are reached. Official Next.js support makes it a candidate for the existing proposed architecture.
- Vercel Hobby: free for personal, non-commercial use. Attractive for Next.js demos but the usage restriction matters if this becomes a commercial product.
- Cloudflare Workers Free: 100,000 requests/day and a 10 ms CPU limit per invocation. Next.js uses OpenNext; additional runtime/adapter validation is required. External AI charges and quotas are separate.

Sources:
- https://www.netlify.com/pricing/
- https://docs.netlify.com/manage/accounts-and-billing/billing/resume-paused-projects/
- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- https://vercel.com/pricing
- https://developers.cloudflare.com/workers/platform/limits/
- https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/

## Verification before deployment

Confirm free account plan and secret configuration, test real AI output, run production build, verify deployed input/result/retry flows and mobile rendering, and check that client assets and Git history contain no secrets. Configure compatible timeouts and clear quota-error handling. Do not present sample output as live AI results.
