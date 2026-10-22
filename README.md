# Lumber Lab

second iteration of Lumber Lab, new color scheme and aesthetic, same design principles

## Development

Requires Node.js 22.18+ and npm.

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
| `npm run typecheck`   | Check types with TypeScript                              |
| `npm run format`      | Format with Prettier                                     |
| `npm test`            | Run tests with Vitest                                    |

## Deployment

### GitHub Pages

On every push to `main`, `.github/workflows/deploy.yml` runs lint, the type check, the tests and a
security audit of the site's packages, then builds the static site and publishes it. If any check
fails, nothing is published and the live site stays as it was.

The contact form needs your Supabase project's URL and publishable key at build time. Add them as
repository variables (Settings → Secrets and variables → Actions → Variables):
`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. The workflow stops if either is missing.

The link-preview image and search-engine data use the address GitHub Pages reports, so they follow
a custom domain on their own (re-run the workflow after adding one).

### Server hosting

`npm run build` produces a server build with [Nitro](https://nitro.build). By default it targets
Cloudflare Workers (`cloudflare-module`). On hosts Nitro detects automatically (Vercel, Netlify,
etc.) it picks the right target on its own. To choose one explicitly, set `NITRO_PRESET` when
building:

```sh
NITRO_PRESET=node-server npm run build
node .output/server/index.mjs
```
