# UX Portfolio

A modern, interactive portfolio website built with React, TypeScript, and Framer Motion.

## Features

- 🎨 Clean, minimalist design inspired by modern UX portfolios
- ⚡ Smooth animations and transitions with Framer Motion
- 📱 Fully responsive design
- 🎯 Custom cursor interactions
- 🌙 Dark theme with gradient accents
- 🚀 Built with Vite for optimal performance

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Customization

### Update Personal Information

Edit `src/App.tsx` to customize:
- Your name in the navigation (search for "YourName")
- Hero section text and description
- Project portfolio items in the `PROJECTS` array
- About section content
- Contact information and social links

### Styling

- Global styles: `src/index.css`
- Component styles: `src/App.css`
- Color scheme can be modified in CSS custom properties in `index.css`

## Project Structure

```
portfolio/
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Component styles
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite config
```

## License

MIT

---

Built with ❤️
