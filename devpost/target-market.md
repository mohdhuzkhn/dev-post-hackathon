# Target market and competitor research

Implemented flow: enter an idea and customer geography; receive 2–3 proposed segments; edit each segment's user, needs/buying behavior and buyer; confirm the market; receive the four-domain analysis; request the fifth domain, Local Competitors.

Customer geography is entered manually. The app does not request GPS or infer location. Online / Global is the default. Editing the idea, geography or segments clears earlier analysis and research to prevent stale results. AI segment suggestions remain hypotheses.

Competitor research uses an explicitly configured GEMINI_RESEARCH_MODEL with Google Search. It obtains grounded sources, then extracts candidates using numbered source references. Only valid HTTPS URLs returned by the search provider are rendered. Unsupported references are discarded. Sources support research, but do not guarantee every claim or exhaust the market. No sources, no matches and provider failures are distinguished; analysis remains available during research errors.

The existing Gemini Flash-Lite free account returned 429 for web search. Current Google pricing lists Google Search grounding as unavailable on this model's free tier. The research route therefore returns a clear unavailable state until a search-enabled provider is configured. Paid billing has not been enabled. An alternative search provider requires the user's approval before adding a new data destination.

Verification: live market suggestions returned three segments; automated input, segment cardinality, source URL, research status and request-size tests passed. Live competitor results remain blocked by provider access.
