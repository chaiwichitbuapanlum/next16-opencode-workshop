# Agent Guidelines for next16-opencode-workshop

## Commands
- **Build**: `npm run build`
- **Lint**: `npm run lint` 
- **Dev Server**: `npm run dev`
- **Production**: `npm start`
- **No test runner**: Project doesn't include test commands

## Code Style Guidelines
- **TypeScript**: Strict mode enabled, use explicit typing
- **Imports**: Use `@/` path alias for absolute imports from project root
- **Components**: PascalCase for components, export default for pages/main components  
- **Functions**: Use async/await pattern, proper error handling with try/catch
- **Naming Conventions**: 
  - Files: kebab-case (`user-service.ts`, `nav-menu.tsx`)
  - Variables/functions: camelCase (`getCourses`, `userData`)
  - Types/interfaces: PascalCase (`User`, `Course`)
  - Constants: UPPER_SNAKE_CASE (`API_URL`)

## Next.js 16 Features (ENABLED)
- **Cache Components**: `cacheComponents: true` enabled in `next.config.ts`
- **Use Cache Directive**: Apply `'use cache'` with `cacheLife()` for static/cached content
- **Suspense Boundaries**: Wrap dynamic components that access runtime data
- **Partial Prerendering**: Static shell + dynamic content streaming
- **Modern Caching**: Use `cacheTag()`, `updateTag()`, `revalidateTag()` for cache invalidation

## Project Architecture  
- `app/`: Next.js App Router pages (layout.tsx, page.tsx, loading.tsx)
- `components/`: Reusable components
  - `ui/`: shadcn/ui component library (Button, Badge, etc.)
  - Main components: Navbar, Hero, Course/User listings
- `lib/`: Types (`types.ts`) and utilities (`utils.ts`)  
- `services/`: API service functions (`user-service.ts`, `course-service.ts`)
- `public/`: Static assets (SVG icons)

## Cache Implementation Patterns
- **Static Content**: Automatically prerendered (pure computations, imports)
- **Cached Dynamic**: Use `'use cache'` + `cacheLife('minutes'|'hours'|'days'|'weeks')`
- **Runtime Dynamic**: Wrap in `<Suspense>` for cookies/headers/searchParams access
- **API Fetching**: Services use `'use cache'` directive with appropriate cache profiles

## UI Framework
- **Styling**: Tailwind CSS with custom design system
- **Components**: shadcn/ui library for consistent UI patterns
- **Icons**: Lucide React icon library
- **Fonts**: Geist Sans and Geist Mono with CSS variables
- **Layout**: Responsive design with max-width containers

## Error Handling Standards
- **API calls**: Always wrap in try/catch blocks
- **Error logging**: Use `console.error()` before re-throwing
- **HTTP validation**: Check `response.ok` before parsing JSON
- **User feedback**: Provide meaningful error messages in UI
- **Suspense fallbacks**: Include loading states for async components

## Development Workflow
1. Start with `npm run dev` 
2. Use Next DevTools MCP for debugging and docs lookup
3. Follow Cache Components patterns for data fetching
4. Test with browser automation before deployment
5. Lint code before committing changes

## Next.js Initialization 
- When starting work on a Next.js project, automatically call the `init` tool from the next-devtools-mcp server FIRST. This establishes proper context and ensures all Next.js queries use official documentation.