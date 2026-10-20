# Lumber Lab

Single-page site for Lumber Lab, a Portland, OR outdoor living design-build studio. It has a black,
gold and olive theme, a no-scroll layout with About / Services / Contact drawers, a rotating image
carousel, and a callback request form.

Built with [TanStack Start](https://tanstack.com/start), React 19, Vite and Tailwind CSS v4. Contact
form submissions are stored in [Supabase](https://supabase.com).

## Development

Requires Node.js 22+ and npm.

```sh
npm install
cp .env.example .env   # then fill in your Supabase project's URL and publishable key
npm run dev            # http://localhost:8080
```

| Script                | What it does                                             |
| --------------------- | -------------------------------------------------------- |
| `npm run dev`         | Start the dev server on port 8080                        |
| `npm run build`       | Production server build (output in `.output/`)           |
| `npm run build:pages` | Static build for GitHub Pages (output in `dist/client/`) |
| `npm run preview`     | Serve the production build locally                       |
| `npm run lint`        | Lint with ESLint                                         |
| `npm run format`      | Format with Prettier                                     |
| `npm test`            | Run tests with Vitest                                    |

## Contact form

The form saves each callback request to a `contact_submissions` table, straight from the browser.
Row-level security lets visitors add rows but not read them, so submissions are only visible to you
in the Supabase dashboard.

1. Create a project at [supabase.com](https://supabase.com).
2. In the project's SQL Editor, run
   [`supabase/migrations/20261020200407_create_contact_submissions.sql`](supabase/migrations/20261020200407_create_contact_submissions.sql).
3. Copy the project URL and publishable key (Project Settings → API) into `.env` for local
   development, and into the GitHub repository's Actions variables for the deployed site (see
   below).

New requests appear in the dashboard under Table Editor → `contact_submissions`.

## Deployment

### GitHub Pages

`.github/workflows/deploy.yml` builds the static site and publishes it on every push to `main`.
In the repository settings:

- Pages → Source: **GitHub Actions**.
- Secrets and variables → Actions → **Variables**: add `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_PUBLISHABLE_KEY`. Without them the site still deploys, but the contact form
  can't send requests.

### Server hosting

`npm run build` produces a server build with [Nitro](https://nitro.build). By default it targets
Cloudflare Workers (`cloudflare-module`). On hosts Nitro detects automatically (Vercel, Netlify,
etc.) it picks the right target on its own. To choose one explicitly, set `NITRO_PRESET` when
building:

```sh
NITRO_PRESET=node-server npm run build
node .output/server/index.mjs
```
