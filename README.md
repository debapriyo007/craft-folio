# ⚔️ Debapriya Das — Portfolio

A high-performance personal portfolio built with **Angular (v22)**, **TypeScript**, and **Vanilla CSS**. Designed with a sleek **Minecraft-inspired Obsidian & Quartz glassmorphism aesthetic**, responsive hotbar navigation, dynamic Day/Night Realm view transitions, and real-time GitHub integration.

---

## 🏛️ Project Architecture & Directory Layout

The codebase follows enterprise Angular architectural conventions, organized by functional layers with path aliases (`@core`, `@shared`, `@features`, `@env`) and clean barrel exports (`index.ts`):

```
debu_21_portfolio-Latest_25/
├── public/                       # Static public assets (single canonical source)
│   ├── assets/
│   │   ├── fonts/               # Pixelify Sans & custom typography
│   │   └── images/              # Clean 3D voxel banners, project thumbnails, avatars
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── core/                # Core singleton services & domain models
│   │   │   ├── models/          # GitHub, Portfolio, & Theme domain interfaces
│   │   │   │   ├── github.model.ts
│   │   │   │   ├── portfolio.model.ts
│   │   │   │   ├── theme.model.ts
│   │   │   │   └── index.ts     # Barrel export
│   │   │   ├── services/        # Business logic & reactive state
│   │   │   │   ├── github.service.ts
│   │   │   │   ├── portfolio-data.service.ts
│   │   │   │   ├── theme.service.ts
│   │   │   │   └── index.ts     # Barrel export
│   │   │   └── index.ts         # Top-level @core barrel export
│   │   ├── features/            # Feature modules and views
│   │   │   └── portfolio/       # Main portfolio workspace feature
│   │   │       ├── components/
│   │   │       │   ├── about-card/       # Profile info, credentials & contacts
│   │   │       │   ├── github-tab/       # Pinned repos & live GitHub API feed
│   │   │       │   ├── hero/             # Header greeting, avatar & bio
│   │   │       │   ├── projects-tab/     # 3D voxel banners & featured showcases
│   │   │       │   ├── resume-tab/       # Education timeline & skills matrix
│   │   │       │   ├── tab-nav/          # Glass Hotbar tab navigation
│   │   │       │   └── index.ts          # Barrel export
│   │   │       ├── portfolio.component.css
│   │   │       ├── portfolio.component.html
│   │   │       ├── portfolio.component.spec.ts
│   │   │       └── portfolio.component.ts
│   │   ├── shared/              # Reusable UI widgets & utility components
│   │   │   ├── components/
│   │   │   │   ├── custom-cursor/        # Responsive desktop golden-spearhead cursor
│   │   │   │   ├── footer/               # Beveled glass copyright footer
│   │   │   │   ├── theme-toggle/         # Celestial Sun & Moon realm switcher
│   │   │   │   └── index.ts              # Barrel export
│   │   │   └── index.ts         # Top-level @shared barrel export
│   │   ├── app.config.ts        # Application configuration & providers (HttpClient)
│   │   ├── app.html / app.css
│   │   └── app.ts               # Standalone root component
│   ├── environments/            # Multi-environment configurations
│   │   ├── environment.model.ts # Environment type definition
│   │   ├── environment.ts       # Development environment configuration
│   │   ├── environment.prod.ts  # Production environment configuration
│   │   └── index.ts             # Top-level @env barrel export
│   ├── index.html               # Main HTML entry with SEO meta tags & preconnects
│   ├── main.ts                  # Application bootstrap entry point
│   └── styles.css               # Design tokens, themes, animations & glassmorphism
├── angular.json                 # Angular CLI configuration & production replacements
├── package.json                 # Project dependencies & npm scripts
├── tsconfig.json                # TypeScript root config with path mappings
└── README.md
```

---

## ⚡ Tech Stack & Highlights

- **Framework**: Angular 22 (Standalone Components, Signals, Computed, Effects)
- **Language**: TypeScript 6.0 with strict typing and module resolution
- **Styling**: Pure Vanilla CSS design tokens (`--surface-glass`, `--mc-diamond`, `--mc-gold`)
- **Animation & Transitions**:
  - **Native View Transitions API**: Expanding radial clip-path wave reveal emanating from the toggle button
  - **Celestial Orbit**: Sun and moon rotation and scaling transitions
  - **Tab Fade**: Smooth keyframed tab switches
- **State Management**: Angular Signals (`signal<T>`, `computed()`) for ultra-responsive fine-grained updates without Zone.js overhead
- **Testing**: Vitest with unit test coverage across services and standalone components

---

## 🎨 Theme Realms (Day & Night)

The application features a bidirectional theme system tailored with high-contrast palette tokens:

| Realm | Theme | Description |
| :--- | :--- | :--- |
| **Overworld Day** | `[data-theme='light']` | Quartz crystal glass, crisp obsidian text (`#0f172a`), emerald badge highlights |
| **Netherite Night** | `[data-theme='dark']` | Sleek obsidian black glass (`rgba(10, 10, 15, 0.72)`), subtle pearl smoke lighting, glowing gold & platinum accents |

---

## 🛠️ Developer Scripts

| Command | Description |
| :--- | :--- |
| `npm start` | Run local development server at `http://localhost:4200/` |
| `npm run build` | Build development bundle |
| `npm run build:prod` | Build optimized production bundle with environment replacements |
| `npm test` | Run unit tests in interactive watch mode |
| `npm run test:ci` | Run all unit tests once (CI mode) |
| `npm run format` | Format all source files with Prettier |
| `npm run format:check` | Verify code style adherence without writing |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.19.0 or higher
- **npm**: v10.0.0 or higher

### Installation

```bash
git clone https://github.com/debapriyo007/debu_21_portfolio-Latest_25.git
cd debu_21_portfolio-Latest_25
npm install
```

### Running Locally

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser.

---

## 🧪 Running Tests

To run the complete test suite:

```bash
npm run test:ci
```

---

## 📄 License

This project is personal intellectual property of [Debapriya Das](https://github.com/debapriyo007).
