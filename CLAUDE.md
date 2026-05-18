# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

University lab (Web Design ЛР№3). **BlogSpace** — a blog-with-comments app: a Vue 3 SPA frontend talking to a Fastify + Prisma + PostgreSQL backend over a JSON API with JWT auth. Migrated from an earlier vanilla-TS/localStorage version; there is **no localStorage data layer left** — all data flows through the backend.

Monorepo with **no root `package.json`**. Two independent npm projects: `frontend/` and `backend/`. Run npm commands inside each. No test runner is configured.

## Commands

Backend (`cd backend`):
- `npm run dev` — generate Prisma client, compile, run server
- `npm run build` — `prisma generate && tsc && tsc-alias` (this exact order matters; see Prisma/TS notes)
- `npm run start` — run compiled `dist/server.js`
- `npm run lint` / `npm run lint:fix` / `npm run format`
- `npm run prisma:migrate` — create+apply a migration in dev (`migrate dev`)
- `npm run prisma:deploy` — apply existing migrations (`migrate deploy`); used in prod/CI, never `migrate dev` against a hosted DB
- Local DB: `docker compose up -d` (root `docker-compose.yml`) — Postgres on `:5432`. Backend needs `backend/.env` (`DATABASE_URL`, `JWT_SECRET`, `HOST`, `PORT`) — see `backend/.env.example`.

Frontend (`cd frontend`):
- `npm run dev` — Vite dev server (serves at `/2026-wd-lab-3/`, **not** `/` — `base` is set for both dev and prod)
- `npm run build` — type-check + build; `postbuild` copies `index.html`→`404.html` for SPA routing on Pages
- `npm run lint` (oxlint + eslint), `npm run type-check`

## Backend architecture (the part that needs multiple files to understand)

**Route/controller split.** Endpoints are assembled from two halves:
- `src/routes/<resource>/<action>.route.ts` — `makeRoute({ url, method, controller })` (`core/route.ts`). Declares *where*.
- `src/modules/<resource>/controllers/<action>.controller.ts` — `makeController({ auth?, handler })` (`core/controller.ts`). Declares *what it does*.
- `src/routes/<resource>/index.ts` groups them via `makeRouteGroup(prefix, [...])`; `src/routes/index.ts` composes all groups into `allRoutes`, registered once in `server.ts`.

To add an endpoint: write the controller, write the route, add it to that resource's `index.ts`. Nothing else.

**Auth via the controller factory.** `makeController({ auth: true, handler })` runs `request.jwtVerify()` first (throws `Unauthorized` on failure) and passes `{ request, user: { id } }`. Without `auth`, `user` is `null`. **The acting user id always comes from the token, never the request body.** Ownership is enforced in controllers (`if (row.authorId !== user.id) throw new Forbidden()`). JWT payload/user shape is augmented in `src/types/jwt.d.ts`.

**Error model.** Controllers `throw` `HttpError` subclasses (`core/httpError.ts`: `BadRequest/Unauthorized/Forbidden/NotFound/Conflict/ServiceUnavailable`). A single `setErrorHandler` (`core/errorHandler.ts`, registered in `server.ts`) maps `HttpError`→its status, Prisma `P2002/P2003/P2025`→`409/400/404`, everything else→`500` (logged). `makeRoute` deliberately has **no try/catch** — errors must propagate to that handler. Successful CRUD returns the affected object with `200` (no other status codes by design).

**Models are the API contract, not Prisma's types.** `src/models/` holds hand-rolled domain/DTO/input types, intentionally decoupled from the Prisma-generated client. Controllers map at the boundary — e.g. `toPublicUser()` strips the password hash; never return raw Prisma `User`.

## Prisma 7 specifics (these cause real time sinks)

- Uses a **driver adapter** (`@prisma/adapter-pg`) — mandatory in Prisma 7; the Rust engine is gone. Client created in `src/db.ts`.
- Generator is `prisma-client` (not `prisma-client-js`), output to **`src/generated/`** which is **gitignored and regenerated**. `prisma generate` must run before `tsc` (handled by `build`/`dev`/`postinstall`). A fresh checkout without `prisma generate` won't type-check.
- `datasource.url` is **not** in `schema.prisma` (Prisma 7 removed it). The connection lives in `prisma.config.ts`, which loads `.env` via a guarded `process.loadEnvFile()` (no `.env` on hosted envs is expected).
- DB has **cascade deletes**: deleting a post deletes its comments; deleting a user deletes their posts and comments (FK `ON DELETE CASCADE`, intentional vs. the old localStorage version).

## TypeScript / module config (non-obvious, bit us repeatedly)

- **NodeNext ESM**: every relative/alias import **must include the `.js` extension** (`@/db.js`, `./x.js`). Extensionless imports fail; this is required, not stylistic.
- **`@/` alias** → `src/*` (tsconfig `paths`). `tsc` doesn't rewrite specifiers, so the build is `prisma generate && tsc && tsc-alias` — `tsc-alias` rewrites `@/` to relative paths in `dist/`. Don't drop it.
- `rootDir: "src"` — **nothing outside `src/` can join the main tsconfig** (TS6059). Root config files (`prisma.config.ts`, `eslint.config.js`) are covered by a separate `tsconfig.node.json`. Known limitation: that file is **not** wired via project references, so the editor may still red-squiggle Node globals in `prisma.config.ts`; it's cosmetic — Prisma runs that file via its own loader and `tsc` never compiles it.

## Frontend architecture

- Vue 3 **Composition API** SFCs; Pinia stores (`src/stores/`); Vue Router with an auth guard (`meta: { requiresAuth: true }`).
- API layer in `src/api/`. `client.ts` axios instance: request interceptor attaches `Bearer` token from `localStorage`; response interceptor on `401` clears the token and redirects to sign-in (base-path-aware via `import.meta.env.BASE_URL`).
- **Auth is JWT-in-localStorage** (not cookies). The token lives in `localStorage` (`api/token.ts`); `main.ts` calls `authStore.init()` (hydrate via `/auth/me`) **before** mounting so the router guard sees the restored session.
- `VITE_API_URL` (axios baseURL) is injected at **build time**. Empty/missing → falls back; an empty string silently makes requests same-origin, so it must actually be set in CI.

## Deployment

- **Frontend** → GitHub Pages via `.github/workflows/deploy-frontend.yml` on push to `main`. `VITE_API_URL` is injected from a **repository variable** (Settings → Actions → Variables, repo scope — *not* a Secret, *not* an Environment variable; the build job has no `environment:`). Pages source must be "GitHub Actions".
- **Backend** → Render web service + Render PostgreSQL (dashboard setup, not the `render.yaml` blueprint). Render env vars: `DATABASE_URL` (internal URL), `JWT_SECRET`, `HOST=0.0.0.0` (Fastify defaults to loopback — must override or Render can't reach it). CORS is `FRONTEND_ORIGIN` (= `https://teollan.github.io`, **origin only, no path/trailing slash**). Migrations apply via `npm run prisma:deploy` in the Render Build Command.
- `/health` does `SELECT 1` — it passes on an empty (unmigrated) DB, so a green health check does **not** prove migrations ran.

## Outstanding

`README.md` still has a `TODO` for the Google Drive report URL (a graded requirement). Don't fabricate it.
