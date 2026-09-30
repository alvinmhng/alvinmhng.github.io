# An odd little machine

A silent, interactive placeholder built with HTML, CSS, JavaScript, and original SVG illustrations. There are no build steps, runtime dependencies, analytics, or external requests.

Serve the repository root with any static HTTP server. For example, `npx --yes http-server . -p 4173 -c-1`, then open `http://localhost:4173`. GitHub Pages serves `index.html` and uses `404.html` for missing routes. `.nojekyll` bypasses Jekyll; `CNAME` retains the custom domain. No deployment workflow is required for branch-based Pages hosting.

The button shuffles three surprises into cycles, avoiding repeats across cycle boundaries. Each animation lasts three seconds; reset cancels pending playback. Reduced motion reveals a static result immediately. Without JavaScript, the illustration and fallback message remain readable.

The 13 original `assets/img/*logo*` files are retained unchanged for existing direct links. They are intentionally not displayed. Fredoka is bundled locally under the SIL Open Font License; see `assets/fonts/OFL.txt`. The existing repository license is retained in `LICENSE`.

Verification artifacts and local browser captures belong in ignored `output/`. Publishing requires a separate commit/push and the repository’s existing Pages configuration.
