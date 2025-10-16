# Firebase Bookstore

Single-page React app for browsing and managing a Firebase-backed bookstore.

## Local Development

```bash
npm install
npm run dev
```

Build a production-ready bundle with:

```bash
npm run build
```

Preview the built bundle locally at `http://localhost:4173`:

```bash
npm run preview
```

## Deploying to GitHub Pages

The live site is hosted on GitHub Pages and the code resides at `https://github.com/lightp0x/firebasebookstore`.

1. Ensure the repository is initialized locally and connected (first-time setup only):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/lightp0x/firebasebookstore.git
   git push -u origin main
   ```
2. Build the production bundle:
   ```bash
   npm run build
   ```
3. Deploy the contents of `dist/` to the `gh-pages` branch:
   ```bash
   npm run deploy
   ```
4. In GitHub, open **Settings → Pages** and point the site to the `gh-pages` branch (root folder). The URL will be `https://lightp0x.github.io/firebasebookstore/` once the publish completes.

> Note: `vite.config.js` already includes `base: '/firebasebookstore/'` so assets resolve correctly on GitHub Pages.
