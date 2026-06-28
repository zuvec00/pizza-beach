# 🍕🌊 Pizza Beach Birthday

Personalized RSVP invite site for Zuky & Ebuka's birthday. Static, mobile-first,
no backend — every guest opens a unique link, answers a personal question (the
"pizza box" gate), then lands on the invite with a retro-TV video and WhatsApp
Accept / Can't-make-it buttons.

## Run

```bash
npm install
npm run dev      # local dev at the printed URL
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Open a guest link like `http://localhost:5173/keke-adams`.

## What to edit before launch

| Edit | File |
| ---- | ---- |
| Guest list (slugs, names, questions, answers) | `src/data/guests.ts` |
| Event date / time / location / rules | `src/data/event.ts` |
| Host WhatsApp number (intl format, no `+`/spaces) | `src/data/event.ts` → `whatsappNumber` |
| TV video clip + poster fallback | `src/data/event.ts` → `videoSrc`, `videoPoster` |

> `src/data/guests.ts` currently holds **3 test guests** — replace them with the
> real list before sending invites.

## How it works

- `/:slug` is a single dynamic route. Unknown slug → friendly not-found screen.
- Answer match: trimmed + lowercased exact match against `acceptableAnswers`.
- Gate pass is stored in `sessionStorage` keyed by slug, so a refresh keeps you
  in but the invite can't be reached without passing the gate.
- WhatsApp buttons open `wa.me` with a prefilled, personalized message.
- Respects `prefers-reduced-motion`.

## Deploy

It's a static SPA. Build and deploy `dist/` to Netlify, Vercel, Cloudflare
Pages, etc. The included `public/_redirects` handles SPA routing on Netlify; on
other hosts configure a catch-all rewrite to `/index.html`.
