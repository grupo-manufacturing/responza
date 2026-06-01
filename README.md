# Responza (frontend)

Marketing site and admin panel for [Responza](https://responza.in).

## Setup

1. Copy `.env.example` to `.env` and set `VITE_API_URL` (use `http://localhost:4000` locally, or leave empty to use the Vite dev proxy).
2. Run the [backend](../backend) API on port 4000.
3. Install and start:

```bash
npm install
npm run dev
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing |
| `/blogs` | Public blog |
| `/admin/login` | Admin sign-in |
| `/admin/blogs` | Manage posts |

Backend lives in the separate `backend/` folder (see `backend/README.md`).
