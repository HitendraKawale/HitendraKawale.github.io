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

Multi-page Astro 6 portfolio. Five routes:

| Route | File |
|---|---|
| `/` | `src/pages/index.astro` |
| `/projects` | `src/pages/projects.astro` |
| `/blog` | `src/pages/blog/index.astro` |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` |

**Layouts:**
- `BaseLayout.astro` — shell (`<head>`, `Nav`, `<main>`, `Footer`). Requires `title` and `description` props.
- `PostLayout.astro` — wraps `BaseLayout` for blog posts. Takes a `frontmatter` prop with the post's typed data.

**Components:** `Nav`, `Footer`, `ProjectCard`, `BlogCard`. All are self-contained Astro components with scoped `<style>` blocks.

**Design tokens** live in `src/styles/global.css` as CSS custom properties (`--bg`, `--text`, `--muted`, `--border`, `--surface`, `--green`, `--max-width`). Imported once in `BaseLayout`.

## Content — how to update things

### Add a project
Edit `src/data/projects.ts` — append to the `projects` array. Set `featured: true` to show it on the home page (keep to ≤3). Status must be `"Built" | "Research" | "In Progress"`.

### Add a blog post
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

The filename becomes the URL slug (e.g., `my-post.md` → `/blog/my-post`).

### Update personal info, skills, languages
Edit `src/data/profile.ts`. All pages pull from this single source.

## Content collections

Blog uses the Astro content layer with a `glob` loader (`src/content.config.ts`). The collection is typed — adding a post with missing required frontmatter will fail the build, which is intentional.
