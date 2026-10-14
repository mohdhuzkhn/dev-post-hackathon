# Netlify deployment

Live URL: https://venturestress-ai.netlify.app

- Project: venturestress-ai (664d8119-6a18-445c-a1ad-bf3c2118f6ce).
- Verified deploy: 6abc68696eba27150b62500e, application source commit ed3828f.
- Next.js adapter: 5.16.0; Node.js 24; build command and publish directory are in netlify.toml.
- Production variables: GEMINI_API_KEY and GEMINI_MODEL. The model is gemini-3.1-flash-lite.
- On this Free account, restricted variable scopes required an upgrade. With explicit user approval, the key is a standard Netlify environment variable. Authorized project members can read it; it is not committed or intentionally exposed to browser code.
- This deployment was made with the CLI. Automatic deployment from GitHub is not configured.

## Verification

Tavily update: deployed application source e19ba2d, deploy ID 6acecf7c110687c9a7d1d27b. Public homepage returned 200 and showed the Tavily disclosure. A real Karachi competitor request returned four source-linked candidates in six seconds, clearly marking unverified availability. All 19 automated tests, typecheck and production build passed. Use scripts/deploy-netlify.ps1 for future releases so the masked Tavily override is included.

The public homepage returned 200; invalid input returned 400. A real analysis of the approved AI teacher-clone idea returned 200 in 12 seconds and passed the complete Zod schema: four domains, two assumptions per domain, three valid priorities.

## Updating

Tavily integration: run pwsh -File scripts/deploy-netlify.ps1 from the repository to build and deploy while forwarding TAVILY_API_KEY from .env.local or the process environment. The key uses Netlify's masked, functions-only --secret-env deploy override. Each future deployment must forward it again; an ordinary deploy command omits this override. The Gemini project variables remain as previously configured.

Push completed source changes to GitHub, then run `netlify deploy --prod --context production` from the linked project. Configure environment values in Netlify, never in committed files. Stop the local development server before deploying on Windows: it can lock the build directory and cause the adapter's static-content publishing step to fail. Verify the public API after each deployment.

This deployment does not complete the remaining UI work, learner checkpoints, manual business pilot or Devpost submission requirements.
