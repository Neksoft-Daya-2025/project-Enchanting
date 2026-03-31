# Fusion Starter

A production-ready full-stack React application template with integrated Express server, featuring React Router 6 SPA mode, TypeScript, Vitest, Zod and modern tooling.

While the starter comes with a express server, only create endpoint when strictly neccesary, for example to encapsulate logic that must leave in the server, such as private keys handling, or certain DB operations, db...

## Tech Stack

- **Frontend**: React 18 + React Router 6 (spa) + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **Testing**: Vitest
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons

## Project Structure

```
src/                        # React SPA frontend
├── components/             # Reusable UI (Header, Footer, ui/, etc.)
├── layouts/                # MainLayout (navbar + main + footer)
├── pages/                  # Route components (Index, Contact, destinations/, etc.)
├── services/               # API client (api.ts) + example Laravel service (exampleService.ts)
├── types/                  # TypeScript interfaces (API responses, payloads)
├── hooks/                  # Custom hooks
├── utils/                  # Helpers (e.g. cn for Tailwind)
├── assets/                 # Static assets (optional)
├── App.tsx                 # Routes and providers
├── main.tsx                # Entry point
└── global.css              # Tailwind theme and global styles

server/                     # Express API (optional; use Laravel in production)
├── index.ts
└── routes/

shared/                     # Types shared by client & server
└── api.ts

public/                     # Static files (favicon, images)
index.html                  # Single HTML entry (SPA)
```

## Key Features

## SPA Routing System

The routing system is powered by React Router 6:

- `src/pages/Index.tsx` represents the home page.
- Routes are defined in `src/App.tsx` using the `react-router-dom` import
- Route files are located in the `src/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

### Styling System

- **Primary**: TailwindCSS 3 utility classes
- **Theme and design tokens**: Configure in `src/global.css` 
- **UI components**: Pre-built library in `src/components/ui/`
- **Utility**: `cn()` from `@/lib/utils` or `@/utils/utils`

```typescript
// cn utility usage
className={cn(
  "base-classes",
  { "conditional-class": condition },
  props.className  // User overrides
)}
```

### Express Server Integration

- **Development**: Single port (8080) for both frontend/backend
- **Hot reload**: Both client and server code
- **API endpoints**: Prefixed with `/api/`

#### Example API Routes
- `GET /api/ping` - Simple ping api
- `GET /api/demo` - Demo endpoint  

### Laravel (or any REST) API integration

The app uses **Axios** via `src/services/api.ts`. The base URL is set with:

- **`.env`**: `VITE_API_BASE_URL=http://localhost:8000/api` (or your Laravel API URL, no trailing slash).
- If **not set**, requests use relative `/api` (same origin), so the bundled Express server can still handle them in dev.

Use the `api` client in components:

```typescript
import { api } from "@/services/api";

const { data } = await api.post("/form", { formType: "contact", ...formData });
```

You can add request/response interceptors in `src/services/api.ts` (e.g. attach `Authorization: Bearer <token>` for Laravel Sanctum).

**Laravel backend checklist** — implement these routes so the frontend works with your API:

| Method | Path | Used by | Payload / response |
|--------|------|---------|---------------------|
| `POST` | `/api/form` | Contact, Enquiry, Custom Tour forms | Body: `{ formType: "contact" \| "enquiry" \| "custom-tour", ...fields }`. Respond with `{ success: true, message?: string }` or `{ success: false, message: string }`. |
| `GET` | `/api/smtp-settings` | Dashboard (load / login check) | Headers: `Authorization: Bearer <password>`. Respond with `{ success: true, data: { ...smtp config } }` or `401` for invalid auth. |
| `POST` | `/api/smtp-settings` | Dashboard (save) | Headers: `Authorization: Bearer <token>`. Body: SMTP config object. Respond with `{ success: true }` or `401`. |
| `POST` | `/api/test-smtp` | Dashboard (test email) | Headers: `Authorization: Bearer <token>`. Body: config + `test_email`. Respond with `{ success: true, message?: string }` or `{ success: false, error: string }`. |

Enable CORS in Laravel for your frontend origin (e.g. `http://localhost:3000` in dev).

### Shared Types
Import consistent types in both client and server:
```typescript
import { DemoResponse } from '@shared/api';
```

Path aliases:
- `@/*` - `src/` folder
- `@shared/*` - Shared folder
- `@/lib/*` - `src/utils/` (e.g. `@/lib/utils` → `cn()`)

## Development Commands

```bash
npm run dev        # Start dev server (client + server)
npm run build      # Production build
npm run start      # Start production server
npm run typecheck  # TypeScript validation
npm test          # Run Vitest tests
```

## Adding Features

### Add new colors to the theme

Open `src/global.css` and `tailwind.config.ts` and add new tailwind colors.

### New API Route
1. **Optional**: Create a shared interface in `shared/api.ts`:
```typescript
export interface MyRouteResponse {
  message: string;
  // Add other response properties here
}
```

2. Create a new route handler in `server/routes/my-route.ts`:
```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optional: for type safety

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: 'Hello from my endpoint!'
  };
  res.json(response);
};
```

3. Register the route in `server/index.ts`:
```typescript
import { handleMyRoute } from "./routes/my-route";

// Add to the createServer function:
app.get("/api/my-endpoint", handleMyRoute);
```

4. Use in React components with type safety:
```typescript
import { MyRouteResponse } from '@shared/api'; // Optional: for type safety

const response = await fetch('/api/my-endpoint');
const data: MyRouteResponse = await response.json();
```

### New Page Route
1. Create component in `src/pages/MyPage.tsx`
2. Add route in `src/App.tsx`:
```typescript
<Route path="/my-page" element={<MyPage />} />
```

## Production Deployment

- **Standard**: `npm run build` + `npm start`
- **Binary**: Self-contained executables (Linux, macOS, Windows)
- **Cloud Deployment**: Use either Netlify or Vercel via their MCP integrations for easy deployment. Both providers work well with this starter template.

## Architecture Notes

- Single-port development with Vite + Express integration
- TypeScript throughout (client, server, shared)
- Full hot reload for rapid development
- Production-ready with multiple deployment options
- Comprehensive UI component library included
- Type-safe API communication via shared interfaces
