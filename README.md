# Dog Handoff App

A frictionless, no-auth dog routine handoff sheet for families, sitters, walkers, and caretakers.

## Features

- Log up to 50 dog-care events
- Track feeding, walks, pee, poop, meds, water, sleep, accidents, play, grooming, and custom notes
- Add behavior notes and next-caretaker instructions
- Encode all state into a compressed URL using `lz-string`
- Load shared handoff sheets from the URL
- Copy a share link
- Print a clean one-page handoff sheet
- Works fully client-side with no backend or accounts

## Tech Stack

- Next.js
- React
- TypeScript
- Zustand
- Tailwind CSS
- lz-string
- Lucide React

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Static Hosting

This app is designed for Vercel. It uses client-side state and URL compression, so no database or server API is required.

## Notes

The share URL stores compressed routine data in the `?s=` query parameter. Keep entries concise for best shareability.
