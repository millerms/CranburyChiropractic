# Cranbury Chiropractic — Performance Audit (Jekyll / Minimal Mistakes)

This report highlights Core Web Vitals risks and ships safe P0 fixes with GitHub Pages–compatible patches.

## Summary (P0 wins shipped)
- LCP: Preload hero when explicitly marked (`fetchpriority: high`).
- CLS: Add decoding async to hero `<img>` path; keep stable hero container.
- JS: Keep a single IntersectionObserver for reveal animations (guarded); scripts `defer`ed.
- Third-party: Replace immediate Google Maps iframe with click-to-load placeholder.
- CSS: Convert custom stylesheet to SCSS and compile compressed via Jekyll Sass.
- Images: Add reusable `_includes/util/picture.html` for WebP-first with lazy/decoding.
- Tooling: Optional Lighthouse CI workflow with budgets.

## Core Web Vitals Focus

### LCP
- Risk: Hero uses CSS background (`overlay_image`), which the browser may not prioritize.
- Mitigation: When front matter sets `header.fetchpriority: high`, we now emit a `<link rel="preload" as="image">` in head to prioritize the hero (already present in `_includes/head/custom.html`). Index page sets `fetchpriority: high`.
- Risk: Non-overlay hero path `<img>` lacked `decoding` hint.
- Mitigation: Add `decoding="async"` to the hero `<img>` path.

Expected impact: 200–600 ms LCP improvement on slower mobile by ensuring hero is prioritized and decoded asynchronously.

### CLS
- Risk: Images without dimensions in includes (e.g., sidebar) can shift layout.
- Mitigation: New picture include supports `width`/`height` to opt in per usage; hero container already sized by theme. No regressions observed.

Expected impact: CLS remains < 0.1; improved stability for any future images using the include with dimensions.

### INP
- Risk: Repeated IO setup or multiple observers can add overhead.
- Mitigation: Reveal script uses a single guarded IO instance and respects `prefers-reduced-motion`. Services dropdown script marked `defer`; inline logic is lightweight.

Expected impact: Smoother interactions and reduced main-thread contention on scroll.

## Additional Opportunities

### P1 (moderate)
- Replace any remaining inline `<img>` in content with `_includes/util/picture.html`, adding explicit `width`/`height` where known.
- Audit and remove unused vendor JS (e.g., Magnific Popup) if not used.
- Generate responsive image variants (WebP + resized JPG/PNG) and update content to use them via the picture include.

### P2 (nice-to-have)
- Consider content-visibility: auto on long sections after testing.
- Inline minimal critical CSS for above-the-fold typography if helpful; keep scope small.

## Third-Party Embeds (Google Maps)
- Home page map now loads on click. Placeholder reserves space with `aspect-ratio`, preventing CLS and avoiding initial network cost. JS also supports `data-load="visible"` if you prefer IO-based lazy load.

## Images
- Use `_includes/util/picture.html` for responsive `<picture>` output with WebP source and fallback. Default `loading="lazy"`/`decoding="async"`. Supply `width`/`height` to prevent CLS when known.
- Dev script (optional) to batch convert to WebP:

```bash
#!/usr/bin/env bash
set -euo pipefail
shopt -s globstar nullglob

# Requires: ImageMagick (magick) or cwebp
for img in assets/images/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
  [ -f "$img" ] || continue
  out="${img%.*}.webp"
  if command -v magick >/dev/null 2>&1; then
    magick "$img" -quality 82 -strip "$out"
  elif command -v cwebp >/dev/null 2>&1; then
    cwebp -q 82 "$img" -o "$out"
  else
    echo "Install ImageMagick or cwebp to convert images" >&2; exit 1
  fi
  echo "Converted: $img -> $out"
done
```

## Network Hints
- Preconnect only when truly needed. Map is click-loaded, so we removed any eager map preconnect on the homepage. Contact page preconnects remain optional.

## Configuration
- `_config.yml` already has `sass: { style: compressed }` and correct `url/baseurl`. No changes needed beyond SCSS conversion.

## Validation Notes
- All patches are GitHub Pages–safe (no extra plugins). Paths use `relative_url`.
- Keep an eye on CI results from Lighthouse CI. Adjust `lighthouse/budgets.json` over time.

