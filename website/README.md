# Pattern library website

Spec: [SPEC.md](SPEC.md). Source: `../pattern-language/patterns/<ID>.md`, read by
`src/_data/library.js`. Built with Eleventy 3.

```bash
cd website
npm ci            # once
npm run build     # writes _site/
npm run check     # the acceptance checks of SPEC.md §11
npm run serve     # local preview with reload, http://localhost:8080
```

Vercel builds from the repository root with `../vercel.json`: install, build, check. A failed
check stops the deploy.
