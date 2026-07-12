# LectureLink

Share files instantly with a short access code. No login required.

LectureLink solves a simple classroom problem: after a lecture, students want the slides or notes right away. Instead of hunting for a WhatsApp group, a teacher uploads the file here, gets a short code (like `CS7A92`), and writes it on the board. Students type the code into the site and download the file — done in under 30 seconds.

## How it works

1. **Upload** — drag and drop a file, choose Quick Share or Advanced Share, click Share
2. **Get a code** — a short access code, a share link, and a QR code are generated instantly
3. **Access** — students enter the code (and password, if set) to view file details and download

**Quick Share** uses sensible defaults: auto-generated code, no password, 24-hour expiry, unlimited downloads.

**Advanced Share** gives full control: custom access code, password protection, expiry time, max downloads, one-time download, hide/show filename, subject and notes.

Files delete themselves automatically once they expire — no manual cleanup required.

## Tech stack

**Frontend** (this repo)
- React + Vite
- Tailwind CSS
- Ant Design
- React Router
- Axios

**Backend** (separate repo)
- Node.js + Express
- Redis (temporary access-code metadata, with TTL-based auto-expiry)
- Supabase Storage (file storage)

## Getting started

```bash
npm install
```

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=http://localhost:5000
```

Run the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Set `VITE_API_BASE_URL` in `.env.production` (or your hosting platform's environment variables) to your deployed backend URL before building.

## Project structure

```
src/
├── components/     # Reusable UI pieces (forms, code display, file details)
├── pages/          # UploadPage, AccessPage
├── services/       # API client (api.js)
├── App.jsx         # Routes + theme provider
├── main.jsx        # Entry point
└── index.css       # Design tokens + Ant Design overrides
```

## Deployment

This is a static single-page app. When deploying to Vercel, a `vercel.json` rewrite is required so direct links (e.g. `/access/CS7A92`) don't 404:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Make sure the backend's `FRONTEND_URL` environment variable matches this app's deployed URL exactly (no trailing slash), or cross-origin requests will fail.

## License

Private project — not currently licensed for reuse.