# Developer Cheat Sheets

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

> **A comprehensive collection of developer cheat sheets with copy-paste ready code examples**

Your go-to resource for quick reference guides covering Python, Django, TypeScript, Next.js, FastAPI, OpenAI, and more. Built for developers who value speed, clarity, and best practices.

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

- **6 Comprehensive Cheat Sheets**: Python, Django, TypeScript, Next.js, FastAPI, OpenAI
- **Instant Search**: Find code snippets across all cheat sheets
- **Copy to Clipboard**: One-click code copying with visual feedback
- **Syntax Highlighting**: Professional code presentation
- **Responsive Design**: Works perfectly on desktop and mobile
- **Keyboard Shortcuts**: Navigate and search with keyboard
- **Dark Mode**: Easy on the eyes
- **Fast Loading**: Optimized for performance

### Coming Soon

- Difficulty level filtering (Basic → Expert)
- Bookmark system for favorite snippets
- Share specific code snippets via URL
- Dark/Light mode toggle
- More cheat sheets (React, Docker, Git, SQL)
- Interactive code playground
- Community contributions

---

## Tech Stack

This project leverages modern web technologies:

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **UI**: [React 19](https://reactjs.org/) with Server Components
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
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
│   │   ├── layout.tsx        # Root layout
│   │   ├── python/           # Python cheat sheet page
│   │   ├── django/           # Django cheat sheet page
│   │   ├── typescript/       # TypeScript cheat sheet page
│   │   ├── nextjs/           # Next.js cheat sheet page
│   │   ├── fastapi/          # FastAPI cheat sheet page
│   │   └── openai/           # OpenAI cheat sheet page
│   ├── components/           # React components
│   │   ├── Navigation.tsx    # Top navigation bar
│   │   ├── CheatSheetLayout.tsx  # Cheat sheet template
│   │   └── CodeBlock.tsx     # Code snippet display
│   ├── lib/
│   │   └── cheatsheets/      # Cheat sheet data
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

### Search Functionality

Press `/` to focus the search bar, then type to filter examples across sections. The search covers:
- Section titles
- Example descriptions
- Code content

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

- [ ] Add difficulty level filtering
- [ ] Implement bookmark system
- [ ] Add more cheat sheets (React, Docker, Git, SQL, MongoDB, AWS)
- [ ] Dark/Light mode toggle
- [ ] Interactive code playground
- [ ] Share specific snippets via URL
- [ ] Community contribution system
- [ ] Mobile app (React Native)
- [ ] Offline support (PWA)
- [ ] VS Code extension

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
