---
title: "Scriptorium Seed"
description: "Permanent draft. Keeps the blog collection non-empty so the dev-server content watcher stays registered. Never rendered publicly."
date: 2026-06-10
draft: true
---

This post is a system file — do not delete and do not publish.

If the blog collection is empty when `astro dev` starts, Astro's glob loader
never registers its file watcher, and posts added through the admin panel
won't appear until the server restarts. Keeping this permanent draft in the
collection avoids that. Drafts are filtered out of every public query, so
viewers never see it.
