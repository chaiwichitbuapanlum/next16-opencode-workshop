# Copilot Instructions for next16-opencode-workshop

## Architecture Overview
This is a **Next.js 16 education platform** demonstrating modern React patterns with partial prerendering and cache components. The app fetches course/user data from MockAPI and renders with optimal caching strategies.

**Key Architecture:**
- **App Router**: All pages in `app/` directory with file-based routing
- **Service Layer**: `services/` contains API functions with error handling patterns  
- **Component Separation**: `components/` for reusable UI, `components/ui/` for shadcn/ui library
- **Type Safety**: Centralized types in `lib/types.ts` (Course, User interfaces)

## Next.js 16 Specific Patterns

### Cache Components (CRITICAL)
- `cacheComponents: true` enabled in `next.config.ts`
- **Pattern**: Services use `'use cache'` directive for API calls
- **Example**: `getCourses()` and `getCourseById()` in `course-service.ts` are cached by default
- **Cache Invalidation**: Use `cacheTag()`, `updateTag()`, `revalidateTag()` for selective updates

### Component Strategy
- **Static Shell**: Layout, navigation, hero components pre-rendered
- **Dynamic Content**: Course listings, user data wrapped in `<Suspense>`
- **Loading States**: Every dynamic route has `loading.tsx` (see `app/user/loading.tsx`, `app/course/[id]/loading.tsx`)

## Development Workflow

### Essential Commands
```bash
npm run dev        # Development server (port 3000)
npm run build      # Production build  
npm run lint       # ESLint validation
npm start          # Production server
```

### Path Aliases & Imports
- **Always use** `@/` for absolute imports: `import { Course } from "@/lib/types"`
- **Example**: `import { getCourses } from "@/services/course-service"`

### File Naming Conventions
- **Files**: kebab-case (`course-service.ts`, `nav-menu.tsx`)
- **Components**: PascalCase exports (`AppCourseList`, `AppUserList`)  
- **Pages**: lowercase (`page.tsx`, `loading.tsx`, `layout.tsx`)

## Error Handling Patterns

### Service Layer Standard
```typescript
// Pattern from course-service.ts
try {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error("Error fetching courses:", error);
  throw error; // Re-throw for component handling
}
```

### Component Error Boundaries
- **Async Components**: Always wrapped in `<Suspense>` with fallback
- **Example**: Course listings in `AppCourseList.tsx` show loading state via `AppCourseLoading.tsx`

## UI Framework Integration

### Tailwind + shadcn/ui
- **Base Classes**: `max-w-7xl mx-auto px-4 py-8` for consistent container layout
- **Components**: Import from `@/components/ui/` (Button, Badge, Sheet, etc.)
- **Color Scheme**: Amber accents (`bg-amber-50`) for education theme

### Typography & Fonts
- **Font Variables**: `--font-geist-sans`, `--font-geist-mono` configured in `layout.tsx`
- **Responsive Text**: Use `text-3xl font-bold` for headings, `text-gray-600` for secondary

## API Integration
- **Base URL**: MockAPI endpoints in service constants (`API_URL`)
- **Data Flow**: Services → Components → UI rendering
- **Validation**: Always validate response structure before using (see `getCourseById` validation)

## Common Pitfalls
- **Don't** use regular `fetch` in components - use service layer functions
- **Don't** forget `<Suspense>` around dynamic content accessing runtime data
- **Always** include error logging before re-throwing in services
- **Always** use absolute imports with `@/` prefix