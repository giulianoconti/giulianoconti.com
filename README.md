# giulianoconti.com

Personal freelance landing page. Single-page site showcasing services, projects, pricing, and contact.

## Features

- **Dark/light theme** – persisted in localStorage, respects system preference
- **Typewriter hero** – animated code card on desktop
- **Project showcase** – real production projects with tags and roles
- **Pricing modal** – quiz flow or direct feature table, opens automatically on first visit
- **FAQ accordion** – collapsible Q&A section
- **WhatsApp floating button** – pre-filled message
- **Scroll animations** – IntersectionObserver reveal on sections
- **Responsive** – mobile hamburger menu, desktop nav

## Stack

- React 19, TypeScript
- Vite
- SCSS

## Structure

```
src/
├── pages/
│   └── Landing/
│       ├── index.tsx        # Main landing page
│       ├── Landing.scss     # All landing styles
│       ├── QuoteModal.tsx   # Pricing quiz / feature table modal
│       ├── QuoteModal.scss
│       └── icons.tsx        # SVG icon components
├── styles/
│   └── _mixins.scss
├── index.scss
└── main.tsx
```

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
