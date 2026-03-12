# Astro Starter

A batteries-included Astro starter template for content-focused, SEO-optimized websites.

## Features

- **Astro 5** with TypeScript (strictest config)
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin
- **React 19** for interactive islands
- **shadcn/ui** components (10 pre-installed: button, card, badge, separator, sheet, navigation-menu, dropdown-menu, accordion, table, alert)
- **Dual deployment adapter** — Cloudflare Pages (default) or Node.js/VPS
- **Blog / content collections** with MDX, reading time, draft support
- **SEO infrastructure** — OpenGraph, Twitter Cards, JSON-LD structured data, canonical URLs, sitemap, RSS feed, robots.txt
- **Dark mode** with system/light/dark toggle (class-based, no flash)
- **Analytics** — optional Plausible or Umami integration via env vars
- **Self-hosted Inter font** via `@fontsource-variable/inter`
- **Linting & formatting** — ESLint flat config + Prettier with Astro and Tailwind plugins

## Quick Start

```bash
# Clone the template
git clone https://github.com/YOUR_USERNAME/astro-starter.git my-site
cd my-site

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your site URL and optional analytics keys

# Start dev server
pnpm dev
```

The dev server runs at `http://localhost:4321`.

## Project Structure

```
src/
├── assets/
│   ├── fonts/              # Custom font files (if any)
│   └── images/             # Optimized images (use Astro <Image>)
├── components/
│   ├── blog/               # Blog components (BlogPostCard, BlogPostMeta, FormattedDate)
│   ├── seo/                # SEO components (SEOHead, JsonLd, schemas)
│   ├── ui/                 # shadcn/ui components
│   ├── Analytics.astro     # Conditional Plausible/Umami script injection
│   ├── Header.astro        # Site header with nav
│   ├── Footer.astro        # Site footer with RSS link
│   └── ModeToggle.tsx      # Dark mode toggle (React island)
├── config/
│   └── seo.ts              # Site-wide SEO defaults
├── content/
│   └── blog/               # MDX blog posts
├── layouts/
│   └── BaseLayout.astro    # Shared layout (html/head/body, SEOHead, Analytics)
├── lib/
│   ├── reading-time.ts     # Reading time calculator
│   └── utils.ts            # cn() utility (clsx + tailwind-merge)
├── pages/
│   ├── blog/
│   │   ├── index.astro     # Blog listing page
│   │   └── [slug].astro    # Individual post page
│   ├── 404.astro           # Custom 404 page
│   ├── 500.astro           # Custom 500 page
│   ├── index.astro         # Home page
│   ├── robots.txt.ts       # Dynamic robots.txt
│   └── rss.xml.ts          # RSS feed
├── styles/
│   └── global.css          # Tailwind v4, shadcn theme, prose styles, Inter font
└── content.config.ts       # Content collection schema
```

## Commands

| Command              | Action                                         |
| :------------------- | :--------------------------------------------- |
| `pnpm dev`           | Start dev server at `localhost:4321`            |
| `pnpm build`         | Build production site to `./dist/`              |
| `pnpm preview`       | Preview production build locally                |
| `pnpm lint`          | Lint with ESLint                                |
| `pnpm format`        | Format with Prettier                            |
| `pnpm format:check`  | Check formatting without writing                |
| `pnpm typecheck`     | Run `astro check` + `tsc --noEmit`              |

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable                    | Description                          | Default                                |
| :-------------------------- | :----------------------------------- | :------------------------------------- |
| `ADAPTER`                   | Deployment adapter (`cloudflare` or `node`) | `cloudflare`                    |
| `SITE_URL`                  | Canonical site URL                   | `https://example.com`                  |
| `PUBLIC_PLAUSIBLE_DOMAIN`   | Plausible Analytics domain           | *(empty — disabled)*                   |
| `PUBLIC_PLAUSIBLE_SCRIPT_URL` | Plausible script URL               | `https://plausible.io/js/script.js`    |
| `PUBLIC_UMAMI_WEBSITE_ID`   | Umami Analytics website ID           | *(empty — disabled)*                   |
| `PUBLIC_UMAMI_SCRIPT_URL`   | Umami script URL                     | `https://cloud.umami.is/script.js`     |

### Dual Adapter

The template supports two deployment targets selected by the `ADAPTER` env var:

- **`cloudflare`** (default) — Uses `@astrojs/cloudflare` for Cloudflare Pages
- **`node`** — Uses `@astrojs/node` for any Node.js hosting (VPS, Docker, etc.)

The adapter is selected at build time in `astro.config.mjs`.

### SEO

Edit `src/config/seo.ts` to set your site name, description, default OG image, locale, Twitter handle, and author info. These defaults are used by `SEOHead.astro` and the JSON-LD schema builders.

## Deployment

### Cloudflare Pages (recommended)

1. Push your repo to GitHub
2. In the Cloudflare dashboard, create a new Pages project connected to your repo
3. Set build settings:
   - **Build command:** `pnpm build`
   - **Build output directory:** `dist`
   - **Node.js version:** `22` (set via environment variable `NODE_VERSION`)
4. Add environment variables (`SITE_URL`, analytics vars as needed)
5. Deploy — Cloudflare Pages will auto-deploy on push

The included `wrangler.jsonc` configures `nodejs_compat` compatibility.

### Node.js / VPS

1. Set `ADAPTER=node` in your environment
2. Build: `pnpm build`
3. Run: `node dist/server/entry.mjs`

The server listens on `0.0.0.0:4321` by default. Use a reverse proxy (nginx, Caddy) for production.

## Customization

- **SEO defaults** — `src/config/seo.ts`
- **Theme & colors** — `src/styles/global.css` (OKLCH color tokens, dark mode variables)
- **Add shadcn components** — `pnpm dlx shadcn@latest add <component>`
- **Blog posts** — Add `.mdx` files to `src/content/blog/` (see existing posts for frontmatter schema)
- **Layouts** — Extend or create new layouts in `src/layouts/`

## License

[MIT](LICENSE)
