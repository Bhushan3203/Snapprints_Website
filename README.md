# SnapPrints Vendor/Admin Dashboard + Landing Page

Vite + React + React Router + Tailwind. Public landing page at `/`,
Login button in the navbar → `/login` → `/admin` or `/vendor` dashboard
depending on role.

## Setup

```bash
npm install
cp .env.example .env
# edit .env — set VITE_API_BASE to your backend's /api URL
npm run dev
```

## What's here

- `src/pages/HomePage.jsx` — public landing page, composed from
  `src/components/landing/*` (Navbar, Hero, TrustedBy, HowItWorks,
  Features, MachineShowcase, Contact, Footer, DemoModal). Ported from
  your Next.js portfolio — same design, `next/image` swapped for plain
  `<img>`, `"use client"` directives dropped (not needed outside Next.js).
- `src/App.jsx` — `/` is now the public landing page (previously it
  redirected straight to `/login`). `/login`, `/admin/*`, `/vendor/*`
  are unchanged from before.
- `src/components/landing/Navbar.jsx` — has a **Login** button (uses
  `react-router-dom`'s `Link`, not `next/link`) next to "Request Demo".
- `src/components/landing/DemoModal.jsx` — posts to
  `{VITE_API_BASE}/request-demo` instead of a Next.js API route, since
  Vite has no server-side routes of its own. See the backend patch below.
- `public/images/logo.png` and `machine.png` — copied over from your
  portfolio's actual assets.

## Backend: one new endpoint needed

The "Request Demo" form now needs a real backend endpoint (it used to
hit Next.js's built-in `/api/request-demo` route, which only exists in
a Next.js server). I've written `routes/demo.routes.js` for your
Express backend — see `server.js.DEMO_ROUTE_PATCH.md` for the 3-step
wiring (require + mount + env vars + `npm install resend`).

Everything else (admin/vendor dashboards, auth) is unchanged from
before — this only adds the landing page and the demo-request email flow.
