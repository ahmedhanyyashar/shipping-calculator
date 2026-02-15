# Interactive Shipping Calculator

A React application for merchants to compare shipping rates across multiple couriers with advanced form management and graceful error handling.

## Demo

**Live Demo**: https://shipping-calculator-navy.vercel.app

## Features

- Multi-step form with real-time validation (Origin → Destination → Package)
- Parallel courier rate fetching (DHL, FedEx, UPS, USPS)
- Automatic "Cheapest" and "Fastest" courier highlighting
- Graceful error handling with partial failure support
- Responsive design (mobile-first)
- Live sidebar summary

## Tech Stack

- React 19 + TypeScript
- Material UI (MUI) for components
- React Hook Form + Zod for validation
- Vite for build tooling
- pnpm for package management

## Installation

```bash
pnpm install
pnpm dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── components/       # UI components (FormSteps, CourierCard, QuotesGrid)
├── context/          # QuoteContext for state management
├── pages/            # ShippingCalculator main page
├── services/         # API calls (api.ts, mock-data.ts)
├── utils/            # Validation schemas, calculations
├── hooks/            # Custom hooks (use-courier-ranking)
├── constants/        # Courier data, form configuration
└── types/            # TypeScript definitions
```

## Key Design Decisions

**Multi-Step Validation**: Each form step only validates its own fields using React Hook Form's `trigger()` method. This prevents validation errors on incomplete future steps.

**Graceful Degradation**: Uses `Promise.allSettled()` for API calls. If 1-2 couriers fail, users still see available quotes rather than a complete error.

**Performance**: Form filling updates only the relevant input and sidebar values with field level subscription with RHF `useWatch()`, without re‑rendering the entire page.

## API Error Handling

The application handles courier API failures at three levels:

### 1. Retry Logic with Exponential Backoff

Each courier API call retries up to 3 times with increasing timeouts:
- Attempt 1: 5 second timeout
- Attempt 2: 10 second timeout  
- Attempt 3: 20 second timeout

Delays between retries: 1s → 2s → 4s

### 2. Graceful Degradation

Uses `Promise.allSettled()` to handle partial failures:

```typescript
const results = await Promise.allSettled([
  fetchDHL(), fetchFedEx(), fetchUPS(), fetchUSPS()
]);
```

**Result**: Returns both successful quotes and errors, never completely fails.

### 3. UI Error States

- **All succeed**: Show all quotes with "Cheapest" and "Fastest" badges
- **Partial failure**: Show available quotes + warning banner listing failed couriers
- **Complete failure**: Show error message with retry button
- **No results**: Show empty state (no couriers serve this route)

### Error Recovery

Users can:
1. Click "Try Again" to retry all failed requests
2. Modify form data and search again (triggers fresh API calls)

### Example Scenarios

| Scenario | Behavior |
|----------|----------|
| DHL times out | Retry 3x with longer timeouts, then exclude from results |
| Network failure | Retry with exponential backoff, show partial results |
| All services down | Display error state with retry button |


## Bundle Size Optimization for 3G Networks

**Current bundle size**: ~200KB (gzipped) ✅  
**Target achieved**: Vite enables gzip compression by default in production builds.

### Current Optimizations (Already Implemented)

Vite automatically provides:
- **Minification**: Uses esbuild for fast minification
- **Tree shaking**: Removes unused code automatically
- **Code splitting**: Separates vendor and app bundles
- **Gzip compression**: Enabled by default in production builds

MUI v7 is already optimized with tree-shakable imports when using:
```typescript
import { Button, TextField } from '@mui/material';
```

### Additional Optimizations (If Needed)

If bundle size grows beyond 200KB:

**1. Dynamic Imports**
```typescript
const QuotesGrid = lazy(() => import('@/components/QuotesGrid'));
```

**2. Selective MUI Imports** (if bundle grows significantly)
```typescript
// More explicit imports
import Button from '@mui/material/Button';
```

**3. Network-Aware Loading**
```typescript
// Detect slow connections
if (navigator.connection?.effectiveType === '3g') {
  // Reduce animations, show simplified UI
}
```

**4. Manual Chunk Splitting** (vite.config.ts)
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react': ['react', 'react-dom'],
        'vendor-mui': ['@mui/material'],
      }
    }
  }
}
```

### For 3G Networks

Current approach is sufficient for 3G:
- Skeleton loaders show layout immediately
- Progressive loading (form → results)
- Lazy loading of result components
- Service workers could cache static assets further

## State Management Approach

Uses **Context API** to avoid prop drilling. The `QuoteContext` provides:
- Form state (React Hook Form instance)
- Current step tracking
- Search state (loading, quotes, errors)
- Actions (validateStep, performSearch, retrySearch)

Both the main form and sidebar access this context directly, avoiding the need to pass props through multiple layers.

## Form Validation Strategy

Uses **Zod** for schema validation with React Hook Form:

```typescript
// Weight must be > 0, dimensions must be positive
const schema = z.object({
  package: z.object({
    weight: z.number().min(0.1).max(1000),
    length: z.number().min(1),
    // ...
  })
});
```

**Step-by-step validation**: Only validates the current step's fields, not the entire form. This forces the user to fill in valid step details before moving forward.

**Real-time feedback**: Validates on change, but only for touched fields.

## Responsive Design Implementation

**Mobile-first approach** using MUI Grid:

```typescript
<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
```

- **Mobile (<600px)**: Single column, stacked layout
- **Tablet (600-900px)**: 2 column grid, side-by-side form/sidebar
- **Desktop (900px+)**: 3-4 column grid for courier cards

## AI Usage

This project was built with assistance from Claude AI. Full documentation of prompts and AI interactions is in **PROMPTS.md**.

## Assumptions & Considerations

- Uses mock API data with simulated delays and failures
- DHL has 90% failure rate (intentional, to demonstrate error handling)
- Client-side only (no backend)
- Modern Browsers: Assumes ES6+ support (Chrome, Firefox, Safari, Edge - last 2 versions)
- Production Engineering Considerations (Omitted for demo purposes): Global Error Boundary for crash reporting, Testing suite, CI/CD, Performance Monitoring, and much more.