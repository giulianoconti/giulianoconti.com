# Giuliano's Portfolio

#

A modern, interactive 3D portfolio built with React, TypeScript, and Three.js. Features smooth animations, project showcases with interactive tooltips, and multi-language support.

## 🚀 Features

- **3D Interactive Scene** – WebGL-powered hero section using Three.js and React Three Fiber
- **Smooth Scroll** – Lenis integration for butter-smooth scrolling experience
- **Project Showcase** – Interactive tooltips in footer with project details, tech stack, and links
- **Multi-language Support** – English/Spanish/Portuguese
- **Responsive Design** – Mobile-first approach with SCSS breakpoints
- **Modern Stack** – React 19, TypeScript, Vite for fast development

## 📁 Project Structure

```
src/
├── components/
│   ├── molecules/
│   │   ├── Footer/        # Footer with project tooltips
│   │   └── Navbar/        # Navigation bar
│   └── atoms/             # Reusable UI components
├── pages/
│   └── Home/              # Main page sections
│       ├── Hero/          # 3D hero section
│       ├── About/         # About section
│       ├── Experience/    # Work experience
│       ├── Contact/       # Contact section
│       └── Scene/         # Three.js scene setup
├── contexts/
│   └── LocaleContext.tsx  # Language/locale management
├── icons/                 # SVG icon components
├── styles/                # Global SCSS
└── utils/                 # Constants, interfaces, helpers
```

## 🛠️ Setup & Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

## 🎨 Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Styling**: SCSS with CSS variables
- **Scrolling**: Lenis

## 📋 Scripts

| Command        | Description                      |
| -------------- | -------------------------------- |
| `pnpm dev`     | Start Vite dev server            |
| `pnpm build`   | Build for production             |
| `pnpm preview` | Preview production build locally |
| `pnpm lint`    | Run ESLint                       |

## 🌐 Localization

The portfolio supports multiple languages through `LocaleContext`. Currently configured for:

- English
- Spanish

Add new languages by extending the locale context and translation maps.

## 📂 Key Components

- **Footer**: Interactive project showcase with hover tooltips
- **Navbar**: Navigation with mobile support
- **Hero Section**: 3D scene with Three.js
- **About/Experience**: Portfolio content sections
- **Contact**: Contact information and CTA

## 📱 Responsive Breakpoints

Configured in `src/styles/_breakpoints.scss`:

- Mobile (default)
- Tablet
- Desktop

## 🔧 Development Notes

- Uses CSS modules via SCSS `@use` for styling
- Icons are reusable React components with TypeScript support
- Three.js scene is optimized for performance with lazy loading
- Project data managed in `utils/constants.ts`

## 📄 License

Personal portfolio project.
