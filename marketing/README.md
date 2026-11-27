# Marketing agent (draft-only pilot)

Node 20+; no npm dependencies. Use a local OpenAI-compatible model server, or an explicitly authorized HTTPS model endpoint. Install/run a model separately; the repo does not bundle weights or credentials.

```sh
export MARKETING_MODEL=your-installed-model
# Default endpoint: http://127.0.0.1:11434/v1/chat/completions
node --test marketing/core.test.mjs
node marketing/agent.mjs plan marketing/example-brief.json ./campaign-draft.json
node marketing/agent.mjs metrics marketing/example-metrics.json ./metrics-report.json
```

For a remote provider set MARKETING_ENDPOINT and inject MARKETING_API_KEY via environment; never commit it. Do not send confidential client information to a provider without permission. Keep private briefs and results outside the public repository and static site. Output must be a new file.

Plan generates 7 social drafts, 3 SEO topics, landing copy, proposal scope and 5 search-ad headlines/3 descriptions with UTM-tagged URLs. Invalid responses fail. Metrics consumes manually supplied channel totals; demo inputs are synthetic. No live analytics, website scan, automatic email, social publishing, CRM, billing or ad API connected. Drafts need fact checks and client authorization before publication. Paid ads disabled, CAD 0. Publish only on owned/authorized channels, and where promotion is permitted. Commercial email requires applicable consent, sender identification and unsubscribe handling: https://crtc.gc.ca/eng/com500/guide.htm.

Public marketing.html is an inbound landing page. Suggested promotion: share its link on authorized business accounts, update eligible business profiles and use the existing blog and self-audit. Historical paid-ad specs must not be automatically launched.
