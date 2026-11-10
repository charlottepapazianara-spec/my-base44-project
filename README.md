# my-base44-project

Starter app: Vite + React, served by the Vite dev server.

## Development

```sh
npm install
npm run dev     # http://localhost:3000
```

In the Base44 sandbox the same thing runs through `docker-compose.base44.yml`,
which mounts this directory into a `node` container, so source edits hot-reload
in the preview. `vite.config.js` only adds the sandbox preview host to Vite's
allowed hosts when `BASE44_PREVIEW_MODE` is exactly `1`; with the flag unset the
original localhost-only behavior applies.