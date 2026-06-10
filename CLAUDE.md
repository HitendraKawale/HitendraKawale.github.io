# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build → ./dist/
npm run preview   # Preview the production build locally
```

No lint or test commands exist.

## Vercel deployment

Static output — no adapter needed. Push to GitHub, import the repo in Vercel, and it auto-detects Astro. Build command: `npm run build`, output dir: `dist`. A `vercel.json` exists at the root confirming these settings.

## Architecture

Multi-page Astro 6 portfolio. Four routes:

| Route | File |
|---|---|
| `/` | `src/pages/index.astro` |
| `/projects` | `src/pages/projects.astro` |
| `/blog` | `src/pages/blog/index.astro` |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` |

**Layouts:**
- `BaseLayout.astro` — shell (`<head>`, `Nav`, `<main>`, `Footer`). Requires `title` and `description` props.
- `PostLayout.astro` — wraps `BaseLayout` for blog posts. Takes a `frontmatter` prop with the post's typed data. Never referenced from markdown frontmatter — `[slug].astro` calls `render(post)` and passes `post.data` as `frontmatter`.

**Components:** `Nav`, `Footer`, `ProjectCard`, `BlogCard`, `Brand`. All are self-contained Astro components with scoped `<style>` blocks.

**Berserk identity layer** (deliberate, do not "professionalize" away): `Brand.astro` is a stylized Brand of Sacrifice SVG sigil (colored via `currentColor`, accepts a `size` prop) used in the nav, footer, hero chapter cap, post end-marks, and `public/favicon.svg`. Nav labels are Armoury (/projects), Chronicles (/blog), Send Word (/contact); the nav brand reads "Struggler". The home hero has a pulsing red eclipse (`.eclipse`) behind the name, a "Chapter I · The Struggler" cap, and a Skull Knight epigraph; the footer carries the Berserk Volume 1 causality narration. Page h1s: "The Armoury", "The Chronicles", "Send Word". Empty states reference the Dragonslayer.

**Design tokens** live in `src/styles/global.css` as CSS custom properties. Imported once in `BaseLayout`. The site uses a Berserk-inspired dark editorial theme.

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0d0b08` | Page background (warm near-black) |
| `--surface` | `#141210` | Card/panel background |
| `--surface-2` | `#1e1b17` | Elevated surface |
| `--text` | `#e8e0d0` | Primary text (aged paper cream) |
| `--muted` | `#6b6258` | Secondary/muted text |
| `--border` | `#2e2820` | Dividers and borders |
| `--accent` | `#8b1a1a` | Blood red — section labels, hover |
| `--accent-hi` | `#c0392b` | Brighter red — active hover states |
| `--ink` | `#000000` | Panel borders (nav, cards, hero) |
| `--green` | `#22c55e` | Availability status dot |
| `--heading` | Cinzel serif | Headings, nav, labels |
| `--body` | Crimson Text serif | Body copy |
| `--mono` | system monospace | Code and technical labels |
| `--max-width` | `1000px` | Content container width |
| `--nav-h` | `64px` | Nav bar height |

Google Fonts (`Cinzel` + `Crimson Text`) are loaded via `<link>` in `BaseLayout.astro`. A subtle paper grain texture is applied as a fixed `body::after` pseudo-element using an inline SVG `feTurbulence` filter.

## Home page content selection

`src/pages/index.astro` renders:
- **Featured projects**: `projects.filter(p => p.featured)` — up to 3 recommended
- **Recent posts**: 3 latest non-draft posts, sorted descending by date

## Content — how to update things

### Local admin panel (preferred)
Run `npm run dev` and open `http://localhost:4321/admin`. The "Scriptorium" panel adds/deletes projects and blog posts by writing the repo files directly — commit and push afterwards to publish. The panel is **dev-only**: its routes are injected by the inline `localAdmin` integration in `astro.config.mjs` only when `command === 'dev'`, so the production build contains no trace of it. Code lives in `src/admin/` (`panel.astro` + `api/projects.ts` + `api/posts.ts`), deliberately outside `src/pages/` so it never auto-routes.

`src/content/blog/scriptorium-seed.md` is a permanent `draft: true` post that must not be deleted: if the blog collection is empty when `astro dev` starts, the glob loader never registers its file watcher and newly added posts don't appear until a restart. The admin API refuses to delete it and the panel hides it; drafts never render publicly.

### Add a project (manually)
Edit `src/data/projects.json` — append to the array (`src/data/projects.ts` just re-exports it with types; the admin API writes this JSON). Set `featured: true` to show it on the home page (keep to ≤3). Status must be `"Built" | "Research" | "In Progress"`. `href` is optional.

### Add a blog post (manually)
Create a Markdown file in `src/content/blog/your-slug.md`. Required frontmatter:

```md
---
title: "Post title"
description: "One-line summary shown in cards."
date: 2025-06-01
tags: ["Tag1", "Tag2"]   # optional
draft: false              # set true to hide
---
```

The filename becomes the URL slug (e.g., `my-post.md` → `/blog/my-post`). Do not add a `layout:` key — `[slug].astro` wires the layout automatically via the content layer.

### Update personal info, skills, languages
Edit `src/data/profile.ts`. All pages pull from this single source.

## Content collections

Blog uses the Astro content layer with a `glob` loader (`src/content.config.ts`). The collection is typed — adding a post with missing required frontmatter will fail the build, which is intentional. Drafts are filtered out at query time via `getCollection("blog", ({ data }) => !data.draft)`.
