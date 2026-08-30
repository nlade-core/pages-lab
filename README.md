# pages-lab

Testing what GitHub Pages can actually do, and where it stops — live, not in prose.

Root page is an index of experiments. Each one lives at `NN-name/` — numbered in build order, flat off the root — as its own self-contained page: the live thing running, with a short write-up underneath. Numbers aren't renumbered if something's reordered or dropped later; gaps are fine.

## Experiments

| Experiment | Status |
|---|---|
| [Hello world](01-hello-world/) | done |
| [Client-side routing without server rewrites](02-routing/) | done |
| [Service-worker offline caching](03-service-worker/) | done |
| [Pyodide numeric ceiling](04-pyodide/) | done |
| [Actions-triggered content update latency](05-actions-latency/) | done |
| [Max practical repo/site size](06-repo-size/) | done |
| [localStorage vs. IndexedDB, real device quota](07-storage-limits/) | done |

## What this found

- **Routing**: deep links into client-side routes need a real workaround (a custom `404.html` redirect trick) — not free, costs a visible address-bar flicker.
- **Offline caching**: works, but only for exactly what's explicitly precached, scoped to one directory — not "the site works offline," just the specific files told to.
- **Pyodide**: real ~14.5MB upfront cost, genuinely works after that — the actual numeric ceiling is measured live on the page, not asserted.
- **Scheduled updates**: take real minutes, not seconds — schedule slip plus deploy time both measured directly against GitHub's own API.
- **Size limits**: individual files hard-block at 100MB, repos/sites are soft-capped around 1GB — irrelevant in practice for a project this size (a small fraction of a percent of the ceiling).
- **Storage**: `localStorage` is synchronous, text-only, small (~5-10MB, convention not spec); `IndexedDB` is asynchronous, holds real binary `Blob`s, and its quota tracks actual free device disk space rather than a fixed number — measured live via `navigator.storage.estimate()` on the page itself, not quoted from docs.

## What's next

Original six tests, re-run against another static host (Cloudflare Pages) for a real side-by-side comparison, rather than an isolated GitHub Pages study. Storage was added as a seventh, separate from that plan.

Site: https://nlade-core.github.io/pages-lab/
