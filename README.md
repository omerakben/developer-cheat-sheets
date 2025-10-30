# Developer Cheat Sheets

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

> **A comprehensive collection of developer cheat sheets with copy-paste ready code examples**

Your go-to resource for quick reference guides covering Git, Docker, React, Python, Django, TypeScript, Next.js, FastAPI, OpenAI, Regex, and more. Built for developers who value speed, clarity, and best practices.

**[Live Demo](https://developer-cheat-sheets.vercel.app)** • **[Portfolio](https://omerakben.com)** • **[Report Bug](https://github.com/omerakben/developer-cheat-sheets/issues)** • **[Request Feature](https://github.com/omerakben/developer-cheat-sheets/issues)**

---

## Why This Project?

As developers, we constantly Google the same patterns, syntax, and examples. This project eliminates that friction by providing:

- **Copy-Paste Ready**: Every code example is production-ready
- **Real-World Use Cases**: Examples from actual development scenarios
- **Best Practices**: Security-first, performance-aware code patterns
- **Searchable & Filterable**: Find exactly what you need instantly
- **Difficulty Levels**: From basic to expert examples
- **Clean, Professional Design**: No clutter, just code

**Perfect for:**
- Quick reference during development
- Learning new technologies
- Interview preparation
- Code review standards
- Team onboarding

---

## Features

### Current Features

- **10 Comprehensive Cheat Sheets**: Git, Docker, React, Regex, Python, Django, TypeScript, Next.js, FastAPI, OpenAI
- **Fuzzy Search**: Intelligent typo-tolerant search with Fuse.js - finds examples even with misspellings
- **Difficulty Level Filtering**: Filter examples from beginner to expert level
- **Tag-Based Navigation**: Browse examples by tags (security, performance, validation, etc.)
- **Bookmark System**: Save your favorite code snippets for quick access
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Copy to Clipboard**: One-click code copying with visual feedback
- **Syntax Highlighting**: Professional code presentation with language support
- **Documentation Links**: Direct links to official docs for each example
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Fast Loading**: Optimized with Next.js 15 and React Server Components

### Coming Soon

- Share specific code snippets via URL
- Interactive code playground with live execution
- Community contributions and voting
- VS Code extension
- Offline support (PWA)
- More cheat sheets (SQL, MongoDB, AWS, Kubernetes)

---

## Tech Stack

This project leverages modern web technologies:

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI**: [React 19](https://reactjs.org/) with Server Components
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Search**: [Fuse.js](https://fusejs.io/) for fuzzy search
- **Syntax Highlighting**: [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/omerakben/developer-cheat-sheets.git
cd developer-cheat-sheets
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
developer-cheat-sheets/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx          # Homepage
│   │   ├── layout.tsx        # Root layout with providers
│   │   ├── bookmarks/        # Bookmarks page
│   │   ├── git/              # Git cheat sheet page
│   │   ├── docker/           # Docker cheat sheet page
│   │   ├── react/            # React cheat sheet page
│   │   ├── regex/            # Regex cheat sheet page
│   │   ├── python/           # Python cheat sheet page
│   │   ├── django/           # Django cheat sheet page
│   │   ├── typescript/       # TypeScript cheat sheet page
│   │   ├── nextjs/           # Next.js cheat sheet page
│   │   ├── fastapi/          # FastAPI cheat sheet page
│   │   └── openai/           # OpenAI cheat sheet page
│   ├── components/           # React components
│   │   ├── Navigation.tsx    # Top navigation with theme toggle
│   │   ├── Footer.tsx        # Footer with social links
│   │   ├── CheatSheetLayout.tsx  # Cheat sheet template with fuzzy search
│   │   └── CodeBlock.tsx     # Code snippet with bookmarks
│   ├── contexts/             # React contexts
│   │   ├── ThemeContext.tsx  # Dark/Light mode state
│   │   └── BookmarkContext.tsx  # Bookmark state management
│   ├── lib/
│   │   └── cheatsheets/      # Cheat sheet data
│   │       ├── git.ts        # 30+ Git examples
│   │       ├── docker.ts     # 25+ Docker examples
│   │       ├── react.ts      # 20+ React hooks examples
│   │       ├── regex.ts      # 15+ Regex patterns
│   │       ├── python.ts
│   │       ├── django.ts
│   │       ├── typescript.ts
│   │       ├── nextjs.ts
│   │       ├── fastapi.ts
│   │       └── openai.ts
│   └── types/
│       └── cheatsheet.ts     # TypeScript interfaces
├── public/                   # Static assets
├── README.md
├── LICENSE
└── package.json
```

---

## Available Cheat Sheets

### Git

Essential Git version control reference:
- Repository setup and configuration
- Basic workflow (add, commit, push, pull)
- Branching strategies and merging
- Remote repository management
- Undoing changes safely
- Stashing and cleaning
- Conflict resolution
- Advanced techniques (rebase, cherry-pick, submodules)

**[View Git Cheat Sheet →](/git)**

### Docker

Complete Docker containerization guide:
- Container basics and lifecycle
- Image building and optimization
- Docker Compose orchestration
- Volume and data management
- Networking patterns
- Multi-stage builds
- Troubleshooting and debugging
- Security best practices

**[View Docker Cheat Sheet →](/docker)**

### React

React hooks and patterns reference:
- Basic hooks (useState, useEffect, useContext)
- Performance hooks (useMemo, useCallback, useTransition)
- Advanced hooks (useReducer, useRef, useImperativeHandle)
- Custom hooks for reusable logic
- Component patterns and composition
- Error boundaries and Suspense
- Testing patterns

**[View React Cheat Sheet →](/react)**

### Regex

Regular expressions patterns and usage:
- Basic syntax and metacharacters
- Character classes and quantifiers
- Anchors and boundaries
- Groups and capturing
- Lookahead and lookbehind assertions
- Common validation patterns
- Practical JavaScript integration

**[View Regex Cheat Sheet →](/regex)**

### Python

Comprehensive Python reference covering:
- Variables, data types, and operations
- Lists, dictionaries, sets, and tuples
- Control flow and loops
- Functions and classes
- File I/O and error handling
- Essential standard library modules
- Security-first patterns

**[View Python Cheat Sheet →](/python)**

### Django

Complete Django framework guide:
- Project setup and configuration
- Models, views, and URL patterns
- Templates and forms
- User authentication and admin
- Class-based views and mixins
- REST API development
- Security best practices

**[View Django Cheat Sheet →](/django)**

### TypeScript

TypeScript essentials for developers:
- Basic types and interfaces
- Advanced type patterns
- React component typing
- Generic types and constraints
- Utility types and mapped types
- Error handling patterns
- Configuration and tooling

**[View TypeScript Cheat Sheet →](/typescript)**

### Next.js

Modern Next.js App Router guide:
- App Router and routing patterns
- Server and Client Components
- Data fetching strategies
- API routes and middleware
- Styling and component patterns
- Performance optimizations
- Deployment best practices

**[View Next.js Cheat Sheet →](/nextjs)**

### FastAPI

FastAPI framework reference:
- Quick start and setup
- Path operations and routing
- Request validation with Pydantic
- Security and authentication
- Database integration
- Background tasks
- Testing and deployment

**[View FastAPI Cheat Sheet →](/fastapi)**

### OpenAI API

Complete OpenAI API guide:
- Authentication and setup
- Chat completions and streaming
- Function calling and tools
- Vision and image generation
- Audio and speech processing
- Embeddings and search
- Assistants API
- Production best practices

**[View OpenAI Cheat Sheet →](/openai)**

---

## Usage

### Fuzzy Search

The intelligent search powered by Fuse.js is typo-tolerant and searches across multiple fields:
- **Title** (highest priority) - example names
- **Description** - what the code does
- **Tags** - categorization like "security", "performance"
- **Code** - actual code content
- **Section titles** - major categories

Just start typing, and relevant examples appear even with typos (e.g., "docker compse" finds "docker compose").

### Difficulty Filtering

Click the "Filters" button to filter examples by difficulty level:
- **Beginner**: Getting started examples
- **Intermediate**: Common use cases
- **Advanced**: Complex patterns
- **Expert**: Production optimizations

### Bookmarking

Click the bookmark icon on any code example to save it for later. Access all your bookmarks from the navigation menu.

### Keyboard Shortcuts

| Shortcut       | Action                             |
| -------------- | ---------------------------------- |
| `/`            | Focus search                       |
| `Esc`          | Clear search                       |
| `Ctrl/Cmd + K` | Open command palette (coming soon) |

### Copy Code

Click the copy button in the top-right corner of any code block to copy the code to your clipboard. A checkmark will briefly appear to confirm.

---

## Contributing

Contributions are welcome! Whether it's adding new cheat sheets, improving existing ones, fixing bugs, or enhancing documentation.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add FastAPI routing examples'`)
5. Push to your branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Adding a New Cheat Sheet

1. Create data file in `src/lib/cheatsheets/yourtech.ts`
2. Follow the `CheatSheet` interface structure
3. Create page in `src/app/yourtech/page.tsx`
4. Add navigation link in `src/components/Navigation.tsx`
5. Update README.md with your cheat sheet details

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## Roadmap

### Completed ✓
- [x] Add difficulty level filtering
- [x] Implement bookmark system
- [x] Add Git, Docker, React, and Regex cheat sheets
- [x] Dark/Light mode toggle
- [x] Fuzzy search with typo tolerance

### In Progress
- [ ] Add more cheat sheets (SQL, MongoDB, AWS, Kubernetes)
- [ ] Share specific snippets via URL
- [ ] Interactive code playground with live execution

### Future
- [ ] Community contribution system with voting
- [ ] Mobile app (React Native)
- [ ] Offline support (PWA)
- [ ] VS Code extension
- [ ] AI-powered code suggestions
- [ ] Multi-language support

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Author

**Omer Akben**

- Portfolio: [omerakben.com](https://omerakben.com)
- GitHub: [@omerakben](https://github.com/omerakben)
- LinkedIn: [omerakben](https://linkedin.com/in/omerakben)

---

## Acknowledgments

- Built with [Next.js](https://nextjs.org/) by Vercel
- Icons by [Lucide](https://lucide.dev/)
- Syntax highlighting by [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- Inspired by the developer community's need for quick, reliable references

---

## Support

If you find this project helpful:

- ⭐ Star this repository
- 🐛 [Report bugs](https://github.com/omerakben/developer-cheat-sheets/issues)
- 💡 [Suggest features](https://github.com/omerakben/developer-cheat-sheets/issues)
- 📖 Improve documentation
- 🔀 Submit pull requests

---

**Made with ❤️ for the developer community**
