# Codex Project Guidance — Cranbury Chiropractic (Jekyll + Minimal Mistakes)

## Scope & Precedence
- This file lives in `<repo>/.codex/AGENTS.md` and overrides global
  `~/.codex/AGENTS.md` where rules overlap.
- Keep guidance concise and actionable; prefer minimal diffs and clear
  rationale for non‑obvious choices.

## Stack Summary
- Static site using Jekyll with the Minimal Mistakes theme.
- Key paths:
  - Content: `_pages/`, `_pages/services/`, `index.md`
  - Theme config: `_config.yml`
  - Navigation: `_data/navigation.yml`
  - Includes: `_includes/` (e.g., `masthead.html`, `page__hero.html`)
  - Styles: `_sass/minimal-mistakes/skins/_custom.scss`, `assets/css/custom.css`
  - Scripts: `assets/js/contact-form.js`

## Core Workflow
1) Conventional Commits for all suggested commits.
2) Provide follow‑up commands blocks (format/lint if configured, build/serve,
   and git commands). Do not run git by default.
3) Include PR notes (risks, rollout, revert) and a change summary.
4) For broad changes, propose a small, reversible commit split plan first.

## Local Dev & Build
- Prereqs: Ruby + Bundler installed.
- Install: `bundle install`
- Serve: `bundle exec jekyll serve --livereload`
- Build (prod): `JEKYLL_ENV=production bundle exec jekyll build`
- Clean caches when changing plugins/config: `bundle exec jekyll clean`
- Env vars: do not commit secrets. Use `_config.yml` for `url`/`baseurl` and
  set `JEKYLL_ENV=production` for production builds.

## Content Conventions
- Pages live under `_pages/`; services under `_pages/services/`.
- Prefer trailing‑slash permalinks to avoid redirects.
- Use Minimal Mistakes front matter for pages:

```yaml
---
layout: single
title: "<Page Title>"
permalink: /<path-segments>/
description: "<1–2 sentence meta description>"
toc: true
author_profile: false
classes: wide
header:
  overlay_image: /assets/images/<optional-hero>.jpg
  overlay_filter: 0.2
  caption: "<optional caption>"
sidebar: false
---
```

- Internal links: use Jekyll filters to be robust across `baseurl` changes:
  - `{{ "/services/" | relative_url }}` for internal URLs.
- Images: place under `assets/images/<slug>/`. Use includes for figures:

```liquid
{% include figure image_path="/assets/images/<slug>/<file>.jpg" alt="<alt>" %}
```

- Drafting: place unpublished content in `_drafts/` with the same structure;
  run `bundle exec jekyll serve --drafts` to preview.

## Navigation & SEO
- Update `_data/navigation.yml` when adding/removing pages so they appear in
  menus. Keep titles concise and match page front matter.
- Ensure each page sets `title` and `description` for SEO.
- Use canonical URLs via `url`/`baseurl` in `_config.yml`; avoid absolute links
  to the production domain inside content.

## Theme & Layout Notes
- Minimal Mistakes skin overrides live in `_sass/minimal-mistakes/skins/_custom.scss`.
- Custom CSS in `assets/css/custom.css`; imported via `_includes/head/custom.html`.
- Custom scripts belong in `assets/js/`; load via `_includes/footer/custom.html`.
- When editing includes (e.g., `masthead.html`, `page__hero.html`), keep changes
  minimal and consistent with theme structure.

## Quality & Validation
- If `npm run lint` exists, run it before suggesting merge; otherwise skip.
- Build must succeed: `bundle exec jekyll build`.
- Optional link check (if configured): `htmlproofer` after build.
- Check responsive layout for key breakpoints; ensure alt text for all images.

## PR Checklist (repo‑specific)
- Build passes locally without warnings.
- New/changed pages have correct front matter, permalinks, and nav entries.
- Internal links use `relative_url`; external links open as intended.
- Images optimized and referenced via includes; alt text present.
- No secrets or environment‑specific URLs committed.

## Risks, Rollout, Revert
- Risks: broken internal links, missing nav updates, or incorrect permalinks
  causing 404s.
- Rollout: standard static deploy; verify key pages after publish.
- Revert: revert the commit; rebuild to restore previous content.

## Commit Template (for PR description and commit body)

Header:
type(scope): short summary

Body:
- Why: context and intent
- What: key changes
- How: approach and tradeoffs
- Notes: perf, accessibility, SEO, or compat

Footer:
BREAKING CHANGE: <impact and migration>
Refs: #<issue-id>

