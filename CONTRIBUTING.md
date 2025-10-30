# Contributing to Developer Cheat Sheets

First off, thank you for considering contributing to Developer Cheat Sheets! It's people like you that make this a great resource for developers worldwide.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Focus on constructive feedback
- Help create a positive learning environment
- Respect differing viewpoints and experiences

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots, etc.)
- **Describe the behavior you observed** and what you expected
- **Include browser/OS information** if relevant

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful** to most users
- **List examples** of how the enhancement would work

### Adding New Cheat Sheets

We welcome new cheat sheets! Here's how to add one:

1. **Fork the repository** and create a new branch:
   ```bash
   git checkout -b feature/add-your-technology-cheat-sheet
   ```

2. **Create the data file** in `src/lib/cheatsheets/your-technology.ts`:
   ```typescript
   import { CheatSheet } from "@/types/cheatsheet";

   export const yourTechnologyCheatSheet: CheatSheet = {
     title: "Your Technology Name",
     description: "Brief description of what this covers",
     sections: [
       {
         id: "section-id",
         title: "Section Title",
         description: "Section description",
         examples: [
           {
             title: "Example Title",
             description: "What this example demonstrates",
             code: `// Your code here`,
             language: "javascript", // or python, typescript, etc.
             difficulty: "beginner", // optional: beginner, intermediate, advanced, expert
             tags: ["tag1", "tag2"], // optional
             documentationUrl: "https://...", // optional
           },
         ],
       },
     ],
   };
   ```

3. **Create the page** in `src/app/your-technology/page.tsx`:
   ```typescript
   import CheatSheetLayout from "@/components/CheatSheetLayout";
   import { yourTechnologyCheatSheet } from "@/lib/cheatsheets/your-technology";
   import type { Metadata } from "next";

   export const metadata: Metadata = {
     title: "Your Technology Cheat Sheet",
     description: "Description for SEO",
   };

   export default function YourTechnologyPage() {
     return (
       <CheatSheetLayout
         cheatSheet={yourTechnologyCheatSheet}
         cheatSheetId="your-technology"
       />
     );
   }
   ```

4. **Add navigation link** in `src/components/Navigation.tsx`

5. **Update README.md** with your new cheat sheet

6. **Test your changes** locally:
   ```bash
   npm run dev
   ```

7. **Commit your changes** with a clear message:
   ```bash
   git commit -m "Add Your Technology cheat sheet"
   ```

8. **Push to your fork** and create a Pull Request

### Improving Existing Cheat Sheets

To improve existing cheat sheets:

1. Ensure code examples are **accurate and follow best practices**
2. Add **difficulty levels** to examples where appropriate
3. Include **tags** for better searchability
4. Add **documentation links** where helpful
5. Fix any **typos or errors**
6. Improve **descriptions** to be clearer

### Code Style Guidelines

- **TypeScript**: Use strict typing, avoid `any`
- **React Components**: Use functional components with hooks
- **Formatting**: Run `npm run lint` before committing
- **Comments**: Add comments for complex logic
- **Naming**: Use descriptive variable and function names

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests when relevant

Examples:
```
Add Docker cheat sheet
Fix TypeScript example in React section
Update Python error handling examples
Improve search functionality performance
```

## Development Setup

1. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/developer-cheat-sheets.git
   cd developer-cheat-sheets
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production** (optional):
   ```bash
   npm run build
   npm start
   ```

## Pull Request Process

1. **Update documentation** (README.md, etc.) with details of changes
2. **Test thoroughly** - ensure everything works as expected
3. **Keep PRs focused** - one feature/fix per PR
4. **Describe your changes** - explain what and why in the PR description
5. **Wait for review** - maintainers will review and may request changes
6. **Address feedback** - make requested changes and push updates

## Questions?

Feel free to ask questions by:
- Opening an issue with the "question" label
- Reaching out via [GitHub Discussions](https://github.com/omerakben/developer-cheat-sheets/discussions)

## Recognition

Contributors will be recognized in:
- The project README
- Release notes for significant contributions
- Our hearts forever ❤️

Thank you for contributing to making development easier for everyone!
