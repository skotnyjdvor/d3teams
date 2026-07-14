# D3Teams

Race operations platform for karting teams: inventory, tasks, events, team access and telemetry workflows.

## Local development

```bash
npm install
npm run dev
```

The Vite frontend runs on port 5173 and the Express API on port 3001.

## Deployment

The frontend is deployed to GitHub Pages through `.github/workflows/deploy-pages.yml`.
The Express/SQLite API requires a separate persistent server and is not hosted by GitHub Pages.
