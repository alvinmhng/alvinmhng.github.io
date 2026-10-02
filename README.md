# Alvin’s workshop

A static, illustrated workshop for **alvinmhng.com**, with three playable experiments. Built with HTML, CSS, JavaScript, Canvas, and original SVG artwork. No build step, runtime dependencies, analytics, accounts, or external services.

Serve the repository root with any static HTTP server. For example, `npx --yes http-server . -p 4173 -c-1`, then open `http://localhost:4173`. GitHub Pages serves `index.html` and uses `404.html` for missing routes. `.nojekyll` bypasses Jekyll; `CNAME` retains the custom domain. No deployment workflow is required for branch-based Pages hosting.

Use HTTP rather than opening HTML files directly, because the experiments use JavaScript modules.

## Explore

- `/`: illustrated workshop, surprise machine, hidden star drawer, and maker’s notebook.
- `/lab/gravity/`: up to 20 draggable balls, adjustable gravity, nudge, pause, and reset.
- `/lab/greenhouse/`: seeded plant artwork with Daisy, Sunflower, and Cosmos varieties, bloom, height, leaves, colour, Undo, an explicitly saved browser favourite, and standalone SVG download. Reset restores the initial plant and is undoable.
- `/lab/rocket/`: projectile toy with launch angle, power, trail, pause, and flight results in toy units.

The machine cycles through three surprises without consecutive repeats and links to the matching experiment. It never navigates automatically. The drawer opens by keyboard or pointer and closes with Escape. Contact is a plain email link.

Shared layout styles are in `assets/css/cabinet.css`; the original machine’s artwork and animation styles remain intact. Each experiment has its own module and real directory index. Shared Canvas sizing and visibility handling live in `assets/js/lab-common.js`.

## Accessibility and behaviour

Navigation and explanations work without JavaScript. Interactive controls are disabled until their modules initialise. Reduced motion disables decorative animation, reveals machine results immediately, and starts gravity paused; rockets always require an explicit launch. Hidden tabs suspend simulation updates, and returning does not advance through missed time. Experiment state resets on reload, except for a greenhouse favourite explicitly saved in this browser. Restore retrieves its seed, variety, bloom, colour, height, and leaf count.

## Verification

Local Edge browser checks cover surprise cycles and cancellation, keyboard drawer controls, responsive layouts, gravity bounds and dragging, plant controls and export, rocket trajectories, direct-page refresh, and JavaScript-disabled navigation. Captures and browser-check scripts are in ignored `output/`. Checks use desktop and emulated mobile viewports; they do not establish testing on physical mobile devices or with screen-reader software.

The 13 original `assets/img/*logo*` files are retained unchanged for existing direct links. They are intentionally not displayed. Fredoka is bundled locally under the SIL Open Font License; see `assets/fonts/OFL.txt`. The existing repository license is retained in `LICENSE`.

Verification artifacts and local browser captures belong in ignored `output/`. Publishing requires a separate commit/push and the repository’s existing Pages configuration.

## Later additions

The launch intentionally contains only three experiments. Future additions can include useful tools, unfinished-project exhibits, interactive explanations, more rooms, and project notes. Public voting would require a separate backend design.
