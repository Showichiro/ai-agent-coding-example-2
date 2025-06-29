# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- **Start CLI**: `pnpm start` or `pnpm dev` (with watch mode)
- **Build**: `pnpm build` (TypeScript compilation)
- **Lint**: `pnpm lint` (Biome linter with auto-fix)
- **Format**: `pnpm format` (Biome formatter)
- **Test**: `pnpm test` (Vitest)

### Examples
Run examples with `pnpm run example:<name>`:
- `pnpm run example:ink` - Border styles demo
- `pnpm run example:counter` - Counter component 
- `pnpm run example:suspense` - Async data loading
- `pnpm run example:table` - Table layout
- `pnpm run example:input` - User input handling
- `pnpm run example:justify-content` - Layout alignment

## Architecture

### Project Structure
```
src/
├── core/       # Pure domain models and business logic (functional programming)
└── cli/        # Application layer (React Ink UI integration)
```

### Technology Stack
- **UI Framework**: React Ink (terminal-based React apps)
- **Language**: TypeScript with strict configuration
- **Testing**: Vitest with ink-testing-library
- **Linting/Formatting**: Biome
- **Package Manager**: pnpm

### Development Methodology
This project follows **TDD with Tidy First** workflow:

1. **Tidy First** (optional): Clean up existing code structure before adding features
2. **Red**: Write a failing test that defines new behavior  
3. **Green**: Write minimal code to make the test pass
4. **Refactor**: Improve code structure while keeping tests green
5. **Commit**: Separate commits for behavior changes (`feat:`/`fix:`) vs structure changes (`refactor:`/`tidy:`)

### Functional Programming Guidelines
- Use **pure functions** for domain logic (no side effects)
- Implement **immutable data structures** 
- Use **Result types** instead of throwing exceptions
- Prefer **function composition** over classes
- Apply **Railway Oriented Programming** for error handling
- Use **branded types** for type safety of primitive values

### React Ink Requirements
All Ink applications must handle Ctrl-C termination:

```typescript
import { useApp } from 'ink';

const App = () => {
  const { exit } = useApp();

  useEffect(() => {
    const handleSignal = () => exit();
    process.on('SIGINT', handleSignal);
    process.on('SIGTERM', handleSignal);
    return () => {
      process.off('SIGINT', handleSignal);
      process.off('SIGTERM', handleSignal);
    };
  }, [exit]);
};
```

Or use `waitUntilExit()` pattern as shown in examples.

### Testing Strategy
- **Pure functions**: Comprehensive unit tests
- **Side-effect functions**: Integration tests
- **Minimal mocking**: Prefer real implementations
- Use `ink-testing-library` for React Ink component testing

### Code Style
- **Biome** handles formatting (spaces, double quotes)
- **No unused imports** allowed (Biome rule disabled for development)
- **Import organization** enabled
- Follow existing patterns in `examples/` directory

### Workflow Process
The project includes a comprehensive AI-agent development workflow documented in Japanese. Key phases:
1. Project setup (human)
2. Requirements definition (human) 
3. Feature design (AI agent)
4. Implementation with TDD (AI agent)
5. Integration testing (AI agent)
6. Acceptance testing (human)

Each phase has templates in `docs/` and review checklists in `docs/99_reviews/`.