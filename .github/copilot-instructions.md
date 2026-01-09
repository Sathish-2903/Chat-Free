# AI Assistant Chatbot - Copilot Instructions

## Project Overview
**Ai_Vio** is a modern React-based AI chatbot application with a black & white contrast design system. The app features real-time chat, dark/light mode theming, community features, and is structured as a frontend-only SPA ready for AI API integration.

## Architecture & Key Components

### Component Hierarchy
```
main.jsx
├── BrowserRouter
└── AppContextProvider (Global State)
    └── App.jsx (Layout)
        ├── Sidebar.jsx (Navigation + Chat List)
        └── Routes
            ├── ChatBox.jsx (Main Chat Interface)
            ├── Community.jsx (User Forum)
            └── Credits.jsx (About Page)
```

### State Management Pattern
- **Context API** via `src/context/AppContext.jsx` manages all global state
- State includes: `user`, `chats`, `selectedChat`, `theme`
- Theme persists to localStorage and syncs with `dark` class on `document.documentElement`
- Dummy data is currently hardcoded in AppContext for demo purposes

### Data Flow
1. **User sends message** → ChatBox component
2. **POST to `/api/chat`** with `{ message: string }`
3. **Expected response**: `{ reply: string }` or `{ message: string }`
4. **Fallback**: Demo responses if API unavailable
5. **State update**: Messages array updated, auto-scroll triggered

## Development Commands

```bash
# All commands run from /client directory
npm run dev      # Start dev server (usually http://localhost:5174)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Design System (CRITICAL)

### Color Philosophy
**Black & white contrast theme** - NOT purple/blue gradients. Do not introduce other accent colors.

#### Dark Mode (default)
- Background: `bg-black` (#000000)
- Text: `text-white` (#FFFFFF)
- Borders: `border-gray-800` (#1F2937)
- Hover: `hover:bg-gray-900` (#111827)

#### Light Mode
- Background: `bg-white` (#FFFFFF)
- Text: `text-black` (#000000)
- Borders: `border-gray-200` (#E5E7EB)
- Hover: `hover:bg-gray-100` (#F3F4F6)

### Theme Pattern (Use Consistently)
```jsx
className="bg-white dark:bg-black text-black dark:text-white border-gray-200 dark:border-gray-800"
```

### Message Styling Rules
- **User messages**: Right-aligned, `bg-black dark:bg-white`, `rounded-br-none`
- **Bot messages**: Left-aligned, `bg-gray-100 dark:bg-gray-900`, `rounded-bl-none`
- All messages include timestamps in gray text

## Tech Stack Specifics

- **React 19.1.1** with hooks (no class components)
- **React Router 7.8.2** for navigation (`useNavigate` hook preferred)
- **Tailwind CSS 4.1.12** with Vite plugin (no separate config file needed)
- **Vite 7.1.2** as build tool
- **Font**: "Outfit" from Google Fonts (defined in index.css)

## Critical Implementation Patterns

### Adding New Features to ChatBox
Always maintain these existing features:
1. Auto-scroll to bottom on new messages (`messagesEndRef` + `useEffect`)
2. Loading state with animated dots while waiting for API
3. Welcome screen when no messages exist
4. Enter to send, Shift+Enter for new lines
5. Proper error handling with user-friendly messages

### Modifying Sidebar
- Chat list uses `filteredChats` based on search input
- `handleNewChat()` pushes to existing chats array (mutates state - watch for reactivity issues)
- Mobile responsive via `isOpen` state and hamburger menu
- Theme toggle syncs localStorage and document.documentElement class

### API Integration Points
File: `src/Components/ChatBox.jsx` line ~50

```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: inputValue })
})
```

Replace this endpoint when connecting real AI services (OpenAI, Gemini, Claude, etc.). See `API_INTEGRATION.md` for provider-specific examples.

## Project Conventions

### File Organization
- **Components** in `src/Components/` (PascalCase)
- **Pages** in `src/Pages/` (PascalCase)
- **Context** in `src/context/` (PascalCase with Provider suffix)
- **Assets** managed through `src/assets/assets.js` barrel export

### Naming Patterns
- Components: PascalCase (e.g., `ChatBox.jsx`, `Message.jsx`)
- Context hooks: `useAppContext()` pattern
- State setters: Standard `setVariableName` convention
- CSS: Tailwind utility classes only, no custom CSS files except index.css

### Import Order (Not Enforced but Observed)
1. React imports
2. Third-party libraries
3. Local components
4. Context/hooks
5. Assets

## Common Gotchas

1. **Theme not applying**: Ensure dark class is on `document.documentElement`, not body
2. **Messages not scrolling**: `messagesEndRef.current` must be rendered in DOM with proper ref
3. **Context undefined**: Ensure component is wrapped in `AppContextProvider` in component tree
4. **Tailwind not working**: Check `@tailwindcss/vite` plugin is in vite.config.js
5. **Chat state mutation**: `chats.push()` in handleNewChat mutates state directly - consider using setState for predictability

## Next Steps for AI Integration

The app is **frontend-complete** but needs backend integration. When user requests API connection:
1. Check `API_INTEGRATION.md` for provider examples
2. Recommend backend service (Express, Next.js API routes, Netlify Functions, etc.)
3. Maintain the existing request/response contract: `POST /api/chat` expecting `{ reply: string }`
4. Preserve error handling and fallback logic

## Documentation Files
- `ENHANCEMENT_SUMMARY.md`: Complete feature changelog
- `FEATURES.md`: User-facing feature documentation
- `API_INTEGRATION.md`: Backend integration examples for various AI providers
- `DESIGN_SYSTEM.md`: Complete color palette and component styling guide
- `QUICKSTART.md`: Running the app and basic customization

## Key Files to Reference
- State management pattern: [src/context/AppContext.jsx](client/src/context/AppContext.jsx)
- Main chat logic: [src/Components/ChatBox.jsx](client/src/Components/ChatBox.jsx)
- Theme toggle implementation: [src/Components/Sidebar.jsx](client/src/Components/Sidebar.jsx)
- Routing setup: [src/main.jsx](client/src/main.jsx) and [src/App.jsx](client/src/App.jsx)
