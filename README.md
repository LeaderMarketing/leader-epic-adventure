# Leader Epic Adventure — Promo Landing Page

Promotional landing page for the 2026 Jetski Adventure giveaway.

**Live (GitHub Pages):** https://leadermarketing.github.io/leader-epic-adventure/

---

## Hosting on leadermarketing.com.au

The built site is plain HTML, CSS, and JavaScript — no PHP, Node, or WordPress plugins required. It can sit alongside WordPress without any conflicts.

### What you need

A zipped `dist/` folder from the dev team. Do not build it yourself — the asset paths are pre-configured for the `/leader-epic-adventure/` subpath.

### Steps

1. **Unzip** the `dist/` folder you received.
2. **Rename** the unzipped folder to `leader-epic-adventure`.
3. **Upload** the folder to the WordPress root (the same level as `wp-content/`, `wp-config.php`, etc.).

The folder structure on the server should look like this:

```
public_html/
├── wp-content/
├── wp-config.php
├── leader-epic-adventure/       ← upload here
│   ├── index.html
│   └── assets/
└── ...
```

4. The site will be live at: `https://leadermarketing.com.au/leader-epic-adventure/`

### Apache vs Nginx

**Apache (most WordPress hosts):** Works out of the box. WordPress's `.htaccess` only intercepts requests for paths that don't exist as real files — your static files take priority.

**Nginx:** You may need to add a `location` block to your server config:

```nginx
location /leader-epic-adventure/ {
    try_files $uri $uri/ /leader-epic-adventure/index.html;
}
```

Ask your hosting provider if you're unsure which one you're running.

### Verification

After uploading, open `https://leadermarketing.com.au/leader-epic-adventure/` in a browser (include the trailing slash). If the page loads correctly, you're done.

If the page is blank or shows a 404, it's a server configuration issue — the uploaded files themselves are not the problem. Check with your hosting provider.

---

## For developers

```bash
npm install
npm run dev       # dev server at http://127.0.0.1:5173
npm run build     # builds to dist/
npm run preview   # preview built dist/ at http://127.0.0.1:4173/leader-epic-adventure/
```

The base path (`/leader-epic-adventure/`) is set in `vite.config.js`. If the deployment subpath ever changes, update `base` there and rebuild before handing off the new `dist/`.
